import { motion, useReducedMotion } from "motion/react";
import { ProjectCard } from "@/features/projects/components/ProjectCard";
import type { Project } from "@/features/projects/types/project";

type ProjectGridProps = {
  projects: Project[];
  isLoading: boolean;
  error: string | null;
};

export function ProjectGrid({ projects, isLoading, error }: ProjectGridProps) {
  const shouldReduceMotion = useReducedMotion();

  if (isLoading) {
    return <div className="surface-card rounded-[2rem] p-8 shadow-card">Loading projects...</div>;
  }

  if (error) {
    return <div className="surface-card rounded-[2rem] p-8 shadow-card">{error}</div>;
  }

  return (
    <motion.div
      className="grid gap-5 sm:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3"
      initial={shouldReduceMotion ? false : "hidden"}
      whileInView={shouldReduceMotion ? undefined : "show"}
      viewport={{ once: true, amount: 0.15 }}
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: 0.12,
          },
        },
      }}
    >
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </motion.div>
  );
}
