
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

// This is mock data. In a real application, you'd fetch this from a CMS or database.
const projects = [
  {
    title: "ID Card Generation App",
    slug: "id-card-generator",
    description: "A Python automation script that generates ID cards from a given template and data, streamlining the process of creating professional identification.",
    longDescription: "This project utilizes Python libraries such as OpenCV and Pillow to automate the creation of ID cards. It takes a data source (like a CSV file) and an ID card template, then programmatically populates the template with employee information, including names, roles, and photos. The script is designed to be efficient and scalable for batch processing.",
    image: "https://placehold.co/1200x600.png",
    imageHint: "python code editor",
    tags: ["Python", "Automation", "OpenCV", "Pillow"],
  },
  {
    title: "Task Management App",
    slug: "task-management-app",
    description: "A collaborative task management tool to help teams stay organized and productive with a drag-and-drop interface. This application showcases skills in real-time data synchronization and complex state management. It's built with the MERN stack and uses GraphQL for efficient data fetching.",
    longDescription: "Designed for team collaboration, this app allows users to create projects, assign tasks, and track progress in real-time. The intuitive drag-and-drop interface makes it easy to manage workflows. WebSockets are used for real-time updates, ensuring all team members are on the same page. The GraphQL API provides a flexible and efficient way for the client to request exactly the data it needs.",
    image: "https://placehold.co/1200x600.png",
    imageHint: "task board kanban",
    tags: ["React", "Node.js", "GraphQL", "MongoDB"],
  },
  {
    title: "Personal Blog",
    slug: "personal-blog",
    description: "A statically generated blog using Next.js and Markdown for content, optimized for performance and SEO. This project highlights the ability to create fast, content-driven websites with a focus on developer experience and performance.",
    longDescription: "This blog is built with performance as a top priority. Using static site generation with Next.js, pages are pre-rendered at build time for incredibly fast load speeds. Content is written in Markdown files, making it easy to manage and update. The design is clean, minimalist, and fully responsive, providing a great reading experience on any device. SEO best practices are implemented to ensure high visibility in search engine results.",
    image: "https://placehold.co/1200x600.png",
    imageHint: "minimalist blog post",
    tags: ["Next.js", "Markdown", "Tailwind CSS"],
  },
];

export async function generateStaticParams() {
    return projects.map((project) => ({
      slug: project.slug,
    }));
}

export default function ProjectDetailsPage({ params }: { params: { slug: string } }) {
    const project = projects.find(p => p.slug === params.slug);

    if (!project) {
        return (
            <div className="flex flex-col min-h-screen">
                <Header />
                <main className="flex-1 flex items-center justify-center">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold">Project not found</h1>
                        <p className="mt-4 text-muted-foreground">The project you're looking for doesn't exist.</p>
                        <Button asChild className="mt-8">
                            <Link href="/">
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Back to Home
                            </Link>
                        </Button>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1 py-12 md:py-24 lg:py-32">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="max-w-4xl mx-auto">
                        <div className="flex justify-between items-center mb-8">
                            <Button asChild variant="ghost">
                               <Link href="/projects">
                                    <ArrowLeft className="mr-2 h-4 w-4" />
                                    Back to All Projects
                               </Link>
                            </Button>
                            
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-accent mb-4">{project.title}</h1>
                        <div className="flex flex-wrap gap-2 mb-8">
                            {project.tags.map(tag => (
                                <Badge key={tag} variant="secondary">{tag}</Badge>
                            ))}
                        </div>
                        <Image 
                            src={project.image} 
                            alt={project.title} 
                            width={1200}
                            height={600}
                            className="w-full rounded-lg object-cover mb-8 shadow-lg"
                            data-ai-hint={project.imageHint}
                        />
                        <div className="prose prose-invert max-w-full text-muted-foreground md:text-lg/relaxed">
                            <p className="lead mb-6">{project.description}</p>
                            <p>{project.longDescription}</p>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
