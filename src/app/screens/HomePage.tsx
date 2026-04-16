import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { AboutSection } from "@/features/profile/components/AboutSection";
import { HeroSection } from "@/features/profile/components/HeroSection";
import { FeaturedProjectsSection } from "@/features/projects/components/FeaturedProjectsSection";
import { useProfile } from "@/features/profile/hooks/useProfile";
import { useProjects } from "@/features/projects/hooks/useProjects";
import { Reveal } from "@/components/ui/Reveal";

export function HomePage() {
  const { profile, isLoading: isProfileLoading, error: profileError } = useProfile();
  const { projects, isLoading: isProjectsLoading, error: projectsError } = useProjects();
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const opacity = useTransform(scrollYProgress, [0, 0.35], [1, 0.35]);
  const springY = useSpring(y, { stiffness: 110, damping: 24, mass: 0.3 });


  return (
    <div className="relative overflow-hidden pb-16">
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-[-10%] top-[-6rem] h-[28rem] rounded-full bg-gradient-to-r from-coral/18 via-gold/10 to-teal/18 blur-3xl"
        style={{ y: springY, opacity }}
      />

      <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[360px_1fr] xl:grid-cols-[400px_1fr] pt-8 lg:pt-16">
        {/* Left Column - Profile & Info (Sticky) */}
        <div className="sticky top-8 space-y-8">
          <HeroSection
            profile={profile}
            isLoading={isProfileLoading}
            error={profileError}
          />

          <Reveal delay={0.05}>
            <AboutSection
              profile={profile}
              isLoading={isProfileLoading}
              error={profileError}
            />
          </Reveal>
        </div>

        {/* Right Column - Projects Grid */}
        <div className="space-y-8">
          <Reveal delay={0.1}>
            <FeaturedProjectsSection
              projects={projects}
              isLoading={isProjectsLoading}
              error={projectsError}
            />
          </Reveal>
        </div>
      </div>
    </div>
  );
}
