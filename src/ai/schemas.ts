import { z } from 'zod';

/**
 * @fileOverview
 * This file contains the Zod schemas and TypeScript types for the AI flows.
 * It is separated from the flow definitions to avoid Next.js server module errors,
 * as files with the 'use server' directive can only export async functions.
 */

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
