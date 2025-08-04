'use server';

import { personalAssistantChatbot } from '@/ai/flows/personal-assistant-chatbot';
import { z } from 'zod';

const portfolioSummary = `
Adi is a passionate full-stack developer specializing in modern web technologies. This portfolio showcases several projects including a full-featured E-Commerce Platform using Next.js, TypeScript, and Stripe; a collaborative Task Management App with a drag-and-drop interface built on the MERN stack with GraphQL; and a performance-optimized Personal Blog using Next.js and Markdown. Adi's key skills include TypeScript, React, Next.js, Node.js, Firebase, GraphQL, Tailwind CSS, and database management with SQL and NoSQL.
`;

const resumeText = `
Adi Developer
Full-Stack Developer
adi.portfolio@example.com | (123) 456-7890 | linkedin.com/in/adi-dev | github.com/adi-dev

Summary
A highly motivated and skilled Full-Stack Developer with experience in building and deploying modern, responsive web applications. Proficient in JavaScript, TypeScript, and various front-end and back-end frameworks. Passionate about clean code, user experience, and continuous learning.

Skills
- Languages: TypeScript, JavaScript (ES6+), HTML5, CSS3, SQL, Python
- Frameworks/Libraries: React, Next.js, Node.js, Express.js, Tailwind CSS
- Databases: PostgreSQL, MongoDB, Firebase Firestore
- Tools: Git, Docker, Webpack, GraphQL, Stripe API, Vercel

Experience
Software Engineer | Tech Solutions Inc. | 2021 - Present
- Developed and maintained full-stack features for a large-scale e-commerce platform using Next.js, TypeScript, and PostgreSQL.
- Collaborated with a team of 5 engineers to implement a new design system, improving UI consistency and development speed by 30%.
- Optimized API performance, reducing average response time by 50ms.

Projects
- E-Commerce Platform: Built a complete e-commerce solution with product management, shopping cart, and Stripe integration.
- Task Management App: Created a real-time, collaborative task manager with a GraphQL API.

Education
Bachelor of Science in Computer Science | University of Technology | 2017 - 2021
`;

const ChatState = z.object({
    messages: z.array(z.object({
        role: z.enum(['user', 'assistant']),
        content: z.string(),
    }))
});

export async function askAssistant(prevState: z.infer<typeof ChatState>, formData: FormData) {
    const userInput = formData.get('query') as string;

    if (!userInput) {
        return prevState;
    }
    
    const newMessages = [...prevState.messages, { role: 'user' as const, content: userInput }];

    try {
        const response = await personalAssistantChatbot({
            query: userInput,
            portfolioSummary,
            resumeText,
        });

        return {
            messages: [...newMessages, { role: 'assistant' as const, content: response.response }],
        };
    } catch (error) {
        console.error(error);
        return {
            messages: [...newMessages, { role: 'assistant' as const, content: "Sorry, I couldn't get a response. Please try again." }],
        };
    }
}
