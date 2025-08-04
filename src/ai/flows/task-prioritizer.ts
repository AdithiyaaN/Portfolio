'use server';
/**
 * @fileOverview An AI flow to prioritize a task based on its content.
 *
 * - prioritizeTask - A function that suggests a priority for a task.
 * - PrioritizeTaskInput - The input type for the prioritizeTask function.
 * - PrioritizeTaskOutput - The return type for the prioritizeTask function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PrioritizeTaskInputSchema = z.object({
  taskContent: z.string().describe('The content of the task to be prioritized.'),
});
export type PrioritizeTaskInput = z.infer<typeof PrioritizeTaskInputSchema>;

const PrioritizeTaskOutputSchema = z.object({
  priority: z.enum(['High', 'Medium', 'Low']).describe('The suggested priority for the task.'),
  justification: z.string().describe('A brief explanation for why this priority was chosen.'),
});
export type PrioritizeTaskOutput = z.infer<typeof PrioritizeTaskOutputSchema>;

export async function prioritizeTask(input: PrioritizeTaskInput): Promise<PrioritizeTaskOutput> {
  return prioritizeTaskFlow(input);
}

const prompt = ai.definePrompt({
  name: 'prioritizeTaskPrompt',
  input: {schema: PrioritizeTaskInputSchema},
  output: {schema: PrioritizeTaskOutputSchema},
  prompt: `You are a project management assistant. Your goal is to analyze the content of a task and assign a priority level to it: "High", "Medium", or "Low".

  Analyze the following task content:
  "{{{taskContent}}}"

  Consider urgency, importance, and potential impact when assigning the priority. For example, tasks with words like "urgent", "immediately", or "blocker" should be High priority. Tasks that seem like regular chores or maintenance should be Medium or Low.

  Provide a brief justification for your choice.
  `,
});

const prioritizeTaskFlow = ai.defineFlow(
  {
    name: 'prioritizeTaskFlow',
    inputSchema: PrioritizeTaskInputSchema,
    outputSchema: PrioritizeTaskOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
