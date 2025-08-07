import { supabase, setAdminEmailForRLS } from '../client'
import type { 
  ContactSubmission, 
  ContactSubmissionInsert,
  ContactSubmissionId
} from '../types'

// Error types for better error handling
export class ContactSubmissionError extends Error {
  constructor(message: string, public cause?: unknown) {
    super(message)
    this.name = 'ContactSubmissionError'
  }
}

// Ensure admin email is set for RLS before admin operations
const ensureAdminAccess = async () => {
  await setAdminEmailForRLS()
}

// Interface for contact form data (legacy compatibility)
export interface ContactFormData {
  name: string
  email: string
  message: string
}

export interface ContactSubmissionWithTimestamp extends ContactFormData {
  id: string
  timestamp: string
  userAgent?: string
}

export const createContactSubmission = async (
  formData: ContactFormData,
  userAgent?: string,
  ipAddress?: string
): Promise<ContactSubmission> => {
  try {
    const insertData: ContactSubmissionInsert = {
      name: formData.name,
      email: formData.email,
      message: formData.message,
      user_agent: userAgent || null,
      ip_address: ipAddress || null,
    }

    const { data, error } = await supabase
      .from('contact_submissions')
      .insert(insertData)
      .select()
      .single()

    if (error) {
      throw new ContactSubmissionError('Failed to create contact submission', error)
    }

    return data
  } catch (error) {
    console.error('Error creating contact submission:', error)
    throw new ContactSubmissionError('Failed to submit contact form', error)
  }
}

export const getAllContactSubmissions = async (): Promise<ContactSubmissionWithTimestamp[]> => {
  try {
    await ensureAdminAccess()
    
    const { data, error } = await supabase
      .from('contact_submissions')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      throw new ContactSubmissionError('Failed to fetch contact submissions', error)
    }

    // Transform to legacy format for compatibility
    return data.map(submission => ({
      id: submission.id,
      name: submission.name,
      email: submission.email,
      message: submission.message,
      timestamp: submission.created_at,
      userAgent: submission.user_agent || undefined,
    }))
  } catch (error) {
    console.error('Error fetching contact submissions:', error)
    throw new ContactSubmissionError('Failed to load contact submissions', error)
  }
}

export const getContactSubmissionById = async (id: ContactSubmissionId): Promise<ContactSubmission | null> => {
  try {
    await ensureAdminAccess()
    
    const { data, error } = await supabase
      .from('contact_submissions')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        return null // No rows returned
      }
      throw new ContactSubmissionError('Failed to fetch contact submission by ID', error)
    }

    return data
  } catch (error) {
    console.error('Error fetching contact submission by ID:', error)
    throw new ContactSubmissionError('Failed to load contact submission', error)
  }
}

export const getRecentContactSubmissions = async (limit: number = 10): Promise<ContactSubmissionWithTimestamp[]> => {
  try {
    await ensureAdminAccess()
    
    const { data, error } = await supabase
      .from('contact_submissions')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit)

    if (error) {
      throw new ContactSubmissionError('Failed to fetch recent contact submissions', error)
    }

    // Transform to legacy format for compatibility
    return data.map(submission => ({
      id: submission.id,
      name: submission.name,
      email: submission.email,
      message: submission.message,
      timestamp: submission.created_at,
      userAgent: submission.user_agent || undefined,
    }))
  } catch (error) {
    console.error('Error fetching recent contact submissions:', error)
    throw new ContactSubmissionError('Failed to load recent contact submissions', error)
  }
}

export const deleteContactSubmission = async (id: string): Promise<boolean> => {
  try {
    await ensureAdminAccess()
    
    const { error } = await supabase
      .from('contact_submissions')
      .delete()
      .eq('id', id)

    if (error) {
      throw new ContactSubmissionError('Failed to delete contact submission', error)
    }

    return true
  } catch (error) {
    console.error('Error deleting contact submission:', error)
    throw new ContactSubmissionError('Failed to delete contact submission', error)
  }
}

export const getContactSubmissionStats = async (): Promise<{
  total: number
  thisMonth: number
  thisWeek: number
}> => {
  try {
    await ensureAdminAccess()
    
    const now = new Date()
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).toISOString()
    const weekStart = new Date(now.setDate(now.getDate() - now.getDay())).toISOString()

    // Get total count
    const { count: total, error: totalError } = await supabase
      .from('contact_submissions')
      .select('*', { count: 'exact', head: true })

    if (totalError) {
      throw new ContactSubmissionError('Failed to get total count', totalError)
    }

    // Get this month count
    const { count: thisMonth, error: monthError } = await supabase
      .from('contact_submissions')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', monthStart)

    if (monthError) {
      throw new ContactSubmissionError('Failed to get month count', monthError)
    }

    // Get this week count
    const { count: thisWeek, error: weekError } = await supabase
      .from('contact_submissions')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', weekStart)

    if (weekError) {
      throw new ContactSubmissionError('Failed to get week count', weekError)
    }

    return {
      total: total || 0,
      thisMonth: thisMonth || 0,
      thisWeek: thisWeek || 0,
    }
  } catch (error) {
    console.error('Error fetching contact submission stats:', error)
    throw new ContactSubmissionError('Failed to load contact submission statistics', error)
  }
}
