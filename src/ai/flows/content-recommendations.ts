'use server';

/**
 * @fileOverview AI-powered content recommendation flow for suggesting related articles based on user browsing behavior.
 *
 * - recommendContent - A function that takes the current article content as input and returns recommendations.
 * - RecommendContentInput - The input type for the recommendContent function.
 * - RecommendContentOutput - The return type for the recommendContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RecommendContentInputSchema = z.object({
  articleContent: z
    .string()
    .describe('The content of the current article being viewed by the user.'),
  currentUrl: z.string().describe('The URL of the current article'),
});
export type RecommendContentInput = z.infer<typeof RecommendContentInputSchema>;

const RecommendContentOutputSchema = z.object({
  recommendations: z
    .array(z.string())
    .describe('A list of recommended article titles.'),
});
export type RecommendContentOutput = z.infer<typeof RecommendContentOutputSchema>;

export async function recommendContent(input: RecommendContentInput): Promise<RecommendContentOutput> {
  return recommendContentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'recommendContentPrompt',
  input: {schema: RecommendContentInputSchema},
  output: {schema: RecommendContentOutputSchema},
  prompt: `You are an AI assistant designed to recommend related articles based on the content a user is currently viewing on the nxMplisCore blog.

  Given the content of the current article, identify key topics and themes, and suggest other articles that would be of interest to the user.

  The recommendations should respect the user's privacy and should not include any personalized or sensitive information.

  Current Article Content: {{{articleContent}}}
  Current Article URL: {{{currentUrl}}}

  Please provide a list of recommended article titles. Return ONLY the array of article titles, nothing else.
  Ensure that the returned article recommendations are highly relevant to the content of the current article.
  If the article does not contain enough content to make a recommendation, return an empty array.
  Do not recommend the current article the user is reading.`, 
});

const recommendContentFlow = ai.defineFlow(
  {
    name: 'recommendContentFlow',
    inputSchema: RecommendContentInputSchema,
    outputSchema: RecommendContentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
