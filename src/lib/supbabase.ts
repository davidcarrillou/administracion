import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "supabase" as string
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "key" as string

// Verificar si las variables están configuradas
if (supabaseUrl === "supabase" || supabaseAnonKey === "key") {
  console.warn("⚠️ Variables de entorno de Supabase no configuradas. Ve a Project Settings para configurarlas.")
}
export const supabase = createClient(supabaseUrl, supabaseAnonKey)