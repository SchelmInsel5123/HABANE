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
    else if (ext === '.mp4') contentType = 'video/mp4';

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

async function uploadAllImages() {
  const projectRoot = join(__dirname, '..');
  const mediaDir = join(projectRoot, 'Media');
  const parallaxDir = join(projectRoot, 'Paralex_Media');

  console.log('Uploading images to Supabase Storage...\n');

  const uploadedUrls = {};

  // Upload Media folder images
  const mediaFiles = readdirSync(mediaDir);
  for (const file of mediaFiles) {
    const filePath = join(mediaDir, file);
    const storagePath = `media/${file}`;
    console.log(`Uploading ${file}...`);
    const url = await uploadImage(filePath, storagePath);
    if (url) {
      uploadedUrls[`/Media/${file}`] = url;
      console.log(`✓ Uploaded: ${file}`);
    }
  }

  // Upload Paralex_Media folder images
  const parallaxFiles = readdirSync(parallaxDir);
  for (const file of parallaxFiles) {
    const filePath = join(parallaxDir, file);
    const storagePath = `paralex/${file}`;
    console.log(`Uploading ${file}...`);
    const url = await uploadImage(filePath, storagePath);
    if (url) {
      uploadedUrls[`/Paralex_Media/${file}`] = url;
      console.log(`✓ Uploaded: ${file}`);
    }
  }

  console.log('\n✓ All images uploaded successfully!');
  return uploadedUrls;
}

async function seedProducts(uploadedUrls) {
  console.log('\nSeeding products into database...\n');

  const products = [
    {
      slug: 'reiser-pro',
      name: 'Reiser Pro',
      tagline: 'The Original AI Suitcase',
      price: '€1,299',
      original_price: '€1,499',
      badge: 'Best Seller',
      short_description: 'The flagship HABÄNE suitcase with AI-powered autonomous follow technology, premium German engineering, and smart navigation.',
      hero_image_url: uploadedUrls['/Paralex_Media/1.png'],
      story_headline: 'Born From a Simple Idea',
      story_paragraphs: [
        'The Reiser Pro was born at TH-OWL in Germany, from a simple frustration: why do we still drag our luggage around like it\'s the 1970s?',
        'Our founding team of engineers and designers spent over 3 years perfecting the autonomous follow system. Using a combination of LiDAR sensors, computer vision, and proprietary AI algorithms, the Reiser Pro can track its owner through the most chaotic airport terminals.',
        'Every curve of the polycarbonate shell was wind-tunnel tested. Every sensor placement was optimized through thousands of real-world trials. The result is a suitcase that doesn\'t just follow you — it anticipates where you\'re going.',
      ],
      specs: [
        { label: 'Capacity', value: '42L' },
        { label: 'Weight', value: '4.8 kg' },
        { label: 'Battery', value: '12h' },
        { label: 'Speed', value: '8 km/h' },
        { label: 'Sensors', value: '50+' },
        { label: 'Charging', value: 'USB-C Fast' },
      ],
      features: [
        'AI autonomous follow mode',
        'Obstacle avoidance navigation',
        'Anti-theft biometric lock',
        'TSA-approved battery system',
        'Premium polycarbonate shell',
        'Silent omni-directional wheels',
      ],
      color: '#c9a96e',
      display_order: 1,
      images: [
        { url: uploadedUrls['/Paralex_Media/1.png'], type: 'hero', order: 0 },
        { url: uploadedUrls['/Paralex_Media/2.png'], type: 'gallery', order: 1 },
        { url: uploadedUrls['/Paralex_Media/3.png'], type: 'gallery', order: 2 },
        { url: uploadedUrls['/Media/suitcase-wheels.png'], type: 'detail', order: 3 },
        { url: uploadedUrls['/Media/handle-detail.png'], type: 'detail', order: 4 },
        { url: uploadedUrls['/Media/polycarbonate-texture.png'], type: 'detail', order: 5 },
      ]
    },
    {
      slug: 'reiser-lite',
      name: 'Reiser Lite',
      tagline: 'Smart Travel, Lighter Footprint',
      price: '€899',
      original_price: '€1,099',
      badge: 'New',
      short_description: 'A lighter, more compact version of the Reiser with core AI-assist technology — perfect for weekend trips and carry-on travel.',
      hero_image_url: uploadedUrls['/Media/suitcase-hero.png'],
      story_headline: 'Engineered to Go Everywhere',
      story_paragraphs: [
        'Not every trip needs a full-size suitcase. But every trip deserves smart technology. That\'s why we created the Reiser Lite.',
        'Compact enough for overhead bins, smart enough to navigate on its own. The Lite uses the same core AI follow-system as the Pro, optimized for a smaller, lighter frame that meets every airline\'s carry-on requirements.',
        'The interior was designed with input from over 500 frequent travelers. Every pocket, every compartment, every zipper placement was tested and refined until packing became effortless.',
      ],
      specs: [
        { label: 'Capacity', value: '35L' },
        { label: 'Weight', value: '3.2 kg' },
        { label: 'Battery', value: '10h' },
        { label: 'Speed', value: '7 km/h' },
        { label: 'Sensors', value: '32' },
        { label: 'Charging', value: 'USB-C' },
      ],
      features: [
        'AI follow-assist mode',
        'Carry-on compliant size',
        'Smart lock with app control',
        'Removable battery system',
        'Lightweight aluminum frame',
        'Built-in USB charging port',
      ],
      color: '#8aaed0',
      display_order: 2,
      images: [
        { url: uploadedUrls['/Media/suitcase-hero.png'], type: 'hero', order: 0 },
        { url: uploadedUrls['/Media/suitcase-interior.png'], type: 'gallery', order: 1 },
        { url: uploadedUrls['/Media/suitcase-material.png'], type: 'detail', order: 2 },
        { url: uploadedUrls['/Media/suitcase-lock.png'], type: 'detail', order: 3 },
        { url: uploadedUrls['/Media/zipper-detail.png'], type: 'detail', order: 4 },
        { url: uploadedUrls['/Media/wheels-detail.png'], type: 'detail', order: 5 },
      ]
    }
  ];

  for (const product of products) {
    const productImages = product.images;
    delete product.images;

    const { data: productData, error: productError } = await supabase
      .from('products')
      .insert(product)
      .select()
      .single();

    if (productError) {
      console.error(`Error inserting product ${product.name}:`, productError);
      continue;
    }

    console.log(`✓ Created product: ${product.name}`);

    for (const img of productImages) {
      const { error: imageError } = await supabase
        .from('product_images')
        .insert({
          product_id: productData.id,
          image_url: img.url,
          image_type: img.type,
          display_order: img.order,
          alt_text: `${product.name} - ${img.type} image`
        });

      if (imageError) {
        console.error(`Error inserting image for ${product.name}:`, imageError);
      }
    }

    console.log(`✓ Added ${productImages.length} images for ${product.name}`);
  }

  console.log('\n✓ Database seeded successfully!');
}

async function main() {
  try {
    const uploadedUrls = await uploadAllImages();
    await seedProducts(uploadedUrls);
    console.log('\n🎉 Migration complete! All images uploaded and products seeded.');
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}

main();
