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
  const y = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const opacity = useTransform(scrollYProgress, [0, 0.4], [0.5, 0]);
  const springY = useSpring(y, { stiffness: 100, damping: 30, mass: 0.5 });

  return (
    <div className="relative min-h-screen pb-24 pt-4 lg:pt-8 bg-background">
      {/* Premium Backdrop Glow */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute left-0 right-[-20%] top-[-10rem] h-[40rem] rounded-[100%] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-teal/15 via-coral/5 to-transparent blur-[120px]"
        style={{ y: springY, opacity }}
      />

      {/* Main Grid Restructured for High-End Professional Aesthetic */}
      <div className="relative z-10 grid grid-cols-1 items-start gap-8 lg:gap-10 lg:grid-cols-[400px_1fr] xl:grid-cols-[420px_1fr] 2xl:grid-cols-[460px_1fr]">

        {/* Left Column - Sticky Profile Drawer Style */}
        <div className="lg:sticky lg:top-8 flex flex-col gap-6 h-fit">
          <HeroSection
            profile={profile}
            isLoading={isProfileLoading}
            error={profileError}
          />
          <Reveal delay={0.1}>
            {/* <AboutSection
              profile={profile}
              isLoading={isProfileLoading}
              error={profileError}
            /> */}
          </Reveal>
        </div>

        {/* Right Column - Project Showcase Deep Glass Pane */}
        <div className="w-full">
          <Reveal delay={0.2}>
            <div className="relative  rounded-[2.5rem] border hairline-card bg-surface/30 p-6 sm:p-10 xl:p-12 shadow-card backdrop-blur-2xl transition-all hover:bg-surface/40 overflow-visible">

              {/* Subtle inner decorative glow for exactly this card */}
              <div className="pointer-events-none absolute -right-32 -top-32 h-[400px] w-[400px] rounded-full bg-teal/10 blur-[100px]" />

              <div className="relative z-10 mb-2 space-y-1 card">
                <div className="inline-flex h-8 items-center rounded-full border hairline-card bg-[rgba(17,24,39,0.3)] px-4 text-xs font-semibold uppercase tracking-widest text-teal shadow-inner">
                  Portfólio de Aplicações
                </div>
                <h2 className="font-display text-4xl lg:text-4xl font-extrabold tracking-tight text-yellow-500 drop-shadow-md">
                  Meus Projetos Em Destaque
                </h2>
                <p className="max-w-2xl text-lg leading-relaxed text-white">
                  Uma coleção refinada dos sistemas, arquiteturas e aplicações web
                  escriturados por mim. Cada projeto representa uma entrega técnica e uma solução para o mundo real.
                </p>

                <div className="pt-6 border-b hairline-card opacity-50" />
              </div>

              <div className="relative z-10">
                <FeaturedProjectsSection
                  projects={projects}
                  isLoading={isProjectsLoading}
                  error={projectsError}
                />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
