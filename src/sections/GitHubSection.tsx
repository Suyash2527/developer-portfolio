"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Reveal, StaggerReveal, revealItem } from "@/components/animations/Reveal";
import { getGitHubRepos, getGitHubStats } from "@/services/github/github";
import { GITHUB_USERNAME } from "@/data/portfolio";
import type { GitHubRepo, GitHubStats } from "@/types";

export default function GitHubSection() {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [stats, setStats] = useState<GitHubStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getGitHubRepos(), getGitHubStats()])
      .then(([r, s]) => {
        setRepos(r);
        setStats(s);
      })
      .finally(() => setLoading(false));
  }, []);

  const STAT_CARDS = stats
    ? [
        { label: "Repositories", value: stats.totalRepos },
        { label: "Total Stars", value: stats.totalStars },
        { label: "Forks", value: stats.totalForks },
        { label: "Followers", value: stats.followers },
      ]
    : [];

  return (
    <section id="github" className="py-24 md:py-32 relative border-b-[2.5px] border-[#0f0f0f] bg-[#0f0f0f]">
      {/* Giant faded number background */}
      <div className="absolute top-0 right-0 font-heading text-[clamp(120px,25vw,300px)] text-[#f5f0e8] opacity-[0.03] leading-none select-none pointer-events-none">
        04
      </div>

      <div className="container-max px-6 md:px-10 relative z-10">
        <Reveal>
          <h2 className="font-heading text-section-title leading-[0.95] tracking-[-0.02em] uppercase text-[#f5f0e8] mb-12">
            Open <span className="text-[#dd4433]">Source.</span>
          </h2>
        </Reveal>

        {/* GitHub Stats */}
        {stats && (
          <Reveal className="mb-12">
            <div className="border-[2.5px] border-[#f5f0e8] bg-[#f5f0e8] flex flex-col md:flex-row brutal-shadow">
              {/* Left Info */}
              <div className="p-6 md:p-8 flex items-center gap-6 md:w-1/3 border-b-[2.5px] md:border-b-0 md:border-r-[2.5px] border-[#0f0f0f]">
                {stats.avatarUrl ? (
                  <img
                    src={stats.avatarUrl}
                    alt={stats.name || GITHUB_USERNAME}
                    className="w-20 h-20 border-[2.5px] border-[#0f0f0f] grayscale hover:grayscale-0 transition-all duration-300"
                  />
                ) : (
                  <div className="w-20 h-20 bg-[#dd4433] border-[2.5px] border-[#0f0f0f] flex items-center justify-center font-heading text-4xl text-[#0f0f0f]">
                    {GITHUB_USERNAME.charAt(0).toUpperCase()}
                  </div>
                )}
                <div>
                  <h3 className="font-heading text-2xl uppercase text-[#0f0f0f]">{stats.name || GITHUB_USERNAME}</h3>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-[#888888] mb-2">{stats.bio || "Full-Stack Developer"}</p>
                  <Link
                    href={stats.profileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-[11px] font-bold text-[#dd4433] hover:underline"
                  >
                    @{GITHUB_USERNAME} ↗
                  </Link>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="flex flex-wrap md:w-2/3 bg-[#0f0f0f]">
                {STAT_CARDS.map((s, i) => (
                  <div
                    key={s.label}
                    className={`w-1/2 p-6 flex flex-col items-center justify-center text-center ${
                      i % 2 === 0 ? "border-r-[2.5px] border-[#f5f0e8]" : ""
                    } ${i < 2 ? "border-b-[2.5px] border-[#f5f0e8]" : ""}`}
                  >
                    <p className="font-heading text-4xl text-[#f5f0e8]">{s.value}</p>
                    <p className="font-mono text-[9px] uppercase tracking-widest text-[#dd4433] mt-1">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        )}

        {/* Repos Grid */}
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-48 border-[2.5px] border-dashed border-[#888888] animate-pulse" />
            ))}
          </div>
        ) : repos.length > 0 ? (
          <StaggerReveal className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {repos.map((repo) => (
              <motion.div
                key={repo.id}
                variants={revealItem}
                className="border-[2.5px] border-[#f5f0e8] bg-[#0f0f0f] p-6 flex flex-col group hover:bg-[#dd4433] hover:border-[#dd4433] transition-colors duration-300 relative"
              >
                <div className="mb-4">
                  <Link
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-heading text-xl uppercase text-[#f5f0e8] group-hover:text-[#0f0f0f] break-all block leading-[1.1]"
                  >
                    {repo.name} ↗
                  </Link>
                </div>

                <p className="font-mono text-sm text-[#888888] group-hover:text-[#f5f0e8] mb-6 flex-1">
                  {repo.description || "No description provided."}
                </p>

                <div className="flex items-center gap-4 border-t-[1.5px] border-dashed border-[#888888] group-hover:border-[#0f0f0f] pt-4 mt-auto">
                  {repo.language && (
                    <span className="font-mono text-[10px] uppercase tracking-widest text-[#f5f0e8] group-hover:text-[#0f0f0f] flex items-center gap-1.5">
                      <span className="w-2 h-2 bg-[#f0d43a] group-hover:bg-[#0f0f0f]" />
                      {repo.language}
                    </span>
                  )}
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[#f5f0e8] group-hover:text-[#0f0f0f]">
                    ★ {repo.stargazers_count}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[#f5f0e8] group-hover:text-[#0f0f0f]">
                    ⑂ {repo.forks_count}
                  </span>
                </div>
              </motion.div>
            ))}
          </StaggerReveal>
        ) : (
          <div className="text-center py-16 border-[2.5px] border-dashed border-[#888888]">
            <p className="font-mono text-sm text-[#888888] uppercase tracking-widest">
              No repositories found.
            </p>
          </div>
        )}

        {/* GitHub Graph */}
        <Reveal className="mt-12">
          <Link
            href={`https://github.com/${GITHUB_USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block border-[2.5px] border-[#f5f0e8] p-4 bg-[#0f0f0f] group hover:bg-[#f5f0e8] transition-colors duration-300 relative overflow-hidden"
          >
            <p className="font-mono text-[11px] uppercase tracking-widest text-[#f5f0e8] group-hover:text-[#0f0f0f] mb-4">
              Commit History ↗
            </p>
            <div className="filter invert opacity-70 group-hover:opacity-100 group-hover:invert-0 transition-all duration-300">
              <img
                src={`https://ghchart.rshah.org/dd4433/${GITHUB_USERNAME}`}
                alt="GitHub contribution chart"
                className="w-full h-auto"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
            </div>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
