'use server';
/**
 * @fileOverview A Genkit flow for extracting content from a PowerPoint (.pptx) presentation.
 *
 * - extractPresentationContent - A function that takes a presentation file and returns its structured content.
 */

import { ai } from '@/ai/genkit';
import {
    ExtractContentInput,
    ExtractContentInputSchema,
    PresentationContent,
    PresentationContentSchema
} from '@/ai/schemas';


export async function extractPresentationContent(input: ExtractContentInput): Promise<PresentationContent> {
  return extractPresentationContentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'extractPresentationPrompt',
  input: { schema: ExtractContentInputSchema },
  output: { schema: PresentationContentSchema },
  prompt: `You are an expert business analyst AI. Your task is to analyze the provided PowerPoint (.pptx) presentation and extract its content in a structured format.

Analyze the entire deck to understand its overall theme and purpose. Then, for each slide, provide a concise title, a summary of its main points, and a description of its visual elements.

Presentation File: {{media url=presentationDataUri}}

Please provide the output in the specified JSON format.`,
});

const extractPresentationContentFlow = ai.defineFlow(
  {
    name: 'extractPresentationContentFlow',
    inputSchema: ExtractContentInputSchema,
    outputSchema: PresentationContentSchema,
  },
  async input => {
    const { output } = await prompt(input);
    return output!;
  }
);
