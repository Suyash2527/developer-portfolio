// All Firestore CRUD utilities — projects, blogs, contacts, skills, experience
import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  where,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { db } from "./firebase";
import type {
  Project,
  BlogPost,
  Skill,
  Experience,
  ContactSubmission,
} from "@/types";

/* ─── PROJECTS ──────────────────────────────────────────────────── */
export async function getProjects(): Promise<Project[]> {
  const q = query(collection(db, "projects"), orderBy("order", "asc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Project));
}

export async function getProjectById(id: string): Promise<Project | null> {
  const ref = doc(db, "projects", id);
  const snap = await getDoc(ref);
  return snap.exists() ? ({ id: snap.id, ...snap.data() } as Project) : null;
}

export async function addProject(data: Omit<Project, "id">): Promise<string> {
  const ref = await addDoc(collection(db, "projects"), {
    ...data,
    createdAt: serverTimestamp(),
  });
  return ref.id;
}

export async function updateProject(
  id: string,
  data: Partial<Project>
): Promise<void> {
  await updateDoc(doc(db, "projects", id), { ...data, updatedAt: serverTimestamp() });
}

export async function deleteProject(id: string): Promise<void> {
  await deleteDoc(doc(db, "projects", id));
}

/* ─── BLOG POSTS ────────────────────────────────────────────────── */
export async function getBlogPosts(): Promise<BlogPost[]> {
  const q = query(
    collection(db, "blogs"),
    where("published", "==", true),
    orderBy("createdAt", "desc")
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as BlogPost));
}

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  const q = query(collection(db, "blogs"), orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as BlogPost));
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const q = query(collection(db, "blogs"), where("slug", "==", slug));
  const snap = await getDocs(q);
  if (snap.empty) return null;
  const d = snap.docs[0];
  return { id: d.id, ...d.data() } as BlogPost;
}

export async function addBlogPost(data: Omit<BlogPost, "id">): Promise<string> {
  const ref = await addDoc(collection(db, "blogs"), {
    ...data,
    createdAt: serverTimestamp(),
  });
  return ref.id;
}

export async function updateBlogPost(
  id: string,
  data: Partial<BlogPost>
): Promise<void> {
  await updateDoc(doc(db, "blogs", id), { ...data, updatedAt: serverTimestamp() });
}

export async function deleteBlogPost(id: string): Promise<void> {
  await deleteDoc(doc(db, "blogs", id));
}

/* ─── SKILLS ────────────────────────────────────────────────────── */
export async function getSkills(): Promise<Skill[]> {
  const q = query(collection(db, "skills"), orderBy("order", "asc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Skill));
}

export async function updateSkill(id: string, data: Partial<Skill>): Promise<void> {
  await updateDoc(doc(db, "skills", id), data);
}

/* ─── EXPERIENCE ────────────────────────────────────────────────── */
export async function getExperience(): Promise<Experience[]> {
  const q = query(collection(db, "experience"), orderBy("startDate", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Experience));
}

/* ─── CONTACTS ──────────────────────────────────────────────────── */
export async function submitContact(
  data: Omit<ContactSubmission, "id" | "createdAt" | "read">
): Promise<string> {
  const ref = await addDoc(collection(db, "contacts"), {
    ...data,
    read: false,
    createdAt: serverTimestamp(),
  });
  return ref.id;
}

export async function getContacts(): Promise<ContactSubmission[]> {
  const q = query(collection(db, "contacts"), orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as ContactSubmission));
}

export async function markContactRead(id: string): Promise<void> {
  await updateDoc(doc(db, "contacts", id), { read: true });
}
