import type { AuthChangeEvent, Session } from "@supabase/supabase-js";
import { supabaseClient } from "@/lib/supabaseClient";
import { mapProfile } from "@/mappers/profile.mapper";
import { ProfileEdit } from "@/features/profile/types/profile";

type AdminCredentials = {
  email: string;
  password: string;
};

function assertSupabaseClient() {
  if (!supabaseClient) {
    throw new Error("Supabase client is not configured.");
  }

  return supabaseClient;
}

export async function signInAdminWithPassword({
  email,
  password,
}: AdminCredentials): Promise<Session> {
  const client = assertSupabaseClient();
  const { data, error } = await client.auth.signInWithPassword({ email, password });

  if (error || !data.session) {
    throw new Error(error?.message ?? "Unable to sign in.");
  }

  return data.session;
}

export async function getAdminSession(): Promise<Session | null> {
  const client = assertSupabaseClient();
  const { data, error } = await client.auth.getSession();

  if (error) {
    throw new Error(error.message);
  }

  return data.session;
}

export async function signOutAdmin(): Promise<void> {
  const client = assertSupabaseClient();
  const { error } = await client.auth.signOut();

  if (error) {
    throw new Error(error.message);
  }
}

export function onAdminAuthStateChange(
  callback: (event: AuthChangeEvent, session: Session | null) => void,
) {
  const client = assertSupabaseClient();
  return client.auth.onAuthStateChange(callback);
}

export function isAdminAuthConfigured() {
  return Boolean(supabaseClient);
}

export async function editProfile(profile: ProfileEdit) {
  if (!supabaseClient) {
    return mapProfile(null);
  }

  const ID_USER = import.meta.env.VITE_USER_ID;
  console.log("ID_USER", ID_USER);
  const { data, error } = await supabaseClient
    .from("profiles")
    .update(profile)
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
