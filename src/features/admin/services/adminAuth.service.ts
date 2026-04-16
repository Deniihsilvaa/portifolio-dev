import type { AuthChangeEvent, Session } from "@supabase/supabase-js";
import { supabaseClient } from "@/lib/supabaseClient";

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
