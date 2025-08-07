import { supabase, supabaseAdmin } from './client'
import type { BlogPost, BlogPostInsert, BlogPostUpdate } from './types'

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .order('published_at', { ascending: false })

  if (error) {
    console.error('Error fetching blog posts:', error)
    return []
  }

  return data || []
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error) {
    console.error('Error fetching blog post:', error)
    return null
  }

  return data
}

export async function getFeaturedBlogPosts(): Promise<BlogPost[]> {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('featured', true)
    .order('published_at', { ascending: false })
    .limit(3)

  if (error) {
    console.error('Error fetching featured posts:', error)
    return []
  }

  return data || []
}

export async function getBlogPostsByCategory(category: string): Promise<BlogPost[]> {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('category', category)
    .order('published_at', { ascending: false })

  if (error) {
    console.error('Error fetching posts by category:', error)
    return []
  }

  return data || []
}

// Admin operations (require authentication)
export async function createBlogPost(post: BlogPostInsert): Promise<BlogPost | null> {
  const { data, error } = await supabaseAdmin
    .from('blog_posts')
    .insert(post)
    .select()
    .single()

  if (error) {
    console.error('Error creating blog post:', error)
    return null
  }

  return data
}

export async function updateBlogPost(id: string, updates: BlogPostUpdate): Promise<BlogPost | null> {
  const { data, error } = await supabaseAdmin
    .from('blog_posts')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error('Error updating blog post:', error)
    return null
  }

  return data
}

export async function deleteBlogPost(id: string): Promise<boolean> {
  const { error } = await supabaseAdmin
    .from('blog_posts')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Error deleting blog post:', error)
    return false
  }

  return true
}

export async function generateSlug(title: string): Promise<string> {
  const baseSlug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '')

  // Check if slug exists and make it unique
  const { data } = await supabase
    .from('blog_posts')
    .select('slug')
    .like('slug', `${baseSlug}%`)

  if (!data || data.length === 0) {
    return baseSlug
  }

  // If slug exists, append a number
  const existingSlugs = data.map(post => post.slug)
  let counter = 1
  let newSlug = baseSlug

  while (existingSlugs.includes(newSlug)) {
    newSlug = `${baseSlug}-${counter}`
    counter++
  }

  return newSlug
}