'use server';

/**
 * @fileOverview A Genkit flow for fetching images from a Google Drive folder.
 *
 * - getDriveImages - A function that retrieves image files from a specified Google Drive folder.
 */

import { ai } from '@/ai/genkit';
import { google } from 'googleapis';
import { Readable } from 'stream';
import { DriveImage, DriveImageSchema, GetDriveImagesOutputSchema, type GetDriveImagesOutput } from '@/ai/schemas';

// You can find the Folder ID in the URL of the Google Drive folder.
// e.g. https://drive.google.com/drive/folders/THIS_IS_THE_ID
const FOLDER_ID = 'YOUR_GOOGLE_DRIVE_FOLDER_ID_HERE';


async function streamToDataURI(
  stream: Readable,
  mimeType: string
): Promise<string> {
  const chunks: Buffer[] = [];
  for await (const chunk of stream) {
    chunks.push(Buffer.from(chunk));
  }
  const buffer = Buffer.concat(chunks);
  return `data:${mimeType};base64,${buffer.toString('base64')}`;
}

export async function getDriveImages(): Promise<GetDriveImagesOutput> {
  return getDriveImagesFlow();
}

const getDriveImagesFlow = ai.defineFlow(
  {
    name: 'getDriveImagesFlow',
    outputSchema: GetDriveImagesOutputSchema,
  },
  async () => {
    try {
      const auth = new google.auth.GoogleAuth({
        scopes: ['https://www.googleapis.com/auth/drive.readonly'],
      });
      const authClient = await auth.getClient();
      const drive = google.drive({ version: 'v3', auth: authClient });

      const res = await drive.files.list({
        q: `'${FOLDER_ID}' in parents and mimeType contains 'image/'`,
        fields: 'files(id, name, mimeType)',
        pageSize: 20, // Adjust as needed
      });

      const files = res.data.files;
      if (!files || files.length === 0) {
        return { images: [] };
      }

      const imagePromises = files.map(async (file) => {
        if (!file.id || !file.name || !file.mimeType) return null;

        const fileRes = await drive.files.get(
          { fileId: file.id, alt: 'media' },
          { responseType: 'stream' }
        );

        const dataUri = await streamToDataURI(
          fileRes.data as Readable,
          file.mimeType
        );

        return {
          id: file.id,
          name: file.name,
          dataUri,
        };
      });

      const images = (await Promise.all(imagePromises)).filter(
        (img): img is DriveImage => img !== null
      );

      return { images };
    } catch (error: any) {
      console.error('Error fetching from Google Drive:', error);
      // In a real app, you might want to throw a more specific error
      // or handle different error cases (e.g., auth vs. API errors).
      return { images: [] };
    }
  }
);
