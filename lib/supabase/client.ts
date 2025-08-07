
import { createClient } from '@supabase/supabase-js'
import type { Database } from './types'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_API_KEY!

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient<Database>(supabaseUrl, supabaseKey, {
  global: {
    headers: {
      'X-Admin-Email': process.env.ADMIN_EMAIL || 'amjaddevelopment8@gmail.com'
    }
  }
})

export const supabaseAdmin = createClient<Database>(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  },
  global: {
    headers: {
      'X-Admin-Email': process.env.ADMIN_EMAIL || 'amjaddevelopment8@gmail.com'
    }
  }
})

// Function to set admin email for RLS policies
export const setAdminEmailForRLS = async (email?: string) => {
  const adminEmail = email || process.env.ADMIN_EMAIL || 'amjaddevelopment8@gmail.com'
  
  try {
    await supabase.rpc('set_config', {
      setting_name: 'app.admin_email',
      setting_value: adminEmail,
      is_local: true
    })
  } catch (error) {
    console.warn('Failed to set admin email for RLS:', error)
  }
}