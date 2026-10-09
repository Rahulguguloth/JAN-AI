import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
export const publicAnonKey = supabaseAnonKey;
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';

// Mock apiFetch for now until it's also replaced, or replace it if it's meant to call real Supabase edge functions
export const apiFetch = async (endpoint: string, options?: RequestInit) => {
  // If you are using Supabase Edge Functions:
  // const { data, error } = await supabase.functions.invoke(endpoint, { body: options?.body });
  console.warn("Using apiFetch fallback. Implement edge function invocation here if needed.");
  return fetch(endpoint, options);
};
