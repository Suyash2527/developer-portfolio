"use client";

import { motion } from "framer-motion";
import { Reveal, StaggerReveal, revealItem } from "@/components/animations/Reveal";

// Skill icons using SVG inline or react-icons style text badges
const SKILLS = [
  { name: "React", category: "Frontend", color: "#61DAFB", icon: "⚛️", size: "large" },
  { name: "Next.js", category: "Framework", color: "#fff", icon: "▲", size: "large" },
  { name: "TypeScript", category: "Language", color: "#3178C6", icon: "TS", size: "large" },
  { name: "Node.js", category: "Backend", color: "#339933", icon: "🟢", size: "medium" },
  { name: "Express.js", category: "Backend", color: "#fff", icon: "Ex", size: "medium" },
  { name: "MongoDB", category: "Database", color: "#47A248", icon: "🍃", size: "medium" },
  { name: "Firebase", category: "Cloud", color: "#FFCA28", icon: "🔥", size: "medium" },
  { name: "Google Cloud", category: "Cloud", color: "#4285F4", icon: "☁️", size: "medium" },
  { name: "Tailwind CSS", category: "Styling", color: "#06B6D4", icon: "🌊", size: "small" },
  { name: "Docker", category: "DevOps", color: "#2496ED", icon: "🐳", size: "small" },
  { name: "GitHub Actions", category: "CI/CD", color: "#fff", icon: "⚙️", size: "small" },
  { name: "REST APIs", category: "Backend", color: "#7C3AED", icon: "🔌", size: "small" },
];

const CATEGORY_COLORS: Record<string, string> = {
  Frontend: "rgba(97, 218, 251, 0.12)",
  Framework: "rgba(255,255,255,0.08)",
  Language: "rgba(49, 120, 198, 0.15)",
  Backend: "rgba(51, 153, 51, 0.12)",
  Database: "rgba(71, 162, 72, 0.12)",
  Cloud: "rgba(66, 133, 244, 0.12)",
  Styling: "rgba(6, 182, 212, 0.12)",
  DevOps: "rgba(36, 150, 237, 0.12)",
  "CI/CD": "rgba(255,255,255,0.06)",
};

export default function SkillsSection() {
  return (
    <section id="skills" className="section-padding relative bg-background-secondary">
      <div className="orb w-80 h-80 bg-accent/10 bottom-0 left-1/4" />

      <div className="container-max relative">
        {/* Header */}
        <Reveal className="text-center mb-16">
          <span className="section-label mb-4 block">Tech Stack</span>
          <h2 className="text-section-title font-black text-white mb-5">
            Tools I{" "}
            <span className="text-gradient-accent">build with</span>
          </h2>
          <p className="text-text-muted text-lg max-w-xl mx-auto leading-relaxed font-light">
            A curated toolkit of modern technologies I use daily to craft
            high-performance, scalable applications.
          </p>
        </Reveal>

        {/* Bento Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-auto">
          {/* Featured large card — React */}
          <StaggerReveal className="contents">
            {SKILLS.map((skill, i) => (
              <motion.div
                key={skill.name}
                variants={revealItem}
                whileHover={{
                  scale: 1.04,
                  y: -6,
                  boxShadow: `0 20px 60px rgba(0,0,0,0.4), 0 0 30px ${skill.color}22`,
                }}
                className={`relative glass-card rounded-2xl p-5 border border-white/[0.06] hover:border-white/[0.12]
                  transition-all duration-300 group cursor-default overflow-hidden
                  ${skill.size === "large" ? "col-span-1 row-span-1 sm:col-span-1" : ""}`}
                style={{ background: CATEGORY_COLORS[skill.category] || "rgba(255,255,255,0.03)" }}
              >
                {/* Glow on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `radial-gradient(circle at 50% 0%, ${skill.color}18 0%, transparent 60%)`,
                  }}
                />

                <div className="relative z-10">
                  {/* Icon */}
                  <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300 inline-block">
                    {skill.icon}
                  </div>

                  {/* Name */}
                  <h3 className="font-semibold text-white text-sm leading-tight mb-1">
                    {skill.name}
                  </h3>

                  {/* Category pill */}
                  <span
                    className="text-[10px] font-medium px-2 py-0.5 rounded-full"
                    style={{
                      background: `${skill.color}22`,
                      color: skill.color === "#fff" ? "#a1a1aa" : skill.color,
                      border: `1px solid ${skill.color}33`,
                    }}
                  >
                    {skill.category}
                  </span>
                </div>
              </motion.div>
            ))}
          </StaggerReveal>
        </div>

        {/* Bottom banner */}
        <Reveal className="mt-12">
          <div className="glass-card rounded-2xl p-6 border border-accent/10 text-center">
            <p className="text-text-muted text-sm leading-relaxed max-w-2xl mx-auto">
              Always learning. Currently exploring{" "}
              <span className="text-white font-medium">Rust</span>,{" "}
              <span className="text-white font-medium">tRPC</span>, and{" "}
              <span className="text-white font-medium">Edge computing</span> patterns.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
