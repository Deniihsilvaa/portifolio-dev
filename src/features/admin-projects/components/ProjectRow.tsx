import { Link } from "react-router-dom";
import type { AdminProject } from "@/features/admin-projects/types/project.types";

type ProjectRowProps = {
  project: AdminProject;
};

export function ProjectRow({ project }: ProjectRowProps) {
  return (
    <div className="grid gap-4 rounded-[1.5rem] border hairline-card bg-[rgba(17,24,39,0.03)] p-5 md:grid-cols-[1.6fr_0.7fr_0.7fr_auto] md:items-center">
      <div>
        <p className="font-semibold text-on-card">{project.title}</p>
        <p className="text-sm text-muted-on-card">{project.slug}</p>
      </div>
      <div>
        <span className="inline-flex rounded-full bg-[rgba(17,24,39,0.08)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-on-card">
          {project.status}
        </span>
      </div>
      <div className="text-sm font-medium text-muted-on-card">
        {project.featured ? "Featured" : "Standard"}
      </div>
      <div className="flex justify-start md:justify-end">
        <Link
          to={`/admin/projects/edit/${project.id}`}
          className="rounded-full border hairline-card px-4 py-2 text-sm font-semibold text-on-card transition hover:-translate-y-0.5"
        >
          Edit
        </Link>
      </div>
    </div>
  );
}
