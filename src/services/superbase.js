import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://nvrcfnsigdhpnlthonys.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im52cmNmbnNpZ2RocG5sdGhvbnlzIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTg4NjY5MTksImV4cCI6MjAxNDQ0MjkxOX0.RUGR6KpC3Da8zT2ETasQgTwF8073R2pGImuYSI5VhtM";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
