
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="w-full flex-1 flex items-center justify-center pt-[25vh] md:pt-[35vh]">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
                <h1 className="text-5xl font-bold tracking-tighter sm:text-6xl xl:text-7xl/none text-[#3E3F29]">
                Hi, I'm Adi
                </h1>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl xl:text-5xl/none text-[#7D8D86]">
                A Passionate Full-Stack Developer
                </h2>
                <p className="max-w-[600px] text-[#3E3F29]/80 md:text-xl lg:text-2xl">
                I build modern, responsive, and feature-rich web applications. Let's create something amazing together.
                </p>
            </div>
            <div className="w-full max-w-sm sm:max-w-md lg:max-w-none">
                <Button asChild size="lg" className="w-full sm:w-auto bg-[#3E3F29] text-white hover:bg-[#3E3F29]/90">
                    <Link href="/projects">View My Projects</Link>
                </Button>
            </div>
        </div>
      </div>
    </section>
  );
}
