import type { BlogPost } from "@/data"
import { 
  getAllBlogPosts,
  getBlogPostBySlug as getBlogPostBySlugDB,
  getRecentBlogPosts,
} from "@/lib/supabase/queries/blog-posts"

// Fallback to localStorage if Supabase is unavailable
import { 
  loadBlogPosts as loadFromStorage,
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
