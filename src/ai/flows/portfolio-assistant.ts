'use server';
/**
 * @fileOverview An AI-powered personal assistant for Adi's portfolio website.
 *
 * - portfolioAssistant - A function that answers questions about Adi's skills and experience.
 * - PortfolioAssistantInput - The input type for the portfolioAssistant function.
 * - PortfolioAssistantOutput - The return type for the portfolioAssistant function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PortfolioAssistantInputSchema = z.object({
  question: z.string().describe('The question about Adi that the user wants to ask.'),
  portfolioSummary: z.string().describe('A summary of Adi\u0027s portfolio website content.'),
  resumeContent: z.string().describe('The text content of Adi\u0027s resume.'),
});
export type PortfolioAssistantInput = z.infer<typeof PortfolioAssistantInputSchema>;

const PortfolioAssistantOutputSchema = z.object({
  answer: z.string().describe('The answer to the user\u0027s question about Adi, based on their portfolio and resume.'),
});
export type PortfolioAssistantOutput = z.infer<typeof PortfolioAssistantOutputSchema>;

export async function portfolioAssistant(input: PortfolioAssistantInput): Promise<PortfolioAssistantOutput> {
  return portfolioAssistantFlow(input);
}

const prompt = ai.definePrompt({
  name: 'portfolioAssistantPrompt',
  input: {schema: PortfolioAssistantInputSchema},
  output: {schema: PortfolioAssistantOutputSchema},
  prompt: `You are a personal assistant for Adi, providing information about their skills and experience based on their portfolio and resume.

  Answer the following question:
  {{question}}

  Use the following information from Adi's portfolio website:
  {{portfolioSummary}}

  And the following information from Adi's resume:
  {{resumeContent}}

  to provide a comprehensive and informative answer.
  `,
});

const portfolioAssistantFlow = ai.defineFlow(
  {
    name: 'portfolioAssistantFlow',
    inputSchema: PortfolioAssistantInputSchema,
    outputSchema: PortfolioAssistantOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
