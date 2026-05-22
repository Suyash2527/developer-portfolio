"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Reveal, StaggerReveal, revealItem } from "@/components/animations/Reveal";
import { getBlogPosts } from "@/services/firebase/firestore";
import type { BlogPost } from "@/types";

const FALLBACK_POSTS: BlogPost[] = [
  {
    id: "1",
    title: "Building Scalable APIs with Node.js",
    slug: "scalable-apis-nodejs-firebase",
    excerpt: "A deep dive into building production-grade REST APIs using Node.js, Express, and Firebase Firestore.",
    content: "",
    tags: ["Node.js", "Backend"],
    published: true,
    readTime: 8,
    createdAt: undefined,
  },
  {
    id: "2",
    title: "Deploying Next.js to GCP Cloud Run",
    slug: "nextjs-gcp-cloud-run",
    excerpt: "Step-by-step guide to containerizing your Next.js application with Docker and deploying it.",
    content: "",
    tags: ["DevOps", "GCP"],
    published: true,
    readTime: 12,
    createdAt: undefined,
  },
  {
    id: "3",
    title: "Mastering Framer Motion",
    slug: "mastering-framer-motion",
    excerpt: "Learn how to craft premium, cinematic animations in React using Framer Motion.",
    content: "",
    tags: ["React", "Animation"],
    published: true,
    readTime: 10,
    createdAt: undefined,
  },
];

export default function BlogSection() {
  const [posts, setPosts] = useState<BlogPost[]>(FALLBACK_POSTS);


  useEffect(() => {
    getBlogPosts()
      .then((data) => {
        if (data.length > 0) setPosts(data);
      })
      .catch(() => {});
  }, []);

  return (
    <section id="blog" className="py-24 md:py-32 relative border-b-[2.5px] border-[#0f0f0f] bg-[#f5f0e8]">
      <div className="absolute top-0 left-0 font-heading text-[clamp(120px,25vw,300px)] text-[#0f0f0f] opacity-[0.03] leading-none select-none pointer-events-none">
        05
      </div>

      <div className="container-max px-6 md:px-10 relative z-10">
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <h2 className="font-heading text-section-title leading-[0.95] tracking-[-0.02em] uppercase text-[#0f0f0f]">
              Latest <span className="text-[#dd4433]">Logs.</span>
            </h2>
            <Link
              href="/blog"
              className="font-mono text-[11px] uppercase tracking-widest text-[#0f0f0f] border-[2px] border-[#0f0f0f] px-6 py-3 hover:bg-[#0f0f0f] hover:text-[#f5f0e8] transition-colors cursor-none shrink-0"
            >
              View All Posts
            </Link>
          </div>
        </Reveal>

        {/* Blog Grid */}
        <StaggerReveal className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <motion.article
              key={post.id}
              variants={revealItem}
              className={`border-[2.5px] border-[#0f0f0f] p-6 flex flex-col group transition-colors duration-300 relative ${
                i % 2 === 0 ? "bg-[#f0d43a] hover:bg-[#dd4433]" : "bg-white hover:bg-[#0f0f0f]"
              }`}
            >
              <div className="flex flex-wrap gap-2 mb-6">
                {post.tags.slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    className={`font-mono text-[9px] uppercase tracking-widest border-[1.5px] px-2 py-1 ${
                      i % 2 === 0 ? "border-[#0f0f0f] text-[#0f0f0f] group-hover:border-white group-hover:text-white" : "border-[#0f0f0f] text-[#0f0f0f] group-hover:border-white group-hover:text-white"
                    }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <Link
                href={`/blog/${post.slug}`}
                className={`font-heading text-2xl uppercase mb-4 break-words leading-[1.1] ${
                  i % 2 === 0 ? "text-[#0f0f0f] group-hover:text-[#f5f0e8]" : "text-[#0f0f0f] group-hover:text-[#f5f0e8]"
                }`}
              >
                {post.title}
              </Link>

              <p className={`font-mono text-sm mb-8 flex-1 ${
                i % 2 === 0 ? "text-[#0f0f0f]/80 group-hover:text-white/80" : "text-[#888888] group-hover:text-[#888888]"
              }`}>
                {post.excerpt}
              </p>

              <div className={`flex items-center justify-between pt-4 border-t-[2.5px] ${
                i % 2 === 0 ? "border-[#0f0f0f]/20 group-hover:border-white/20" : "border-[#0f0f0f]/20 group-hover:border-white/20"
              }`}>
                <span className={`font-mono text-[10px] uppercase tracking-widest ${
                  i % 2 === 0 ? "text-[#0f0f0f] group-hover:text-[#f5f0e8]" : "text-[#0f0f0f] group-hover:text-[#f5f0e8]"
                }`}>
                  {post.readTime} min read
                </span>
                
                <Link
                  href={`/blog/${post.slug}`}
                  className={`font-mono text-[11px] font-bold underline ${
                    i % 2 === 0 ? "text-[#0f0f0f] group-hover:text-[#f5f0e8]" : "text-[#dd4433] group-hover:text-[#dd4433]"
                  }`}
                >
                  Read ↗
                </Link>
              </div>
            </motion.article>
          ))}
        </StaggerReveal>
      </div>
    </section>
  );
}
