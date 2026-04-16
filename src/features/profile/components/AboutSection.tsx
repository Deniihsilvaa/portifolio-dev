import { motion, useReducedMotion } from "motion/react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Profile } from "@/features/profile/types/profile";

type AboutSectionProps = {
  profile: Profile | null;
  isLoading: boolean;
  error: string | null;
};

export function AboutSection({ profile, isLoading, error }: AboutSectionProps) {
  const shouldReduceMotion = useReducedMotion();

  if (isLoading) {
    return <section id="about" className="surface-card rounded-[2rem] p-8 shadow-card">Loading about section...</section>;
  }

  if (error || !profile) {
    return (
      <section id="about" className="surface-card rounded-[2rem] p-8 shadow-card">
        Unable to render the profile section.
      </section>
    );
  }

  return (
    <motion.section
      id="about"
      className="surface-card flex flex-col gap-8 rounded-[2rem] p-8 shadow-card"
      initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <SectionHeading
        eyebrow="Profile"
        title={[profile.name, profile.location].filter(Boolean).join(" from ") || "About Me"}
        description={profile.bio.join(" ") || "No description available."}
      />
      <motion.div
        className="space-y-6"
        initial={shouldReduceMotion ? false : "hidden"}
        whileInView={shouldReduceMotion ? undefined : "show"}
        viewport={{ once: true, amount: 0.25 }}
        variants={{
          hidden: {},
          show: {
            transition: {
              staggerChildren: 0.1,
              delayChildren: 0.1,
            },
          },
        }}
      >
        <div className="space-y-4 text-base leading-7 text-muted-on-card">
          {profile.bio.map((paragraph) => (
            <motion.p
              key={paragraph}
              variants={{
                hidden: { opacity: 0, y: 18 },
                show: { opacity: 1, y: 0 },
              }}
            >
              {paragraph}
            </motion.p>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          {profile.skills.map((skill, index) => (
            <motion.span
              key={skill}
              className="rounded-full bg-[rgba(17,24,39,0.05)] px-3 py-2 text-sm font-medium text-muted-on-card"
              variants={{
                hidden: { opacity: 0, y: 14 },
                show: { opacity: 1, y: 0 },
              }}
              whileHover={shouldReduceMotion ? undefined : { y: -3 }}
              transition={{ duration: 0.2, delay: index * 0.02 }}
            >
              {skill}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </motion.section>
  );
}
