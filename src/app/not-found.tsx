"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6 relative overflow-hidden">
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute w-96 h-96 bg-accent/15 rounded-full blur-[100px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 text-center"
      >
        <p className="text-8xl font-black text-gradient-accent mb-4" style={{ letterSpacing: "-0.04em" }}>
          404
        </p>
        <h1 className="text-2xl font-bold text-white mb-3">Page not found</h1>
        <p className="text-text-muted mb-8 max-w-sm">
          This page doesn&apos;t exist. Maybe the URL is wrong, or it was moved.
        </p>
        <Link
          href="/"
          className="glow-button inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-sm font-medium text-white"
        >
          ← Back to Portfolio
        </Link>
      </motion.div>
    </div>
  );
}
