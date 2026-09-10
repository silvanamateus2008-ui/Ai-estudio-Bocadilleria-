import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL =
  import.meta.env.VITE_SUPABASE_URL ?? 'https://kkcxhmwflgqgmmlbrijp.supabase.co';

const SUPABASE_ANON_KEY =
  import.meta.env.VITE_SUPABASE_ANON_KEY ??
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtrY3hobXdmbGdxZ21tbGJyaWpwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg5ODUxMjMsImV4cCI6MjEwNDU2MTEyM30.edBfuU9RCkL0AMk67WVFCi9O1Z6ncc6a5pNCweCq1zs';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);