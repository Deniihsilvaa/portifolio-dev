import type { Project } from "@/features/projects/types/project";

export function mapProject(dbProject: any): Project {
  if (!dbProject) {
    return {} as Project;
  }

  // Handle project_technologies -> stack mapping
  const techNames = Array.isArray(dbProject.project_technologies)
    ? dbProject.project_technologies
        .map((pt: any) => pt.technologies?.name)
        .filter(Boolean)
    : [];

  // Handle project_media -> gallery mapping
  // Sort by display_order ascending
  const mediaItems = Array.isArray(dbProject.project_media)
    ? [...dbProject.project_media].sort(
        (a: any, b: any) => (a.display_order || 0) - (b.display_order || 0)
      )
    : [];

  const galleryUrls = mediaItems.map((media: any) => media.url).filter(Boolean);
  
  // Use first gallery image as cover, or a fallback if empty
  const coverImage = galleryUrls.length > 0 ? galleryUrls[0] : "";

  return {
    id: dbProject.id || "",
    slug: dbProject.slug || "",
    title: dbProject.title || "",
    subtitle: dbProject.short_description || "",
    summary: dbProject.description || "",
    category: "Project", // generic category as no DB field exists
    stack: techNames,
    coverImage,
    gallery: galleryUrls,
    githubUrl: dbProject.github_url || "",
    liveUrl: dbProject.demo_url || undefined,
    readme: dbProject.readme || "",
  };
}

export function mapProjects(dbProjects: any[]): Project[] {
  if (!Array.isArray(dbProjects)) {
    return [];
  }
  return dbProjects.map(mapProject);
}
