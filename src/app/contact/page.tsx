
'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { useEffect, useRef } from 'react';
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, Loader2 } from "lucide-react";
import { submitContactForm, type ContactFormState } from './actions';
import { useToast } from '@/hooks/use-toast';

const initialState: ContactFormState = {
    message: '',
    status: 'idle',
};

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" className="w-full bg-accent text-accent-foreground hover:bg-accent/90" disabled={pending}>
            {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            {pending ? 'Sending...' : 'Send Message'}
        </Button>
    );
}


export default function ContactPage() {
    const [state, formAction] = useFormState(submitContactForm, initialState);
    const { toast } = useToast();
    const formRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        if (state.status === 'success') {
            toast({
                title: "Message Sent!",
                description: "Thanks for reaching out. I'll get back to you soon.",
            });
            formRef.current?.reset();
        } else if (state.status === 'error') {
            toast({
                title: "Uh oh!",
                description: state.message,
                variant: "destructive",
            });
        }
    }, [state, toast]);


    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1 flex flex-col items-center justify-center py-12 px-4">
                 <div className="w-full max-w-lg mb-4 pt-8">
                    <Button asChild variant="ghost">
                        <Link href="/">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Home
                        </Link>
                    </Button>
                </div>
                <Card className="w-full max-w-lg">
                    <CardHeader>
                        <CardTitle className="text-3xl font-bold text-accent">Contact Me</CardTitle>
                        <CardDescription>
                            Please fill out the form below and I'll get back to you as soon as possible.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form ref={formRef} action={formAction} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Name</Label>
                                <Input id="name" name="name" placeholder="Enter your name" required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" name="email" type="email" placeholder="Enter your email" required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="message">Message</Label>
                                <Textarea id="message" name="message" placeholder="Enter your message" rows={5} required/>
                            </div>
                           <SubmitButton />
                        </form>
                    </CardContent>
                </Card>
            </main>
            <Footer />
        </div>
    );
}
