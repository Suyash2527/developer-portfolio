import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/sections/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#f5f0e8",
        "background-secondary": "#f5f0e8",
        "background-tertiary": "#ffffff",
        "text-primary": "#0f0f0f",
        "text-muted": "#888888",
        "text-subtle": "#888888",
        accent: "#dd4433",
        "accent-light": "#f0d43a",
        ink: "#0f0f0f",
        red: "#dd4433",
        yellow: "#f0d43a",
        muted: "#888888",
        paper: "#f5f0e8"
      },
      fontFamily: {
        sans: ["var(--font-space-mono)", "monospace"],
        mono: ["var(--font-space-mono)", "monospace"],
        heading: ["var(--font-anton)", "sans-serif"],
        terminal: ["var(--font-ibm-plex-mono)", "monospace"],
      },
      fontSize: {
        "hero-xl": ["clamp(72px, 12vw, 160px)", { lineHeight: "0.9", letterSpacing: "-0.02em" }],
        "section-title": ["clamp(44px, 5.5vw, 76px)", { lineHeight: "0.95", letterSpacing: "-0.02em" }],
      },
      boxShadow: {
        brutal: "8px 8px 0 #0f0f0f",
      },
      keyframes: {
        scrollTicker: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        glR: {
          "0%": { transform: "translateX(3px)", clipPath: "inset(15% 0 55% 0)" },
          "50%": { transform: "translateX(-3px)", clipPath: "inset(58% 0 12% 0)" },
          "100%": { transform: "translateX(2px)", clipPath: "inset(30% 0 35% 0)" },
        },
        glB: {
          "0%": { transform: "translateX(-3px)", clipPath: "inset(50% 0 18% 0)" },
          "50%": { transform: "translateX(3px)", clipPath: "inset(10% 0 58% 0)" },
          "100%": { transform: "translateX(-2px)", clipPath: "inset(38% 0 28% 0)" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        scrollLine: {
          "0%": { transform: "scaleY(0)", transformOrigin: "top", opacity: "0" },
          "20%": { opacity: "1" },
          "50%": { transform: "scaleY(1)", transformOrigin: "top" },
          "50.1%": { transform: "scaleY(1)", transformOrigin: "bottom" },
          "100%": { transform: "scaleY(0)", transformOrigin: "bottom", opacity: "0" },
        }
      }
    },
  },
  plugins: [],
};

export default config;
