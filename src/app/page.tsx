import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/sections/HeroSection";
import AboutSection from "@/sections/AboutSection";
import SkillsSection from "@/sections/SkillsSection";
import ProjectsSection from "@/sections/ProjectsSection";
import GitHubSection from "@/sections/GitHubSection";
import BlogSection from "@/sections/BlogSection";
import ContactSection from "@/sections/ContactSection";
import { CustomCursor } from "@/components/animations/CustomCursor";
import { Ticker } from "@/components/ui/Ticker";

export default function HomePage() {
  return (
    <main className="relative overflow-x-hidden">
      {/* Brutalist Custom Cursor */}
      <CustomCursor />

      {/* Floating sticky navbar */}
      <Navbar />

      {/* All sections */}
      <HeroSection />
      
      {/* Brutalist Marquee Ticker */}
      <Ticker />
      
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
