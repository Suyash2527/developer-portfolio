import Link from "next/link";
import { getBlogPosts } from "@/lib/blog";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata = {
  title: "Blog",
  description: "Sharing what I learn about full-stack development, cloud architecture, and building premium products."
};

export default function BlogListPage() {
  const posts = getBlogPosts();

  return (
    <main className="min-h-screen bg-[var(--bg)] text-[var(--ink)]">
      <Navbar />

      {/* Hero */}
      <section className="pt-40 pb-16 px-6 md:px-10 border-b-[2.5px] border-[var(--border-color)]">
        <div className="max-w-7xl mx-auto">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--red)] mb-4">— Writing</p>
          <h1 className="font-heading text-[clamp(56px,10vw,140px)] leading-[0.85] tracking-[-0.02em] uppercase text-[var(--ink)]">
            THE <span className="text-[var(--red)]">BLOG</span>
          </h1>
          <p className="font-mono text-sm text-[var(--muted)] mt-6 max-w-md uppercase tracking-widest">
            Sharing what I learn about full-stack development, cloud architecture, and building premium products.
          </p>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="px-6 md:px-10 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-0 border-l-[2.5px] border-t-[2.5px] border-[var(--border-color)]">
            {posts.map((post, i) => (
              <article
                key={post.slug}
                className="border-r-[2.5px] border-b-[2.5px] border-[var(--border-color)] p-8 flex flex-col group bg-[var(--bg)] hover:bg-[var(--yellow)] hover:text-[#0f0f0f] transition-colors duration-300"
              >
                {/* Index number */}
                <span className="font-heading text-[80px] leading-none text-current opacity-[0.06] select-none mb-2">
                  {String(i + 1).padStart(2, "0")}
                </span>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="font-mono text-[9px] uppercase tracking-widest border-[1.5px] border-current px-2 py-0.5">
                      {tag}
                    </span>
                  ))}
                </div>

                <h2 className="font-heading text-2xl uppercase leading-tight mb-3 flex-1">
                  {post.title}
                </h2>
                <p className="font-mono text-xs text-current opacity-70 leading-relaxed mb-6">{post.excerpt}</p>

                <div className="flex items-center justify-between mt-auto pt-4 border-t-[2.5px] border-current opacity-80">
                  <span className="font-mono text-[10px] uppercase tracking-widest">{post.readTime} MIN READ</span>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="font-mono text-[10px] uppercase tracking-widest font-bold hover:text-[var(--red)] transition-colors cursor-none flex items-center gap-1"
                  >
                    READ ↗
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
