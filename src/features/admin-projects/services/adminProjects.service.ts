import { supabaseClient } from "@/lib/supabaseClient";
import type {
  AdminProject,
  AdminProjectInput,
} from "@/features/admin-projects/types/project.types";

function assertSupabaseClient() {
  if (!supabaseClient) {
    throw new Error("Supabase client is not configured.");
  }

  return supabaseClient;
}

export async function getProjects(): Promise<AdminProject[]> {
  const client = assertSupabaseClient();
  const { data, error } = await client
    .from("projects")
    .select(
      "id, title, slug, short_description, description, github_url, demo_url, featured, status",
    )
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []) as AdminProject[];
}

export async function getProjectById(id: string): Promise<AdminProject | null> {
  const client = assertSupabaseClient();
  const { data, error } = await client
    .from("projects")
    .select(
      "id, title, slug, short_description, description, github_url, demo_url, featured, status",
    )
    .eq("id", id)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data as AdminProject;
}

export async function createProject(data: AdminProjectInput): Promise<AdminProject> {
  const client = assertSupabaseClient();
  const { data: created, error } = await client
    .from("projects")
    .insert(data)
    .select(
      "id, title, slug, short_description, description, github_url, demo_url, featured, status",
    )
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return created as AdminProject;
}

export async function updateProject(
  id: string,
  data: AdminProjectInput,
): Promise<AdminProject> {
  const client = assertSupabaseClient();
  const { data: updated, error } = await client
    .from("projects")
    .update(data)
    .eq("id", id)
    .select(
      "id, title, slug, short_description, description, github_url, demo_url, featured, status",
    )
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return updated as AdminProject;
}
