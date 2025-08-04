
import { Header } from "@/components/header";
import { ProjectsSection } from "@/components/projects-section";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function ProjectsPage() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <Header />
      <main className="flex-1 pt-16">
        <div className="container px-4 md:px-6 pt-8">
            <Button asChild variant="ghost">
                <Link href="/">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Home
                </Link>
            </Button>
        </div>
        <ProjectsSection />
      </main>
      <Footer />
    </div>
  );
}
