import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { Badge } from "@/components/ui/Badge";

type HeroSectionProps = {
  profile: any;
  isLoading: boolean;
  error: string | null;
};

export function HeroSection({ profile, isLoading, error }: HeroSectionProps) {
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();

  const imageY = useTransform(scrollYProgress, [0, 0.4], [0, shouldReduceMotion ? 0 : 40]);

  if (isLoading) {
    return (
      <section className="rounded-3xl border bg-card p-8 shadow-sm">
        Carregando perfil...
      </section>
    );
  }

  if (error || !profile) {
    return (
      <section className="rounded-3xl border bg-card p-8 shadow-sm">
        Erro ao carregar perfil.
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden rounded-3xl border bg-card/70 backdrop-blur-xl p-6 md:p-10 shadow-xl">

      {/* Glow background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute right-[-80px] top-[-80px] h-64 w-64 rounded-full bg-cyan-400/10 blur-[100px]" />
        <div className="absolute left-[-80px] bottom-[-80px] h-72 w-72 rounded-full bg-teal-400/10 blur-[120px]" />
      </div>

      {/* GRID */}
      <div className="relative z-10 grid gap-10 md:grid-cols-2 items-center">

        {/* TEXT */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 30 }}
          animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          {/* BADGE */}
          <Badge label={profile.availability} />

          {/* TITLE */}
          <div className="space-y-3">
            <p className="text-sm uppercase tracking-widest text-muted-foreground">
              {profile.name}
            </p>

            <h1 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight text-black">
              {profile.title}
            </h1>

            <p className="text-muted-foreground leading-relaxed max-w-xl">
              {profile.summary}
            </p>
          </div>

          {/* SOCIAL LINKS */}
          {profile.socialLinks?.length > 0 && (
            <div className="flex flex-wrap gap-4 pt-2">
              {profile.socialLinks.map((link: any) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition"
                >
                  {link.label}
                </a>
              ))}
            </div>
          )}
        </motion.div>

        {/* IMAGE */}
        <motion.div
          style={{ y: imageY }}
          initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.95 }}
          animate={shouldReduceMotion ? undefined : { opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="flex justify-center md:justify-end"
        >
          <motion.div
            whileHover={shouldReduceMotion ? undefined : { scale: 1.03 }}
            className="relative"
          >
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-cyan-400/20 to-transparent blur-2xl" />

            {profile.avatarUrl ? (
              <img
                src={profile.avatarUrl}
                alt={profile.name}
                className="relative w-40 md:w-56 aspect-square rounded-2xl object-cover border shadow-lg"
              />
            ) : (
              <div className="w-40 md:w-56 aspect-square rounded-2xl bg-muted" />
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}