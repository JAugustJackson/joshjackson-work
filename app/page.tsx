import { ExperienceSection } from "@/components/ExperienceSection";
import { Hero } from "@/components/Hero";
import { ToolsSection } from "@/components/ToolsSection";
import { WorkGrid } from "@/components/WorkGrid";

export default function HomePage() {
  return (
    <main id="main" className="min-w-0">
      <Hero />
      <WorkGrid />
      <ExperienceSection />
      <ToolsSection />
    </main>
  );
}
