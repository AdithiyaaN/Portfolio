
'use server';

import { z } from 'zod';

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
        return {
            status: 'error',
            message: validatedFields.error.flatten().fieldErrors.message?.[0] || "Invalid form data."
        }
    }
    
    try {
        // For demonstration, we'll just log the data.
        // In a real application, you would send an email or save to a database.
        console.log('Contact form submitted:');
        console.log('Name:', validatedFields.data.name);
        console.log('Email:', validatedFields.data.email);
        console.log('Message:', validatedFields.data.message);

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
