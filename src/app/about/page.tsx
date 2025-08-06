
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ArrowLeft } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <div className="container px-4 md:px-6 pt-24">
            <Button asChild variant="ghost">
                <Link href="/">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Home
                </Link>
            </Button>
        </div>
        <section id="about" className="w-full py-12 md:py-16 lg:py-24 bg-card">
          <div className="container px-4 md:px-6">
            <div className="grid items-center justify-items-center gap-6 lg:grid-cols-2 lg:gap-12 text-center lg:text-left">
              <div className="flex justify-center lg:justify-start">
                <Image
                  src="adi.jpg"
                  width={400}
                  height={400}
                  alt="Adi's Profile Picture"
                  className="rounded-full object-cover"
                  data-ai-hint="profile picture"
                />
              </div>
              <div className="flex flex-col items-center lg:items-start justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl text-accent">About Me</h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    I'm a full-stack developer with a passion for creating beautiful and functional web experiences. With a strong foundation in both front-end and back-end technologies, I enjoy bringing ideas to life from concept to deployment. I am a lifelong learner, always excited to explore new technologies and improve my skills.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                    <Link href="/resume.pdf" target="_blank" rel="noopener noreferrer">Download Resume</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
