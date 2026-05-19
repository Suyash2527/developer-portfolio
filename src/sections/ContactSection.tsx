"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import { Reveal } from "@/components/animations/Reveal";
import { submitContact } from "@/services/firebase/firestore";
import { SOCIAL_LINKS } from "@/data/portfolio";
import Button from "@/components/ui/Button";

export default function ContactSection() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
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
      toast.error("Please fill in all required fields.");
      return;
    }
    setLoading(true);
    try {
      await submitContact(form);
      toast.success("Message sent! I'll get back to you shortly.");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch {
      toast.error("Failed to send message. Please try email directly.");
    } finally {
      setLoading(false);
    }
  };

  const SOCIALS = [
    { label: "GitHub", href: SOCIAL_LINKS.github, icon: "🐙" },
    { label: "LinkedIn", href: SOCIAL_LINKS.linkedin, icon: "💼" },
    { label: "Twitter", href: SOCIAL_LINKS.twitter, icon: "𝕏" },
    { label: "Email", href: SOCIAL_LINKS.email, icon: "📧" },
  ];

  return (
    <section id="contact" className="section-padding relative bg-background-secondary">
      <div className="orb w-96 h-96 bg-accent/15 top-0 left-1/2 -translate-x-1/2 -translate-y-1/2" />

      <div className="container-max relative">
        {/* Header */}
        <Reveal className="text-center mb-16">
          <span className="section-label mb-4 block">Get in Touch</span>
          <h2 className="text-section-title font-black text-white mb-5">
            Let&apos;s build something{" "}
            <span className="text-gradient-accent">together</span>
          </h2>
          <p className="text-text-muted text-lg max-w-xl mx-auto leading-relaxed font-light">
            Have a project in mind? I&apos;m available for freelance work and
            open to full-time opportunities.
          </p>
        </Reveal>

        <div className="grid lg:grid-cols-5 gap-10 items-start">
          {/* Left info */}
          <Reveal direction="left" className="lg:col-span-2">
            <div className="space-y-6">
              <div className="glass-card rounded-2xl p-6 border border-white/[0.06]">
                <h3 className="text-base font-semibold text-white mb-4">
                  Contact Information
                </h3>
                <div className="space-y-3">
                  <a
                    href={SOCIAL_LINKS.email}
                    className="flex items-center gap-3 text-text-muted hover:text-white transition-colors duration-200 text-sm group"
                  >
                    <span className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center text-sm group-hover:bg-accent/20 transition-colors">
                      ✉️
                    </span>
                    you@example.com
                  </a>
                  <div className="flex items-center gap-3 text-text-muted text-sm">
                    <span className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center text-sm">
                      📍
                    </span>
                    India (IST, UTC+5:30)
                  </div>
                  <div className="flex items-center gap-3 text-text-muted text-sm">
                    <span className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center text-sm">
                      ⏱️
                    </span>
                    Typically responds within 24h
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="glass-card rounded-2xl p-6 border border-white/[0.06]">
                <h3 className="text-base font-semibold text-white mb-4">
                  Connect Online
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {SOCIALS.map((social) => (
                    <Link
                      key={social.label}
                      href={social.href}
                      target={social.href.startsWith("http") ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className="flex items-center gap-2.5 p-3 rounded-xl glass-card glass-card-hover border border-white/[0.06] hover:border-accent/20 text-text-muted hover:text-white transition-all duration-300 text-sm group"
                    >
                      <span className="text-base">{social.icon}</span>
                      <span className="font-medium">{social.label}</span>
                      <svg
                        className="w-3 h-3 ml-auto opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-200"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Availability indicator */}
              <div className="glass-card rounded-2xl p-5 border border-green-500/20 bg-green-500/[0.04]">
                <div className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" />
                  <div>
                    <p className="text-sm font-medium text-white">Available for hire</p>
                    <p className="text-xs text-text-muted">Open to remote opportunities</p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Contact Form */}
          <Reveal direction="right" className="lg:col-span-3">
            <form
              onSubmit={handleSubmit}
              className="glass-card rounded-2xl p-7 border border-white/[0.06] space-y-5"
            >
              <div className="grid sm:grid-cols-2 gap-5">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-text-muted mb-2">
                    Name <span className="text-accent">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    placeholder="Your full name"
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white placeholder:text-text-subtle text-sm focus:outline-none focus:border-accent/50 focus:bg-white/[0.06] transition-all duration-300"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-text-muted mb-2">
                    Email <span className="text-accent">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white placeholder:text-text-subtle text-sm focus:outline-none focus:border-accent/50 focus:bg-white/[0.06] transition-all duration-300"
                  />
                </div>
              </div>

              {/* Subject */}
              <div>
                <label className="block text-sm font-medium text-text-muted mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  placeholder="Project inquiry, Collaboration, etc."
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white placeholder:text-text-subtle text-sm focus:outline-none focus:border-accent/50 focus:bg-white/[0.06] transition-all duration-300"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium text-text-muted mb-2">
                  Message <span className="text-accent">*</span>
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder="Tell me about your project or opportunity..."
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white placeholder:text-text-subtle text-sm focus:outline-none focus:border-accent/50 focus:bg-white/[0.06] transition-all duration-300 resize-none"
                />
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                loading={loading}
                className="w-full"
              >
                {loading ? "Sending..." : "Send Message"}
                {!loading && (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                )}
              </Button>

              <p className="text-center text-xs text-text-subtle">
                Your message is stored securely. No spam, ever.
              </p>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
