import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/sections/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "#0A0A0A",
        "background-secondary": "#111111",
        "background-tertiary": "#161616",
        "text-primary": "#FFFFFF",
        "text-muted": "#A1A1AA",
        "text-subtle": "#52525B",
        accent: "#7C3AED",
        "accent-light": "#9D5EFD",
        "accent-dark": "#5B21B6",
        "accent-glow": "rgba(124, 58, 237, 0.3)",
        border: "rgba(255,255,255,0.06)",
        "border-light": "rgba(255,255,255,0.12)",
        glass: "rgba(255,255,255,0.04)",
        "glass-hover": "rgba(255,255,255,0.07)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "Fira Code", "monospace"],
      },
      fontSize: {
        "hero-xl": ["clamp(3rem, 8vw, 7rem)", { lineHeight: "1.05", letterSpacing: "-0.04em" }],
        "hero-lg": ["clamp(2.5rem, 6vw, 5rem)", { lineHeight: "1.08", letterSpacing: "-0.03em" }],
        "hero-md": ["clamp(2rem, 4vw, 3.5rem)", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "section-title": ["clamp(1.8rem, 3vw, 2.8rem)", { lineHeight: "1.15", letterSpacing: "-0.02em" }],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "gradient-accent": "linear-gradient(135deg, #7C3AED, #9D5EFD)",
        "gradient-mesh": "radial-gradient(at 40% 20%, rgba(124,58,237,0.15) 0px, transparent 50%), radial-gradient(at 80% 0%, rgba(93,33,208,0.1) 0px, transparent 50%), radial-gradient(at 0% 50%, rgba(124,58,237,0.08) 0px, transparent 50%)",
      },
      boxShadow: {
        glass: "0 4px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255,255,255,0.06)",
        "glass-lg": "0 8px 64px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255,255,255,0.08)",
        "accent-glow": "0 0 40px rgba(124, 58, 237, 0.25)",
        "accent-glow-lg": "0 0 80px rgba(124, 58, 237, 0.35)",
        "card-hover": "0 20px 80px rgba(0, 0, 0, 0.6), 0 0 40px rgba(124, 58, 237, 0.1)",
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "float-delayed": "float 6s ease-in-out 2s infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "gradient": "gradient 8s ease infinite",
        "shimmer": "shimmer 2s linear infinite",
        "spin-slow": "spin 8s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        gradient: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};

export default config;
