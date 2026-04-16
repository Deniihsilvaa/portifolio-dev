import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/ButtonLink";
import type { Profile } from "@/features/profile/types/profile";

type HeroSectionProps = {
  profile: Profile | null;
  isLoading: boolean;
  error: string | null;
};

export function HeroSection({ profile, isLoading, error }: HeroSectionProps) {
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const imageY = useTransform(scrollYProgress, [0, 0.4], [0, shouldReduceMotion ? 0 : 42]);
  const badgeX = useTransform(scrollYProgress, [0, 0.25], [0, shouldReduceMotion ? 0 : 18]);

  if (isLoading) {
    return <section className="surface-card rounded-[2rem] p-8 shadow-card">Loading profile...</section>;
  }

  if (error || !profile) {
    return (
      <section className="surface-card rounded-[2rem] p-8 shadow-card">
        Unable to render the hero section.
      </section>
    );
  }

  return (
    <section className="surface-card relative isolate overflow-hidden rounded-[2rem] bg-hero-grid px-6 py-12 shadow-card sm:px-10 sm:py-16">
      <motion.div
        aria-hidden="true"
        className="absolute right-[-4rem] top-[-3rem] h-56 w-56 rounded-full bg-coral/15 blur-3xl"
        animate={shouldReduceMotion ? undefined : { scale: [1, 1.08, 1], x: [0, 18, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden="true"
        className="absolute bottom-[-5rem] left-[-3rem] h-64 w-64 rounded-full bg-teal/15 blur-3xl"
        animate={shouldReduceMotion ? undefined : { scale: [1, 1.12, 1], y: [0, -20, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">
        <motion.div
          className="space-y-6"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 36 }}
          animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div style={{ x: badgeX }}>
            <Badge label={profile.availability} />
          </motion.div>
          <motion.div
            className="space-y-4"
            initial={shouldReduceMotion ? false : "hidden"}
            animate={shouldReduceMotion ? undefined : "show"}
            variants={{
              hidden: {},
              show: {
                transition: {
                  staggerChildren: 0.12,
                  delayChildren: 0.1,
                },
              },
            }}
          >
            <motion.p
              className="text-sm font-semibold uppercase tracking-[0.2em] text-coral"
              variants={{
                hidden: { opacity: 0, y: 16 },
                show: { opacity: 1, y: 0 },
              }}
            >
              {profile.name || "Portfolio Home"}
            </motion.p>
            <motion.h1
              className="font-display text-4xl font-extrabold tracking-tight text-on-card sm:text-5xl lg:text-6xl"
              variants={{
                hidden: { opacity: 0, y: 24 },
                show: { opacity: 1, y: 0 },
              }}
            >
              {profile.title}
            </motion.h1>
            <motion.p
              className="max-w-2xl text-lg leading-8 text-muted-on-card"
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0 },
              }}
            >
              {profile.summary}
            </motion.p>
          </motion.div>
          <motion.div
            className="flex flex-wrap items-center gap-4"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div whileHover={shouldReduceMotion ? undefined : { y: -3 }} whileTap={{ scale: 0.98 }}>
              <ButtonLink to="/#projects">View Projects</ButtonLink>
            </motion.div>
            <motion.div whileHover={shouldReduceMotion ? undefined : { y: -3 }} whileTap={{ scale: 0.98 }}>
              <ButtonLink to="/#about" variant="ghost">
                About Me
              </ButtonLink>
            </motion.div>
            {profile.socialLinks && profile.socialLinks.length > 0 && (
              <div className="ml-2 flex items-center gap-3 border-l border-white/10 pl-4">
                {profile.socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm font-medium text-muted-on-card transition-colors hover:text-white"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            )}
          </motion.div>
        </motion.div>
        <motion.div
          className="justify-self-end"
          style={{ y: imageY }}
          initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.94, rotate: -4 }}
          animate={shouldReduceMotion ? undefined : { opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            className="rounded-[2rem] border hairline-card bg-[rgba(17,24,39,0.04)] p-4"
            whileHover={shouldReduceMotion ? undefined : { y: -8, rotate: -1.5 }}
            transition={{ type: "spring", stiffness: 220, damping: 20 }}
          >
            {profile.avatarUrl ? (
              <img
                src={profile.avatarUrl}
                alt={profile.name}
                className="h-[320px] w-full max-w-[320px] rounded-[1.5rem] object-cover"
              />
            ) : (
              <div className="h-[320px] w-full max-w-[320px] rounded-[1.5rem] bg-coral/10" />
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
