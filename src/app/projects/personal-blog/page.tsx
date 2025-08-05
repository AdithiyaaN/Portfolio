
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Rss } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const blogPosts = [
  {
    title: "The Power of Static Site Generation",
    date: "October 26, 2023",
    tags: ["Next.js", "Performance", "WebDev"],
    description: "Exploring the benefits of static site generation with Next.js for building blazing-fast websites.",
    slug: "power-of-ssg",
    image: "https://placehold.co/800x400.png",
    imageHint: "abstract lines"
  },
  {
    title: "A Deep Dive into Tailwind CSS",
    date: "October 15, 2023",
    tags: ["CSS", "Tailwind", "Design"],
    description: "A comprehensive look at how utility-first CSS can streamline your development workflow.",
    slug: "deep-dive-tailwind",
    image: "https://placehold.co/800x400.png",
    imageHint: "code editor"
  },
  {
    title: "Mastering React Hooks",
    date: "September 30, 2023",
    tags: ["React", "JavaScript", "Hooks"],
    description: "A guide to understanding and using React Hooks to write cleaner and more efficient component logic.",
    slug: "mastering-react-hooks",
    image: "https://placehold.co/800x400.png",
    imageHint: "network graph"
  },
];

const PostCard = ({ post }: { post: typeof blogPosts[0] }) => {
    return (
        <Card className="flex flex-col overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
            <Link href={`/projects/personal-blog/${post.slug}`}>
                <Image 
                    src={post.image}
                    alt={post.title}
                    width={800}
                    height={400}
                    className="w-full object-cover"
                    data-ai-hint={post.imageHint}
                />
            </Link>
            <CardHeader>
                <CardTitle>
                    <Link href={`/projects/personal-blog/${post.slug}`} className="hover:text-accent">{post.title}</Link>
                </CardTitle>
                <div className="flex flex-wrap gap-2 pt-2">
                    {post.tags.map(tag => (
                        <Badge key={tag} variant="secondary">{tag}</Badge>
                    ))}
                </div>
            </CardHeader>
            <CardContent>
                <CardDescription>{post.description}</CardDescription>
            </CardContent>
        </Card>
    );
}

export default function PersonalBlogPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1">
                <section className="w-full py-12 md:py-24 lg:py-32 bg-card">
                    <div className="container px-4 md:px-6 text-center">
                        <h1 className="text-4xl font-bold tracking-tighter sm:text-6xl text-accent">Adi's Tech Blog</h1>
                        <p className="max-w-2xl mx-auto mt-4 text-muted-foreground md:text-xl/relaxed">
                            Thoughts and tutorials on modern web development, design, and technology.
                        </p>
                         <div className="mt-6 flex justify-center gap-4">
                            <Button asChild>
                                <Link href="#">
                                    <Rss className="mr-2 h-4 w-4" /> Subscribe
                                </Link>
                            </Button>
                        </div>
                    </div>
                </section>
                <section className="w-full py-12 md:py-16 lg:py-24">
                     <div className="container px-4 md:px-6">
                        <Button asChild variant="ghost" className="mb-8">
                            <Link href="/projects">
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Back to Projects
                            </Link>
                        </Button>
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-center mb-12">Latest Posts</h2>
                        <div className="grid gap-8 lg:grid-cols-2 xl:grid-cols-3">
                           {blogPosts.map(post => <PostCard key={post.slug} post={post} />)}
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
