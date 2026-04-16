import { supabaseClient } from "@/lib/supabaseClient";
import type { Profile } from "@/features/profile/types/profile";
import { mapProfile } from "@/mappers/profile.mapper";

export async function getProfile(): Promise<Profile> {
  if (!supabaseClient) {
    return mapProfile(null);
  }

  const ID_USER = import.meta.env.VITE_USER_ID;
  console.log("ID_USER", ID_USER);
  const { data, error } = await supabaseClient
    .from("profiles")
    .select("*")
    .eq("id", `${ID_USER}`)
    .limit(1)
    .maybeSingle();

  console.log(`consulta profile usando: ${ID_USER}`, data);
  if (error || !data) {
    console.log("Dados do profile", error);
    return mapProfile(null);
  }
  return mapProfile(data);
}
