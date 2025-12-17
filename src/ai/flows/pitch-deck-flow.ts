'use server';
/**
 * @fileOverview A Genkit flow for extracting content from a PowerPoint (.pptx) presentation.
 *
 * - extractPresentationContent - A function that takes a presentation file and returns its structured content.
 * - ExtractContentInput - The input type for the flow.
 * - PresentationContent - The output type for the flow.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

export const ExtractContentInputSchema = z.object({
  presentationDataUri: z
    .string()
    .describe(
      "A .pptx presentation file, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type ExtractContentInput = z.infer<typeof ExtractContentInputSchema>;

export const PresentationContentSchema = z.object({
    title: z.string().describe("The main title of the presentation."),
    overallSummary: z.string().describe("A brief, one to two-sentence summary of the entire presentation's purpose and key message."),
    slides: z.array(
        z.object({
            title: z.string().describe("The title of the slide."),
            summary: z.string().describe("A detailed summary of the text content and key points on this slide."),
            imageDescription: z.string().describe("A description of any images, charts, or visual elements on the slide. If no visuals, state 'No significant visual elements'.")
        })
    ).describe("An array representing each slide in the presentation.")
});
export type PresentationContent = z.infer<typeof PresentationContentSchema>;


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
