# Supabase Database Setup Guide

This guide will help you set up the Supabase database for your portfolio project.

## Prerequisites

1. **Supabase Account**: Create a free account at [supabase.com](https://supabase.com)
2. **Environment Variables**: Ensure your `.env.local` file has the correct values

## Step 1: Create a New Supabase Project

1. Go to your [Supabase Dashboard](https://supabase.com/dashboard)
2. Click "New Project"
3. Choose your organization
4. Enter project details:
   - **Name**: `portfolio-database` (or your preferred name)
   - **Database Password**: Choose a strong password
   - **Region**: Select the region closest to your users
5. Click "Create new project"

## Step 2: Get Your Project Credentials

1. Go to **Settings** > **API** in your Supabase dashboard
2. Copy the following values:
   - **Project URL** (starts with `https://`)
   - **anon/public key** (starts with `eyJ`)

## Step 3: Update Environment Variables

Update your `.env.local` file with your Supabase credentials:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here

# Admin Configuration (already set)
ADMIN_EMAIL=amjaddevelopment8@gmail.com
```

## Step 4: Run the Database Schema

1. Go to **SQL Editor** in your Supabase dashboard
2. Click "New Query"
3. Copy and paste the entire contents of `lib/supabase/migrations/schema.sql`
4. Click "Run" to execute the schema

This will create:
- `blog_posts` table with all necessary columns
- `contact_submissions` table for form submissions
- Proper indexes for performance
- Row Level Security (RLS) policies
- Required PostgreSQL functions

## Step 5: Verify the Setup

1. Go to **Table Editor** in your Supabase dashboard
2. You should see two tables:
   - `blog_posts`
   - `contact_submissions`
3. Check that RLS is enabled (lock icon should be visible)

## Step 6: Test the Integration

1. Start your development server: `npm run dev`
2. Navigate to `/blog/admin` (requires admin login)
3. Try creating a test blog post
4. Navigate to `/contact` and submit a test form
5. Check your Supabase dashboard to verify data is being stored

## Security Features

### Row Level Security (RLS)

The database uses RLS policies that:

- **Blog Posts**:
  - Anyone can read blog posts (public access)
  - Only the admin email can create, update, or delete posts
  
- **Contact Submissions**:
  - Anyone can submit contact forms
  - Only the admin email can view submissions

### Environment-Based Admin Access

The RLS policies use the `ADMIN_EMAIL` environment variable, so you can easily change the admin email without modifying the database schema.

## Troubleshooting

### Common Issues

1. **RLS Policy Errors**: 
   - Ensure your `ADMIN_EMAIL` matches exactly in both Clerk and environment variables
   - Check that the `set_config` function was created properly

2. **Connection Issues**:
   - Verify your Supabase URL and API key are correct
   - Ensure the project is not paused (free tier limitation)

3. **Schema Errors**:
   - Make sure you copied the entire schema.sql file
   - Check for any SQL syntax errors in the Supabase logs

### Fallback Behavior

The application is designed to gracefully fall back to localStorage if Supabase is unavailable:

- Blog posts will use localStorage for persistence
- Contact forms will use in-memory storage
- No functionality is lost during development

## Production Considerations

### Scaling

For production use, consider:

1. **Database Backups**: Enable automatic backups in Supabase
2. **Performance Monitoring**: Use Supabase's built-in analytics
3. **Rate Limiting**: Implement rate limiting for contact forms
4. **Data Validation**: Add database-level constraints as needed

### Security

1. **Environment Variables**: Never commit sensitive credentials
2. **RLS Policies**: Regularly audit your security policies
3. **API Keys**: Rotate keys periodically for production

## Database Schema Overview

```sql
-- Blog Posts Table
blog_posts (
  id UUID PRIMARY KEY,
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
)

-- Contact Submissions Table
contact_submissions (
  id UUID PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  user_agent TEXT,
  ip_address INET,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
)
```

## Next Steps

After setting up the database:

1. **Data Migration**: If you have existing blog posts, you can insert them manually or create a migration script
2. **Admin Panel**: Use `/blog/admin` to manage your blog posts
3. **Monitoring**: Set up alerts in Supabase for database performance
4. **Backup Strategy**: Configure regular backups for your data

For any issues, check the Supabase documentation or the application logs for detailed error messages.
