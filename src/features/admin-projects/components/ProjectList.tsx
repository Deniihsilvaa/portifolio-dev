import { Link } from "react-router-dom";
import { ProjectRow } from "@/features/admin-projects/components/ProjectRow";
import type { AdminProject } from "@/features/admin-projects/types/project.types";

type ProjectListProps = {
  projects: AdminProject[];
  isLoading: boolean;
  error: string | null;
};

export function ProjectList({ projects, isLoading, error }: ProjectListProps) {
  return (
    <section className="surface-card w-full rounded-[2rem] p-8 shadow-card">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-2">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-coral">
            Admin Projects
          </p>
          <h1 className="font-display text-4xl font-extrabold tracking-tight text-on-card">
            Project management
          </h1>
        </div>

        <Link
          to="/admin/projects/new"
          className="inline-flex items-center justify-center rounded-full bg-[var(--color-text-dark)] px-5 py-3 text-sm font-semibold text-[var(--color-card-strong)] transition hover:-translate-y-0.5 hover:bg-black"
        >
          Create New Project
        </Link>
      </div>

      <div className="mb-4 hidden grid-cols-[1.6fr_0.7fr_0.7fr_auto] gap-4 px-1 text-xs font-semibold uppercase tracking-[0.18em] text-muted-on-card md:grid">
        <span>Project</span>
        <span>Status</span>
        <span>Featured</span>
        <span className="text-right">Actions</span>
      </div>

      {isLoading ? <div className="text-muted-on-card">Loading projects...</div> : null}
      {error ? <div className="rounded-2xl bg-[rgba(239,108,87,0.12)] px-4 py-3 text-sm text-on-card">{error}</div> : null}
      {!isLoading && !error ? (
        <div className="space-y-4">
          {projects.length > 0 ? (
            projects.map((project) => <ProjectRow key={project.id} project={project} />)
          ) : (
            <div className="rounded-[1.5rem] border border-dashed hairline-card p-8 text-center text-muted-on-card">
              No projects found.
            </div>
          )}
        </div>
      ) : null}
    </section>
  );
}
