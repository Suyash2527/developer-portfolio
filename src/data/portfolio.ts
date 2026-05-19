// Static fallback data — used when Firestore is unavailable or during development
import type { Project, Skill } from "@/types";

export const STATIC_PROJECTS: Project[] = [
  {
    id: "1",
    title: "Brownie Bliss E-Commerce",
    description:
      "Full-stack bakery e-commerce platform with OTP authentication, admin panel, and real-time order management.",
    imageUrl: "/projects/brownie-bliss.jpg",
    liveUrl: "https://browniebliss.vercel.app",
    githubUrl: "https://github.com/yourusername/brownie-bliss",
    techStack: ["Next.js", "Node.js", "MongoDB", "Tailwind CSS", "Firebase"],
    featured: true,
    order: 1,
    category: "fullstack",
  },
  {
    id: "2",
    title: "VoteNavigator AI",
    description:
      "AI-powered election navigation assistant built on GCP Cloud Run with Firestore caching and real-time analytics.",
    imageUrl: "/projects/votenavigator.jpg",
    liveUrl: "https://votenavigator.run.app",
    githubUrl: "https://github.com/yourusername/votenavigator",
    techStack: ["Next.js", "TypeScript", "Firebase", "GCP", "Gemini AI"],
    featured: true,
    order: 2,
    category: "cloud",
  },
  {
    id: "3",
    title: "MooVit Logistics Platform",
    description:
      "Real-time logistics and fleet management dashboard with dark mode, animated counters, and live tracking.",
    imageUrl: "/projects/moovit.jpg",
    githubUrl: "https://github.com/yourusername/moovit",
    techStack: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
    featured: true,
    order: 3,
    category: "frontend",
  },
  {
    id: "4",
    title: "Hospital Management System",
    description:
      "Enterprise-grade hospital management OS with patient, pharmacy, lab, and inventory modules deployed on GCP.",
    imageUrl: "/projects/hospital.jpg",
    githubUrl: "https://github.com/yourusername/hospital-ms",
    techStack: ["React", "Node.js", "MongoDB", "GCP Cloud Run", "Docker"],
    featured: false,
    order: 4,
    category: "fullstack",
  },
];

export const STATIC_SKILLS: Skill[] = [
  { id: "1", name: "React", icon: "react", category: "frontend", proficiency: 92, order: 1 },
  { id: "2", name: "Next.js", icon: "nextjs", category: "frontend", proficiency: 90, order: 2 },
  { id: "3", name: "TypeScript", icon: "typescript", category: "frontend", proficiency: 88, order: 3 },
  { id: "4", name: "Node.js", icon: "nodejs", category: "backend", proficiency: 85, order: 4 },
  { id: "5", name: "Express.js", icon: "express", category: "backend", proficiency: 83, order: 5 },
  { id: "6", name: "MongoDB", icon: "mongodb", category: "database", proficiency: 80, order: 6 },
  { id: "7", name: "Firebase", icon: "firebase", category: "cloud", proficiency: 85, order: 7 },
  { id: "8", name: "Google Cloud", icon: "gcp", category: "cloud", proficiency: 75, order: 8 },
  { id: "9", name: "Tailwind CSS", icon: "tailwind", category: "frontend", proficiency: 95, order: 9 },
  { id: "10", name: "Docker", icon: "docker", category: "tools", proficiency: 72, order: 10 },
  { id: "11", name: "GitHub Actions", icon: "github", category: "tools", proficiency: 78, order: 11 },
  { id: "12", name: "REST APIs", icon: "api", category: "backend", proficiency: 90, order: 12 },
];

export const SOCIAL_LINKS = {
  github: "https://github.com/yourusername",
  linkedin: "https://linkedin.com/in/yourusername",
  twitter: "https://twitter.com/yourusername",
  email: "mailto:you@example.com",
};

export const RESUME_URL = "/resume.pdf";

export const GITHUB_USERNAME = process.env.NEXT_PUBLIC_GITHUB_USERNAME || "yourusername";
