
import { createClient } from '@supabase/supabase-js'
import type { Database } from './types'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const adminEmail = process.env.ADMIN_EMAIL

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Missing Supabase environment variables - database operations will fall back to localStorage')
}

// Only create client if environment variables are available
export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient<Database>(supabaseUrl, supabaseAnonKey, {
      global: {
        headers: adminEmail ? {
          'X-Admin-Email': adminEmail
        } : {}
      }
    })
  : null

// Function to set admin email for RLS policies
export const setAdminEmailForRLS = async (email?: string) => {
  if (!supabase) {
    console.warn('Supabase client not available - skipping RLS configuration')
    return
  }
  
  const targetEmail = email || adminEmail
  if (!targetEmail) {
    console.warn('No admin email available for RLS configuration')
    return
  }
  
  try {
    await supabase.rpc('set_config', {
      setting_name: 'app.admin_email',
      setting_value: targetEmail,
      is_local: true
    })
  } catch (error) {
    console.warn('Failed to set admin email for RLS:', error)
  }
}