// Central type definitions for the entire portfolio
import { Timestamp } from "firebase/firestore";

/* ─── PROJECT ───────────────────────────────────────────────────── */
export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  imageUrl: string;
  liveUrl?: string;
  githubUrl?: string;
  techStack: string[];
  featured: boolean;
  order: number;
  category: "fullstack" | "frontend" | "backend" | "cloud" | "other";
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

/* ─── BLOG POST ─────────────────────────────────────────────────── */
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string; // Markdown
  coverImage?: string;
  tags: string[];
  published: boolean;
  readTime: number; // minutes
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

/* ─── SKILL ─────────────────────────────────────────────────────── */
export interface Skill {
  id: string;
  name: string;
  icon: string; // React Icons key or URL
  category: "frontend" | "backend" | "cloud" | "tools" | "database";
  proficiency: number; // 1-100
  order: number;
}

/* ─── EXPERIENCE ────────────────────────────────────────────────── */
export interface Experience {
  id: string;
  role: string;
  company: string;
  companyUrl?: string;
  description: string;
  techStack: string[];
  startDate: string; // ISO
  endDate?: string; // undefined = present
  current: boolean;
}

/* ─── CONTACT SUBMISSION ────────────────────────────────────────── */
export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  read: boolean;
  createdAt?: Timestamp;
}

/* ─── GITHUB ────────────────────────────────────────────────────── */
export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  topics: string[];
  fork: boolean;
  updated_at: string;
}

export interface GitHubStats {
  totalRepos: number;
  totalStars: number;
  totalForks: number;
  followers: number;
  following: number;
  name: string;
  bio: string;
  avatarUrl: string;
  profileUrl: string;
}

/* ─── NAVIGATION ─────────────────────────────────────────────────── */
export interface NavItem {
  label: string;
  href: string;
}
