
import { createClient } from '@supabase/supabase-js';
import { Database } from '../types/database.types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://gquwbmdxvsxkxpauabuw.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdxdXdibWR4dnN4a3hwYXVhYnV3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcyMDA3NzYsImV4cCI6MjA2Mjc3Njc3Nn0.UHFjk0eqHcCWkbvRceFVu85WaTSax6tCNlmIMoS9lvk';

// Create the Supabase client with explicit auth configuration
export const supabase = createClient<Database>(supabaseUrl, supabaseKey, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});

// Export default for backwards compatibility
export default supabase;
