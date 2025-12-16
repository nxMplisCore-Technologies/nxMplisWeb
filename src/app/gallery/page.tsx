'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  getDriveImages
} from '@/ai/flows/google-drive-flow';
import type { DriveImage } from '@/ai/schemas';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';

function ImageGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {Array.from({ length: 8 }).map((_, index) => (
        <Card key={index} className="overflow-hidden">
          <Skeleton className="h-60 w-full" />
        </Card>
      ))}
    </div>
  );
}

export default function GalleryPage() {
  const [images, setImages] = useState<DriveImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadImages() {
      try {
        setIsLoading(true);
        setError(null);
        const result = await getDriveImages();
        if (result.images.length === 0) {
            setError("No images found in the specified Google Drive folder, or the folder ID is incorrect. Please check the `FOLDER_ID` in `src/ai/flows/google-drive-flow.ts`.");
        }
        setImages(result.images);
      } catch (e: any) {
        console.error('Failed to fetch images from Google Drive:', e);
        setError(
          'Failed to load images from Google Drive. This could be due to missing authentication credentials or incorrect API permissions. Please check the server logs for more details.'
        );
      } finally {
        setIsLoading(false);
      }
    }
    loadImages();
  }, []);

  return (
    <div className="container mx-auto px-4 py-16 sm:py-24">
      <header className="text-center max-w-4xl mx-auto mb-16">
        <h1 className="font-headline text-4xl md:text-5xl font-bold mb-4">
          Image Gallery
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground">
          Images dynamically loaded from a Google Drive folder.
        </p>
      </header>

      {error && (
         <Alert variant="destructive" className="max-w-2xl mx-auto mb-8">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Error Loading Gallery</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {isLoading ? (
        <ImageGridSkeleton />
      ) : !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image) => (
            <Card key={image.id} className="overflow-hidden group">
              <div className="relative aspect-square">
                <Image
                  src={image.dataUri}
                  alt={image.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
