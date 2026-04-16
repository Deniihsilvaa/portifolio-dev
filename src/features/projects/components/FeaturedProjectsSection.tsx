import { motion, useReducedMotion } from "motion/react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectGrid } from "@/features/projects/components/ProjectGrid";
import type { Project } from "@/features/projects/types/project";

type FeaturedProjectsSectionProps = {
  projects: Project[];
  isLoading: boolean;
  error: string | null;
};

export function FeaturedProjectsSection({
  projects,
  isLoading,
  error,
}: FeaturedProjectsSectionProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.section
      id="projects"
      className="space-y-8"
      initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="surface-card rounded-[2rem] p-8 shadow-card">
        <SectionHeading
          eyebrow="Projects Grid"
          title="Selected work shaped into reusable portfolio modules"
          description="The projects screen is composed as a reusable grid of cards, each routing into a richer project details view with gallery, metadata, and README rendering."
        />
      </div>
      <ProjectGrid projects={projects} isLoading={isLoading} error={error} />
    </motion.section>
  );
}
