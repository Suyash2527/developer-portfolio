import { notFound } from "next/navigation";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getBlogPostBySlug, getBlogPosts } from "@/lib/blog";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

// Generate static params for all MDX posts
export async function generateStaticParams() {
  const posts = getBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return { title: "Post Not Found" };
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) return notFound();

  return (
    <main className="min-h-screen bg-[var(--bg)] text-[var(--ink)]">
      <Navbar />

      <article className="pt-40 pb-24 px-6 md:px-10">
        <div className="max-w-3xl mx-auto">
          {/* Back link */}
          <div className="mb-10">
            <Link
              href="/blog"
              className="font-mono text-xs uppercase tracking-widest text-[var(--muted)] hover:text-[var(--red)] transition-colors cursor-none flex items-center gap-2"
            >
              ← BACK TO BLOG
            </Link>
          </div>

          {/* Header */}
          <header className="mb-12 pb-8 border-b-[2.5px] border-[var(--border-color)]">
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags.map((tag) => (
                <span key={tag} className="font-mono text-[9px] uppercase tracking-widest border-[1.5px] border-[var(--border-color)] px-2 py-0.5">
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="font-heading text-[clamp(36px,6vw,80px)] uppercase leading-[0.9] tracking-[-0.02em] text-[var(--ink)] mb-6">
              {post.title}
            </h1>

            <div className="flex items-center gap-4 font-mono text-[10px] uppercase tracking-widest text-[var(--muted)]">
              <span>{post.readTime} MIN READ</span>
              <span>·</span>
              <span className="text-[var(--ink)]">
                {post.date}
              </span>
            </div>
          </header>

          {/* Content */}
          <div
            className="font-mono text-base text-[var(--ink)] leading-relaxed space-y-6
              [&_h1]:font-heading [&_h1]:text-4xl [&_h1]:uppercase [&_h1]:border-b-[2.5px] [&_h1]:border-[var(--border-color)] [&_h1]:pb-2 [&_h1]:mb-6
              [&_h2]:font-heading [&_h2]:text-3xl [&_h2]:uppercase [&_h2]:mt-12 [&_h2]:mb-4
              [&_h3]:font-heading [&_h3]:text-2xl [&_h3]:uppercase [&_h3]:mt-8 [&_h3]:mb-3
              [&_p]:font-mono [&_p]:text-base [&_p]:leading-relaxed
              [&_strong]:font-bold [&_strong]:text-[var(--ink)]
              [&_em]:italic
              [&_a]:text-[var(--red)] [&_a]:underline [&_a]:underline-offset-4
              [&_ul]:list-none [&_ul]:space-y-2 [&_ul>li]:before:content-['—'] [&_ul>li]:before:mr-3 [&_ul>li]:before:text-[var(--red)]
              [&_ol]:list-decimal [&_ol]:list-inside [&_ol]:space-y-2
              [&_code]:font-mono [&_code]:text-sm [&_code]:bg-[var(--ink)] [&_code]:text-[var(--bg)] [&_code]:px-1.5 [&_code]:py-0.5
              [&_pre]:bg-[var(--ink)] [&_pre]:text-[var(--bg)] [&_pre]:p-6 [&_pre]:overflow-x-auto [&_pre]:border-[2.5px] [&_pre]:border-[var(--border-color)]
              [&_blockquote]:border-l-[4px] [&_blockquote]:border-[var(--red)] [&_blockquote]:pl-6 [&_blockquote]:py-1 [&_blockquote]:bg-[var(--yellow)]/20
            "
          >
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {post.content}
            </ReactMarkdown>
          </div>

          {/* Footer */}
          <div className="mt-16 pt-8 border-t-[2.5px] border-[var(--border-color)]">
            <Link
              href="/blog"
              className="font-mono text-xs uppercase tracking-widest text-[var(--ink)] hover:text-[var(--red)] transition-colors cursor-none"
            >
              ← MORE POSTS
            </Link>
          </div>
        </div>
      </article>

      <Footer />
    </main>
  );
}
