-- Portfolio Database Schema
-- This file contains the database schema for the portfolio project

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Blog Posts Table
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  author TEXT NOT NULL DEFAULT 'Amjad Shakhshir',
  published_at DATE NOT NULL,
  updated_at DATE NOT NULL,
  category TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  read_time INTEGER NOT NULL DEFAULT 5,
  featured BOOLEAN DEFAULT false,
  image_url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at_timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Contact Submissions Table
CREATE TABLE IF NOT EXISTS contact_submissions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  user_agent TEXT,
  ip_address INET,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for better performance
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON blog_posts(category);
CREATE INDEX IF NOT EXISTS idx_blog_posts_featured ON blog_posts(featured);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published_at ON blog_posts(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_created_at ON contact_submissions(created_at DESC);

-- Row Level Security (RLS) Policies
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Blog posts are readable by everyone, but only writable by authenticated admin users
CREATE POLICY IF NOT EXISTS "Blog posts are viewable by everyone" 
  ON blog_posts FOR SELECT 
  USING (true);

CREATE POLICY IF NOT EXISTS "Only admin can insert blog posts" 
  ON blog_posts FOR INSERT 
  WITH CHECK (auth.jwt() ->> 'email' = current_setting('app.admin_email', true));

CREATE POLICY IF NOT EXISTS "Only admin can update blog posts" 
  ON blog_posts FOR UPDATE 
  USING (auth.jwt() ->> 'email' = current_setting('app.admin_email', true))
  WITH CHECK (auth.jwt() ->> 'email' = current_setting('app.admin_email', true));

CREATE POLICY IF NOT EXISTS "Only admin can delete blog posts" 
  ON blog_posts FOR DELETE 
  USING (auth.jwt() ->> 'email' = current_setting('app.admin_email', true));

-- Contact submissions can be inserted by anyone, but only viewable by admin
CREATE POLICY IF NOT EXISTS "Anyone can submit contact forms" 
  ON contact_submissions FOR INSERT 
  WITH CHECK (true);

CREATE POLICY IF NOT EXISTS "Only admin can view contact submissions" 
  ON contact_submissions FOR SELECT 
  USING (auth.jwt() ->> 'email' = current_setting('app.admin_email', true));

-- Function to automatically update the updated_at_timestamp column
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at_timestamp = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Function to set configuration variables for RLS policies
CREATE OR REPLACE FUNCTION set_config(setting_name text, setting_value text, is_local boolean DEFAULT false)
RETURNS text AS $$
BEGIN
    PERFORM set_config(setting_name, setting_value, is_local);
    RETURN setting_value;
END;
$$ language 'plpgsql' SECURITY DEFINER;

-- Grant execute permission on the set_config function
GRANT EXECUTE ON FUNCTION set_config(text, text, boolean) TO authenticated, anon;

-- Triggers to automatically update timestamps
CREATE TRIGGER IF NOT EXISTS update_blog_posts_updated_at 
  BEFORE UPDATE ON blog_posts 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER IF NOT EXISTS update_contact_submissions_updated_at 
  BEFORE UPDATE ON contact_submissions 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
