import { supabase } from '../lib/supabase';

export async function getAllProducts() {
  const { data: products, error } = await supabase
    .from('products')
    .select(`
      *,
      product_images(*)
    `)
    .eq('is_active', true)
    .order('display_order', { ascending: true });

  if (error) {
    console.error('Error fetching products:', error);
    throw error;
  }

  return products.map(product => ({
    id: product.slug,
    slug: product.slug,
    name: product.name,
    tagline: product.tagline,
    price: product.price,
    originalPrice: product.original_price,
    badge: product.badge,
    shortDescription: product.short_description,
    heroImage: product.hero_image_url,
    images: product.product_images
      .sort((a, b) => a.display_order - b.display_order)
      .map(img => img.image_url),
    story: {
      headline: product.story_headline,
      paragraphs: product.story_paragraphs,
    },
    specs: product.specs,
    features: product.features,
    color: product.color,
  }));
}

export async function getProductBySlug(slug) {
  const { data: product, error } = await supabase
    .from('products')
    .select(`
      *,
      product_images(*)
    `)
    .eq('slug', slug)
    .eq('is_active', true)
    .maybeSingle();

  if (error) {
    console.error('Error fetching product:', error);
    throw error;
  }

  if (!product) {
    return null;
  }

  return {
    id: product.slug,
    slug: product.slug,
    name: product.name,
    tagline: product.tagline,
    price: product.price,
    originalPrice: product.original_price,
    badge: product.badge,
    shortDescription: product.short_description,
    heroImage: product.hero_image_url,
    images: product.product_images
      .sort((a, b) => a.display_order - b.display_order)
      .map(img => img.image_url),
    story: {
      headline: product.story_headline,
      paragraphs: product.story_paragraphs,
    },
    specs: product.specs,
    features: product.features,
    color: product.color,
  };
}
