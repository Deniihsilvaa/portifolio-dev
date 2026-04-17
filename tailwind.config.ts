import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
        ink: "#111827",
        sand: "#f8f6f1",
        coral: "#ef6c57",
        teal: "#2b7a78",
        gold: "#e2b714"
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)"
      },
      fontFamily: {
        sans: ["'Space Grotesk'", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["'Bricolage Grotesque'", "'Space Grotesk'", "sans-serif"]
      },
      boxShadow: {
        card: "0 10px 40px -12px rgba(0, 0, 0, 0.5)",
        glow: "0 0 20px rgba(0, 0, 0, 0.2)"
      },
      backgroundImage: {
        "hero-grid":
          "radial-gradient(circle at top left, rgba(239,108,87,0.18), transparent 28%), radial-gradient(circle at bottom right, rgba(43,122,120,0.16), transparent 26%)"
      }
    }
  },
  plugins: []
} satisfies Config;
