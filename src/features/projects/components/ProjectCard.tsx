import { motion, useReducedMotion } from "motion/react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/Badge";
import type { Project } from "@/features/projects/types/project";

type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 28 },
        show: { opacity: 1, y: 0 },
      }}
      layout
    >
      <motion.div
        whileHover={shouldReduceMotion ? undefined : { y: -10 }}
        transition={{ type: "spring", stiffness: 220, damping: 22 }}
      >
        <Link
          to={`/project/${project.slug}`}
          className="surface-card group block overflow-hidden rounded-[1.5rem] shadow-card transition"
        >
          <div className="overflow-hidden">

            {project.coverImage ? (
              <motion.img
                src={project.coverImage}
                alt={project.title}
                className="h-44 w-full object-cover"
                whileHover={shouldReduceMotion ? undefined : { scale: 1.04 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              />
            ) : (
              <div className="h-44 w-full bg-teal/10" />
            )}
          </div>
          <div className="space-y-3 p-5">
            <Badge label={project.category} />
            <div className="space-y-1.5">
              <h3 className="font-display text-xl font-bold tracking-tight line-clamp-1">{project.title}</h3>
              <p className="text-xs font-medium text-muted-on-card line-clamp-1">{project.subtitle}</p>
              <p className="text-sm leading-relaxed text-muted-on-card line-clamp-2">{project.summary}</p>
            </div>
            <div className="flex flex-wrap gap-1.5 pt-2">
              {project.stack?.map((item) => (
                <span key={item} className="text-sm font-medium text-teal">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </Link>
      </motion.div>
    </motion.div>
  );
}
