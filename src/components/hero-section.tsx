
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="w-full flex-1 flex items-center justify-center pt-[25vh] md:pt-[35vh]">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-accent">
                Hi, I'm Adi
                </h1>
                <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl xl:text-4xl/none text-accent">
                A Passionate Full-Stack Developer
                </h2>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                I build modern, responsive, and feature-rich web applications. Let's create something amazing together.
                </p>
            </div>
            <div className="w-full max-w-sm sm:max-w-md lg:max-w-none">
                <Button asChild size="lg" className="w-full sm:w-auto bg-accent text-accent-foreground hover:bg-accent/90">
                    <Link href="/projects">View My Projects</Link>
                </Button>
            </div>
        </div>
      </div>
    </section>
  );
}
