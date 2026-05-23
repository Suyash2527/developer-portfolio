"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal } from "@/components/animations/Reveal";
import { submitContact } from "@/services/firebase/firestore";
import { SOCIAL_LINKS } from "@/data/portfolio";

type FormState = "idle" | "sending" | "success";

export default function ContactSection() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "Inquiry from Portfolio",
    message: "",
  });
  const [formState, setFormState] = useState<FormState>("idle");
  const [progress, setProgress] = useState(0);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("MISSING REQUIRED FIELDS.");
      return;
    }

    setFormState("sending");
    setProgress(0);

    // Animate progress bar 0 → 85% during request
    progressRef.current = setInterval(() => {
      setProgress((p) => {
        if (p >= 85) {
          clearInterval(progressRef.current!);
          return 85;
        }
        return p + Math.random() * 8;
      });
    }, 180);

    try {
      // 1. Save to Firebase
      await submitContact(form);
      
      // 2. Trigger the automated email via our new Next.js API route
      // We don't await this because we don't want to block the success UI
      // if the email takes a second to send or fails.
      fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      }).catch(err => console.error("Failed to send automated email:", err));

      // Finish bar to 100%
      clearInterval(progressRef.current!);
      setProgress(100);
      setTimeout(() => {
        setFormState("success");
      }, 500);
    } catch {
      clearInterval(progressRef.current!);
      setProgress(0);
      setFormState("idle");
      toast.error("DELIVERY FAILED. TRY EMAIL DIRECTLY.");
    }
  };

  const handleReset = () => {
    setForm({ name: "", email: "", subject: "Inquiry from Portfolio", message: "" });
    setFormState("idle");
    setProgress(0);
  };

  return (
    <section id="contact" className="py-24 md:py-32 relative bg-[#f5f0e8]">
      <div className="container-max px-6 md:px-10 relative z-10">

        {/* Section Number */}
        <div className="font-heading text-[180px] leading-none text-[#0f0f0f] opacity-[0.04] select-none absolute -top-8 right-0 pointer-events-none">
          05
        </div>

        {/* Giant Header */}
        <Reveal>
          <div className="mb-12">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#dd4433] mb-4">
              — GET IN TOUCH
            </p>
            <h2 className="font-heading text-[clamp(60px,11vw,160px)] leading-[0.85] tracking-[-0.02em] uppercase text-[#0f0f0f]">
              SAY HELLO<span className="text-[#dd4433]">.</span>
            </h2>
          </div>
        </Reveal>

        <motion.div
          animate={formState === "success" ? { 
            x: [0, -15, 15, -10, 10, -5, 5, 0], 
            y: [0, 10, -10, 8, -8, 4, -4, 0] 
          } : {}}
          transition={{ 
            duration: 0.5, 
            delay: 0.15, // Sync exactly with the rubber stamp hit
            ease: "easeInOut" 
          }}
          className="flex flex-col lg:flex-row gap-0 border-[2.5px] border-[#0f0f0f] brutal-shadow"
        >

          {/* Left Info Panel */}
          <div className="w-full lg:w-1/3 p-8 border-b-[2.5px] lg:border-b-0 lg:border-r-[2.5px] border-[#0f0f0f] bg-[#f0d43a] flex flex-col justify-between">
            <Reveal delay={0.1}>
              <div>
                <p className="font-mono text-sm text-[#0f0f0f] leading-relaxed mb-8 font-bold uppercase">
                  Available for freelance opportunities.
                  <br /><br />
                  Don&apos;t hesitate to reach out if you have a project in mind.
                </p>

                <div className="space-y-3">
                  {[
                    { label: "EMAIL", href: SOCIAL_LINKS.email },
                    { label: "LINKEDIN", href: SOCIAL_LINKS.linkedin, external: true },
                    { label: "GITHUB", href: SOCIAL_LINKS.github, external: true },
                  ].map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      target={link.external ? "_blank" : undefined}
                      className="group flex items-center justify-between w-full font-mono text-xs uppercase tracking-widest px-4 py-3 border-[2.5px] border-[#0f0f0f] bg-white text-[#0f0f0f] hover:bg-[#0f0f0f] hover:text-white transition-colors cursor-none"
                    >
                      {link.label}
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity">↗</span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Response time badge */}
              <div className="mt-8 flex items-center gap-3">
                <span className="inline-block w-2 h-2 bg-green-500 animate-pulse" />
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#0f0f0f]">
                  Usually responds within 24h
                </span>
              </div>
            </Reveal>
          </div>

          {/* Right: Form / Sending / Success */}
          <div className="w-full lg:w-2/3 bg-[#f5f0e8] relative overflow-hidden">
            <AnimatePresence mode="wait">

              {/* ── IDLE FORM ── */}
              {formState === "idle" && (
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.3 }}
                  className="p-8 h-full"
                >
                  <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="flex-1 flex flex-col">
                        <label htmlFor="contact-name" className="font-mono text-[10px] uppercase tracking-widest text-[#555555] mb-2">NAME *</label>
                        <input
                          suppressHydrationWarning
                          id="contact-name"
                          type="text" name="name" value={form.name}
                          onChange={handleChange} required
                          placeholder=""
                          aria-label="Your name"
                          className="w-full px-4 py-3 bg-transparent border-b-[2.5px] border-[#0f0f0f] font-mono text-base text-[#0f0f0f] placeholder:text-[#cccccc] focus:outline-none focus:bg-white focus:border-[#dd4433] transition-colors rounded-none cursor-none"
                        />
                      </div>
                      <div className="flex-1 flex flex-col">
                        <label htmlFor="contact-email" className="font-mono text-[10px] uppercase tracking-widest text-[#555555] mb-2">EMAIL *</label>
                        <input
                          suppressHydrationWarning
                          id="contact-email"
                          type="email" name="email" value={form.email}
                          onChange={handleChange} required
                          placeholder=""
                          aria-label="Your email address"
                          className="w-full px-4 py-3 bg-transparent border-b-[2.5px] border-[#0f0f0f] font-mono text-base text-[#0f0f0f] placeholder:text-[#cccccc] focus:outline-none focus:bg-white focus:border-[#dd4433] transition-colors rounded-none cursor-none"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col">
                      <label htmlFor="contact-subject" className="font-mono text-[10px] uppercase tracking-widest text-[#555555] mb-2">SUBJECT</label>
                      <input
                        suppressHydrationWarning
                        id="contact-subject"
                        type="text" name="subject" value={form.subject}
                        onChange={handleChange}
                        aria-label="Message subject"
                        className="w-full px-4 py-3 bg-transparent border-b-[2.5px] border-[#0f0f0f] font-mono text-base text-[#0f0f0f] focus:outline-none focus:bg-white focus:border-[#dd4433] transition-colors rounded-none cursor-none"
                      />
                    </div>

                    <div className="flex flex-col">
                      <label htmlFor="contact-message" className="font-mono text-[10px] uppercase tracking-widest text-[#555555] mb-2">MESSAGE *</label>
                      <textarea
                        suppressHydrationWarning
                        id="contact-message"
                        name="message" value={form.message}
                        onChange={handleChange} required rows={5}
                        placeholder=""
                        aria-label="Your message"
                        className="w-full px-4 py-3 bg-transparent border-[2.5px] border-[#0f0f0f] font-mono text-base text-[#0f0f0f] placeholder:text-[#cccccc] focus:outline-none focus:bg-white focus:border-[#dd4433] transition-colors resize-none rounded-none cursor-none"
                      />
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <p className="font-mono text-[10px] uppercase tracking-widest text-[#888888]">
                        * Required fields
                      </p>
                      <button
                        suppressHydrationWarning
                        type="submit"
                        className="group relative font-mono text-sm uppercase tracking-widest font-bold px-8 py-4 border-[2.5px] border-[#0f0f0f] bg-[#0f0f0f] text-white hover:bg-[#dd4433] hover:border-[#dd4433] transition-all duration-300 cursor-none overflow-hidden"
                      >
                        <span className="relative z-10 flex items-center gap-3">
                          SEND MESSAGE
                          <span className="inline-block transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">↗</span>
                        </span>
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}

              {/* ── SENDING ANIMATION ── */}
              {formState === "sending" && (
                <motion.div
                  key="sending"
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="p-8 h-full min-h-[400px] flex flex-col justify-center bg-[#0f0f0f] text-[#f5f0e8]"
                >
                  <div className="max-w-md mx-auto w-full">
                    {/* Blinking Header */}
                    <div className="flex items-center gap-4 mb-10">
                      <motion.div 
                        animate={{ opacity: [1, 1, 0, 0] }} 
                        transition={{ duration: 0.8, repeat: Infinity, times: [0, 0.5, 0.5, 1], ease: "linear" }}
                        className="w-6 h-10 bg-[#dd4433]"
                      />
                      <h3 className="font-heading text-4xl uppercase tracking-widest text-white">
                        TRANSMITTING
                      </h3>
                    </div>

                    {/* Fake Terminal Logs */}
                    <div className="font-mono text-xs uppercase tracking-widest text-[#888888] space-y-3 mb-12">
                      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
                        &gt; INITIATING SECURE HANDSHAKE... <span className="text-[#15a315]">OK</span>
                      </motion.p>
                      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
                        &gt; ENCRYPTING PAYLOAD... <span className="text-[#15a315]">OK</span>
                      </motion.p>
                      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}>
                        &gt; ESTABLISHING UPLINK TO SERVER...
                      </motion.p>
                      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }} className="text-[#dd4433] animate-pulse">
                        &gt; TRANSMITTING DATA PACKETS
                      </motion.p>
                    </div>

                    {/* Brutalist Progress Bar */}
                    <div className="w-full">
                      <div className="flex justify-between mb-3">
                        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#888888]">
                          UPLINK STATUS
                        </span>
                        <span className="font-mono text-[12px] text-white">
                          [{Math.round(progress)}%]
                        </span>
                      </div>
                      
                      {/* Heavy blocky progress container */}
                      <div className="w-full h-[36px] border-[2.5px] border-[#333333] p-1 flex">
                        <motion.div
                          className="h-full bg-[#dd4433]"
                          style={{ width: `${progress}%` }}
                          transition={{ duration: 0.1 }}
                        />
                      </div>
                      
                      {/* Decorative hexadecimal data stream */}
                      <div className="mt-4 overflow-hidden h-[15px] opacity-40">
                        <motion.p 
                          className="font-mono text-[10px] text-[#888888] whitespace-nowrap break-all"
                          animate={{ x: [0, -300] }}
                          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        >
                          0x4F 0x6E 0x20 0x61 0x72 0x63 0x68 0x69 0x74 0x65 0x63 0x74 0x75 0x72 0x65 0x20 0x6F 0x66 0x20 0x74 0x68 0x65 0x20 0x75 0x6E 0x69 0x76 0x65 0x72 0x73 0x65 0x2E 0x2E 0x2E
                          0x4F 0x6E 0x20 0x61 0x72 0x63 0x68 0x69 0x74 0x65 0x63 0x74 0x75 0x72 0x65 0x20 0x6F 0x66 0x20 0x74 0x68 0x65 0x20 0x75 0x6E 0x69 0x76 0x65 0x72 0x73 0x65 0x2E 0x2E 0x2E
                        </motion.p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* ── SUCCESS STATE ── */}
              {formState === "success" && (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease: "backOut" }}
                  className="p-8 h-full min-h-[400px] flex flex-col items-center justify-center gap-6 text-center"
                >
                  {/* Big check stamp */}
                  <motion.div
                    initial={{ scale: 0, rotate: -15 }}
                    animate={{ scale: 1, rotate: -3 }}
                    transition={{ duration: 0.6, ease: "backOut", delay: 0.1 }}
                    className="w-28 h-28 border-[4px] border-[#dd4433] flex items-center justify-center text-6xl relative"
                  >
                    <span>✓</span>
                    {/* Stamp effect */}
                    <motion.div
                      className="absolute inset-0 bg-[#dd4433]"
                      initial={{ opacity: 0.6 }}
                      animate={{ opacity: 0 }}
                      transition={{ duration: 0.4, delay: 0.2 }}
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <h3 className="font-heading text-4xl md:text-5xl uppercase text-[#0f0f0f] mb-2">
                      MESSAGE SENT<span className="text-[#dd4433]">!</span>
                    </h3>
                    <p className="font-mono text-sm text-[#888888] uppercase tracking-widest mb-1">
                      Delivered successfully
                    </p>
                    <p className="font-mono text-xs text-[#888888]">
                      I&apos;ll get back to you within 24 hours.
                    </p>
                  </motion.div>

                  {/* Decorative ticker */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="overflow-hidden border-y-[2.5px] border-[#0f0f0f] w-full py-2 bg-[#f0d43a]"
                  >
                    <motion.p
                      className="font-mono text-[10px] uppercase tracking-[0.3em] whitespace-nowrap text-[#0f0f0f]"
                      animate={{ x: ["0%", "-50%"] }}
                      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    >
                      MESSAGE RECEIVED &nbsp;·&nbsp; THANK YOU FOR REACHING OUT &nbsp;·&nbsp; RESPONSE INCOMING &nbsp;·&nbsp; MESSAGE RECEIVED &nbsp;·&nbsp; THANK YOU FOR REACHING OUT &nbsp;·&nbsp; RESPONSE INCOMING &nbsp;·&nbsp;
                    </motion.p>
                  </motion.div>

                  <motion.button
                    suppressHydrationWarning
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    onClick={handleReset}
                    className="font-mono text-xs uppercase tracking-widest px-6 py-3 border-[2.5px] border-[#0f0f0f] bg-white text-[#0f0f0f] hover:bg-[#0f0f0f] hover:text-white transition-colors cursor-none"
                  >
                    SEND ANOTHER MESSAGE
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
