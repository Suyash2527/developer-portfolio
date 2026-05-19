"use client";

import { motion } from "framer-motion";
import { Reveal, StaggerReveal, revealItem } from "@/components/animations/Reveal";

const STATS = [
  { label: "Projects Shipped", value: "4+" },
  { label: "Technologies", value: "12+" },
  { label: "Cloud Deployments", value: "3+" },
  { label: "Open Source", value: "Active" },
];

const HIGHLIGHTS = [
  {
    icon: "🏗️",
    title: "Backend Engineering",
    description:
      "Architecting scalable Node.js/Express APIs with MongoDB and Firebase Firestore. Emphasis on performance, security, and maintainability.",
  },
  {
    icon: "☁️",
    title: "Cloud Infrastructure",
    description:
      "Deploying production workloads on GCP Cloud Run with Firebase. Building CI/CD pipelines with GitHub Actions and Docker.",
  },
  {
    icon: "🎨",
    title: "Frontend Craft",
    description:
      "Building pixel-perfect UIs with Next.js, TypeScript, and Tailwind CSS. Obsessed with performance, accessibility, and micro-animations.",
  },
  {
    icon: "🔓",
    title: "Open Source",
    description:
      "Contributing to the developer community through open-source projects, documentation, and sharing engineering knowledge publicly.",
  },
];

export default function AboutSection() {
  return (
    <section id="about" className="section-padding relative">
      {/* Subtle orb */}
      <div className="orb w-96 h-96 bg-accent/10 top-1/2 right-0 translate-x-1/2 -translate-y-1/2" />

      <div className="container-max relative">
        {/* Header */}
        <Reveal>
          <div className="text-center mb-16 lg:mb-20">
            <span className="section-label mb-4 block">About Me</span>
            <h2 className="text-section-title font-black text-white mb-5">
              Building{" "}
              <span className="text-gradient-accent">full-stack</span>{" "}
              solutions
              <br className="hidden sm:block" /> from idea to production.
            </h2>
            <p className="text-text-muted text-lg max-w-2xl mx-auto leading-relaxed font-light">
              A full-stack developer with a passion for engineering elegant, scalable software.
              I specialize in backend systems, cloud architecture, and modern frontend experiences.
            </p>
          </div>
        </Reveal>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-16">
          {/* Left: Bio */}
          <Reveal direction="left">
            <div className="space-y-5">
              <p className="text-text-muted leading-relaxed">
                I&apos;m a full-stack developer focused on building{" "}
                <span className="text-white font-medium">production-grade web applications</span>{" "}
                that solve real problems. My experience spans from crafting delightful frontend
                interfaces to designing robust backend APIs and cloud deployments.
              </p>
              <p className="text-text-muted leading-relaxed">
                I&apos;ve built e-commerce platforms, AI-powered assistants, logistics dashboards,
                and hospital management systems — each deployed to production with{" "}
                <span className="text-white font-medium">GCP and Firebase</span>. I care deeply about
                code quality, developer experience, and shipping products that users love.
              </p>
              <p className="text-text-muted leading-relaxed">
                When I&apos;m not coding, I&apos;m exploring new technologies, contributing to open-source,
                and staying current with the latest in cloud-native development and AI tooling.
              </p>

              {/* Tech stack pill list */}
              <div className="flex flex-wrap gap-2 pt-2">
                {["Next.js 15", "TypeScript", "Node.js", "Firebase", "GCP", "MongoDB", "Docker"].map(
                  (tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-full text-xs font-medium glass-card border border-accent/20 text-accent-light"
                    >
                      {tech}
                    </span>
                  )
                )}
              </div>
            </div>
          </Reveal>

          {/* Right: Stats */}
          <Reveal direction="right">
            <div className="grid grid-cols-2 gap-4">
              {STATS.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  whileHover={{ scale: 1.03, y: -2 }}
                  className="glass-card rounded-2xl p-6 border border-white/[0.06] hover:border-accent/20 transition-all duration-300 text-center"
                >
                  <p
                    className="text-4xl font-black text-gradient-accent mb-1"
                    style={{ letterSpacing: "-0.03em" }}
                  >
                    {stat.value}
                  </p>
                  <p className="text-xs text-text-muted font-medium uppercase tracking-wide">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Highlights Grid */}
        <StaggerReveal className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {HIGHLIGHTS.map((item) => (
            <motion.div
              key={item.title}
              variants={revealItem}
              whileHover={{ y: -6, scale: 1.02 }}
              className="glass-card rounded-2xl p-6 border border-white/[0.06] hover:border-accent/20 transition-all duration-300 group"
            >
              <div className="text-3xl mb-4 group-hover:scale-110 transition-transform duration-300 inline-block">
                {item.icon}
              </div>
              <h3 className="text-base font-semibold text-white mb-2">{item.title}</h3>
              <p className="text-sm text-text-muted leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </StaggerReveal>
      </div>
    </section>
  );
}
