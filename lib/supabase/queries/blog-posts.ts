import { supabase, setAdminEmailForRLS } from '../client'
import type { 
  BlogPost, 
  BlogPostInsert, 
  BlogPostUpdate,
  BlogPostId
} from '../types'
import type { BlogPost as LegacyBlogPost } from '@/data'

// Error types for better error handling
export class BlogPostError extends Error {
  constructor(message: string, public cause?: unknown) {
    super(message)
    this.name = 'BlogPostError'
  }
}

// Ensure admin email is set for RLS before admin operations
const ensureAdminAccess = async () => {
  await setAdminEmailForRLS()
}

// Transform Supabase blog post to legacy format for compatibility
const transformToLegacyBlogPost = (post: BlogPost): LegacyBlogPost => ({
  id: post.id,
  title: post.title,
  slug: post.slug,
  excerpt: post.excerpt,
  content: post.content,
  author: post.author,
  publishedAt: post.published_at,
  updatedAt: post.updated_at,
  category: post.category,
  tags: post.tags,
  readTime: post.read_time,
  featured: post.featured,
  imageUrl: post.image_url,
})

// Transform legacy blog post to Supabase format
const transformFromLegacyBlogPost = (post: Omit<LegacyBlogPost, 'id'>): BlogPostInsert => ({
  title: post.title,
  slug: post.slug,
  excerpt: post.excerpt,
  content: post.content,
  author: post.author,
  published_at: post.publishedAt,
  updated_at: post.updatedAt,
  category: post.category,
  tags: post.tags,
  read_time: post.readTime,
  featured: post.featured,
  image_url: post.imageUrl,
})

export const getAllBlogPosts = async (): Promise<LegacyBlogPost[]> => {
  try {
    if (!supabase) {
      throw new BlogPostError('Database not available - using localStorage fallback')
    }

    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .order('published_at', { ascending: false })

    if (error) {
      throw new BlogPostError('Failed to fetch blog posts', error)
    }

    return data.map(transformToLegacyBlogPost)
  } catch (error) {
    console.error('Error fetching blog posts:', error)
    throw new BlogPostError('Failed to load blog posts', error)
  }
}

export const getBlogPostBySlug = async (slug: string): Promise<LegacyBlogPost | null> => {
  try {
    if (!supabase) {
      throw new BlogPostError('Database not available - using localStorage fallback')
    }

    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        return null // No rows returned
      }
      throw new BlogPostError('Failed to fetch blog post by slug', error)
    }

    return transformToLegacyBlogPost(data)
  } catch (error) {
    console.error('Error fetching blog post by slug:', error)
    throw new BlogPostError('Failed to load blog post', error)
  }
}

export const getBlogPostById = async (id: BlogPostId): Promise<LegacyBlogPost | null> => {
  try {
    if (!supabase) {
      throw new BlogPostError('Database not available - using localStorage fallback')
    }

    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        return null // No rows returned
      }
      throw new BlogPostError('Failed to fetch blog post by ID', error)
    }

    return transformToLegacyBlogPost(data)
  } catch (error) {
    console.error('Error fetching blog post by ID:', error)
    throw new BlogPostError('Failed to load blog post', error)
  }
}

export const createBlogPost = async (post: Omit<LegacyBlogPost, 'id'>): Promise<LegacyBlogPost> => {
  try {
    if (!supabase) {
      throw new BlogPostError('Database not available - using localStorage fallback')
    }
    
    await ensureAdminAccess()
    
    const insertData = transformFromLegacyBlogPost(post)
    
    const { data, error } = await supabase
      .from('blog_posts')
      .insert(insertData)
      .select()
      .single()

    if (error) {
      throw new BlogPostError('Failed to create blog post', error)
    }

    return transformToLegacyBlogPost(data)
  } catch (error) {
    console.error('Error creating blog post:', error)
    throw new BlogPostError('Failed to create blog post', error)
  }
}

export const updateBlogPost = async (
  id: string, 
  updates: Partial<Omit<LegacyBlogPost, 'id'>>
): Promise<LegacyBlogPost | null> => {
  try {
    if (!supabase) {
      throw new BlogPostError('Database not available - using localStorage fallback')
    }
    
    await ensureAdminAccess()
    
    const updateData: BlogPostUpdate = {}
    
    // Map legacy fields to database fields
    if (updates.title !== undefined) updateData.title = updates.title
    if (updates.slug !== undefined) updateData.slug = updates.slug
    if (updates.excerpt !== undefined) updateData.excerpt = updates.excerpt
    if (updates.content !== undefined) updateData.content = updates.content
    if (updates.author !== undefined) updateData.author = updates.author
    if (updates.publishedAt !== undefined) updateData.published_at = updates.publishedAt
    if (updates.updatedAt !== undefined) updateData.updated_at = updates.updatedAt
    if (updates.category !== undefined) updateData.category = updates.category
    if (updates.tags !== undefined) updateData.tags = updates.tags
    if (updates.readTime !== undefined) updateData.read_time = updates.readTime
    if (updates.featured !== undefined) updateData.featured = updates.featured
    if (updates.imageUrl !== undefined) updateData.image_url = updates.imageUrl

    const { data, error } = await supabase
      .from('blog_posts')
      .update(updateData)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        return null // No rows returned
      }
      throw new BlogPostError('Failed to update blog post', error)
    }

    return transformToLegacyBlogPost(data)
  } catch (error) {
    console.error('Error updating blog post:', error)
    throw new BlogPostError('Failed to update blog post', error)
  }
}

export const deleteBlogPost = async (id: string): Promise<boolean> => {
  try {
    if (!supabase) {
      throw new BlogPostError('Database not available - using localStorage fallback')
    }
    
    await ensureAdminAccess()
    
    const { error } = await supabase
      .from('blog_posts')
      .delete()
      .eq('id', id)

    if (error) {
      throw new BlogPostError('Failed to delete blog post', error)
    }

    return true
  } catch (error) {
    console.error('Error deleting blog post:', error)
    throw new BlogPostError('Failed to delete blog post', error)
  }
}

export const getFeaturedBlogPosts = async (): Promise<LegacyBlogPost[]> => {
  try {
    if (!supabase) {
      throw new BlogPostError('Database not available - using localStorage fallback')
    }

    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('featured', true)
      .order('published_at', { ascending: false })

    if (error) {
      throw new BlogPostError('Failed to fetch featured blog posts', error)
    }

    return data.map(transformToLegacyBlogPost)
  } catch (error) {
    console.error('Error fetching featured blog posts:', error)
    throw new BlogPostError('Failed to load featured blog posts', error)
  }
}

export const getBlogPostsByCategory = async (category: string): Promise<LegacyBlogPost[]> => {
  try {
    if (!supabase) {
      throw new BlogPostError('Database not available - using localStorage fallback')
    }

    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('category', category)
      .order('published_at', { ascending: false })

    if (error) {
      throw new BlogPostError('Failed to fetch blog posts by category', error)
    }

    return data.map(transformToLegacyBlogPost)
  } catch (error) {
    console.error('Error fetching blog posts by category:', error)
    throw new BlogPostError('Failed to load blog posts by category', error)
  }
}

export const getRecentBlogPosts = async (limit: number = 5): Promise<LegacyBlogPost[]> => {
  try {
    if (!supabase) {
      throw new BlogPostError('Database not available - using localStorage fallback')
    }

    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .order('published_at', { ascending: false })
      .limit(limit)

    if (error) {
      throw new BlogPostError('Failed to fetch recent blog posts', error)
    }

    return data.map(transformToLegacyBlogPost)
  } catch (error) {
    console.error('Error fetching recent blog posts:', error)
    throw new BlogPostError('Failed to load recent blog posts', error)
  }
}
