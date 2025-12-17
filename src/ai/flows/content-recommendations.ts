'use server';

/**
 * @fileOverview AI-powered content recommendation flow for suggesting related articles.
 *
 * - recommendContent - A function that takes the current article content and returns recommendations.
 * - RecommendContentInput - The input type for the recommendContent function.
 * - RecommendContentOutput - The return type for the recommendContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RecommendContentInputSchema = z.object({
  articleContent: z
    .string()
    .describe('The content of the current article being viewed by the user, plus a list of other available articles.'),
  currentUrl: z.string().describe('The URL of the current article'),
});
export type RecommendContentInput = z.infer<typeof RecommendContentInputSchema>;

const RecommendContentOutputSchema = z.object({
  recommendations: z
    .array(z.string())
    .describe('An array of 2-3 recommended article titles from the provided list.'),
});
export type RecommendContentOutput = z.infer<typeof RecommendContentOutputSchema>;

export async function recommendContent(input: RecommendContentInput): Promise<RecommendContentOutput> {
  return recommendContentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'recommendContentPrompt',
  input: {schema: RecommendContentInputSchema},
  output: {schema: RecommendContentOutputSchema},
  prompt: `You are an AI assistant for a tech blog. Based on the article the user is currently reading, your job is to recommend 2-3 other highly relevant articles for them to read next.

You will be given the title of the current article and a list of other available articles.

Current context:
{{{articleContent}}}

Analyze the current article's title and themes, and select the most relevant titles from the list of available articles.

Return ONLY the array of the recommended article titles. Do not include the current article in your recommendations.`, 
});

const recommendContentFlow = ai.defineFlow(
  {
    name: 'recommendContentFlow',
    inputSchema: RecommendContentInputSchema,
    outputSchema: RecommendContentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    if (!output) {
      return { recommendations: [] };
    }
    return output;
  }
);
