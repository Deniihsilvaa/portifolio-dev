import { supabaseClient } from "@/lib/supabaseClient";
import type {
  AdminProjectPayload,
  AdminProjectRecord,
} from "@/features/admin-project-media/types/project.types";

function assertSupabaseClient() {
  if (!supabaseClient) {
    throw new Error("Supabase client is not configured.");
  }

  return supabaseClient;
}

const projectColumns =
  "id, title, slug, short_description, description, github_url, demo_url, featured, status";

function mapProjectErrorMessage(message: string) {
  if (message.toLowerCase().includes("row-level security")) {
    return "Supabase blocked the write to projects. Create RLS policies that allow authenticated admin users to insert and update rows in the projects table.";
  }

  return message;
}

export async function createProject(
  data: AdminProjectPayload,
): Promise<AdminProjectRecord> {
  const client = assertSupabaseClient();
  const { data: created, error } = await client
    .from("projects")
    .insert(data)
    .select(projectColumns)
    .single();

  if (error) {
    throw new Error(mapProjectErrorMessage(error.message));
  }

  return created as AdminProjectRecord;
}

export async function updateProject(
  id: string,
  data: AdminProjectPayload,
): Promise<AdminProjectRecord> {
  const client = assertSupabaseClient();
  const { data: updated, error } = await client
    .from("projects")
    .update(data)
    .eq("id", id)
    .select(projectColumns)
    .single();

  if (error) {
    throw new Error(mapProjectErrorMessage(error.message));
  }

  return updated as AdminProjectRecord;
}

export async function getProjectById(id: string): Promise<AdminProjectRecord | null> {
  const client = assertSupabaseClient();
  const { data, error } = await client
    .from("projects")
    .select(projectColumns)
    .eq("id", id)
    .single();

  if (error) {
    throw new Error(mapProjectErrorMessage(error.message));
  }

  return data as AdminProjectRecord;
}
