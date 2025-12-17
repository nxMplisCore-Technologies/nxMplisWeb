import { z } from 'zod';

/**
 * @fileOverview
 * This file contains the Zod schemas and TypeScript types for the AI flows.
 * It is separated from the flow definitions to avoid Next.js server module errors,
 * as files with the 'use server' directive can only export async functions.
 */

// Schemas for getDriveImages flow
export const DriveImageSchema = z.object({
  id: z.string().describe('The ID of the image file.'),
  name: z.string().describe('The name of the image file.'),
  dataUri: z.string().describe('The base64-encoded data URI of the image.'),
});
export type DriveImage = z.infer<typeof DriveImageSchema>;

export const GetDriveImagesOutputSchema = z.object({
  images: z.array(DriveImageSchema),
});
export type GetDriveImagesOutput = z.infer<typeof GetDriveImagesOutputSchema>;

// Schemas for extractPresentationContent flow
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
