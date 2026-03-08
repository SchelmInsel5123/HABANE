/*
  # Create newsletter subscribers table

  1. New Tables
    - `newsletter_subscribers`
      - `id` (uuid, primary key) - Unique identifier for each subscriber
      - `email` (text, unique) - Subscriber's email address
      - `source` (text) - Source of subscription (e.g., 'product-detail', 'cta-section')
      - `subscribed_at` (timestamptz) - Timestamp when user subscribed
      - `ip_address` (text, nullable) - IP address for rate limiting
      - `user_agent` (text, nullable) - User agent for analytics

  2. Security
    - Enable RLS on `newsletter_subscribers` table
    - Add policy for public inserts (anyone can subscribe)
    - Add policy for authenticated admins to view subscribers

  3. Indexes
    - Index on email for fast lookups
    - Index on subscribed_at for chronological queries
*/

CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  source text DEFAULT 'general',
  subscribed_at timestamptz DEFAULT now(),
  ip_address text,
  user_agent text
);

ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can subscribe to newsletter"
  ON newsletter_subscribers
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Only authenticated users can view subscribers"
  ON newsletter_subscribers
  FOR SELECT
  TO authenticated
  USING (true);

CREATE INDEX IF NOT EXISTS idx_newsletter_email ON newsletter_subscribers(email);
CREATE INDEX IF NOT EXISTS idx_newsletter_subscribed_at ON newsletter_subscribers(subscribed_at DESC);