
import Link from "next/link";
import { Briefcase } from "lucide-react";

export function Header() {
  return (
    <header className="px-4 lg:px-6 h-16 flex items-center fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-sm">
      <Link href="/" className="flex items-center justify-center" prefetch={false}>
        <Briefcase className="h-6 w-6 text-accent" />
        <span className="sr-only">Adi's Portfolio</span>
      </Link>
      <nav className="ml-auto flex gap-4 sm:gap-6">
        <Link href="/about" className="text-sm font-medium hover:text-accent underline-offset-4" prefetch={false}>
          About
        </Link>
        <Link href="/projects" className="text-sm font-medium hover:text-accent underline-offset-4" prefetch={false}>
          Projects
        </Link>
        <Link href="/contact" className="text-sm font-medium hover:text-accent underline-offset-4" prefetch={false}>
          Contact
        </Link>
      </nav>
    </header>
  );
}
