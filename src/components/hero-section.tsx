import { Button } from "@/components/ui/button";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="w-full pt-32 pb-16 md:pt-48 md:pb-24 lg:pt-56 lg:pb-32">
      <div className="container px-4 md:px-6">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col items-start justify-center gap-6 text-left">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                Hi, I'm Adi
              </h1>
              <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl xl:text-4xl/none text-accent">
                A Passionate Full-Stack Developer
              </h2>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                I build modern, responsive, and feature-rich web applications. Let's create something amazing together.
              </p>
            </div>
            <div className="w-full max-w-sm sm:max-w-md">
              <Button asChild size="lg" className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                <Link href="#projects">View My Projects</Link>
              </Button>
            </div>
          </div>
          <div className="hidden lg:flex items-center justify-center relative">
            <div className="absolute w-72 h-72 bg-accent rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
            <div className="absolute top-0 left-20 w-72 h-72 bg-secondary rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
            <div className="absolute bottom-0 right-10 w-72 h-72 bg-primary rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
            <p className="text-muted-foreground/40 text-2xl font-semibold select-none">Developer</p>
          </div>
        </div>
      </div>
    </section>
  );
}
