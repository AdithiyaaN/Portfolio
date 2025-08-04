
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';


export function HeroSection() {
 
  return (
    <section className="w-full flex-1 flex flex-col items-center justify-center pt-[25vh] md:pt-[35vh]">
      <div className="container px-4 md:px-6 text-center">
        <div className="flex flex-col items-center justify-center space-y-4">
            <div className="space-y-2">
                <h1 className="text-5xl font-bold tracking-tighter sm:text-7xl xl:text-8xl/none text-[#3E3F29]">
                Hi, I'm Adi
                </h1>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-[#7D8D86]">
                A Passionate Full-Stack Developer
                </h2>
                <p className="max-w-[600px] mx-auto text-[#3E3F29]/80 md:text-xl lg:text-3xl">
                I build modern, responsive, and feature-rich web applications. Let's create something amazing together.
                </p>
            </div>
             <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center mt-6">
                <Button asChild size="lg" className="bg-[#3E3F29] text-white hover:bg-[#3E3F29]/90">
                    <Link href="/projects">View My Projects</Link>
                </Button>
            </div>
        </div>
      </div>
    </section>
  );
}
