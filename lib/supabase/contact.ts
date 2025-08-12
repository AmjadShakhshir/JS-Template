import { supabase } from './client'
import type { ContactSubmission, ContactSubmissionInsert } from './types'

export async function createContactSubmission(submission: ContactSubmissionInsert): Promise<ContactSubmission | null> {
  if (!supabase) {
    console.error('Supabase client not available')
    return null
  }

  const { data, error } = await supabase
    .from('contact_submissions')
    .insert(submission)
    .select()
    .single()

  if (error) {
    console.error('Error creating contact submission:', error)
    return null
  }

  return data
}

export async function getAllContactSubmissions(): Promise<ContactSubmission[]> {
  if (!supabase) {
    console.error('Supabase admin client not available')
    return []
  }

  const { data, error } = await supabase
    .from('contact_submissions')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching contact submissions:', error)
    return []
  }

  return data || []
}