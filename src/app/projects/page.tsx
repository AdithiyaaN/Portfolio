
import { Header } from "@/components/header";
import { ProjectsSection } from "@/components/projects-section";
import { Footer } from "@/components/footer";

export default function ProjectsPage() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <Header />
      <main className="flex-1 pt-16">
        <ProjectsSection />
      </main>
      <Footer />
    </div>
  );
}
