"use client";

import { useState, useEffect } from "react";
import { useParams, notFound } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getBlogPostBySlug } from "@/services/firebase/firestore";
import type { BlogPost } from "@/types";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { MouseGlow } from "@/components/animations/MouseGlow";

const SAMPLE_CONTENT = `
## Introduction

This is a sample blog post. Once you add real content to Firebase Firestore, it will appear here with full Markdown rendering support.

## Getting Started

You can write in **Markdown** with full support for:

- **Bold** and *italic* text
- \`inline code\`
- Code blocks
- Lists and tables

\`\`\`typescript
const greeting = (name: string): string => {
  return \`Hello, \${name}!\`;
};
\`\`\`

## Conclusion

Add your posts via the [Admin Dashboard](/admin) with Firebase Firestore integration.
`;

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBlogPostBySlug(slug)
      .then((data) => {
        if (data) setPost(data);
        else {
          // Show sample post for demo
          setPost({
            id: "demo",
            title: slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
            slug,
            excerpt: "Loading post content from Firebase...",
            content: SAMPLE_CONTENT,
            tags: ["Demo"],
            published: true,
            readTime: 5,
          });
        }
      })
      .catch(() => {
        setPost(null);
      })
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!post) return notFound();

  return (
    <main className="min-h-screen bg-background">
      <MouseGlow />
      <Navbar />

      <article className="pt-40 pb-24 px-6">
        <div className="max-w-3xl mx-auto">
          {/* Back link */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-8"
          >
            <Link
              href="/blog"
              className="text-text-muted hover:text-white text-sm transition-colors flex items-center gap-2 group"
            >
              <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Blog
            </Link>
          </motion.div>

          {/* Header */}
          <motion.header
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-5">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full text-xs bg-accent/10 border border-accent/20 text-accent-light"
                >
                  {tag}
                </span>
              ))}
            </div>

            <h1
              className="text-hero-md font-black text-white mb-5 leading-tight"
              style={{ letterSpacing: "-0.03em" }}
            >
              {post.title}
            </h1>

            <div className="flex items-center gap-4 text-text-muted text-sm">
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {post.readTime} min read
              </span>
              <span className="w-1 h-1 rounded-full bg-text-subtle" />
              <span>{post.published ? "Published" : "Draft"}</span>
            </div>

            {/* Divider */}
            <div className="mt-8 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
          </motion.header>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="prose-portfolio"
          >
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {post.content || SAMPLE_CONTENT}
            </ReactMarkdown>
          </motion.div>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-16 pt-8 border-t border-white/[0.06]"
          >
            <Link href="/blog" className="inline-flex items-center gap-2 text-accent-light text-sm hover:underline underline-offset-4">
              ← More posts
            </Link>
          </motion.div>
        </div>
      </article>

      <Footer />
    </main>
  );
}
