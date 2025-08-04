'use server';

/**
 * @fileOverview A personal assistant chatbot AI agent.
 *
 * - personalAssistantChatbot - A function that handles the chatbot interaction.
 * - PersonalAssistantChatbotInput - The input type for the personalAssistantChatbot function.
 * - PersonalAssistantChatbotOutput - The return type for the personalAssistantChatbot function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalAssistantChatbotInputSchema = z.object({
  query: z.string().describe('The user query about Adi.'),
  portfolioSummary: z.string().describe('A summary of Adi\u0027s portfolio.'),
  resumeText: z.string().describe('The text content of Adi\u0027s resume.'),
});
export type PersonalAssistantChatbotInput = z.infer<typeof PersonalAssistantChatbotInputSchema>;

const PersonalAssistantChatbotOutputSchema = z.object({
  response: z.string().describe('The chatbot response to the user query.'),
});
export type PersonalAssistantChatbotOutput = z.infer<typeof PersonalAssistantChatbotOutputSchema>;

export async function personalAssistantChatbot(
  input: PersonalAssistantChatbotInput
): Promise<PersonalAssistantChatbotOutput> {
  return personalAssistantChatbotFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalAssistantChatbotPrompt',
  input: {schema: PersonalAssistantChatbotInputSchema},
  output: {schema: PersonalAssistantChatbotOutputSchema},
  prompt: `You are a personal assistant chatbot for Adi. Answer questions about Adi based on the provided portfolio summary and resume.

Portfolio Summary: {{{portfolioSummary}}}
Resume: {{{resumeText}}}

Question: {{{query}}}

Response:`,
});

const personalAssistantChatbotFlow = ai.defineFlow(
  {
    name: 'personalAssistantChatbotFlow',
    inputSchema: PersonalAssistantChatbotInputSchema,
    outputSchema: PersonalAssistantChatbotOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
