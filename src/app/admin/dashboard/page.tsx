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
import { toast } from "react-hot-toast";
import type { Project, BlogPost, ContactSubmission } from "@/types";
import { STATIC_PROJECTS } from "@/data/portfolio";
import Button from "@/components/ui/Button";

type Tab = "projects" | "blogs" | "contacts";

export default function AdminDashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [checking, setChecking] = useState(true);
  const [activeTab, setActiveTab] = useState<Tab>("projects");

  // Auth guard
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      if (!u) router.replace("/admin");
      else { setUser(u); setChecking(false); }
    });
    return unsub;
  }, [router]);

  const handleSignOut = async () => {
    await signOut(auth);
    toast.success("Signed out.");
    router.replace("/admin");
  };

  if (checking) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const TABS: { key: Tab; label: string; icon: string }[] = [
    { key: "projects", label: "Projects", icon: "🚀" },
    { key: "blogs", label: "Blog Posts", icon: "📝" },
    { key: "contacts", label: "Contacts", icon: "📬" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Admin Navbar */}
      <nav className="sticky top-0 z-50 border-b border-white/[0.06] bg-black/80 backdrop-blur-2xl px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-accent/20 border border-accent/30 flex items-center justify-center text-sm">
              ⚙️
            </div>
            <div>
              <h1 className="text-sm font-bold text-white">Admin Dashboard</h1>
              <p className="text-[10px] text-text-muted">{user?.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => router.push("/")}
              className="text-text-muted hover:text-white text-sm transition-colors px-3 py-1.5 rounded-lg hover:bg-white/[0.05]"
            >
              ← Portfolio
            </button>
            <Button variant="outline" size="sm" onClick={handleSignOut}>
              Sign Out
            </Button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Tabs */}
        <div className="flex gap-2 mb-8">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                activeTab === tab.key
                  ? "bg-accent text-white shadow-accent-glow"
                  : "glass-card text-text-muted hover:text-white border border-white/[0.06]"
              }`}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <AnimatePresence mode="wait">
          {activeTab === "projects" && (
            <motion.div
              key="projects"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3 }}
            >
              <ProjectsManager />
            </motion.div>
          )}
          {activeTab === "blogs" && (
            <motion.div
              key="blogs"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3 }}
            >
              <BlogManager />
            </motion.div>
          )}
          {activeTab === "contacts" && (
            <motion.div
              key="contacts"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3 }}
            >
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
    title: "",
    description: "",
    imageUrl: "",
    techStack: [],
    featured: false,
    order: 0,
    category: "fullstack",
  });
  const [techInput, setTechInput] = useState("");
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    getProjects()
      .then((data) => setProjects(data.length > 0 ? data : STATIC_PROJECTS))
      .catch(() => setProjects(STATIC_PROJECTS))
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    if (!form.title || !form.description) {
      toast.error("Title and description are required.");
      return;
    }
    setSaving(true);
    try {
      if (editingId) {
        await updateProject(editingId, form);
        setProjects((prev) => prev.map((p) => (p.id === editingId ? { ...p, ...form } : p)));
        toast.success("Project updated!");
      } else {
        const id = await addProject(form);
        setProjects((prev) => [...prev, { id, ...form }]);
        toast.success("Project added!");
      }
      resetForm();
    } catch {
      toast.error("Save failed.");
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (project: Project) => {
    setForm({
      title: project.title,
      description: project.description,
      imageUrl: project.imageUrl,
      techStack: project.techStack,
      featured: project.featured,
      order: project.order,
      category: project.category,
      liveUrl: project.liveUrl,
      githubUrl: project.githubUrl,
    });
    setTechInput(project.techStack.join(", "));
    setEditingId(project.id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this project?")) return;
    try {
      await deleteProject(id);
      setProjects((prev) => prev.filter((p) => p.id !== id));
      toast.success("Deleted.");
    } catch {
      toast.error("Delete failed.");
    }
  };

  const resetForm = () => {
    setForm({ title: "", description: "", imageUrl: "", techStack: [], featured: false, order: 0, category: "fullstack" });
    setTechInput("");
    setEditingId(null);
    setShowForm(false);
  };

  const handleTechChange = (val: string) => {
    setTechInput(val);
    setForm((prev) => ({ ...prev, techStack: val.split(",").map((t) => t.trim()).filter(Boolean) }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-white">Projects ({projects.length})</h2>
        <Button variant="primary" size="sm" onClick={() => { resetForm(); setShowForm(!showForm); }}>
          {showForm ? "Cancel" : "+ Add Project"}
        </Button>
      </div>

      {/* Add/Edit Form */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="glass-card rounded-2xl p-6 border border-accent/20 space-y-4"
          >
            <h3 className="text-sm font-semibold text-white">{editingId ? "Edit Project" : "New Project"}</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { label: "Title *", name: "title", placeholder: "Project name" },
                { label: "Image URL", name: "imageUrl", placeholder: "https://..." },
                { label: "Live URL", name: "liveUrl", placeholder: "https://..." },
                { label: "GitHub URL", name: "githubUrl", placeholder: "https://github.com/..." },
              ].map((field) => (
                <div key={field.name}>
                  <label className="block text-xs text-text-muted mb-1">{field.label}</label>
                  <input
                    type="text"
                    placeholder={field.placeholder}
                    value={(form as Record<string, unknown>)[field.name] as string || ""}
                    onChange={(e) => setForm((prev) => ({ ...prev, [field.name]: e.target.value }))}
                    className="w-full px-3 py-2 rounded-lg bg-white/[0.04] border border-white/[0.08] text-white text-sm focus:outline-none focus:border-accent/50 transition-all"
                  />
                </div>
              ))}
            </div>
            <div>
              <label className="block text-xs text-text-muted mb-1">Description *</label>
              <textarea
                rows={3}
                placeholder="Project description..."
                value={form.description}
                onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
                className="w-full px-3 py-2 rounded-lg bg-white/[0.04] border border-white/[0.08] text-white text-sm focus:outline-none focus:border-accent/50 transition-all resize-none"
              />
            </div>
            <div className="grid sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs text-text-muted mb-1">Tech Stack (comma separated)</label>
                <input
                  type="text"
                  placeholder="React, Node.js, Firebase"
                  value={techInput}
                  onChange={(e) => handleTechChange(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-white/[0.04] border border-white/[0.08] text-white text-sm focus:outline-none focus:border-accent/50 transition-all"
                />
              </div>
              <div>
                <label className="block text-xs text-text-muted mb-1">Category</label>
                <select
                  value={form.category}
                  onChange={(e) => setForm((prev) => ({ ...prev, category: e.target.value as Project["category"] }))}
                  className="w-full px-3 py-2 rounded-lg bg-[#111] border border-white/[0.08] text-white text-sm focus:outline-none"
                >
                  {["fullstack", "frontend", "backend", "cloud", "other"].map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs text-text-muted mb-1">Order</label>
                <input
                  type="number"
                  value={form.order}
                  onChange={(e) => setForm((prev) => ({ ...prev, order: Number(e.target.value) }))}
                  className="w-full px-3 py-2 rounded-lg bg-white/[0.04] border border-white/[0.08] text-white text-sm focus:outline-none"
                />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2 text-sm text-text-muted cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.featured}
                  onChange={(e) => setForm((prev) => ({ ...prev, featured: e.target.checked }))}
                  className="accent-accent"
                />
                Featured Project
              </label>
              <div className="ml-auto flex gap-3">
                <Button variant="ghost" size="sm" onClick={resetForm}>Cancel</Button>
                <Button variant="primary" size="sm" loading={saving} onClick={handleSave}>
                  {editingId ? "Update" : "Save"}
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Projects List */}
      {loading ? (
        <div className="grid sm:grid-cols-2 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="glass-card rounded-xl h-24 border border-white/[0.06] animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 gap-4">
          {projects.map((project) => (
            <div
              key={project.id}
              className="glass-card rounded-xl p-4 border border-white/[0.06] flex items-start justify-between gap-3"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-sm font-semibold text-white truncate">{project.title}</h3>
                  {project.featured && (
                    <span className="px-1.5 py-0.5 rounded text-[10px] bg-accent/20 text-accent-light flex-shrink-0">Featured</span>
                  )}
                </div>
                <p className="text-xs text-text-muted line-clamp-1">{project.description}</p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {project.techStack.slice(0, 3).map((t) => (
                    <span key={t} className="px-1.5 py-0.5 rounded text-[10px] bg-white/[0.05] text-text-muted">{t}</span>
                  ))}
                </div>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <button
                  onClick={() => handleEdit(project)}
                  className="px-3 py-1.5 rounded-lg text-xs text-text-muted hover:text-white hover:bg-white/[0.08] transition-all"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(project.id)}
                  className="px-3 py-1.5 rounded-lg text-xs text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all"
                >
                  Delete
                </button>
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
  const [form, setForm] = useState<Omit<BlogPost, "id">>({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    tags: [],
    published: false,
    readTime: 5,
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
      toast.error("Title and slug are required.");
      return;
    }
    setSaving(true);
    try {
      if (editingId) {
        await updateBlogPost(editingId, form);
        setPosts((prev) => prev.map((p) => (p.id === editingId ? { ...p, ...form } : p)));
        toast.success("Post updated!");
      } else {
        const id = await addBlogPost(form);
        setPosts((prev) => [...prev, { id, ...form }]);
        toast.success("Post added!");
      }
      resetForm();
    } catch {
      toast.error("Save failed.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this post?")) return;
    try {
      await deleteBlogPost(id);
      setPosts((prev) => prev.filter((p) => p.id !== id));
      toast.success("Deleted.");
    } catch {
      toast.error("Delete failed.");
    }
  };

  const resetForm = () => {
    setForm({ title: "", slug: "", excerpt: "", content: "", tags: [], published: false, readTime: 5 });
    setTagInput("");
    setEditingId(null);
    setShowForm(false);
  };

  const handleEdit = (post: BlogPost) => {
    setForm({ title: post.title, slug: post.slug, excerpt: post.excerpt, content: post.content, tags: post.tags, published: post.published, readTime: post.readTime });
    setTagInput(post.tags.join(", "));
    setEditingId(post.id);
    setShowForm(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-white">Blog Posts ({posts.length})</h2>
        <Button variant="primary" size="sm" onClick={() => { resetForm(); setShowForm(!showForm); }}>
          {showForm ? "Cancel" : "+ New Post"}
        </Button>
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="glass-card rounded-2xl p-6 border border-accent/20 space-y-4"
          >
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { label: "Title *", key: "title", placeholder: "Post title" },
                { label: "Slug *", key: "slug", placeholder: "post-slug" },
                { label: "Read Time (min)", key: "readTime", placeholder: "5", type: "number" },
                { label: "Cover Image URL", key: "coverImage", placeholder: "https://..." },
              ].map((f) => (
                <div key={f.key}>
                  <label className="block text-xs text-text-muted mb-1">{f.label}</label>
                  <input
                    type={f.type || "text"}
                    placeholder={f.placeholder}
                    value={(form as Record<string, unknown>)[f.key] as string || ""}
                    onChange={(e) => setForm((prev) => ({ ...prev, [f.key]: f.type === "number" ? Number(e.target.value) : e.target.value }))}
                    className="w-full px-3 py-2 rounded-lg bg-white/[0.04] border border-white/[0.08] text-white text-sm focus:outline-none focus:border-accent/50"
                  />
                </div>
              ))}
            </div>
            <div>
              <label className="block text-xs text-text-muted mb-1">Excerpt</label>
              <textarea
                rows={2}
                placeholder="Brief post summary..."
                value={form.excerpt}
                onChange={(e) => setForm((prev) => ({ ...prev, excerpt: e.target.value }))}
                className="w-full px-3 py-2 rounded-lg bg-white/[0.04] border border-white/[0.08] text-white text-sm focus:outline-none focus:border-accent/50 resize-none"
              />
            </div>
            <div>
              <label className="block text-xs text-text-muted mb-1">Content (Markdown)</label>
              <textarea
                rows={8}
                placeholder="# Post content in Markdown..."
                value={form.content}
                onChange={(e) => setForm((prev) => ({ ...prev, content: e.target.value }))}
                className="w-full px-3 py-2 rounded-lg bg-white/[0.04] border border-white/[0.08] text-white text-sm font-mono focus:outline-none focus:border-accent/50 resize-none"
              />
            </div>
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <label className="block text-xs text-text-muted mb-1">Tags (comma separated)</label>
                <input
                  type="text"
                  placeholder="React, TypeScript, Node.js"
                  value={tagInput}
                  onChange={(e) => { setTagInput(e.target.value); setForm((prev) => ({ ...prev, tags: e.target.value.split(",").map((t) => t.trim()).filter(Boolean) })); }}
                  className="w-full px-3 py-2 rounded-lg bg-white/[0.04] border border-white/[0.08] text-white text-sm focus:outline-none focus:border-accent/50"
                />
              </div>
              <label className="flex items-center gap-2 text-sm text-text-muted cursor-pointer mt-5">
                <input
                  type="checkbox"
                  checked={form.published}
                  onChange={(e) => setForm((prev) => ({ ...prev, published: e.target.checked }))}
                  className="accent-accent"
                />
                Published
              </label>
            </div>
            <div className="flex gap-3 justify-end">
              <Button variant="ghost" size="sm" onClick={resetForm}>Cancel</Button>
              <Button variant="primary" size="sm" loading={saving} onClick={handleSave}>
                {editingId ? "Update" : "Save"}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {loading ? (
        <div className="space-y-3">{[...Array(3)].map((_, i) => <div key={i} className="glass-card rounded-xl h-16 border border-white/[0.06] animate-pulse" />)}</div>
      ) : posts.length === 0 ? (
        <div className="text-center py-12 text-text-muted glass-card rounded-2xl border border-white/[0.06]">
          No blog posts yet. Add your first post!
        </div>
      ) : (
        <div className="space-y-3">
          {posts.map((post) => (
            <div key={post.id} className="glass-card rounded-xl p-4 border border-white/[0.06] flex items-center justify-between gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <h3 className="text-sm font-semibold text-white truncate">{post.title}</h3>
                  <span className={`px-1.5 py-0.5 rounded text-[10px] flex-shrink-0 ${post.published ? "bg-green-500/20 text-green-400" : "bg-yellow-500/20 text-yellow-400"}`}>
                    {post.published ? "Published" : "Draft"}
                  </span>
                </div>
                <p className="text-xs text-text-muted">{post.readTime} min · {post.tags.slice(0,3).join(", ")}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => handleEdit(post)} className="px-3 py-1.5 rounded-lg text-xs text-text-muted hover:text-white hover:bg-white/[0.08] transition-all">Edit</button>
                <button onClick={() => handleDelete(post.id)} className="px-3 py-1.5 rounded-lg text-xs text-red-400 hover:bg-red-500/10 transition-all">Delete</button>
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
      toast.error("Failed to update.");
    }
  };

  const unread = contacts.filter((c) => !c.read).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <h2 className="text-lg font-bold text-white">Contact Submissions ({contacts.length})</h2>
        {unread > 0 && (
          <span className="px-2 py-0.5 rounded-full text-xs bg-accent text-white">{unread} unread</span>
        )}
      </div>

      {loading ? (
        <div className="space-y-3">{[...Array(4)].map((_, i) => <div key={i} className="glass-card rounded-xl h-24 border border-white/[0.06] animate-pulse" />)}</div>
      ) : contacts.length === 0 ? (
        <div className="text-center py-12 text-text-muted glass-card rounded-2xl border border-white/[0.06]">
          No contact submissions yet.
        </div>
      ) : (
        <div className="space-y-3">
          {contacts.map((contact) => (
            <div
              key={contact.id}
              className={`glass-card rounded-xl p-5 border transition-all duration-300 ${
                contact.read ? "border-white/[0.06]" : "border-accent/20 bg-accent/[0.03]"
              }`}
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-semibold text-white">{contact.name}</h3>
                    {!contact.read && (
                      <span className="w-2 h-2 rounded-full bg-accent flex-shrink-0" />
                    )}
                  </div>
                  <p className="text-xs text-text-muted">{contact.email}</p>
                </div>
                <div className="flex items-center gap-2">
                  {!contact.read && (
                    <button
                      onClick={() => handleMarkRead(contact.id)}
                      className="text-xs text-accent-light hover:underline"
                    >
                      Mark read
                    </button>
                  )}
                </div>
              </div>
              {contact.subject && (
                <p className="text-xs font-medium text-white/70 mb-1">Re: {contact.subject}</p>
              )}
              <p className="text-sm text-text-muted leading-relaxed">{contact.message}</p>
              <div className="mt-3">
                <a
                  href={`mailto:${contact.email}?subject=Re: ${encodeURIComponent(contact.subject || "Your message")}`}
                  className="text-xs text-accent-light hover:underline underline-offset-4"
                >
                  Reply via email →
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
