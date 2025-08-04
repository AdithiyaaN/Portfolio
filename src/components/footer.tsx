import Link from "next/link";
import { Github, Linkedin, Twitter, Mail } from "lucide-react";
import { Button } from "./ui/button";

export function Footer() {
  return (
    <footer id="contact" className="w-full py-12 md:py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center space-y-6">
          <div className="text-center">
            <h3 className="text-3xl font-bold tracking-tighter sm:text-4xl text-accent">Get In Touch</h3>
            <p className="mt-2 max-w-md text-muted-foreground">
              Have a project in mind or just want to say hello? Feel free to reach out.
            </p>
          </div>
          <div className="flex space-x-4">
            <Button asChild variant="outline" size="icon" className="border-accent text-accent hover:bg-accent hover:text-accent-foreground">
              <Link href="mailto:adi.portfolio@example.com" target="_blank" rel="noopener noreferrer">
                <Mail className="h-5 w-5" />
                <span className="sr-only">Email</span>
              </Link>
            </Button>
            <Button asChild variant="outline" size="icon" className="border-accent text-accent hover:bg-accent hover:text-accent-foreground">
              <Link href="#" target="_blank" rel="noopener noreferrer">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
            </Button>
            <Button asChild variant="outline" size="icon" className="border-accent text-accent hover:bg-accent hover:text-accent-foreground">
              <Link href="#" target="_blank" rel="noopener noreferrer">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </Button>
            <Button asChild variant="outline" size="icon" className="border-accent text-accent hover:bg-accent hover:text-accent-foreground">
              <Link href="#" target="_blank" rel="noopener noreferrer">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
            </Button>
          </div>
          <div className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} Adi's Portfolio. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
