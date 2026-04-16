import { useParams } from "react-router-dom";
import { ProjectDetailsView } from "@/features/projects/components/ProjectDetailsView";
import { useProjectDetails } from "@/features/projects/hooks/useProjectDetails";

export function ProjectDetailsPage() {
  const { slug = "" } = useParams();
  const { project, isLoading, error } = useProjectDetails(slug);

  return (
    <ProjectDetailsView
      project={project}
      isLoading={isLoading}
      error={error}
    />
  );
}
