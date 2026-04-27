-- Newsletter Subscribers Table Setup
-- Run this SQL in your Supabase SQL Editor

-- Create the newsletter_subscribers table
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  source VARCHAR(100) DEFAULT 'website',
  is_active BOOLEAN DEFAULT TRUE,
  unsubscribed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create an index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_newsletter_subscribers_email ON newsletter_subscribers(email);

-- Create an index on subscribed_at for analytics
CREATE INDEX IF NOT EXISTS idx_newsletter_subscribers_subscribed_at ON newsletter_subscribers(subscribed_at);

-- Enable Row Level Security (RLS)
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows anyone to insert (for signup)
CREATE POLICY "Allow public signup" ON newsletter_subscribers
  FOR INSERT
  WITH CHECK (true);

-- Create a policy that allows authenticated users to view their own data
CREATE POLICY "Users can view own subscription" ON newsletter_subscribers
  FOR SELECT
  USING (auth.uid() IS NOT NULL AND email = (SELECT email FROM auth.users WHERE id = auth.uid()));

-- Create a policy for admin access (you can modify this based on your needs)
CREATE POLICY "Admin can manage all subscriptions" ON newsletter_subscribers
  FOR ALL
  USING (auth.jwt() ->> 'role' = 'admin');

-- Create a function to handle unsubscribes
CREATE OR REPLACE FUNCTION unsubscribe_newsletter(user_email VARCHAR)
RETURNS VOID AS $$
BEGIN
  UPDATE newsletter_subscribers
  SET is_active = FALSE, unsubscribed_at = NOW(), updated_at = NOW()
  WHERE email = user_email;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Optional: Create a view for active subscribers
CREATE OR REPLACE VIEW active_subscribers AS
SELECT id, email, subscribed_at, source
FROM newsletter_subscribers
WHERE is_active = TRUE
ORDER BY subscribed_at DESC;