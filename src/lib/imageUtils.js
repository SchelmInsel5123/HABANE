import { supabase } from './supabase';

const getImageUrl = (path) => {
  if (!path) return '';

  if (path.startsWith('http')) {
    return path;
  }

  let storagePath = path;
  if (path.startsWith('/Media/')) {
    storagePath = `media/${path.replace('/Media/', '')}`;
  } else if (path.startsWith('/Paralex_Media/')) {
    storagePath = `paralex/${path.replace('/Paralex_Media/', '')}`;
  }

  const { data } = supabase.storage
    .from('product-images')
    .getPublicUrl(storagePath);

  return data.publicUrl;
};

export default getImageUrl;
