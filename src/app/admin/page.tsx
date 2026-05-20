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
      toast.error("MISSING CREDENTIALS.");
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
      <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center text-[#15a315]">
        <div className="font-mono text-xl uppercase animate-pulse">
          INITIALIZING SECURE UPLINK...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-[#f5f0e8] flex items-center justify-center p-6 relative overflow-hidden font-mono">
      {/* Scanline overlay */}
      <div className="absolute inset-0 pointer-events-none z-50 opacity-10 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%]" />

      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="relative z-10 w-full max-w-lg"
      >
        {/* Terminal Header */}
        <div className="mb-10 text-center">
          <motion.div
            className="inline-block"
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.8, repeat: Infinity, times: [0, 0.5, 0.5, 1], ease: "linear" }}
          >
            <div className="w-[clamp(40px,8vw,80px)] h-[clamp(20px,4vw,40px)] bg-[#dd4433] mx-auto mb-4" />
          </motion.div>
          <h1 className="font-heading text-5xl md:text-7xl uppercase leading-none tracking-[-0.02em] text-[#dd4433]">
            SYSTEM <span className="text-white">AUTH</span>
          </h1>
          <p className="font-mono text-[10px] text-[#888888] uppercase tracking-[0.2em] mt-2">
            RESTRICTED ACCESS // AUTHORIZED PERSONNEL ONLY
          </p>
        </div>

        {/* Terminal Form Window */}
        <div className="border-[2.5px] border-[#333333] bg-[#111111] p-1">
          {/* Top Bar */}
          <div className="flex justify-between items-center bg-[#333333] px-3 py-1 mb-6">
            <span className="font-mono text-[9px] uppercase tracking-widest text-[#888888]">
              LOGIN_SHELL.EXE
            </span>
            <div className="flex gap-2">
              <span className="w-2 h-2 bg-[#888888]" />
              <span className="w-2 h-2 bg-[#888888]" />
              <span className="w-2 h-2 bg-[#dd4433]" />
            </div>
          </div>

          <form onSubmit={handleLogin} className="px-6 pb-8 flex flex-col gap-8">
            <div className="flex flex-col">
              <label className="font-mono text-[10px] uppercase tracking-widest text-[#888888] mb-3 flex items-center gap-2">
                <span className="text-[#dd4433]">&gt;</span> IDENTIFIER (EMAIL)
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                placeholder="root@system.local"
                className="w-full px-0 py-2 bg-transparent border-b-[2.5px] border-[#333333] font-mono text-base text-white placeholder:text-[#444444] focus:outline-none focus:border-[#dd4433] transition-colors rounded-none cursor-none"
              />
            </div>

            <div className="flex flex-col">
              <label className="font-mono text-[10px] uppercase tracking-widest text-[#888888] mb-3 flex items-center gap-2">
                <span className="text-[#dd4433]">&gt;</span> PASSPHRASE
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                placeholder="••••••••"
                className="w-full px-0 py-2 bg-transparent border-b-[2.5px] border-[#333333] font-mono text-base text-white focus:outline-none focus:border-[#dd4433] transition-colors rounded-none cursor-none tracking-[0.3em]"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full font-mono text-sm uppercase tracking-[0.2em] px-8 py-5 border-[2.5px] border-[#dd4433] bg-[#0f0f0f] text-[#dd4433] hover:bg-[#dd4433] hover:text-[#0f0f0f] transition-colors cursor-none disabled:opacity-50 disabled:cursor-not-allowed mt-4 group relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center justify-center gap-3">
                {loading ? "AUTHENTICATING..." : "[ EXECUTE_LOGIN ]"}
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
              </span>
            </button>
          </form>
        </div>

        {/* Decorative Logs */}
        <div className="mt-8 opacity-40">
           <motion.p 
              className="font-mono text-[9px] text-[#15a315] uppercase tracking-widest leading-loose"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              &gt; ENFORCING FIREBASE AUTH SECURITY PROTOCOLS...<br/>
              &gt; WAITING FOR USER INPUT...
           </motion.p>
        </div>
      </motion.div>
    </div>
  );
}
