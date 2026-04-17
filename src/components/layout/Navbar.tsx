import { motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const navItems = [
  { label: "Work", href: "/#projects", id: "projects" },
  { label: "Profile", href: "/#about", id: "about" },
];

export function Navbar() {
  const location = useLocation();
  const shouldReduceMotion = useReducedMotion();
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    // Only run on the homepage
    if (location.pathname !== "/") return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-20% 0px -70% 0px", // Trigger when section is near the top
        threshold: 0,
      }
    );

    const sections = ["hero", "projects", "about"];
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [location.pathname]);

  // Adjust hash on scroll maybe? No, just the active state for now.

  return (
    <header className="sticky top-0 z-40 mb-4 border-b hairline-dark bg-[rgba(8,9,13,0.78)] backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <motion.div whileHover={shouldReduceMotion ? undefined : { y: -1 }}>
          <Link
            to="/"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="inline-flex items-center gap-3 rounded-full border hairline-dark bg-white/5 px-4 py-2 text-sm font-semibold tracking-[0.18em] text-on-dark transition hover:bg-white/10"
          >
            <span className="h-2.5 w-2.5 rounded-full accent-gradient" />
            DENILSON PORTFOLIO
          </Link>
        </motion.div>

        <nav className="flex items-center gap-2 rounded-full border hairline-dark bg-white/5 p-1.5 text-sm">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;

            return (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  const target = document.getElementById(item.id);
                  if (target) {
                    target.scrollIntoView({ behavior: "smooth" });
                    setActiveSection(item.id);
                  }
                }}
                className="group relative rounded-full px-4 py-2.5 font-medium text-muted-on-dark transition hover:text-on-dark"
              >
                <motion.span
                  whileHover={shouldReduceMotion ? undefined : { y: -1 }}
                  className={`relative z-10 ${isActive ? "text-on-dark" : ""}`}
                >
                  {item.label}
                </motion.span>

                {isActive ? (
                  <motion.span
                    layoutId="navbar-underline"
                    className="absolute inset-0 rounded-full bg-white"
                    transition={{ type: "spring", stiffness: 420, damping: 34, mass: 0.45 }}
                  />
                ) : null}

                <motion.span
                  aria-hidden="true"
                  className="absolute inset-0 rounded-full bg-white/8 opacity-0 transition group-hover:opacity-100"
                  whileHover={shouldReduceMotion ? undefined : { scale: 1.02 }}
                />
              </a>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
