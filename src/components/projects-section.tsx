
import Image from "next/image";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Code, ListChecks, FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const projects = [
  {
    title: "ID Card Generation App",
    slug: "id-card-generator",
    description: "An interactive app to generate professional ID cards on the fly.",
    icon: <Code className="w-12 h-12 text-accent-foreground" />,
    pattern: (
        <div className="absolute inset-0 bg-accent/10 [mask-image:radial-gradient(100%_100%_at_top,white,transparent)]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(168,142,91,0.2)_0%,transparent_50%)]"></div>
        </div>
    ),
    tags: ["React", "Next.js", "TypeScript"],
    href: "/apps/id-card-generator"
  },
  {
    title: "Task Management App",
    slug: "task-management-app",
    description: "A collaborative task management tool to help teams stay organized and productive with a drag-and-drop interface.",
    icon: <ListChecks className="w-12 h-12 text-accent-foreground" />,
     pattern: (
      <div className="absolute inset-0 bg-accent/10 [mask-image:linear-gradient(to_bottom,white_50%,transparent_100%)]">
        <svg className="absolute inset-0 w-full h-full text-accent/20" xmlns="http://www.w3.org/2000/svg"><defs><pattern id="patt" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M0 10h20M10 0v20" stroke="currentColor" strokeWidth="0.5" /></pattern></defs><rect width="100%" height="100%" fill="url(#patt)"/></svg>
      </div>
    ),
    tags: ["React", "Node.js", "GraphQL", "MongoDB"],
    href: "/apps/task-management-app"
  },
  {
    title: "Personal Blog",
    slug: "personal-blog",
    description: "A statically generated blog using Next.js and Markdown for content, optimized for performance and SEO.",
    icon: <FileText className="w-12 h-12 text-accent-foreground" />,
    pattern: (
      <div className="absolute inset-0 bg-accent/10 [mask-image:radial-gradient(100%_50%_at_center,white,transparent)]">
        <div className="absolute inset-0 w-full h-full bg-[linear-gradient(to_right,#a88e5b33_1px,transparent_1px),linear-gradient(to_bottom,#a88e5b33_1px,transparent_1px)] bg-[size:1rem_1rem]"></div>
      </div>
    ),
    tags: ["Next.js", "Markdown", "Tailwind CSS"],
    href: "/projects/personal-blog"
  },
];

export function ProjectsSection() {
  return (
    <section id="projects" className="w-full py-12 md:py-24 lg:py-32 flex items-center justify-center">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-accent">My Projects</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Here are some of the projects I've worked on. Explore them to see my skills in action.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl justify-items-center gap-8 md:grid-cols-2 lg:grid-cols-3 mt-12">
          {projects.map((project) => (
            <Card 
              key={project.title} 
              className={cn(
                "flex flex-col overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-accent/20"
              )}
            >
              <CardHeader className="relative flex items-center justify-center h-48 w-full bg-accent/5 overflow-hidden">
                {project.pattern}
                {project.icon}
              </CardHeader>
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
                  <Link href={project.href}>
                    View Project
                    <ArrowRight className="ml-2 h-4 w-4" />
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
