"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/utils";


const NAV_ITEMS = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "GitHub", href: "#github" },
  { label: "Blog", href: "#blog" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("hero");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = NAV_ITEMS.map((item) => item.href.replace("#", ""));
      for (const section of sections.reverse()) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (href: string) => {
    const id = href.replace("#", "");
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 h-16 bg-[var(--bg)] border-b-[2.5px] border-[var(--border-color)]"
      >
        {/* Logo */}
        <button
          suppressHydrationWarning
          onClick={() => scrollTo("#hero")}
          className="font-heading text-2xl tracking-tight text-[var(--ink)] uppercase cursor-none"
        >
          SUYASH CHAUDHARI
        </button>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.href.replace("#", "");
            return (
              <button
                key={item.href}
                suppressHydrationWarning
                onClick={() => scrollTo(item.href)}
                className={cn(
                  "relative font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--ink)] pb-1 cursor-none overflow-hidden group",
                  isActive ? "text-[var(--ink)]" : "text-[var(--muted)] hover:text-[var(--ink)]"
                )}
              >
                {item.label}
                <span 
                  className={cn(
                    "absolute bottom-0 left-0 w-full h-[2px] bg-[var(--red)] origin-left transition-transform duration-300 ease-[cubic-bezier(0.77,0,0.175,1)]",
                    isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  )} 
                />
              </button>
            );
          })}
        </div>

        {/* Right controls */}
        <div className="hidden md:flex items-center gap-4">

          <Link
            href="/admin"
            className="font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--ink)] border-[2px] border-[var(--border-color)] px-3 py-1 cursor-none hover:bg-[var(--ink)] hover:text-[var(--bg)] transition-colors"
          >
            Admin
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          suppressHydrationWarning
          className="md:hidden text-[var(--ink)] cursor-none"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <div className="w-5 h-5 flex flex-col justify-center gap-1.5">
            <motion.span
              animate={mobileOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              className="block h-[2.5px] bg-current origin-center"
            />
            <motion.span
              animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
              className="block h-[2.5px] bg-current"
            />
            <motion.span
              animate={mobileOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              className="block h-[2.5px] bg-current origin-center"
            />
          </div>
        </button>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed top-16 left-0 right-0 z-40 bg-[var(--bg)] border-b-[2.5px] border-[var(--border-color)] p-6 flex flex-col gap-4"
          >

            {NAV_ITEMS.map((item, i) => (
              <motion.button
                key={item.href}
                suppressHydrationWarning
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04 }}
                onClick={() => scrollTo(item.href)}
                className={cn(
                  "text-left font-mono text-sm uppercase tracking-widest pb-2 border-b-[1.5px] cursor-none",
                  activeSection === item.href.replace("#", "")
                    ? "text-[var(--red)] border-[var(--red)]"
                    : "text-[var(--ink)] border-transparent"
                )}
              >
                {item.label}
              </motion.button>
            ))}
            <Link
              href="/admin"
              className="mt-4 w-full text-center font-mono text-sm uppercase tracking-widest text-[var(--bg)] bg-[var(--ink)] py-3 cursor-none border-[2.5px] border-[var(--border-color)]"
              onClick={() => setMobileOpen(false)}
            >
              Admin Access
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
