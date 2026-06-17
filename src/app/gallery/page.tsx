'use client';

import { useState, useEffect, type FormEvent } from 'react';
import Image from 'next/image';
import { uploadImage } from '@/ai/flows/upload-image-flow';
import { getLocalImages } from '@/ai/flows/get-local-images-flow';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

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

function UploadDialog({ onUploadSuccess }: { onUploadSuccess: () => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { toast } = useToast();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!selectedFile) {
      toast({
        variant: 'destructive',
        title: 'No file selected',
        description: 'Please choose an image file to upload.',
      });
      return;
    }

    setIsUploading(true);

    try {
      const reader = new FileReader();
      reader.readAsDataURL(selectedFile);
      reader.onload = async () => {
        const imageDataUri = reader.result as string;
        await uploadImage({
          imageDataUri,
          filename: selectedFile.name,
        });

        toast({
          title: 'Upload successful!',
          description: `${selectedFile.name} has been uploaded.`,
        });
        onUploadSuccess();
        setIsOpen(false);
        setSelectedFile(null);
      };
      reader.onerror = (error) => {
        throw error;
      }
    } catch (e: any) {
      console.error('Upload failed:', e);
      toast({
        variant: 'destructive',
        title: 'Upload failed',
        description:
          e.message || 'An unexpected error occurred during upload.',
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <Upload className="mr-2" />
          Upload Image
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload a New Image</DialogTitle>
          <DialogDescription>
            Select an image from your computer to add it to the gallery.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input type="file" accept="image/*" onChange={handleFileChange} />
          <Button type="submit" disabled={isUploading || !selectedFile} className="w-full">
            {isUploading ? 'Uploading...' : 'Upload'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}


export default function GalleryPage() {
  const [images, setImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function loadImages() {
    try {
      setIsLoading(true);
      setError(null);
      const result = await getLocalImages();
      if (result.images.length === 0) {
        // This is not an error, just an empty state
        setImages([]);
      } else {
        setImages(result.images);
      }
    } catch (e: any) {
      console.error('Failed to fetch images:', e);
      setError(
        'Failed to load images from the server. Please check the server logs for more details.'
      );
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadImages();
  }, []);

  return (
    <div className="bg-[#faf8f5] min-h-screen">
    <div className="container mx-auto px-4 py-16 sm:py-24">
      <header className="text-center max-w-4xl mx-auto mb-16">
        <div className="flex flex-col items-center gap-4">
          <h1 className="font-headline text-4xl md:text-5xl font-bold mb-2">
            Image Gallery
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground">
            A gallery of uploaded images.
          </p>
          <UploadDialog onUploadSuccess={loadImages} />
        </div>
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
      ) : images.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((imageSrc) => (
            <Card key={imageSrc} className="overflow-hidden group">
              <div className="relative aspect-square">
                <Image
                  src={imageSrc}
                  alt={imageSrc}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            </Card>
          ))}
        </div>
      ) : (
         !error && (
          <div className="text-center text-muted-foreground max-w-md mx-auto">
            <h3 className="text-xl font-semibold mb-2">The Gallery is Empty</h3>
            <p>
              Upload your first image to see it appear here.
            </p>
          </div>
         )
      )}
    </div>
    </div>
  );
}
