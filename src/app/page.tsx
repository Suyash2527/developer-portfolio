import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/sections/HeroSection";
import AboutSection from "@/sections/AboutSection";
import SkillsSection from "@/sections/SkillsSection";
import ProjectsSection from "@/sections/ProjectsSection";
import GitHubSection from "@/sections/GitHubSection";
import BlogSection from "@/sections/BlogSection";
import ContactSection from "@/sections/ContactSection";
import { MouseGlow } from "@/components/animations/MouseGlow";

export default function HomePage() {
  return (
    <main className="relative overflow-x-hidden">
      {/* Mouse glow follows cursor */}
      <MouseGlow />

      {/* Floating sticky navbar */}
      <Navbar />

      {/* All sections */}
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <GitHubSection />
      <BlogSection />
      <ContactSection />

      {/* Footer */}
      <Footer />
    </main>
  );
}
