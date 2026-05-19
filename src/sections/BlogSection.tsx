"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Reveal, StaggerReveal, revealItem } from "@/components/animations/Reveal";
import { getBlogPosts } from "@/services/firebase/firestore";
import { formatDate } from "@/utils";
import type { BlogPost } from "@/types";

const FALLBACK_POSTS: BlogPost[] = [
  {
    id: "1",
    title: "Building Scalable APIs with Node.js and Firebase",
    slug: "scalable-apis-nodejs-firebase",
    excerpt:
      "A deep dive into building production-grade REST APIs using Node.js, Express, and Firebase Firestore with proper error handling and authentication.",
    content: "",
    tags: ["Node.js", "Firebase", "Backend", "API"],
    published: true,
    readTime: 8,
    createdAt: undefined,
  },
  {
    id: "2",
    title: "Deploying Next.js to GCP Cloud Run",
    slug: "nextjs-gcp-cloud-run",
    excerpt:
      "Step-by-step guide to containerizing your Next.js application with Docker and deploying it to Google Cloud Run with CI/CD via GitHub Actions.",
    content: "",
    tags: ["Next.js", "GCP", "Docker", "DevOps"],
    published: true,
    readTime: 12,
    createdAt: undefined,
  },
  {
    id: "3",
    title: "Mastering Framer Motion: Cinematic Animations",
    slug: "mastering-framer-motion",
    excerpt:
      "Learn how to craft premium, cinematic animations in React using Framer Motion — from basic transitions to complex choreographed sequences.",
    content: "",
    tags: ["React", "Framer Motion", "Animation", "UI/UX"],
    published: true,
    readTime: 10,
    createdAt: undefined,
  },
];

const TAG_COLORS = [
  "bg-blue-500/10 border-blue-500/20 text-blue-400",
  "bg-purple-500/10 border-purple-500/20 text-purple-400",
  "bg-emerald-500/10 border-emerald-500/20 text-emerald-400",
  "bg-amber-500/10 border-amber-500/20 text-amber-400",
];

export default function BlogSection() {
  const [posts, setPosts] = useState<BlogPost[]>(FALLBACK_POSTS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBlogPosts()
      .then((data) => {
        if (data.length > 0) setPosts(data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="blog" className="section-padding relative">
      <div className="orb w-80 h-80 bg-accent/10 bottom-20 right-0 translate-x-1/2" />

      <div className="container-max relative">
        {/* Header */}
        <Reveal className="text-center mb-16">
          <span className="section-label mb-4 block">Writing</span>
          <h2 className="text-section-title font-black text-white mb-5">
            Thoughts on{" "}
            <span className="text-gradient-accent">engineering</span>
          </h2>
          <p className="text-text-muted text-lg max-w-xl mx-auto leading-relaxed font-light">
            Sharing knowledge about full-stack development, cloud architecture,
            and frontend engineering.
          </p>
        </Reveal>

        {/* Blog Grid */}
        <StaggerReveal className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <motion.article
              key={post.id}
              variants={revealItem}
              whileHover={{ y: -8, scale: 1.02 }}
              className="glass-card rounded-2xl overflow-hidden border border-white/[0.06] hover:border-accent/20 transition-all duration-300 group flex flex-col"
            >
              {/* Cover image or gradient */}
              <div className="relative h-40 overflow-hidden">
                {post.coverImage ? (
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-background to-background-secondary">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <svg
                        className="w-12 h-12 text-accent/20"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                    </div>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-background-secondary/80 to-transparent" />
              </div>

              <div className="p-5 flex flex-col flex-1">
                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {post.tags.slice(0, 3).map((tag, ti) => (
                    <span
                      key={tag}
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-medium border ${
                        TAG_COLORS[ti % TAG_COLORS.length]
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 className="text-base font-bold text-white mb-2 leading-snug group-hover:text-accent-light transition-colors duration-200 flex-1">
                  {post.title}
                </h3>

                <p className="text-text-muted text-xs leading-relaxed mb-4 line-clamp-2">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between mt-auto pt-3 border-t border-white/[0.06]">
                  <div className="flex items-center gap-2 text-text-subtle text-xs">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {post.readTime} min read
                  </div>

                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-accent-light text-xs font-medium hover:underline underline-offset-4 flex items-center gap-1 group/link"
                  >
                    Read more
                    <svg
                      className="w-3 h-3 group-hover/link:translate-x-1 transition-transform duration-200"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </StaggerReveal>

        {/* View all */}
        <Reveal className="mt-10 text-center">
          <Link
            href="/blog"
            className="outline-button inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-sm font-medium text-white/70 hover:text-white"
          >
            View All Posts
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
