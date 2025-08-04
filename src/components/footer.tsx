import Link from "next/link";
import { Button } from "./ui/button";

export function Footer() {
  return (
    <footer id="contact" className="w-full py-12 md:py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center space-y-6">
          <div className="text-center">
            <h3 className="text-3xl font-bold tracking-tighter sm:text-4xl text-accent">Get In Touch</h3>
            <p className="mt-2 max-w-md text-muted-foreground">
              Have a project in mind or just want to say hello? Let's connect.
            </p>
          </div>
          <div className="flex space-x-4">
            <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                <Link href="/contact">Contact Me</Link>
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
