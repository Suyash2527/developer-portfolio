/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal } from "@/components/animations/Reveal";
import { getProjects } from "@/services/firebase/firestore";
import { STATIC_PROJECTS } from "@/data/portfolio";
import type { Project } from "@/types";

const CATEGORIES = ["All", "fullstack", "frontend", "backend", "cloud"] as const;

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
      .catch(() => {})
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
    <section id="projects" className="py-24 md:py-32 relative border-b-[2.5px] border-[#0f0f0f]">
      {/* Giant faded number background */}
      <div className="absolute top-0 right-0 font-heading text-[clamp(120px,25vw,300px)] text-[#0f0f0f] opacity-[0.03] leading-none select-none pointer-events-none">
        03
      </div>

      <div className="container-max px-6 md:px-10">
        <Reveal>
          <h2 className="font-heading text-section-title leading-[0.95] tracking-[-0.02em] uppercase text-[#0f0f0f] mb-12 relative z-10">
            Selected <span className="text-[#dd4433]">Works.</span>
          </h2>
        </Reveal>

        {/* Filter Tabs */}
        <Reveal className="flex flex-wrap gap-2 mb-12 relative z-10">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              suppressHydrationWarning
              onClick={() => setActiveCategory(cat)}
              className={`font-mono text-xs uppercase tracking-[0.1em] px-4 py-2 border-[2px] transition-colors duration-200 cursor-none ${
                activeCategory === cat
                  ? "border-[#0f0f0f] bg-[#0f0f0f] text-[#f5f0e8]"
                  : "border-[#0f0f0f] bg-transparent text-[#0f0f0f] hover:bg-[#0f0f0f] hover:text-[#f5f0e8]"
              }`}
            >
              {cat}
            </button>
          ))}
        </Reveal>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 relative z-10">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
                className={`border-[2.5px] border-[#0f0f0f] relative group overflow-hidden bg-white brutal-shadow-hover ${
                  i === 0 ? "md:col-span-8" : i === 1 ? "md:col-span-4" : i === 2 ? "md:col-span-12" : "md:col-span-6"
                }`}
              >
                {/* Project Image Area (using solid color if no image for brutalist look) */}
                <div className="border-b-[2.5px] border-[#0f0f0f] bg-[#0f0f0f] h-[240px] md:h-[320px] relative overflow-hidden group-hover:bg-[#dd4433] transition-colors duration-500">
                  <div className="absolute inset-0 opacity-[0.05] bg-graph-paper pointer-events-none" />
                  
                  {project.imageUrl ? (
                    <img 
                      src={project.imageUrl} 
                      alt={project.title} 
                      className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center p-8">
                      <span className="font-heading text-[80px] md:text-[120px] text-white/10 uppercase break-all leading-[0.8] text-center mix-blend-overlay">
                        {project.title}
                      </span>
                    </div>
                  )}

                  {/* Category Stamp */}
                  <div className="absolute top-4 left-4 bg-white border-[2.5px] border-[#0f0f0f] px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-[#0f0f0f]">
                    {project.category}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 md:p-8 bg-[#f5f0e8]">
                  <h3 className="font-heading text-3xl md:text-4xl text-[#0f0f0f] uppercase mb-4">
                    {project.title}
                  </h3>
                  <p className="font-mono text-[13px] text-[#0f0f0f] leading-relaxed mb-6 line-clamp-3">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="font-mono text-[10px] uppercase tracking-widest border-[1.5px] border-[#0f0f0f] px-2 py-1"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-4">
                    {project.liveUrl && (
                      <Link
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="primary-button flex-1"
                      >
                        Live Site
                      </Link>
                    )}
                    {project.githubUrl && (
                      <Link
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="outline-button flex-1"
                      >
                        GitHub
                      </Link>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filtered.length === 0 && !loading && (
          <div className="text-center py-20 font-mono text-[#888888] uppercase tracking-widest border-[2.5px] border-[#0f0f0f] border-dashed mt-8">
            No projects found in this category.
          </div>
        )}
      </div>
    </section>
  );
}
