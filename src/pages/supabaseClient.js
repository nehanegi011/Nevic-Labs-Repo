import { createClient } from '@supabase/supabase-js';

// These come from Vite's env handling — see the .env.example note below.
// Never put the SERVICE ROLE key here; only the anon/public key belongs
// in client-side code.
console.log('Supabase URL:', import.meta.env.VITE_SUPABASE_URL);
console.log('Supabase key present:', !!import.meta.env.VITE_SUPABASE_ANON_KEY);
console.log('Supabase key length:', import.meta.env.VITE_SUPABASE_ANON_KEY?.length);
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
