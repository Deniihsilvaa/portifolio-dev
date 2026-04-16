import { motion, useReducedMotion } from "motion/react";
import { Link, useLocation } from "react-router-dom";

const navItems = [
  { label: "Work", href: "/#projects", match: "work" },
  { label: "Profile", href: "/#about", match: "about" },
];

export function Navbar() {
  const location = useLocation();
  const shouldReduceMotion = useReducedMotion();

  return (
    <header className="sticky top-0 z-40 mb-4 border-b hairline-dark bg-[rgba(8,9,13,0.78)] backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <motion.div whileHover={shouldReduceMotion ? undefined : { y: -1 }}>
          <Link
            to="/"
            className="inline-flex items-center gap-3 rounded-full border hairline-dark bg-white/5 px-4 py-2 text-sm font-semibold tracking-[0.18em] text-on-dark transition hover:bg-white/10"
          >
            <span className="h-2.5 w-2.5 rounded-full accent-gradient" />
            DENILSON PORTFOLIO
          </Link>
        </motion.div>

        <nav className="flex items-center gap-2 rounded-full border hairline-dark bg-white/5 p-1.5 text-sm">
          {navItems.map((item) => {
            const isActive =
              location.pathname === "/" &&
              ((item.match === "work" && (location.hash === "#projects" || location.hash === "")) ||
                (item.match === "about" && location.hash === "#about"));

            return (
              <Link
                key={item.label}
                to={item.href}
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
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
