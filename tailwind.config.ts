import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#111827",
        sand: "#f8f6f1",
        coral: "#ef6c57",
        teal: "#2b7a78",
        gold: "#e2b714"
      },
      fontFamily: {
        sans: ["'Space Grotesk'", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["'Bricolage Grotesque'", "'Space Grotesk'", "sans-serif"]
      },
      boxShadow: {
        card: "0 24px 60px rgba(17, 24, 39, 0.08)"
      },
      backgroundImage: {
        "hero-grid":
          "radial-gradient(circle at top left, rgba(239,108,87,0.18), transparent 28%), radial-gradient(circle at bottom right, rgba(43,122,120,0.16), transparent 26%)"
      }
    }
  },
  plugins: []
} satisfies Config;
