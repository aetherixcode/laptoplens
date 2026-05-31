import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);

export async function fetchLaptops(): Promise<any[]> {
  const { data, error } = await supabase.from("laptops").select("*");
  if (error) {
    console.error("Supabase fetch error:", error);
    return [];
  }
  return data || [];
}
