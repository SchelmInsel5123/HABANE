/*
  # Create Products and Product Images Schema

  ## Summary
  This migration creates the core database structure for the HABÄNE webshop, including
  products and their associated images.

  ## New Tables
  
  ### `products`
  Stores all product information for HABÄNE suitcases.
  - `id` (uuid, primary key) - Unique identifier for each product
  - `slug` (text, unique) - URL-friendly product identifier (e.g., 'reiser-pro')
  - `name` (text) - Product name (e.g., 'Reiser Pro')
  - `tagline` (text) - Short marketing tagline
  - `price` (text) - Current display price (e.g., '€1,299')
  - `original_price` (text) - Original price before discount
  - `badge` (text) - Display badge (e.g., 'Best Seller', 'New')
  - `short_description` (text) - Brief product description
  - `hero_image_url` (text) - URL to main product image
  - `story_headline` (text) - Story section headline
  - `story_paragraphs` (jsonb) - Array of story paragraphs
  - `specs` (jsonb) - Array of product specifications
  - `features` (jsonb) - Array of product features
  - `color` (text) - Primary color code for UI theming
  - `display_order` (integer) - Order for displaying products
  - `is_active` (boolean) - Whether product is visible on site
  - `created_at` (timestamptz) - Record creation timestamp
  - `updated_at` (timestamptz) - Record update timestamp

  ### `product_images`
  Stores metadata for all product images with relationships to products.
  - `id` (uuid, primary key) - Unique identifier for each image
  - `product_id` (uuid, foreign key) - References products table
  - `image_url` (text) - Full URL to image in Supabase Storage
  - `image_type` (text) - Type of image (hero, gallery, detail, lifestyle, etc.)
  - `alt_text` (text) - Accessibility description
  - `display_order` (integer) - Order for image galleries
  - `created_at` (timestamptz) - Record creation timestamp

  ## Security
  - Enable Row Level Security (RLS) on both tables
  - Allow public read access for all products and images
  - Restrict write operations to authenticated users only

  ## Notes
  1. Using JSONB for flexible storage of specs, features, and story paragraphs
  2. All images will be stored in Supabase Storage with URLs referenced here
  3. Products can have multiple images linked via product_id foreign key
  4. Display order allows flexible reordering without data migration
*/

-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  name text NOT NULL,
  tagline text,
  price text NOT NULL,
  original_price text,
  badge text,
  short_description text,
  hero_image_url text,
  story_headline text,
  story_paragraphs jsonb DEFAULT '[]'::jsonb,
  specs jsonb DEFAULT '[]'::jsonb,
  features jsonb DEFAULT '[]'::jsonb,
  color text,
  display_order integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create product_images table
CREATE TABLE IF NOT EXISTS product_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  image_url text NOT NULL,
  image_type text DEFAULT 'gallery',
  alt_text text,
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);
CREATE INDEX IF NOT EXISTS idx_products_is_active ON products(is_active);
CREATE INDEX IF NOT EXISTS idx_products_display_order ON products(display_order);
CREATE INDEX IF NOT EXISTS idx_product_images_product_id ON product_images(product_id);
CREATE INDEX IF NOT EXISTS idx_product_images_display_order ON product_images(display_order);

-- Enable Row Level Security
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_images ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Anyone can view active products"
  ON products FOR SELECT
  USING (is_active = true);

CREATE POLICY "Anyone can view product images"
  ON product_images FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM products
      WHERE products.id = product_images.product_id
      AND products.is_active = true
    )
  );

-- Create policies for authenticated write access
CREATE POLICY "Authenticated users can insert products"
  ON products FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update products"
  ON products FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete products"
  ON products FOR DELETE
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert product images"
  ON product_images FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update product images"
  ON product_images FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete product images"
  ON product_images FOR DELETE
  TO authenticated
  USING (true);
