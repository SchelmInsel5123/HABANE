/*
  # Fix Security Issues
  
  ## Summary
  This migration addresses critical security vulnerabilities and removes unused database indexes.
  
  ## Changes Made
  
  ### 1. Remove Unused Indexes
  - Drop `idx_products_is_active` - not being used by queries
  - Drop `idx_product_images_display_order` - not being used by queries
  
  ### 2. Fix RLS Policies for Products Table
  Replace overly permissive policies (USING true) with proper restricted access:
  - **INSERT**: Only allow authenticated users who are admins
  - **UPDATE**: Only allow authenticated users who are admins  
  - **DELETE**: Only allow authenticated users who are admins
  
  ### 3. Fix RLS Policies for Product Images Table
  Replace overly permissive policies (USING true) with proper restricted access:
  - **INSERT**: Only allow authenticated users who are admins
  - **UPDATE**: Only allow authenticated users who are admins
  - **DELETE**: Only allow authenticated users who are admins
  
  ## Security Rationale
  The original policies allowed ANY authenticated user to modify products and images.
  This is a security risk as any user who signs up could delete or modify product data.
  
  The new policies restrict write access to admin users only. An `is_admin` flag
  is added to the auth.users metadata to control access.
  
  ## Notes
  - Public read access remains unchanged - anyone can view active products
  - To grant admin access, set user metadata: UPDATE auth.users SET raw_app_metadata = raw_app_metadata || '{"is_admin": true}' WHERE email = 'admin@example.com';
*/

-- Remove unused indexes
DROP INDEX IF EXISTS idx_products_is_active;
DROP INDEX IF EXISTS idx_product_images_display_order;

-- Drop overly permissive policies for products table
DROP POLICY IF EXISTS "Authenticated users can insert products" ON products;
DROP POLICY IF EXISTS "Authenticated users can update products" ON products;
DROP POLICY IF EXISTS "Authenticated users can delete products" ON products;

-- Drop overly permissive policies for product_images table
DROP POLICY IF EXISTS "Authenticated users can insert product images" ON product_images;
DROP POLICY IF EXISTS "Authenticated users can update product images" ON product_images;
DROP POLICY IF EXISTS "Authenticated users can delete product images" ON product_images;

-- Create secure policies for products table (admin only)
CREATE POLICY "Admin users can insert products"
  ON products FOR INSERT
  TO authenticated
  WITH CHECK (
    (auth.jwt() -> 'app_metadata' ->> 'is_admin')::boolean = true
  );

CREATE POLICY "Admin users can update products"
  ON products FOR UPDATE
  TO authenticated
  USING (
    (auth.jwt() -> 'app_metadata' ->> 'is_admin')::boolean = true
  )
  WITH CHECK (
    (auth.jwt() -> 'app_metadata' ->> 'is_admin')::boolean = true
  );

CREATE POLICY "Admin users can delete products"
  ON products FOR DELETE
  TO authenticated
  USING (
    (auth.jwt() -> 'app_metadata' ->> 'is_admin')::boolean = true
  );

-- Create secure policies for product_images table (admin only)
CREATE POLICY "Admin users can insert product images"
  ON product_images FOR INSERT
  TO authenticated
  WITH CHECK (
    (auth.jwt() -> 'app_metadata' ->> 'is_admin')::boolean = true
  );

CREATE POLICY "Admin users can update product images"
  ON product_images FOR UPDATE
  TO authenticated
  USING (
    (auth.jwt() -> 'app_metadata' ->> 'is_admin')::boolean = true
  )
  WITH CHECK (
    (auth.jwt() -> 'app_metadata' ->> 'is_admin')::boolean = true
  );

CREATE POLICY "Admin users can delete product images"
  ON product_images FOR DELETE
  TO authenticated
  USING (
    (auth.jwt() -> 'app_metadata' ->> 'is_admin')::boolean = true
  );
