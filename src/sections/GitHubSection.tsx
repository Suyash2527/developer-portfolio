"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Reveal, StaggerReveal, revealItem } from "@/components/animations/Reveal";
import { getGitHubRepos, getGitHubStats } from "@/services/github/github";
import { GITHUB_USERNAME } from "@/data/portfolio";
import { getLanguageColor } from "@/utils";
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
        { label: "Repositories", value: stats.totalRepos, icon: "📦" },
        { label: "Total Stars", value: stats.totalStars, icon: "⭐" },
        { label: "Forks", value: stats.totalForks, icon: "🍴" },
        { label: "Followers", value: stats.followers, icon: "👥" },
      ]
    : [];

  return (
    <section id="github" className="section-padding relative bg-background-secondary">
      <div className="orb w-72 h-72 bg-accent/10 top-20 left-0 -translate-x-1/2" />

      <div className="container-max relative">
        {/* Header */}
        <Reveal className="text-center mb-16">
          <span className="section-label mb-4 block">Open Source</span>
          <h2 className="text-section-title font-black text-white mb-5">
            Building in{" "}
            <span className="text-gradient-accent">public</span>
          </h2>
          <p className="text-text-muted text-lg max-w-xl mx-auto leading-relaxed font-light">
            Contributions to the open-source community and personal projects
            on GitHub.
          </p>
        </Reveal>

        {/* GitHub Stats */}
        {stats && (
          <Reveal className="mb-12">
            <div className="glass-card rounded-2xl p-6 border border-white/[0.06] mb-6">
              <div className="flex flex-col sm:flex-row items-center gap-6">
                {/* Avatar */}
                <div className="relative w-16 h-16 rounded-xl overflow-hidden border border-white/[0.1] flex-shrink-0">
                  {stats.avatarUrl ? (
                    <Image
                      src={stats.avatarUrl}
                      alt={stats.name || GITHUB_USERNAME}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-accent/20 flex items-center justify-center text-2xl">
                      👤
                    </div>
                  )}
                </div>
                <div className="text-center sm:text-left">
                  <h3 className="text-lg font-bold text-white">{stats.name || GITHUB_USERNAME}</h3>
                  <p className="text-text-muted text-sm">{stats.bio || "Full-Stack Developer"}</p>
                  <Link
                    href={stats.profileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent-light text-sm hover:underline underline-offset-4 mt-1 inline-block"
                  >
                    @{GITHUB_USERNAME} ↗
                  </Link>
                </div>
                {/* Stats pills */}
                <div className="flex flex-wrap gap-3 sm:ml-auto justify-center">
                  {STAT_CARDS.map((s) => (
                    <div
                      key={s.label}
                      className="text-center px-4 py-2 rounded-xl bg-white/[0.04] border border-white/[0.06]"
                    >
                      <p className="text-lg font-bold text-white">{s.value}</p>
                      <p className="text-[10px] text-text-muted uppercase tracking-wide">{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        )}

        {/* Repos Grid */}
        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="glass-card rounded-2xl p-5 border border-white/[0.06] h-40 animate-pulse"
              />
            ))}
          </div>
        ) : repos.length > 0 ? (
          <StaggerReveal className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {repos.map((repo) => (
              <motion.div
                key={repo.id}
                variants={revealItem}
                whileHover={{ y: -6, scale: 1.02 }}
                className="glass-card rounded-2xl p-5 border border-white/[0.06] hover:border-accent/20 transition-all duration-300 group flex flex-col"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-text-muted flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                    </svg>
                    <Link
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-semibold text-white group-hover:text-accent-light transition-colors duration-200 truncate max-w-[160px]"
                    >
                      {repo.name}
                    </Link>
                  </div>
                  <Link
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-text-subtle hover:text-white transition-colors flex-shrink-0"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </Link>
                </div>

                <p className="text-text-muted text-xs leading-relaxed flex-1 mb-4 line-clamp-2">
                  {repo.description || "No description provided."}
                </p>

                {/* Topics */}
                {repo.topics && repo.topics.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-3">
                    {repo.topics.slice(0, 3).map((topic) => (
                      <span
                        key={topic}
                        className="px-2 py-0.5 rounded text-[10px] bg-accent/10 border border-accent/15 text-accent-light"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                )}

                {/* Footer */}
                <div className="flex items-center gap-4 text-xs text-text-muted">
                  {repo.language && (
                    <span className="flex items-center gap-1.5">
                      <span
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ background: getLanguageColor(repo.language) }}
                      />
                      {repo.language}
                    </span>
                  )}
                  <span className="flex items-center gap-1">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                    {repo.stargazers_count}
                  </span>
                  <span className="flex items-center gap-1">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                    </svg>
                    {repo.forks_count}
                  </span>
                </div>
              </motion.div>
            ))}
          </StaggerReveal>
        ) : (
          <div className="text-center py-12 glass-card rounded-2xl border border-white/[0.06]">
            <p className="text-text-muted">
              Configure your GitHub username in{" "}
              <code className="text-accent-light">.env.local</code> to display
              repositories.
            </p>
          </div>
        )}

        {/* GitHub contribution graph image */}
        <Reveal className="mt-8">
          <Link
            href={`https://github.com/${GITHUB_USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
            className="glass-card rounded-2xl p-6 border border-white/[0.06] hover:border-accent/20 transition-all duration-300 block group"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-semibold text-white">GitHub Activity Graph</span>
              <span className="text-accent-light text-sm group-hover:translate-x-1 transition-transform duration-300">
                View on GitHub ↗
              </span>
            </div>
            {/* Embed contribution graph via GitHub readme stats */}
            <div className="rounded-xl overflow-hidden">
              <img
                src={`https://ghchart.rshah.org/7C3AED/${GITHUB_USERNAME}`}
                alt="GitHub contribution chart"
                className="w-full h-auto opacity-80 group-hover:opacity-100 transition-opacity duration-300"
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
