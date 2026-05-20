"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { getBlogPosts } from "@/services/firebase/firestore";
import type { BlogPost } from "@/types";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const FALLBACK_POSTS: BlogPost[] = [
  { id: "1", title: "Building Scalable APIs with Node.js and Firebase", slug: "scalable-apis-nodejs-firebase", excerpt: "A deep dive into building production-grade REST APIs with Firebase as the backend.", content: "", tags: ["Node.js", "Firebase", "Backend"], published: true, readTime: 8 },
  { id: "2", title: "Deploying Next.js to GCP Cloud Run", slug: "nextjs-gcp-cloud-run", excerpt: "Containerize and deploy your Next.js app to Google Cloud Run in minutes.", content: "", tags: ["Next.js", "GCP", "Docker"], published: true, readTime: 12 },
  { id: "3", title: "Mastering Framer Motion", slug: "mastering-framer-motion", excerpt: "Craft premium animations in React with Framer Motion from beginner to pro.", content: "", tags: ["React", "Animation"], published: true, readTime: 10 },
];

export default function BlogListPage() {
  const [posts, setPosts] = useState<BlogPost[]>(FALLBACK_POSTS);

  useEffect(() => {
    getBlogPosts().then((data) => { if (data.length > 0) setPosts(data); }).catch(() => {});
  }, []);

  return (
    <main className="min-h-screen bg-[#f5f0e8] text-[#0f0f0f]">
      <Navbar />

      {/* Hero */}
      <section className="pt-40 pb-16 px-6 md:px-10 border-b-[2.5px] border-[#0f0f0f]">
        <div className="max-w-7xl mx-auto">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#dd4433] mb-4">— Writing</p>
          <h1 className="font-heading text-[clamp(56px,10vw,140px)] leading-[0.85] tracking-[-0.02em] uppercase text-[#0f0f0f]">
            THE <span className="text-[#dd4433]">BLOG</span>
          </h1>
          <p className="font-mono text-sm text-[#888888] mt-6 max-w-md uppercase tracking-widest">
            Sharing what I learn about full-stack development, cloud architecture, and building premium products.
          </p>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="px-6 md:px-10 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-0 border-l-[2.5px] border-t-[2.5px] border-[#0f0f0f]">
            {posts.map((post, i) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="border-r-[2.5px] border-b-[2.5px] border-[#0f0f0f] p-8 flex flex-col group bg-white hover:bg-[#f0d43a] transition-colors duration-300"
              >
                {/* Index number */}
                <span className="font-heading text-[80px] leading-none text-[#0f0f0f] opacity-[0.06] select-none mb-2">
                  {String(i + 1).padStart(2, "0")}
                </span>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="font-mono text-[9px] uppercase tracking-widest border-[1.5px] border-[#0f0f0f] px-2 py-0.5">
                      {tag}
                    </span>
                  ))}
                </div>

                <h2 className="font-heading text-2xl uppercase leading-tight mb-3 flex-1">
                  {post.title}
                </h2>
                <p className="font-mono text-xs text-[#888888] leading-relaxed mb-6">{post.excerpt}</p>

                <div className="flex items-center justify-between mt-auto pt-4 border-t-[2.5px] border-[#0f0f0f]/20">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[#888888]">{post.readTime} MIN READ</span>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="font-mono text-[10px] uppercase tracking-widest font-bold text-[#0f0f0f] hover:text-[#dd4433] transition-colors cursor-none flex items-center gap-1"
                  >
                    READ ↗
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
