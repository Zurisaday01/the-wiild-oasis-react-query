import { createClient } from '@supabase/supabase-js';

export const supabaseUrl = 'https://nuubciekzuwwwrqcotzo.supabase.co';
const supabaseKey =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im51dWJjaWVrenV3d3dycWNvdHpvIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODc2ODg1MzEsImV4cCI6MjAwMzI2NDUzMX0.1fdU8mxe0of7Mekw7Xiu4Uzu3JnHRJ3WIsllIkphr_E';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
