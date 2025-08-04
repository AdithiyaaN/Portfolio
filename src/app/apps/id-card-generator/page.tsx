
'use client';

import { useState, useRef, ChangeEvent } from 'react';
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import { ArrowLeft, User, Building, Briefcase, Badge as BadgeIcon } from 'lucide-react';
import Image from 'next/image';

const IDCardPreview = ({
  name,
  title,
  company,
  idNumber,
  photo,
}: {
  name: string;
  title: string;
  company: string;
  idNumber: string;
  photo: string | null;
}) => {
  return (
    <Card className="w-full max-w-sm mx-auto shadow-2xl">
      <CardHeader className="bg-accent text-accent-foreground text-center p-4 rounded-t-lg">
        <CardTitle className="text-2xl">{company || 'Your Company'}</CardTitle>
        <CardDescription className="text-accent-foreground/80">Employee Identification</CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-32 h-32 rounded-full bg-muted flex items-center justify-center overflow-hidden border-2 border-accent">
            {photo ? (
              <Image src={photo} alt="Profile" width={128} height={128} className="object-cover w-full h-full" />
            ) : (
              <User className="w-16 h-16 text-muted-foreground" />
            )}
          </div>
          <div className="text-center">
            <h3 className="text-2xl font-bold">{name || 'Your Name'}</h3>
            <p className="text-muted-foreground">{title || 'Job Title'}</p>
          </div>
          <div className="w-full pt-4 border-t border-border">
            <div className="flex items-center space-x-2">
                <BadgeIcon className="w-4 h-4 text-muted-foreground" />
                <p className="text-sm">ID: {idNumber || '123456'}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};


export default function IDCardGeneratorPage() {
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [company, setCompany] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [photo, setPhoto] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setPhoto(event.target?.result as string);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 py-12 px-4">
        <div className="container">
          <Button asChild variant="ghost" className="mb-8">
            <Link href="/projects">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Projects
            </Link>
          </Button>

          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl text-accent">ID Card Generator</h1>
            <p className="max-w-2xl mx-auto mt-4 text-muted-foreground md:text-xl">
              Create a professional ID card in seconds. Fill in the details, upload a photo, and see your ID card come to life.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Enter Details</CardTitle>
                  <CardDescription>Fill out the form to generate the ID card.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g., Adi Developer" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="title">Job Title</Label>
                    <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g., Full-Stack Developer" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company">Company Name</Label>
                    <Input id="company" value={company} onChange={(e) => setCompany(e.target.value)} placeholder="e.g., Tech Solutions Inc." />
                  </div>
                   <div className="space-y-2">
                    <Label htmlFor="idNumber">ID Number</Label>
                    <Input id="idNumber" value={idNumber} onChange={(e) => setIdNumber(e.target.value)} placeholder="e.g., 987654" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="photo">Profile Photo</Label>
                    <Input id="photo" type="file" accept="image/*" ref={fileInputRef} onChange={handlePhotoUpload} className="file:text-foreground"/>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div>
                <h2 className="text-2xl font-bold text-center mb-4">Live Preview</h2>
                <IDCardPreview name={name} title={title} company={company} idNumber={idNumber} photo={photo} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
