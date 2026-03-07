import { createClient } from '@supabase/supabase-js';
import { readFileSync, readdirSync } from 'fs';
import { join, extname } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function uploadImage(filePath, storagePath) {
  try {
    const fileBuffer = readFileSync(filePath);
    const ext = extname(filePath).toLowerCase();

    let contentType = 'image/png';
    if (ext === '.jpg' || ext === '.jpeg') contentType = 'image/jpeg';
    else if (ext === '.webp') contentType = 'image/webp';
    else if (ext === '.gif') contentType = 'image/gif';

    const { data, error } = await supabase.storage
      .from('product-images')
      .upload(storagePath, fileBuffer, {
        contentType,
        upsert: true
      });

    if (error) {
      console.error(`Error uploading ${storagePath}:`, error);
      return null;
    }

    const { data: urlData } = supabase.storage
      .from('product-images')
      .getPublicUrl(storagePath);

    return urlData.publicUrl;
  } catch (error) {
    console.error(`Failed to upload ${filePath}:`, error);
    return null;
  }
}

async function uploadNewMediaImages() {
  const projectRoot = join(__dirname, '..');
  const newMediaDir = join(projectRoot, 'New_Media');

  console.log('Uploading new images from New_Media folder to Supabase Storage...\n');

  const uploadedUrls = {};

  const files = readdirSync(newMediaDir);
  for (const file of files) {
    const filePath = join(newMediaDir, file);
    const storagePath = `new_media/${file}`;
    console.log(`Uploading ${file}...`);
    const url = await uploadImage(filePath, storagePath);
    if (url) {
      uploadedUrls[`/New_Media/${file}`] = url;
      console.log(`✓ Uploaded: ${file}`);
    }
  }

  console.log(`\n✓ Successfully uploaded ${Object.keys(uploadedUrls).length} images!`);

  return uploadedUrls;
}

async function main() {
  try {
    const uploadedUrls = await uploadNewMediaImages();
    console.log('\n🎉 Upload complete! All new media images have been added to Supabase Storage.');
    console.log('\nYou can now use these images in your application with paths like:');
    console.log('  getImageUrl(\'/New_Media/Gemini_Generated_Image_3j04eg3j04eg3j04.png\')');
  } catch (error) {
    console.error('Upload failed:', error);
    process.exit(1);
  }
}

main();
