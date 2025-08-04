import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function AboutSection() {
  return (
    <section id="about" className="w-full py-12 md:py-24 lg:py-32 bg-card">
      <div className="container px-4 md:px-6">
        <div className="grid items-center gap-6 lg:grid-cols-2 lg:gap-12">
          <div className="flex justify-center">
            <Image
              src="https://placehold.co/400x400.png"
              width={400}
              height={400}
              alt="Adi's Profile Picture"
              className="rounded-full object-cover"
              data-ai-hint="profile picture"
            />
          </div>
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-accent">About Me</h2>
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
  );
}
