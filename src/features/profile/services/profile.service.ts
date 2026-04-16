import { supabaseClient } from "@/lib/supabaseClient";
import type { Profile } from "@/features/profile/types/profile";
import { mapProfile } from "@/mappers/profile.mapper";

export async function getProfile(): Promise<Profile> {
  if (!supabaseClient) {
    return mapProfile(null);
  }

  const { data, error } = await supabaseClient
    .from("profiles")
    .select("*")
    .limit(1)
    .maybeSingle();

  if (error || !data) {
    return mapProfile(null);
  }

  return mapProfile(data);
}
