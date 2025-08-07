export type Database = {
  public: {
    Tables: {
      blog_posts: {
        Row: {
          id: string
          title: string
          slug: string
          excerpt: string
          content: string
          author: string
          published_at: string
          updated_at: string
          category: string
          tags: string[]
          read_time: number
          featured: boolean
          image_url: string
          created_at: string
          updated_at_timestamp: string
        }
        Insert: {
          id?: string
          title: string
          slug: string
          excerpt: string
          content: string
          author?: string
          published_at: string
          updated_at: string
          category: string
          tags?: string[]
          read_time?: number
          featured?: boolean
          image_url: string
          created_at?: string
          updated_at_timestamp?: string
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          excerpt?: string
          content?: string
          author?: string
          published_at?: string
          updated_at?: string
          category?: string
          tags?: string[]
          read_time?: number
          featured?: boolean
          image_url?: string
          updated_at_timestamp?: string
        }
      }
      contact_submissions: {
        Row: {
          id: string
          name: string
          email: string
          message: string
          user_agent: string | null
          ip_address: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          message: string
          user_agent?: string | null
          ip_address?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          message?: string
          user_agent?: string | null
          ip_address?: string | null
          updated_at?: string
        }
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: Record<string, never>
  }
}

// Legacy types for compatibility with existing BlogPost interface
export type BlogPost = Database['public']['Tables']['blog_posts']['Row']
export type BlogPostInsert = Database['public']['Tables']['blog_posts']['Insert']
export type BlogPostUpdate = Database['public']['Tables']['blog_posts']['Update']

export type ContactSubmission = Database['public']['Tables']['contact_submissions']['Row']
export type ContactSubmissionInsert = Database['public']['Tables']['contact_submissions']['Insert']
export type ContactSubmissionUpdate = Database['public']['Tables']['contact_submissions']['Update']

// Branded types for better type safety (following C-5 from Claude.instructions.md)
export type BlogPostId = string & { readonly __brand: 'BlogPostId' }
export type ContactSubmissionId = string & { readonly __brand: 'ContactSubmissionId' }

// Helper functions for creating branded IDs
export const createBlogPostId = (id: string): BlogPostId => id as BlogPostId
export const createContactSubmissionId = (id: string): ContactSubmissionId => id as ContactSubmissionId