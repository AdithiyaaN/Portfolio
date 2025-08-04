
'use server';

import { z } from 'zod';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export interface ContactFormState {
    status: 'idle' | 'success' | 'error';
    message: string;
}

const ContactFormSchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters." }),
    email: z.string().email({ message: "Please enter a valid email." }),
    message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

export async function submitContactForm(
    prevState: ContactFormState,
    formData: FormData
): Promise<ContactFormState> {
    const validatedFields = ContactFormSchema.safeParse({
        name: formData.get('name'),
        email: formData.get('email'),
        message: formData.get('message'),
    });

    if (!validatedFields.success) {
        // This is a bit verbose, but gets the first error for a specific field.
        const firstError = Object.values(validatedFields.error.flatten().fieldErrors)[0]?.[0];
        return {
            status: 'error',
            message: firstError || "Invalid form data."
        }
    }
    
    const { name, email, message } = validatedFields.data;
    
    try {
        const { data, error } = await resend.emails.send({
            from: 'Portfolio Contact Form <onboarding@resend.dev>', // Must be from a verified domain in Resend
            to: 'thunderfistluffy@gmail.com',
            subject: 'New Message from Portfolio Contact Form',
            reply_to: email,
            html: `
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Message:</strong></p>
                <p>${message}</p>
            `,
        });

        if (error) {
            console.error('Resend error:', error);
            return {
                status: 'error',
                message: 'Something went wrong. Please try again.',
            };
        }

        return {
            status: 'success',
            message: 'Your message has been sent successfully!',
        };

    } catch (e) {
        console.error(e);
        return {
            status: 'error',
            message: 'Something went wrong. Please try again.',
        };
    }
}
