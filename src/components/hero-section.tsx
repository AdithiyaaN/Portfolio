
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CodingAnimation } from "./coding-animation";

export function HeroSection() {
  return (
    <section className="w-full flex-1 flex items-center justify-center pt-[20vh] md:pt-[25vh]">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:gap-24">
            <div className="flex flex-col items-center justify-center space-y-4 text-center lg:items-start lg:text-left">
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
                <div className="w-full max-w-sm sm:max-w-md lg:max-w-none">
                    <Button asChild size="lg" className="w-full sm:w-auto bg-accent text-accent-foreground hover:bg-accent/90">
                        <Link href="/projects">View My Projects</Link>
                    </Button>
                </div>
            </div>
            <div className="flex items-center justify-center">
                <CodingAnimation />
            </div>
        </div>
      </div>
    </section>
  );
}
