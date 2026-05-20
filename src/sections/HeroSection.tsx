"use client";

import { motion } from "framer-motion";

export default function HeroSection() {
  const name = "YOUR NAME";
  
  return (
    <section
      id="hero"
      className="relative min-h-screen pt-[130px] px-6 md:px-10 pb-[100px] flex flex-col justify-center overflow-hidden bg-graph-paper"
    >
      {/* ── Main Content ─────────────────────────────────────────── */}
      <div className="container-max w-full">
        
        {/* Eyebrow */}
        <p className="font-mono text-[12px] text-[#dd4433] tracking-[0.06em] mb-5">
          // Designer × Developer — Available for work
        </p>

        {/* Hero Name with Glitch Hover */}
        <h1 className="relative inline-block mb-0 group">
          {/* Main animated letters */}
          <span className="font-heading text-hero-xl leading-[0.9] tracking-[-0.02em] text-[#0f0f0f] relative z-10 flex flex-wrap">
            {name.split("").map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 42 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                className="inline-block whitespace-pre"
              >
                {char}
              </motion.span>
            ))}
          </span>

          {/* Glitch layers visible permanently */}
          <span className="absolute top-0 left-0 font-heading text-hero-xl leading-[0.9] tracking-[-0.02em] pointer-events-none whitespace-nowrap opacity-65 text-[#dd4433] z-20 mix-blend-multiply animate-[glR_0.28s_steps(2)_infinite]">
            {name}
          </span>
          <span className="absolute top-0 left-0 font-heading text-hero-xl leading-[0.9] tracking-[-0.02em] pointer-events-none whitespace-nowrap opacity-55 text-[#3344cc] z-20 mix-blend-multiply animate-[glB_0.28s_steps(2)_infinite]">
            {name}
          </span>
          
          {/* Blinking block cursor */}
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="inline-block w-[clamp(32px,4.8vw,68px)] h-[clamp(54px,9vw,120px)] bg-[#dd4433] ml-2.5 align-middle animate-[blink_1s_step-end_infinite] z-10 relative"
          />
        </h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.9 }}
          className="font-mono text-[14px] text-[#888888] leading-[1.75] max-w-[480px] mt-9"
        >
          I craft interfaces that perform, endure, and command attention.<br/>
          Raw code. Intentional design. Zero shortcuts.
        </motion.p>

        {/* ── Lighthouse Scores ───────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="flex flex-wrap gap-5 mt-[52px]"
        >
          {[
            { label: "Performance", score: 100 },
            { label: "Accessibility", score: 100 },
            { label: "Best Practices", score: 100 },
            { label: "SEO", score: 100 },
          ].map((lh, i) => (
            <div key={i} className="flex flex-col items-center gap-2">
              <div className="w-[60px] h-[60px] border-[2.5px] border-[#15a315] flex items-center justify-center font-mono text-[17px] font-bold text-[#15a315]">
                {lh.score}
              </div>
              <div className="font-mono text-[9px] text-[#888888] uppercase tracking-[0.1em] text-center max-w-[70px]">
                {lh.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* ── Metrics Bar ─────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
          className="flex flex-col md:flex-row mt-11 max-w-[680px] border-[2.5px] border-[#0f0f0f]"
        >
          {[
            { num: "12", label: "Projects Shipped" },
            { num: "4", label: "Design Systems" },
            { num: "3+", label: "Years Building" },
            { num: "0", label: "Templates Used" },
          ].map((m, i) => (
            <div 
              key={i} 
              className={`flex-1 p-[16px_18px] flex flex-col gap-[5px] ${
                i !== 0 ? "border-t-[2.5px] md:border-t-0 md:border-l-[2.5px] border-[#0f0f0f]" : ""
              }`}
            >
              <div className="font-heading text-[30px] leading-none text-[#0f0f0f]">{m.num}</div>
              <div className="font-mono text-[9px] text-[#888888] uppercase tracking-[0.09em]">{m.label}</div>
            </div>
          ))}
        </motion.div>

      </div>

      {/* ── Scroll Indicator ─────────────────────────────────────── */}
      <div className="absolute bottom-10 right-10 flex flex-col items-center gap-2.5 hidden md:flex">
        <span className="font-mono text-[9px] tracking-[0.22em] [writing-mode:vertical-rl] uppercase text-[#888888]">
          Scroll
        </span>
        <div className="w-px h-[56px] bg-[#0f0f0f] animate-[scrollLine_2.2s_cubic-bezier(0.77,0,0.175,1)_infinite]" />
      </div>

    </section>
  );
}
