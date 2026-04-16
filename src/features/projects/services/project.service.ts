import { supabaseClient } from "@/lib/supabaseClient";
import type { Project } from "@/features/projects/types/project";
import { mapProject, mapProjects } from "@/mappers/project.mapper";

const PROJECT_SELECT_QUERY = `
  *,
  project_media (
    id,
    type,
    url,
    display_order
  ),
  project_technologies (
    technologies (
      id,
      name,
      icon_url
    )
  )
`;

export async function getProjects(): Promise<Project[]> {
  if (!supabaseClient) {
    return [];
  }

  const { data, error } = await supabaseClient
    .from("projects")
    .select(PROJECT_SELECT_QUERY)
    .order("created_at", { ascending: false });

  if (error || !data) {
    return [];
  }

  return mapProjects(data);
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  if (!supabaseClient) {
    return null;
  }

  const { data, error } = await supabaseClient
    .from("projects")
    .select(PROJECT_SELECT_QUERY)
    .eq("slug", slug)
    .limit(1)
    .maybeSingle();

  if (error || !data) {
    return null;
  }

  return mapProject(data);
}
