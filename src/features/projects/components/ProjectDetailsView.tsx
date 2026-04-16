import { Link } from "react-router-dom";
import { ProjectCarousel } from "@/features/projects/components/ProjectCarousel";
import { ProjectHeader } from "@/features/projects/components/ProjectHeader";
import { ReadmeSection } from "@/features/projects/components/ReadmeSection";
import type { Project } from "@/features/projects/types/project";

type ProjectDetailsViewProps = {
  project: Project | null;
  isLoading: boolean;
  error: string | null;
};

export function ProjectDetailsView({
  project,
  isLoading,
  error,
}: ProjectDetailsViewProps) {
  if (isLoading) {
    return <section className="surface-card rounded-[2rem] p-8 shadow-card">Loading project details...</section>;
  }

  if (error || !project) {
    return (
      <section className="surface-card space-y-6 rounded-[2rem] p-8 shadow-card">
        <p>{error ?? "Project not found."}</p>
        <Link to="/" className="text-sm font-semibold text-teal">
          Back to home
        </Link>
      </section>
    );
  }

  return (
    <div className="space-y-8 py-8">
      <ProjectHeader project={project} />
      <ProjectCarousel title={project.title} images={project.gallery} />
      <ReadmeSection markdown={project.readme} />
    </div>
  );
}
