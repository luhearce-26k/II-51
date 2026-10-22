import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const supabaseUrl = "https://qiahvzrskvekpprshwfq.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFpYWh2enJza3Zla3BwcnNod2ZxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTI2Mjk3MTMsImV4cCI6MjEwODIwNTcxM30.pqkF9qufNmWUtQ6MuaXcyEJaL3cRpkcpmNkyO3roW4U";

export const supabase = createClient(supabaseUrl, supabaseKey);