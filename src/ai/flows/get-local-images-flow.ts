'use server';
/**
 * @fileOverview A Genkit flow for fetching images from the server's public folder.
 *
 * - getLocalImages - A function that retrieves image files from the `public/uploads` directory.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { promises as fs } from 'fs';
import path from 'path';

const GetLocalImagesOutputSchema = z.object({
  images: z.array(z.string()).describe('An array of public image paths.'),
});

export async function getLocalImages(): Promise<z.infer<typeof GetLocalImagesOutputSchema>> {
  return getLocalImagesFlow();
}

const getLocalImagesFlow = ai.defineFlow(
  {
    name: 'getLocalImagesFlow',
    outputSchema: GetLocalImagesOutputSchema,
  },
  async () => {
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    
    try {
      // Ensure the directory exists to prevent errors on first run
      await fs.mkdir(uploadsDir, { recursive: true });

      const filenames = await fs.readdir(uploadsDir);
      const imagePaths = filenames
        .filter(name => /\.(jpg|jpeg|png|gif|webp)$/i.test(name))
        .map(name => `/uploads/${name}`);
        
      return { images: imagePaths };
    } catch (error) {
      console.error('Error reading image directory:', error);
      // Return empty array if directory cannot be read
      return { images: [] };
    }
  }
);
