'use server';
/**
 * @fileOverview A Genkit flow for uploading an image to the server's public folder.
 *
 * - uploadImage - A function that saves an image file to the `public/uploads` directory.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { promises as fs } from 'fs';
import path from 'path';

const UploadImageInputSchema = z.object({
  imageDataUri: z
    .string()
    .describe(
      "A data URI of the image to upload. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  filename: z.string().describe('The desired filename for the image.'),
});

const UploadImageOutputSchema = z.object({
  filePath: z.string().describe('The server path to the uploaded image.'),
});

export async function uploadImage(
  input: z.infer<typeof UploadImageInputSchema>
): Promise<z.infer<typeof UploadImageOutputSchema>> {
  return uploadImageFlow(input);
}

const uploadImageFlow = ai.defineFlow(
  {
    name: 'uploadImageFlow',
    inputSchema: UploadImageInputSchema,
    outputSchema: UploadImageOutputSchema,
  },
  async ({ imageDataUri, filename }) => {
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    
    // Ensure the uploads directory exists
    await fs.mkdir(uploadsDir, { recursive: true });

    // Decode the data URI
    const base64Data = imageDataUri.split(';base64,').pop();
    if (!base64Data) {
      throw new Error('Invalid image data URI');
    }
    const imageBuffer = Buffer.from(base64Data, 'base64');
    
    // Sanitize filename to prevent directory traversal
    const safeFilename = path.basename(filename);
    const filePath = path.join(uploadsDir, safeFilename);

    // Save the file
    await fs.writeFile(filePath, imageBuffer);
    
    // Return the public path
    return {
      filePath: `/uploads/${safeFilename}`,
    };
  }
);
