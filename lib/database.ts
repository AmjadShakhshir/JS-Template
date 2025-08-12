import type { BlogPost } from "@/data"
import { 
  getAllBlogPosts,
  createBlogPost,
  updateBlogPost as updateBlogPostDB,
  deleteBlogPost as deleteBlogPostDB,
  getBlogPostBySlug as getBlogPostBySlugDB,
  getRecentBlogPosts,
} from "@/lib/supabase/queries/blog-posts"

// Fallback to localStorage if Supabase is unavailable
import { 
  loadBlogPosts as loadFromStorage,
  addBlogPost as addToStorage,
  updateBlogPost as updateInStorage,
  deleteBlogPost as deleteFromStorage,
  getBlogPostBySlug as getFromStorageBySlug,
  getRecentPosts as getRecentFromStorage,
} from "./blog-storage"

// Environment check for database availability
const isDatabaseAvailable = () => {
  // Check server-side env vars
  if (typeof window === 'undefined') {
    return !!(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
  }
  // Check client-side env vars
  return !!(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
}

// Enhanced error handling with fallback to localStorage
const withFallback = async <T>(
  databaseOperation: () => Promise<T>,
  fallbackOperation: () => T
): Promise<T> => {
  if (!isDatabaseAvailable()) {
    console.warn('Database not available, falling back to localStorage')
    return fallbackOperation()
  }

  try {
    return await databaseOperation()
  } catch (error) {
    console.error('Database operation failed, falling back to localStorage:', error)
    return fallbackOperation()
  }
}

export const loadBlogPosts = async (): Promise<BlogPost[]> => {
  return withFallback(
    () => getAllBlogPosts(),
    () => loadFromStorage()
  )
}

export const addBlogPost = async (post: Omit<BlogPost, 'id'>): Promise<BlogPost> => {
  return withFallback(
    () => createBlogPost(post),
    () => addToStorage(post)
  )
}

export const updateBlogPost = async (
  id: string, 
  updates: Partial<BlogPost>
): Promise<BlogPost | null> => {
  return withFallback(
    () => updateBlogPostDB(id, updates),
    () => updateInStorage(id, updates)
  )
}

export const deleteBlogPost = async (id: string): Promise<boolean> => {
  return withFallback(
    () => deleteBlogPostDB(id),
    () => deleteFromStorage(id)
  )
}

export const getBlogPostBySlug = async (slug: string): Promise<BlogPost | undefined> => {
  const result = await withFallback(
    async () => {
      const post = await getBlogPostBySlugDB(slug)
      return post || undefined
    },
    () => getFromStorageBySlug(slug)
  )
  return result
}

export const getRecentPosts = async (limit: number = 5): Promise<BlogPost[]> => {
  return withFallback(
    () => getRecentBlogPosts(limit),
    () => getRecentFromStorage(limit)
  )
}

// Legacy functions for backward compatibility
export {
  loadBlogPosts as loadBlogPostsFromStorage,
  addBlogPost as addBlogPostToStorage,
  updateBlogPost as updateBlogPostInStorage,
  deleteBlogPost as deleteBlogPostFromStorage,
} from "./blog-storage"
