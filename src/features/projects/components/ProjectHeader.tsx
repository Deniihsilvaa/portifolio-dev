import { Badge } from "@/components/ui/Badge";
import type { Project } from "@/features/projects/types/project";

type ProjectHeaderProps = {
  project: Project;
};

export function ProjectHeader({ project }: ProjectHeaderProps) {
  return (
    <section className="surface-card grid gap-8 rounded-[2rem] p-8 shadow-card lg:grid-cols-[1.1fr_0.9fr]">
      <div className="space-y-5">
        <Badge label={project.category} />
        <div className="space-y-3">
          <h1 className="font-display text-4xl font-extrabold tracking-tight">{project.title}</h1>
          <p className="text-lg text-muted-on-card">{project.subtitle}</p>
          <p className="max-w-2xl text-base leading-7 text-muted-on-card">{project.summary}</p>
        </div>
        <div className="flex flex-wrap gap-3 text-sm font-semibold">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="rounded-full bg-ink px-5 py-3 text-sand"
          >
            GitHub
          </a>
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="surface-card rounded-full px-5 py-3"
            >
              Live Preview
            </a>
          ) : null}
        </div>
      </div>
      <div className="rounded-[1.5rem] bg-[rgba(17,24,39,0.05)] p-4">
        {project.coverImage ? (
          <img
            src={project.coverImage}
            alt={project.title}
            className="h-full min-h-64 w-full rounded-[1.25rem] object-cover"
          />
        ) : (
          <div className="h-full min-h-64 w-full rounded-[1.25rem] bg-teal/10" />
        )}
      </div>
    </section>
  );
}
