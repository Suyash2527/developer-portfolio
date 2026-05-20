"use client";

import { Reveal } from "@/components/animations/Reveal";
import { motion } from "framer-motion";

export default function AboutSection() {
  return (
    <section id="about" className="py-24 md:py-32 relative border-b-[2.5px] border-[#0f0f0f] bg-[#f5f0e8] overflow-hidden">
      {/* Giant faded number background */}
      <div className="absolute top-0 right-0 font-heading text-[clamp(120px,25vw,300px)] text-[#0f0f0f] opacity-[0.03] leading-none select-none pointer-events-none">
        01
      </div>

      <div className="container-max px-6 md:px-10 relative z-10">
        <Reveal>
          <h2 className="font-heading text-section-title leading-[0.95] tracking-[-0.02em] uppercase text-[#0f0f0f] mb-12">
            The <span className="text-[#dd4433]">Architect.</span>
          </h2>
        </Reveal>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          {/* Left Column: Image/Visual */}
          <Reveal className="w-full lg:w-5/12 flex-shrink-0" direction="up">
            <div className="w-full aspect-[4/5] border-[2.5px] border-[#0f0f0f] bg-[#0f0f0f] relative overflow-hidden group brutal-shadow hover:translate-x-[-4px] hover:translate-y-[-4px] transition-transform duration-200">
              {/* Halftone pattern / placeholder */}
              <div className="absolute inset-0 opacity-[0.1] bg-graph-paper" />
              <div className="absolute inset-0 flex items-center justify-center p-8 group-hover:scale-105 transition-transform duration-500">
                <span className="font-heading text-[60px] md:text-[80px] text-white/20 uppercase break-all leading-[0.8] text-center mix-blend-overlay">
                  YOUR
                  <br />
                  PHOTO
                  <br />
                  HERE
                </span>
              </div>
              <div className="absolute bottom-4 left-4 border-[2px] border-white/50 bg-[#0f0f0f] px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-white/80">
                FIG. 1
              </div>
            </div>
          </Reveal>

          {/* Right Column: Editorial Text */}
          <Reveal className="w-full lg:w-7/12 flex flex-col justify-center" direction="up" delay={0.2}>
            <div className="space-y-6">
              <p className="font-mono text-base md:text-lg text-[#0f0f0f] leading-[1.8]">
                I design and develop digital products from the ground up. Not just writing code — <strong className="font-bold bg-[#dd4433] text-white px-1">engineering experiences</strong> that load fast, scale gracefully, and look incredible.
              </p>
              
              <p className="font-mono text-sm md:text-base text-[#888888] leading-[1.8]">
                My background spans deep backend architecture to pixel-perfect frontend execution. Whether it&apos;s a high-performance Next.js interface or a robust Node/Firebase backend, I focus on shipping production-grade solutions that solve real problems.
              </p>

              <p className="font-mono text-sm md:text-base text-[#888888] leading-[1.8]">
                No templates. No bloated libraries. Just raw code and intentional design.
              </p>

              <div className="pt-8 border-t-[2.5px] border-[#0f0f0f] mt-8 flex flex-wrap gap-4">
                {[
                  "System Architecture",
                  "UI/UX Design",
                  "Performance Tuning",
                  "Cloud Deployment"
                ].map((tag) => (
                  <span key={tag} className="font-mono text-[10px] uppercase tracking-widest border-[1.5px] border-[#0f0f0f] px-3 py-1.5 text-[#0f0f0f]">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
