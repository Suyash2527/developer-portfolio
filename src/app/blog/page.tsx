"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { getBlogPosts } from "@/services/firebase/firestore";
import type { BlogPost } from "@/types";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Reveal, StaggerReveal, revealItem } from "@/components/animations/Reveal";
import { MouseGlow } from "@/components/animations/MouseGlow";
import { formatDate } from "@/utils";

const FALLBACK_POSTS: BlogPost[] = [
  { id: "1", title: "Building Scalable APIs with Node.js and Firebase", slug: "scalable-apis-nodejs-firebase", excerpt: "A deep dive into building production-grade REST APIs.", content: "", tags: ["Node.js", "Firebase", "Backend"], published: true, readTime: 8 },
  { id: "2", title: "Deploying Next.js to GCP Cloud Run", slug: "nextjs-gcp-cloud-run", excerpt: "Containerize and deploy your Next.js app.", content: "", tags: ["Next.js", "GCP", "Docker"], published: true, readTime: 12 },
  { id: "3", title: "Mastering Framer Motion", slug: "mastering-framer-motion", excerpt: "Craft premium animations in React.", content: "", tags: ["React", "Animation"], published: true, readTime: 10 },
];

export default function BlogListPage() {
  const [posts, setPosts] = useState<BlogPost[]>(FALLBACK_POSTS);

  useEffect(() => {
    getBlogPosts().then((data) => { if (data.length > 0) setPosts(data); }).catch(() => {});
  }, []);

  return (
    <main className="min-h-screen bg-background relative">
      <MouseGlow />
      <Navbar />

      {/* Hero */}
      <section className="pt-40 pb-20 px-6 text-center relative">
        <div className="absolute inset-0 animated-gradient-bg" />
        <div className="container-max relative">
          <Reveal>
            <span className="section-label mb-4 block">Writing</span>
            <h1 className="text-hero-lg font-black text-white mb-4">
              Engineering{" "}
              <span className="text-gradient-accent">thoughts</span>
            </h1>
            <p className="text-text-muted text-lg max-w-xl mx-auto font-light">
              Sharing what I learn about full-stack development, cloud architecture,
              and building premium products.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Posts */}
      <section className="section-padding pt-0">
        <div className="container-max">
          <StaggerReveal className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <motion.article
                key={post.id}
                variants={revealItem}
                whileHover={{ y: -8 }}
                className="glass-card rounded-2xl p-6 border border-white/[0.06] hover:border-accent/20 transition-all duration-300 group flex flex-col"
              >
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {post.tags.slice(0, 3).map((tag, i) => (
                    <span key={tag} className="px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-accent/10 border border-accent/20 text-accent-light">{tag}</span>
                  ))}
                </div>
                <h2 className="text-base font-bold text-white mb-2 group-hover:text-accent-light transition-colors duration-200 flex-1">
                  {post.title}
                </h2>
                <p className="text-text-muted text-sm leading-relaxed mb-4">{post.excerpt}</p>
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/[0.06]">
                  <span className="text-text-subtle text-xs">{post.readTime} min read</span>
                  <Link href={`/blog/${post.slug}`} className="text-accent-light text-xs font-medium hover:underline underline-offset-4 flex items-center gap-1">
                    Read →
                  </Link>
                </div>
              </motion.article>
            ))}
          </StaggerReveal>
        </div>
      </section>

      <Footer />
    </main>
  );
}
