import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const supabaseUrl = "https://qiahvzrskvekpprshwfq.supabase.co";
const supabaseKey = "KEY";

export const supabase = createClient(supabaseUrl, supabaseKey);