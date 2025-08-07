// Database operations aggregator
// This provides a centralized export for all database operations

export * from './blog-posts'
export * from './contacts'

// Re-export types for convenience
export type {
  Database,
  BlogPost,
  BlogPostInsert,
  BlogPostUpdate,
  ContactSubmission,
  ContactSubmissionInsert,
  ContactSubmissionUpdate,
  BlogPostId,
  ContactSubmissionId,
} from '../types'

// Re-export clients for advanced use cases
export { supabase, supabaseAdmin } from '../client'
