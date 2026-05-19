"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal, StaggerReveal, revealItem } from "@/components/animations/Reveal";
import { getProjects } from "@/services/firebase/firestore";
import { STATIC_PROJECTS } from "@/data/portfolio";
import type { Project } from "@/types";

const CATEGORIES = ["All", "fullstack", "frontend", "backend", "cloud"] as const;

// Gradient overlays for cards without images
const CARD_GRADIENTS = [
  "from-purple-900/80 via-accent/40 to-background",
  "from-blue-900/80 via-blue-600/30 to-background",
  "from-emerald-900/80 via-emerald-600/30 to-background",
  "from-rose-900/80 via-rose-600/30 to-background",
];

export default function ProjectsSection() {
  const [projects, setProjects] = useState<Project[]>(STATIC_PROJECTS);
  const [filtered, setFiltered] = useState<Project[]>(STATIC_PROJECTS);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProjects()
      .then((data) => {
        if (data.length > 0) {
          setProjects(data);
          setFiltered(data);
        }
      })
      .catch(() => {}) // Fallback to static data
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (activeCategory === "All") {
      setFiltered(projects);
    } else {
      setFiltered(projects.filter((p) => p.category === activeCategory));
    }
  }, [activeCategory, projects]);

  return (
    <section id="projects" className="section-padding relative">
      <div className="orb w-96 h-96 bg-accent/10 top-20 -right-32" />

      <div className="container-max relative">
        {/* Header */}
        <Reveal className="text-center mb-12">
          <span className="section-label mb-4 block">Featured Work</span>
          <h2 className="text-section-title font-black text-white mb-5">
            Projects that{" "}
            <span className="text-gradient-accent">ship to production</span>
          </h2>
          <p className="text-text-muted text-lg max-w-xl mx-auto leading-relaxed font-light">
            A selection of real-world projects built with modern tech stacks,
            all deployed and actively maintained.
          </p>
        </Reveal>

        {/* Filter Tabs */}
        <Reveal className="flex flex-wrap justify-center gap-2 mb-12">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium capitalize transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-accent text-white shadow-accent-glow"
                  : "glass-card text-text-muted hover:text-white border border-white/[0.06] hover:border-white/[0.12]"
              }`}
            >
              {cat}
            </button>
          ))}
        </Reveal>

        {/* Project Cards Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
                whileHover={{ y: -8 }}
                className="group relative rounded-2xl overflow-hidden border border-white/[0.06] hover:border-accent/20 transition-all duration-500 shadow-glass hover:shadow-card-hover bg-background-secondary"
              >
                {/* Project Image */}
                <div className="relative h-52 overflow-hidden">
                  {project.imageUrl && !project.imageUrl.includes("/projects/") ? (
                    <Image
                      src={project.imageUrl}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  ) : (
                    // Placeholder gradient when no real image
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${CARD_GRADIENTS[i % CARD_GRADIENTS.length]}`}
                    >
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-6xl opacity-20 font-black text-white">
                          {project.title.charAt(0)}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background-secondary via-background-secondary/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />

                  {/* Category badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full text-xs font-medium glass-card border border-white/[0.12] text-white/80 backdrop-blur-md capitalize">
                      {project.category}
                    </span>
                  </div>

                  {/* Featured badge */}
                  {project.featured && (
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-accent/90 border border-accent text-white">
                        Featured
                      </span>
                    </div>
                  )}
                </div>

                {/* Card Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-accent-light transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-text-muted text-sm leading-relaxed mb-4">
                    {project.description}
                  </p>

                  {/* Tech Stack Pills */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.techStack.slice(0, 5).map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded-lg text-[11px] font-medium bg-white/[0.05] border border-white/[0.08] text-text-muted"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.techStack.length > 5 && (
                      <span className="px-2.5 py-1 rounded-lg text-[11px] font-medium bg-white/[0.05] border border-white/[0.08] text-text-muted">
                        +{project.techStack.length - 5}
                      </span>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-3">
                    {project.githubUrl && (
                      <Link
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 text-center outline-button py-2.5 rounded-xl text-sm font-medium text-white/70 hover:text-white inline-flex items-center justify-center gap-2"
                      >
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.741 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                        </svg>
                        GitHub
                      </Link>
                    )}
                    {project.liveUrl && (
                      <Link
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 text-center glow-button py-2.5 rounded-xl text-sm font-medium text-white inline-flex items-center justify-center gap-2"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                        Live Demo
                      </Link>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filtered.length === 0 && !loading && (
          <div className="text-center py-16 text-text-muted">
            No projects found in this category.
          </div>
        )}
      </div>
    </section>
  );
}
