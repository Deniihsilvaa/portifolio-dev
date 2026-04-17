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
  const opacity = useTransform(scrollYProgress, [0, 0.4], [0.6, 0]);
  const springY = useSpring(y, { stiffness: 80, damping: 25 });

  return (
    <div className="relative min-h-screen bg-background rounded-3xl">

      {/* BACKGROUND GLOW */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{ opacity }}
      >
        <motion.div
          className="absolute left-1/2 top-[-10rem] h-[40rem] w-[60rem] -translate-x-1/2 rounded-full bg-gradient-to-tr from-teal/20 via-cyan-400/10 to-transparent blur-[120px]"
          style={{ y: springY }}
        />
      </motion.div>

      {/* CONTAINER */}
      <div className="mx-auto max-w-6xl px-6 py-12 space-y-16">

        {/* HERO */}
        <section className="space-y-8">
          <HeroSection
            profile={profile}
            isLoading={isProfileLoading}
            error={profileError}
          />
        </section>

        {/* ABOUT (opcional, mas melhor manter para profundidade) */}
        {/* <Reveal delay={0.1}>
          <section className="max-w-3xl">
            <AboutSection
              profile={profile}
              isLoading={isProfileLoading}
              error={profileError}
            />
          </section>
        </Reveal> */}

        {/* PROJECTS */}
        <Reveal delay={0.2}>
          <section className="space-y-8">

            {/* HEADER */}
            <div className="space-y-3">
              <span className="inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium tracking-widest text-muted-foreground">
                PORTFÓLIO
              </span>

              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-black">
                Projetos em destaque
              </h2>

              <p className="max-w-2xl text-muted-foreground leading-relaxed">
                Uma seleção dos meus principais projetos, focados em arquitetura,
                performance e experiência do usuário.
              </p>
            </div>

            {/* CARD PRINCIPAL */}
            <div className="relative rounded-3xl border bg-card/60 backdrop-blur-xl p-6 md:p-10 shadow-xl transition hover:shadow-2xl">

              {/* Glow interno */}
              <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-white/5 to-transparent" />

              {/* conteúdo */}
              <div className="relative z-10">
                <FeaturedProjectsSection
                  projects={projects}
                  isLoading={isProjectsLoading}
                  error={projectsError}
                />
              </div>
            </div>
          </section>
        </Reveal>
      </div>
    </div>
  );
}