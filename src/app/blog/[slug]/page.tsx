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
      <div className="min-h-screen bg-[#f5f0e8] flex items-center justify-center">
        <div className="font-heading text-3xl uppercase animate-pulse text-[#0f0f0f]">Loading...</div>
      </div>
    );
  }

  if (!post) return notFound();

  return (
    <main className="min-h-screen bg-[#f5f0e8] text-[#0f0f0f]">
      <Navbar />

      <article className="pt-40 pb-24 px-6 md:px-10">
        <div className="max-w-3xl mx-auto">
          {/* Back link */}
          <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} className="mb-10">
            <Link
              href="/blog"
              className="font-mono text-xs uppercase tracking-widest text-[#888888] hover:text-[#dd4433] transition-colors cursor-none flex items-center gap-2"
            >
              ← BACK TO BLOG
            </Link>
          </motion.div>

          {/* Header */}
          <motion.header
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12 pb-8 border-b-[2.5px] border-[#0f0f0f]"
          >
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags.map((tag) => (
                <span key={tag} className="font-mono text-[9px] uppercase tracking-widest border-[1.5px] border-[#0f0f0f] px-2 py-0.5">
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="font-heading text-[clamp(36px,6vw,80px)] uppercase leading-[0.9] tracking-[-0.02em] text-[#0f0f0f] mb-6">
              {post.title}
            </h1>

            <div className="flex items-center gap-4 font-mono text-[10px] uppercase tracking-widest text-[#888888]">
              <span>{post.readTime} MIN READ</span>
              <span>·</span>
              <span className={post.published ? "text-green-600" : "text-[#dd4433]"}>
                {post.published ? "PUBLISHED" : "DRAFT"}
              </span>
            </div>
          </motion.header>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="font-mono text-base text-[#0f0f0f] leading-relaxed space-y-6
              [&_h1]:font-heading [&_h1]:text-4xl [&_h1]:uppercase [&_h1]:border-b-[2.5px] [&_h1]:border-[#0f0f0f] [&_h1]:pb-2 [&_h1]:mb-6
              [&_h2]:font-heading [&_h2]:text-3xl [&_h2]:uppercase [&_h2]:mt-12 [&_h2]:mb-4
              [&_h3]:font-heading [&_h3]:text-2xl [&_h3]:uppercase [&_h3]:mt-8 [&_h3]:mb-3
              [&_p]:font-mono [&_p]:text-base [&_p]:leading-relaxed
              [&_strong]:font-bold [&_strong]:text-[#0f0f0f]
              [&_em]:italic
              [&_a]:text-[#dd4433] [&_a]:underline [&_a]:underline-offset-4
              [&_ul]:list-none [&_ul]:space-y-2 [&_ul>li]:before:content-['—'] [&_ul>li]:before:mr-3 [&_ul>li]:before:text-[#dd4433]
              [&_ol]:list-decimal [&_ol]:list-inside [&_ol]:space-y-2
              [&_code]:font-mono [&_code]:text-sm [&_code]:bg-[#0f0f0f] [&_code]:text-[#f5f0e8] [&_code]:px-1.5 [&_code]:py-0.5
              [&_pre]:bg-[#0f0f0f] [&_pre]:text-[#f5f0e8] [&_pre]:p-6 [&_pre]:overflow-x-auto [&_pre]:border-[2.5px] [&_pre]:border-[#0f0f0f]
              [&_blockquote]:border-l-[4px] [&_blockquote]:border-[#dd4433] [&_blockquote]:pl-6 [&_blockquote]:py-1 [&_blockquote]:bg-[#f0d43a]/20
            "
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
            className="mt-16 pt-8 border-t-[2.5px] border-[#0f0f0f]"
          >
            <Link
              href="/blog"
              className="font-mono text-xs uppercase tracking-widest text-[#0f0f0f] hover:text-[#dd4433] transition-colors cursor-none"
            >
              ← MORE POSTS
            </Link>
          </motion.div>
        </div>
      </article>

      <Footer />
    </main>
  );
}
