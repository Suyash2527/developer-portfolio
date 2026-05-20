"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "@/services/firebase/firebase";
import { toast } from "react-hot-toast";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) router.replace("/admin/dashboard");
      else setChecking(false);
    });
    return unsub;
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("ENTER CREDENTIALS.");
      return;
    }
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("ACCESS GRANTED.");
      router.push("/admin/dashboard");
    } catch {
      toast.error("ACCESS DENIED.");
    } finally {
      setLoading(false);
    }
  };

  if (checking) {
    return (
      <div className="min-h-screen bg-[#f5f0e8] flex items-center justify-center">
        <div className="font-heading text-4xl uppercase animate-pulse">Checking...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f0e8] flex items-center justify-center px-6 relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-[0.05] bg-graph-paper pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="font-heading text-5xl md:text-6xl text-[#0f0f0f] uppercase leading-none tracking-[-0.02em] mb-2">
            ADMIN <span className="text-[#dd4433]">PANEL</span>
          </h1>
          <p className="font-mono text-xs text-[#888888] uppercase tracking-widest">
            AUTHORIZED PERSONNEL ONLY
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleLogin}
          className="border-[2.5px] border-[#0f0f0f] bg-white brutal-shadow p-8 flex flex-col gap-6"
        >
          <div className="flex flex-col">
            <label className="font-mono text-[10px] uppercase tracking-widest text-[#888888] mb-2">
              EMAIL ID *
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              placeholder="admin@example.com"
              className="w-full px-4 py-3 bg-transparent border-b-[2.5px] border-[#0f0f0f] font-mono text-base text-[#0f0f0f] focus:outline-none focus:bg-[#f5f0e8] focus:border-[#dd4433] transition-colors rounded-none cursor-none"
            />
          </div>

          <div className="flex flex-col">
            <label className="font-mono text-[10px] uppercase tracking-widest text-[#888888] mb-2">
              PASSWORD *
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              placeholder="••••••••"
              className="w-full px-4 py-3 bg-transparent border-b-[2.5px] border-[#0f0f0f] font-mono text-base text-[#0f0f0f] focus:outline-none focus:bg-[#f5f0e8] focus:border-[#dd4433] transition-colors rounded-none cursor-none tracking-widest"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full font-heading text-xl uppercase tracking-wider px-8 py-4 border-[2.5px] border-[#0f0f0f] bg-[#dd4433] text-[#0f0f0f] hover:bg-[#0f0f0f] hover:text-[#f5f0e8] transition-colors cursor-none disabled:opacity-50 mt-4"
          >
            {loading ? "AUTHENTICATING..." : "SIGN IN"}
          </button>
        </form>

        <p className="text-center font-mono text-[10px] text-[#888888] uppercase tracking-widest mt-6">
          PROTECTED BY FIREBASE AUTHENTICATION
        </p>
      </motion.div>
    </div>
  );
}
