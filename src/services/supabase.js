import { createClient } from '@supabase/supabase-js';
export const supabaseUrl = 'https://wuurkebuthemtrftoedw.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind1dXJrZWJ1dGhlbXRyZnRvZWR3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTA5NTg2NTAsImV4cCI6MjAyNjUzNDY1MH0.OpAEqlJFIFTPU3Al_Nr5IZpYfo_iC0iDeGHBA26BlYY';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
