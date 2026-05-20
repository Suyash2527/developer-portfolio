"use client";

import { useState } from "react";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { Reveal } from "@/components/animations/Reveal";
import { submitContact } from "@/services/firebase/firestore";
import { SOCIAL_LINKS } from "@/data/portfolio";
import Button from "@/components/ui/Button";

export default function ContactSection() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "Inquiry from Portfolio",
    message: "",
  });
  const [loading, setLoading] = useState(false);

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
    setLoading(true);
    try {
      await submitContact(form);
      toast.success("MESSAGE DELIVERED.");
      setForm({ name: "", email: "", subject: "Inquiry from Portfolio", message: "" });
    } catch {
      toast.error("DELIVERY FAILED. TRY EMAIL DIRECTLY.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 md:py-32 relative bg-[#f5f0e8]">
      <div className="container-max px-6 md:px-10 relative z-10">
        
        {/* Giant Header */}
        <Reveal>
          <h2 className="font-heading text-[clamp(60px,11vw,160px)] leading-[0.85] tracking-[-0.02em] uppercase text-[#0f0f0f] mb-12">
            SAY HELLO<span className="text-[#dd4433]">.</span>
          </h2>
        </Reveal>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 border-[2.5px] border-[#0f0f0f] bg-white brutal-shadow">
          {/* Left Info */}
          <div className="w-full lg:w-1/3 p-8 border-b-[2.5px] lg:border-b-0 lg:border-r-[2.5px] border-[#0f0f0f] bg-[#f0d43a]">
            <Reveal delay={0.1}>
              <p className="font-mono text-sm md:text-base text-[#0f0f0f] leading-relaxed mb-8 font-bold">
                AVAILABLE FOR FREELANCE OPPORTUNITIES.
                <br /><br />
                DON'T HESITATE TO REACH OUT IF YOU HAVE A PROJECT IN MIND.
              </p>
              
              <div className="space-y-4 flex flex-col items-start">
                <Link
                  href={SOCIAL_LINKS.email}
                  className="font-mono text-xs uppercase tracking-widest px-4 py-2 border-[2.5px] border-[#0f0f0f] bg-white text-[#0f0f0f] hover:bg-[#0f0f0f] hover:text-white transition-colors cursor-none"
                >
                  EMAIL
                </Link>
                <Link
                  href={SOCIAL_LINKS.linkedin}
                  target="_blank"
                  className="font-mono text-xs uppercase tracking-widest px-4 py-2 border-[2.5px] border-[#0f0f0f] bg-white text-[#0f0f0f] hover:bg-[#0f0f0f] hover:text-white transition-colors cursor-none"
                >
                  LINKEDIN
                </Link>
                <Link
                  href={SOCIAL_LINKS.github}
                  target="_blank"
                  className="font-mono text-xs uppercase tracking-widest px-4 py-2 border-[2.5px] border-[#0f0f0f] bg-white text-[#0f0f0f] hover:bg-[#0f0f0f] hover:text-white transition-colors cursor-none"
                >
                  GITHUB
                </Link>
              </div>
            </Reveal>
          </div>

          {/* Right Form */}
          <div className="w-full lg:w-2/3 p-8 bg-[#f5f0e8]">
            <Reveal delay={0.2} className="h-full">
              <form onSubmit={handleSubmit} className="flex flex-col h-full gap-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-1 flex flex-col">
                    <label className="font-mono text-[10px] uppercase tracking-widest text-[#888888] mb-2">
                      NAME *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-transparent border-b-[2.5px] border-[#0f0f0f] font-mono text-base text-[#0f0f0f] focus:outline-none focus:bg-white focus:border-[#dd4433] transition-colors rounded-none cursor-none"
                    />
                  </div>
                  <div className="flex-1 flex flex-col">
                    <label className="font-mono text-[10px] uppercase tracking-widest text-[#888888] mb-2">
                      EMAIL *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-transparent border-b-[2.5px] border-[#0f0f0f] font-mono text-base text-[#0f0f0f] focus:outline-none focus:bg-white focus:border-[#dd4433] transition-colors rounded-none cursor-none"
                    />
                  </div>
                </div>

                <div className="flex-1 flex flex-col">
                  <label className="font-mono text-[10px] uppercase tracking-widest text-[#888888] mb-2">
                    MESSAGE *
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full flex-1 px-4 py-3 bg-transparent border-[2.5px] border-[#0f0f0f] font-mono text-base text-[#0f0f0f] focus:outline-none focus:bg-white focus:border-[#dd4433] transition-colors resize-none rounded-none cursor-none"
                  />
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  loading={loading}
                  className="self-end"
                >
                  {loading ? "SENDING..." : "SUBMIT"}
                </Button>
              </form>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
