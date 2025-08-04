import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Cpu, Database, Server, Cloud } from "lucide-react";

const skills = [
  { name: "AI & ML", level: 85, icon: <Cpu className="w-8 h-8 mb-2 text-accent" /> },
  { name: "AWS", level: 80, icon: <Cloud className="w-8 h-8 mb-2 text-accent" /> },
  { name: "Flask", level: 90, icon: <Server className="w-8 h-8 mb-2 text-accent" /> },
  { name: "PostgreSQL", level: 85, icon: <Database className="w-8 h-8 mb-2 text-accent" /> },
  { name: "React / Next.js", level: 90 },
  { name: "Node.js / Express", level: 85 },
  { name: "Docker", level: 70 },
  { name: "SQL / NoSQL", level: 85 },
];

export function SkillsSection() {
  return (
    <section id="skills" className="w-full py-12 md:py-24 lg:py-32 bg-card">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-accent">Skills & Proficiencies</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              A showcase of my technical abilities and tools I use to bring projects to life.
            </p>
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mt-12">
          {skills.map((skill) => (
            <Card key={skill.name} className="flex flex-col justify-between text-center items-center">
              <CardHeader>
                {skill.icon}
                <CardTitle>{skill.name}</CardTitle>
              </CardHeader>
              <CardContent className="w-full">
                <Progress value={skill.level} className="w-full" aria-label={`${skill.name} proficiency ${skill.level}%`} />
                <p className="text-right text-sm text-muted-foreground mt-2">{skill.level}%</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
