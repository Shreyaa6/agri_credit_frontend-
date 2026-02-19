import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://wfhjhclkjttaquzdbibx.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndmaGpoY2xranR0YXF1emRiaWJ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE0ODczNjQsImV4cCI6MjA4NzA2MzM2NH0.MXycsgibB2KDkQg5ns2vHrpttYgL4hyGZcX0RMzPxnA';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
