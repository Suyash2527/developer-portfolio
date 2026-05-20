"use client";

import { Reveal, StaggerReveal, revealItem } from "@/components/animations/Reveal";
import { motion } from "framer-motion";

const SKILLS = [
  { name: "React", category: "Frontend", level: "Expert" },
  { name: "Next.js", category: "Framework", level: "Expert" },
  { name: "TypeScript", category: "Language", level: "Advanced" },
  { name: "Node.js", category: "Backend", level: "Advanced" },
  { name: "Express.js", category: "Backend", level: "Advanced" },
  { name: "MongoDB", category: "Database", level: "Intermediate" },
  { name: "Firebase", category: "Cloud", level: "Intermediate" },
  { name: "Google Cloud", category: "Cloud", level: "Intermediate" },
  { name: "Tailwind CSS", category: "Styling", level: "Expert" },
  { name: "Docker", category: "DevOps", level: "Intermediate" },
  { name: "GitHub Actions", category: "CI/CD", level: "Intermediate" },
  { name: "REST APIs", category: "Backend", level: "Advanced" },
];

export default function SkillsSection() {
  return (
    <section id="skills" className="py-24 md:py-32 relative border-b-[2.5px] border-[#0f0f0f] bg-[#f0d43a]">
      {/* Giant faded number background */}
      <div className="absolute top-0 right-0 font-heading text-[clamp(120px,25vw,300px)] text-[#0f0f0f] opacity-[0.04] leading-none select-none pointer-events-none">
        02
      </div>

      <div className="container-max px-6 md:px-10 relative z-10">
        <Reveal>
          <h2 className="font-heading text-section-title leading-[0.95] tracking-[-0.02em] uppercase text-[#0f0f0f] mb-12">
            Skills <span className="text-white mix-blend-difference">Matrix.</span>
          </h2>
        </Reveal>

        <StaggerReveal className="w-full border-[2.5px] border-[#0f0f0f] bg-[#f5f0e8] flex flex-col brutal-shadow">
          {/* Header row */}
          <div className="flex border-b-[2.5px] border-[#0f0f0f] bg-[#0f0f0f] text-[#f5f0e8]">
            <div className="w-[45%] md:w-[40%] p-4 md:p-5 font-mono text-[11px] md:text-[13px] uppercase tracking-widest border-r-[2.5px] border-[#0f0f0f]">Technology</div>
            <div className="w-[30%] md:w-[40%] p-4 md:p-5 font-mono text-[11px] md:text-[13px] uppercase tracking-widest border-r-[2.5px] border-[#0f0f0f]">Domain</div>
            <div className="w-[25%] md:w-[20%] p-4 md:p-5 font-mono text-[11px] md:text-[13px] uppercase tracking-widest text-center">Level</div>
          </div>

          {/* Data rows */}
          {SKILLS.map((skill, i) => (
            <motion.div
              key={skill.name}
              variants={revealItem}
              className={`flex transition-colors duration-200 hover:bg-[#0f0f0f] hover:text-[#f5f0e8] group ${
                i !== SKILLS.length - 1 ? "border-b-[2.5px] border-[#0f0f0f]" : ""
              }`}
            >
              <div className="w-[45%] md:w-[40%] p-4 md:p-5 font-heading text-xl md:text-2xl uppercase border-r-[2.5px] border-[#0f0f0f] flex items-center group-hover:border-[#f5f0e8]">
                {skill.name}
              </div>
              <div className="w-[30%] md:w-[40%] p-4 md:p-5 font-mono text-[11px] md:text-[13px] uppercase tracking-widest border-r-[2.5px] border-[#0f0f0f] flex items-center group-hover:border-[#f5f0e8]">
                {skill.category}
              </div>
              <div className="w-[25%] md:w-[20%] p-4 md:p-5 font-mono text-[10px] md:text-[12px] uppercase tracking-widest flex items-center justify-center text-center">
                {skill.level}
              </div>
            </motion.div>
          ))}
        </StaggerReveal>
      </div>
    </section>
  );
}
