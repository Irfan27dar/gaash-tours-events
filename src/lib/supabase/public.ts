import { createClient } from "@supabase/supabase-js";
import { SUPABASE_ANON_KEY, SUPABASE_URL } from "./config";

/**
 * Anon, session-less Supabase client for reading PUBLIC content
 * (RLS "public read published"). No cookies → pages stay statically
 * optimizable / ISR-friendly.
 */
export function createSupabasePublicClient() {
  return createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
