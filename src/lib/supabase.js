import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  // Soft warning during dev; keeps build working but reminds user to set envs
  console.warn('Supabase: VITE_SUPABASE_URL et/ou VITE_SUPABASE_ANON_KEY manquants. Configurez votre .env.local')
}

export const supabase = createClient(supabaseUrl || '', supabaseAnonKey || '')
