import { createClient } from '@supabase/supabase-js';

// ==================== YOUR SUPABASE CREDENTIALS ====================
// Replace these with your actual values from Supabase Dashboard

const supabaseUrl = 'https://ildmakvnnqzlboxmtxxf.supabase.co';     // ← Change this
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlsZG1ha3ZubnF6bGJveG10eHhmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYzNDExMjcsImV4cCI6MjA5MTkxNzEyN30.2JLAt6-A_7cW94G1Gdqdx6FdxBjGKqjhuKUZVFanHHc';            // ← Change this

// ================================================================

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Optional: Helper to get current user (used in many components)
export const getCurrentUser = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
};