import Image from "next/image";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const projects = [
  {
    title: "E-Commerce Platform",
    description: "A full-featured e-commerce site with product listings, a shopping cart, and a secure checkout process.",
    image: "https://placehold.co/600x400.png",
    imageHint: "ecommerce website",
    tags: ["Next.js", "TypeScript", "Stripe", "Firebase"],
    githubUrl: "#",
  },
  {
    title: "Task Management App",
    description: "A collaborative task management tool to help teams stay organized and productive with a drag-and-drop interface.",
    image: "https://placehold.co/600x400.png",
    imageHint: "task manager",
    tags: ["React", "Node.js", "GraphQL", "MongoDB"],
    githubUrl: "#",
  },
  {
    title: "Personal Blog",
    description: "A statically generated blog using Next.js and Markdown for content, optimized for performance and SEO.",
    image: "https://placehold.co/600x400.png",
    imageHint: "blog interface",
    tags: ["Next.js", "Markdown", "Tailwind CSS"],
    githubUrl: "#",
  },
];

export function ProjectsSection() {
  return (
    <section id="projects" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-accent">My Projects</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Here are some of the projects I've worked on. Explore them to see my skills in action.
            </p>
          </div>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mt-12">
          {projects.map((project) => (
            <Card key={project.title} className="flex flex-col overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-accent/20">
                <Image
                  src={project.image}
                  alt={project.title}
                  width={600}
                  height={400}
                  className="object-cover w-full h-48 rounded-t-lg"
                  data-ai-hint={project.imageHint}
                />
              <CardContent className="flex-grow p-6">
                <CardTitle className="text-xl font-bold">{project.title}</CardTitle>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">{tag}</Badge>
                  ))}
                </div>
                <CardDescription className="mt-4 text-muted-foreground">{project.description}</CardDescription>
              </CardContent>
              <CardFooter className="p-6 pt-0">
                <Button asChild variant="outline" className="w-full hover:bg-accent hover:text-accent-foreground border-accent text-accent">
                  <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-4 w-4" />
                    View on GitHub
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
