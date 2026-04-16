import { ProjectList } from "@/features/admin-projects/components/ProjectList";
import { useAdminProjects } from "@/features/admin-projects/hooks/useAdminProjects";

export function AdminProjectsPage() {
  const { projects, isLoading, error } = useAdminProjects();

  return <ProjectList projects={projects} isLoading={isLoading} error={error} />;
}
