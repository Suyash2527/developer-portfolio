"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { auth } from "@/services/firebase/firebase";
import {
  getProjects, addProject, updateProject, deleteProject,
  getAllBlogPosts, addBlogPost, updateBlogPost, deleteBlogPost,
  getContacts, markContactRead,
} from "@/services/firebase/firestore";
import { uploadFile } from "@/services/firebase/storage";
import { toast } from "react-hot-toast";
import type { Project, BlogPost, ContactSubmission } from "@/types";
import { STATIC_PROJECTS } from "@/data/portfolio";

type Tab = "projects" | "blogs" | "contacts";

export default function AdminDashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [checking, setChecking] = useState(true);
  const [activeTab, setActiveTab] = useState<Tab>("projects");

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      if (!u) router.replace("/admin");
      else { setUser(u); setChecking(false); }
    });
    return unsub;
  }, [router]);

  const handleSignOut = async () => {
    await signOut(auth);
    toast.success("SIGNED OUT.");
    router.replace("/admin");
  };

  if (checking) {
    return (
      <div className="min-h-screen bg-[var(--bg)] flex items-center justify-center">
        <div className="font-heading text-4xl uppercase animate-pulse text-[var(--ink)]">Checking...</div>
      </div>
    );
  }

  const TABS: { key: Tab; label: string }[] = [
    { key: "projects", label: "PROJECTS" },
    { key: "blogs", label: "BLOG POSTS" },
    { key: "contacts", label: "CONTACTS" },
  ];

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--ink)]">
      {/* Admin Navbar */}
      <nav className="sticky top-0 z-50 border-b-[2.5px] border-[var(--border-color)] bg-[var(--yellow)] px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="font-heading text-2xl uppercase">
              ADMIN <span className="text-white mix-blend-difference">SYSTEM</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="hidden md:inline-block font-mono text-[10px] uppercase tracking-widest px-2 py-1 bg-[var(--ink)] text-white">
              {user?.email}
            </span>
            <button
              onClick={() => router.push("/")}
              className="font-mono text-xs uppercase tracking-widest font-bold hover:underline cursor-none"
            >
              ← PORTFOLIO
            </button>
            <button 
              onClick={handleSignOut}
              className="font-mono text-xs uppercase tracking-widest px-4 py-2 border-[2.5px] border-[var(--border-color)] bg-white text-[var(--ink)] hover:bg-[var(--ink)] hover:text-white transition-colors cursor-none"
            >
              SIGN OUT
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-12">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`font-mono text-xs md:text-sm uppercase tracking-widest px-6 py-3 border-[2.5px] border-[var(--border-color)] transition-all duration-300 cursor-none ${
                activeTab === tab.key
                  ? "bg-[var(--ink)] text-white brutal-shadow translate-x-[-2px] translate-y-[-2px]"
                  : "bg-white text-[var(--ink)] hover:bg-[var(--red)] hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <AnimatePresence mode="wait">
          {activeTab === "projects" && (
            <motion.div key="projects" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.3 }}>
              <ProjectsManager />
            </motion.div>
          )}
          {activeTab === "blogs" && (
            <motion.div key="blogs" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.3 }}>
              <BlogManager />
            </motion.div>
          )}
          {activeTab === "contacts" && (
            <motion.div key="contacts" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.3 }}>
              <ContactsManager />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ─── Projects Manager ──────────────────────────────────────────── */
function ProjectsManager() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<Omit<Project, "id">>({
    title: "", description: "", imageUrl: "", techStack: [], featured: false, order: 0, category: "fullstack", liveUrl: "", githubUrl: ""
  });
  const [techInput, setTechInput] = useState("");
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  useEffect(() => {
    getProjects()
      .then((data) => setProjects(data.length > 0 ? data : STATIC_PROJECTS))
      .catch(() => setProjects(STATIC_PROJECTS))
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    if (!form.title || !form.description) {
      toast.error("TITLE AND DESCRIPTION REQUIRED.");
      return;
    }
    setSaving(true);
    try {
      if (editingId) {
        await updateProject(editingId, form);
        setProjects((prev) => prev.map((p) => (p.id === editingId ? { ...p, ...form } : p)));
        toast.success("UPDATED.");
      } else {
        const id = await addProject(form);
        setProjects((prev) => [...prev, { id, ...form }]);
        toast.success("ADDED.");
      }
      resetForm();
    } catch {
      toast.error("SAVE FAILED.");
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (project: Project) => {
    setForm({
      title: project.title, description: project.description, imageUrl: project.imageUrl || "",
      techStack: project.techStack, featured: project.featured, order: project.order, category: project.category,
      liveUrl: project.liveUrl || "", githubUrl: project.githubUrl || "",
    });
    setTechInput(project.techStack.join(", "));
    setEditingId(project.id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("DELETE PROJECT?")) return;
    try {
      await deleteProject(id);
      setProjects((prev) => prev.filter((p) => p.id !== id));
      toast.success("DELETED.");
    } catch {
      toast.error("DELETE FAILED.");
    }
  };

  const resetForm = () => {
    setForm({ title: "", description: "", imageUrl: "", techStack: [], featured: false, order: 0, category: "fullstack", liveUrl: "", githubUrl: "" });
    setTechInput("");
    setEditingId(null);
    setShowForm(false);
  };

  const handleTechChange = (val: string) => {
    setTechInput(val);
    setForm((prev) => ({ ...prev, techStack: val.split(",").map((t) => t.trim()).filter(Boolean) }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingImage(true);
    try {
      const url = await uploadFile(file, "projects");
      setForm((prev) => ({ ...prev, imageUrl: url }));
      toast.success("IMAGE UPLOADED.");
    } catch {
      toast.error("UPLOAD FAILED.");
    } finally {
      setUploadingImage(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between pb-4 border-b-[2.5px] border-[var(--border-color)]">
        <h2 className="font-heading text-3xl uppercase">PROJECTS ({projects.length})</h2>
        <button
          onClick={() => { resetForm(); setShowForm(!showForm); }}
          className="font-mono text-xs uppercase tracking-widest px-4 py-2 border-[2.5px] border-[var(--border-color)] bg-[var(--ink)] text-white hover:bg-[var(--red)] hover:border-[var(--red)] transition-colors cursor-none"
        >
          {showForm ? "CANCEL" : "+ ADD PROJECT"}
        </button>
      </div>

      {/* Add/Edit Form */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
            className="border-[2.5px] border-[var(--border-color)] bg-white brutal-shadow overflow-hidden"
          >
            <div className="p-6 md:p-8 space-y-6">
              <h3 className="font-heading text-2xl uppercase mb-6 pb-2 border-b-[2.5px] border-[var(--border-color)]">
                {editingId ? "EDIT PROJECT" : "NEW PROJECT"}
              </h3>
              <div className="grid sm:grid-cols-2 gap-6">
                {[
                  { label: "TITLE *", name: "title", placeholder: "PROJECT NAME" },
                  { label: "LIVE URL", name: "liveUrl", placeholder: "HTTPS://..." },
                  { label: "GITHUB URL", name: "githubUrl", placeholder: "HTTPS://GITHUB.COM/..." },
                ].map((field) => (
                  <div key={field.name}>
                    <label className="font-mono text-[10px] uppercase tracking-widest text-[var(--muted)] mb-2 block">{field.label}</label>
                    <input
                      type="text" placeholder={field.placeholder}
                      value={(form as Record<string, unknown>)[field.name] as string || ""}
                      onChange={(e) => setForm((prev) => ({ ...prev, [field.name]: e.target.value }))}
                      className="w-full px-4 py-3 bg-transparent border-[2.5px] border-[var(--border-color)] font-mono text-sm focus:outline-none focus:border-[var(--red)] rounded-none cursor-none"
                    />
                  </div>
                ))}
                <div>
                  <label className="font-mono text-[10px] uppercase tracking-widest text-[var(--muted)] mb-2 flex items-center justify-between">
                    IMAGE UPLOAD
                    {uploadingImage && <span className="text-[var(--red)]">UPLOADING...</span>}
                  </label>
                  <input
                    type="file" accept="image/*"
                    onChange={handleImageUpload}
                    disabled={uploadingImage}
                    className="w-full px-4 py-2 bg-transparent border-[2.5px] border-[var(--border-color)] font-mono text-sm focus:outline-none focus:border-[var(--red)] rounded-none cursor-pointer file:mr-4 file:py-1 file:px-3 file:border-[2.5px] file:border-[var(--border-color)] file:bg-[var(--ink)] file:text-white file:cursor-pointer hover:file:bg-[var(--red)]"
                  />
                  {form.imageUrl && (
                    <div className="mt-2 flex items-center gap-2">
                      <span className="font-mono text-[10px] truncate text-[var(--muted)]">{form.imageUrl}</span>
                    </div>
                  )}
                </div>
              </div>
              <div>
                <label className="font-mono text-[10px] uppercase tracking-widest text-[var(--muted)] mb-2 block">DESCRIPTION *</label>
                <textarea
                  rows={3} placeholder="PROJECT DESCRIPTION..."
                  value={form.description}
                  onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
                  className="w-full px-4 py-3 bg-transparent border-[2.5px] border-[var(--border-color)] font-mono text-sm focus:outline-none focus:border-[var(--red)] resize-none rounded-none cursor-none"
                />
              </div>
              <div className="grid sm:grid-cols-3 gap-6">
                <div>
                  <label className="font-mono text-[10px] uppercase tracking-widest text-[var(--muted)] mb-2 block">TECH STACK (CSV)</label>
                  <input
                    type="text" placeholder="REACT, NODE.JS"
                    value={techInput} onChange={(e) => handleTechChange(e.target.value)}
                    className="w-full px-4 py-3 bg-transparent border-[2.5px] border-[var(--border-color)] font-mono text-sm focus:outline-none focus:border-[var(--red)] rounded-none cursor-none"
                  />
                </div>
                <div>
                  <label className="font-mono text-[10px] uppercase tracking-widest text-[var(--muted)] mb-2 block">CATEGORY</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm((prev) => ({ ...prev, category: e.target.value as Project["category"] }))}
                    className="w-full px-4 py-3 bg-transparent border-[2.5px] border-[var(--border-color)] font-mono text-sm focus:outline-none focus:border-[var(--red)] rounded-none cursor-none"
                  >
                    {["fullstack", "frontend", "backend", "cloud", "other"].map((c) => (
                      <option key={c} value={c}>{c.toUpperCase()}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="font-mono text-[10px] uppercase tracking-widest text-[var(--muted)] mb-2 block">ORDER</label>
                  <input
                    type="number" value={form.order}
                    onChange={(e) => setForm((prev) => ({ ...prev, order: Number(e.target.value) }))}
                    className="w-full px-4 py-3 bg-transparent border-[2.5px] border-[var(--border-color)] font-mono text-sm focus:outline-none focus:border-[var(--red)] rounded-none cursor-none"
                  />
                </div>
              </div>
              <div className="flex items-center justify-between pt-4">
                <label className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest cursor-pointer">
                  <input
                    type="checkbox" checked={form.featured}
                    onChange={(e) => setForm((prev) => ({ ...prev, featured: e.target.checked }))}
                    className="w-5 h-5 accent-[#0f0f0f]"
                  />
                  FEATURED PROJECT
                </label>
                <div className="flex gap-4">
                  <button onClick={resetForm} className="font-mono text-xs uppercase tracking-widest hover:underline cursor-none">CANCEL</button>
                  <button onClick={handleSave} disabled={saving} className="font-mono text-xs uppercase tracking-widest px-6 py-3 border-[2.5px] border-[var(--border-color)] bg-[var(--red)] text-white hover:bg-[var(--ink)] cursor-none transition-colors">
                    {saving ? "SAVING..." : editingId ? "UPDATE" : "SAVE"}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Projects List */}
      {loading ? (
        <div className="grid lg:grid-cols-2 gap-6">
          {[...Array(4)].map((_, i) => <div key={i} className="h-32 border-[2.5px] border-dashed border-[var(--muted)] animate-pulse" />)}
        </div>
      ) : (
        <div className="grid lg:grid-cols-2 gap-6">
          {projects.map((project) => (
            <div key={project.id} className="border-[2.5px] border-[var(--border-color)] bg-white p-6 flex flex-col group hover:brutal-shadow transition-all duration-300">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-heading text-2xl uppercase break-words pr-4">{project.title}</h3>
                {project.featured && <span className="font-mono text-[9px] uppercase tracking-widest bg-[var(--yellow)] border-[1.5px] border-[var(--border-color)] px-2 py-1 shrink-0">FEATURED</span>}
              </div>
              <p className="font-mono text-sm text-[var(--muted)] mb-4 line-clamp-2">{project.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {project.techStack.slice(0, 3).map((t) => (
                  <span key={t} className="font-mono text-[9px] uppercase tracking-widest border-[1.5px] border-[var(--border-color)] px-2 py-0.5">{t}</span>
                ))}
              </div>

              <div className="flex gap-4 mt-auto pt-4 border-t-[2.5px] border-[var(--border-color)]/20">
                <button onClick={() => handleEdit(project)} className="font-mono text-[10px] uppercase font-bold tracking-widest text-[var(--ink)] hover:underline cursor-none">EDIT</button>
                <button onClick={() => handleDelete(project.id)} className="font-mono text-[10px] uppercase font-bold tracking-widest text-[var(--red)] hover:underline cursor-none">DELETE</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ─── Blog Manager ──────────────────────────────────────────────── */
function BlogManager() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [form, setForm] = useState<Omit<BlogPost, "id">>({
    title: "", slug: "", excerpt: "", content: "", tags: [], published: false, readTime: 5
  });
  const [tagInput, setTagInput] = useState("");

  useEffect(() => {
    getAllBlogPosts()
      .then(setPosts)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    if (!form.title || !form.slug) {
      toast.error("TITLE AND SLUG REQUIRED.");
      return;
    }
    setSaving(true);
    try {
      if (editingId) {
        await updateBlogPost(editingId, form);
        setPosts((prev) => prev.map((p) => (p.id === editingId ? { ...p, ...form } : p)));
        toast.success("UPDATED.");
      } else {
        const id = await addBlogPost(form);
        setPosts((prev) => [...prev, { id, ...form }]);
        toast.success("ADDED.");
      }
      resetForm();
    } catch {
      toast.error("SAVE FAILED.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("DELETE POST?")) return;
    try {
      await deleteBlogPost(id);
      setPosts((prev) => prev.filter((p) => p.id !== id));
      toast.success("DELETED.");
    } catch {
      toast.error("DELETE FAILED.");
    }
  };

  const resetForm = () => {
    setForm({ title: "", slug: "", excerpt: "", content: "", tags: [], published: false, readTime: 5 });
    setTagInput("");
    setEditingId(null);
    setShowForm(false);
  };

  const handleEdit = (post: BlogPost) => {
    setForm({ title: post.title, slug: post.slug, excerpt: post.excerpt, content: post.content, tags: post.tags, published: post.published, readTime: post.readTime, coverImage: post.coverImage || "" });
    setTagInput(post.tags.join(", "));
    setEditingId(post.id);
    setShowForm(true);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingImage(true);
    try {
      const url = await uploadFile(file, "blogs");
      setForm((prev) => ({ ...prev, coverImage: url }));
      toast.success("IMAGE UPLOADED.");
    } catch {
      toast.error("UPLOAD FAILED.");
    } finally {
      setUploadingImage(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between pb-4 border-b-[2.5px] border-[var(--border-color)]">
        <h2 className="font-heading text-3xl uppercase">BLOG POSTS ({posts.length})</h2>
        <button
          onClick={() => { resetForm(); setShowForm(!showForm); }}
          className="font-mono text-xs uppercase tracking-widest px-4 py-2 border-[2.5px] border-[var(--border-color)] bg-[var(--ink)] text-white hover:bg-[var(--red)] hover:border-[var(--red)] transition-colors cursor-none"
        >
          {showForm ? "CANCEL" : "+ NEW POST"}
        </button>
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
            className="border-[2.5px] border-[var(--border-color)] bg-white brutal-shadow overflow-hidden"
          >
            <div className="p-6 md:p-8 space-y-6">
               <h3 className="font-heading text-2xl uppercase mb-6 pb-2 border-b-[2.5px] border-[var(--border-color)]">
                {editingId ? "EDIT POST" : "NEW POST"}
              </h3>
              <div className="grid sm:grid-cols-2 gap-6">
                {[
                  { label: "TITLE *", key: "title", placeholder: "POST TITLE" },
                  { label: "SLUG *", key: "slug", placeholder: "post-slug" },
                  { label: "READ TIME (MIN)", key: "readTime", placeholder: "5", type: "number" },
                ].map((f) => (
                  <div key={f.key}>
                    <label className="font-mono text-[10px] uppercase tracking-widest text-[var(--muted)] mb-2 block">{f.label}</label>
                    <input
                      type={f.type || "text"} placeholder={f.placeholder}
                      value={(form as Record<string, unknown>)[f.key] as string || ""}
                      onChange={(e) => setForm((prev) => ({ ...prev, [f.key]: f.type === "number" ? Number(e.target.value) : e.target.value }))}
                      className="w-full px-4 py-3 bg-transparent border-[2.5px] border-[var(--border-color)] font-mono text-sm focus:outline-none focus:border-[var(--red)] rounded-none cursor-none"
                    />
                  </div>
                ))}
                <div>
                  <label className="font-mono text-[10px] uppercase tracking-widest text-[var(--muted)] mb-2 flex items-center justify-between">
                    COVER IMAGE UPLOAD
                    {uploadingImage && <span className="text-[var(--red)]">UPLOADING...</span>}
                  </label>
                  <input
                    type="file" accept="image/*"
                    onChange={handleImageUpload}
                    disabled={uploadingImage}
                    className="w-full px-4 py-2 bg-transparent border-[2.5px] border-[var(--border-color)] font-mono text-sm focus:outline-none focus:border-[var(--red)] rounded-none cursor-pointer file:mr-4 file:py-1 file:px-3 file:border-[2.5px] file:border-[var(--border-color)] file:bg-[var(--ink)] file:text-white file:cursor-pointer hover:file:bg-[var(--red)]"
                  />
                  {(form as { coverImage?: string }).coverImage && (
                    <div className="mt-2 flex items-center gap-2">
                      <span className="font-mono text-[10px] truncate text-[var(--muted)]">{(form as { coverImage?: string }).coverImage}</span>
                    </div>
                  )}
                </div>
              </div>
              <div>
                <label className="font-mono text-[10px] uppercase tracking-widest text-[var(--muted)] mb-2 block">EXCERPT</label>
                <textarea
                  rows={2} placeholder="BRIEF SUMMARY..."
                  value={form.excerpt} onChange={(e) => setForm((prev) => ({ ...prev, excerpt: e.target.value }))}
                  className="w-full px-4 py-3 bg-transparent border-[2.5px] border-[var(--border-color)] font-mono text-sm focus:outline-none focus:border-[var(--red)] resize-none rounded-none cursor-none"
                />
              </div>
              <div>
                <label className="font-mono text-[10px] uppercase tracking-widest text-[var(--muted)] mb-2 block">CONTENT (MARKDOWN)</label>
                <textarea
                  rows={8} placeholder="# POST CONTENT..."
                  value={form.content} onChange={(e) => setForm((prev) => ({ ...prev, content: e.target.value }))}
                  className="w-full px-4 py-3 bg-transparent border-[2.5px] border-[var(--border-color)] font-mono text-sm focus:outline-none focus:border-[var(--red)] resize-none rounded-none cursor-none"
                />
              </div>
              <div className="flex flex-col md:flex-row gap-6 md:items-end">
                <div className="flex-1">
                  <label className="font-mono text-[10px] uppercase tracking-widest text-[var(--muted)] mb-2 block">TAGS (CSV)</label>
                  <input
                    type="text" placeholder="REACT, TYPESCRIPT"
                    value={tagInput}
                    onChange={(e) => { setTagInput(e.target.value); setForm((prev) => ({ ...prev, tags: e.target.value.split(",").map((t) => t.trim()).filter(Boolean) })); }}
                    className="w-full px-4 py-3 bg-transparent border-[2.5px] border-[var(--border-color)] font-mono text-sm focus:outline-none focus:border-[var(--red)] rounded-none cursor-none"
                  />
                </div>
                <label className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest cursor-pointer md:pb-4">
                  <input
                    type="checkbox" checked={form.published}
                    onChange={(e) => setForm((prev) => ({ ...prev, published: e.target.checked }))}
                    className="w-5 h-5 accent-[#0f0f0f]"
                  />
                  PUBLISHED
                </label>
              </div>
              <div className="flex gap-4 justify-end pt-4 border-t-[2.5px] border-[var(--border-color)]">
                <button onClick={resetForm} className="font-mono text-xs uppercase tracking-widest hover:underline cursor-none">CANCEL</button>
                <button onClick={handleSave} disabled={saving} className="font-mono text-xs uppercase tracking-widest px-6 py-3 border-[2.5px] border-[var(--border-color)] bg-[var(--red)] text-white hover:bg-[var(--ink)] cursor-none transition-colors">
                  {saving ? "SAVING..." : editingId ? "UPDATE" : "SAVE"}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {loading ? (
        <div className="space-y-4">{[...Array(3)].map((_, i) => <div key={i} className="h-20 border-[2.5px] border-dashed border-[var(--muted)] animate-pulse" />)}</div>
      ) : posts.length === 0 ? (
        <div className="text-center py-16 border-[2.5px] border-dashed border-[var(--muted)] font-mono text-sm uppercase tracking-widest text-[var(--muted)]">
          NO POSTS FOUND.
        </div>
      ) : (
        <div className="space-y-6">
          {posts.map((post) => (
            <div key={post.id} className="border-[2.5px] border-[var(--border-color)] bg-white p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 group hover:bg-[var(--yellow)] transition-colors duration-300">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-heading text-xl uppercase truncate">{post.title}</h3>
                  <span className={`font-mono text-[9px] uppercase tracking-widest px-2 py-1 border-[1.5px] border-[var(--border-color)] flex-shrink-0 ${post.published ? "bg-green-400 text-black" : "bg-white text-black"}`}>
                    {post.published ? "PUBLISHED" : "DRAFT"}
                  </span>
                </div>
                <p className="font-mono text-sm text-[var(--ink)]/70 line-clamp-1">{post.readTime} MIN · {post.tags.join(", ")}</p>
              </div>
              <div className="flex gap-4 border-t-[2.5px] md:border-t-0 md:border-l-[2.5px] border-[var(--border-color)]/20 pt-4 md:pt-0 md:pl-4">
                <button onClick={() => handleEdit(post)} className="font-mono text-[10px] uppercase font-bold tracking-widest text-[var(--ink)] hover:underline cursor-none">EDIT</button>
                <button onClick={() => handleDelete(post.id)} className="font-mono text-[10px] uppercase font-bold tracking-widest text-[var(--red)] hover:underline cursor-none">DELETE</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ─── Contacts Manager ──────────────────────────────────────────── */
function ContactsManager() {
  const [contacts, setContacts] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getContacts()
      .then(setContacts)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleMarkRead = async (id: string) => {
    try {
      await markContactRead(id);
      setContacts((prev) => prev.map((c) => (c.id === id ? { ...c, read: true } : c)));
    } catch {
      toast.error("UPDATE FAILED.");
    }
  };

  const unread = contacts.filter((c) => !c.read).length;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between pb-4 border-b-[2.5px] border-[var(--border-color)]">
        <h2 className="font-heading text-3xl uppercase">CONTACTS ({contacts.length})</h2>
        {unread > 0 && (
          <span className="font-mono text-[10px] uppercase tracking-widest px-3 py-1.5 border-[2.5px] border-[var(--border-color)] bg-[var(--red)] text-white">
            {unread} UNREAD
          </span>
        )}
      </div>

      {loading ? (
        <div className="grid md:grid-cols-2 gap-6">{[...Array(4)].map((_, i) => <div key={i} className="h-32 border-[2.5px] border-dashed border-[var(--muted)] animate-pulse" />)}</div>
      ) : contacts.length === 0 ? (
        <div className="text-center py-16 border-[2.5px] border-dashed border-[var(--muted)] font-mono text-sm uppercase tracking-widest text-[var(--muted)]">
          NO SUBMISSIONS.
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {contacts.map((contact) => (
            <div
              key={contact.id}
              className={`border-[2.5px] p-6 flex flex-col transition-colors duration-300 ${
                contact.read ? "border-[var(--border-color)] bg-white" : "border-[var(--border-color)] bg-[var(--red)] text-white brutal-shadow"
              }`}
            >
              <div className="flex items-start justify-between gap-4 mb-4 pb-4 border-b-[2.5px] border-current/20">
                <div>
                  <h3 className={`font-heading text-2xl uppercase ${contact.read ? "text-[var(--ink)]" : "text-white"}`}>{contact.name}</h3>
                  <p className="font-mono text-[11px] opacity-80">{contact.email}</p>
                </div>
                {!contact.read && (
                  <button
                    onClick={() => handleMarkRead(contact.id)}
                    className="font-mono text-[10px] uppercase tracking-widest font-bold underline cursor-none shrink-0"
                  >
                    MARK READ
                  </button>
                )}
              </div>
              {contact.subject && (
                <p className="font-mono text-[11px] font-bold uppercase tracking-widest mb-2 opacity-90">RE: {contact.subject}</p>
              )}
              <p className="font-mono text-sm leading-relaxed mb-6 opacity-90 whitespace-pre-wrap">{contact.message}</p>
              
              <div className="mt-auto">
                <a
                  href={`mailto:${contact.email}?subject=Re: ${encodeURIComponent(contact.subject || "Your message")}`}
                  className="font-mono text-[10px] uppercase tracking-widest font-bold underline cursor-none opacity-80 hover:opacity-100"
                >
                  REPLY VIA EMAIL ↗
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
