'use client';

import { useState, type FormEvent } from 'react';
import { useToast } from '@/hooks/use-toast';
import { extractPresentationContent, type PresentationContent } from '@/ai/flows/pitch-deck-flow';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { UploadCloud, FileText, ImageIcon } from 'lucide-react';

function PitchDeckSkeleton() {
    return (
        <div className="space-y-8">
            <div className="space-y-4">
                <Skeleton className="h-8 w-1/2" />
                <Skeleton className="h-20 w-full" />
            </div>
            <div className="space-y-4">
                <Skeleton className="h-8 w-1/3" />
                <Skeleton className="h-20 w-full" />
            </div>
             <div className="space-y-4">
                <Skeleton className="h-8 w-2/3" />
                <Skeleton className="h-20 w-full" />
            </div>
        </div>
    )
}


export default function PitchDeckPage() {
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [extractedContent, setExtractedContent] = useState<PresentationContent | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
        if (selectedFile.type === "application/vnd.openxmlformats-officedocument.presentationml.presentation") {
            setFile(selectedFile);
            setError(null);
        } else {
            toast({
                variant: 'destructive',
                title: 'Invalid File Type',
                description: 'Please upload a .pptx file.',
            });
            setFile(null);
        }
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!file) {
      toast({
        variant: 'destructive',
        title: 'No file selected',
        description: 'Please choose a .pptx file to analyze.',
      });
      return;
    }

    setIsLoading(true);
    setExtractedContent(null);
    setError(null);

    try {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = async () => {
            const dataUri = reader.result as string;
            const content = await extractPresentationContent({ presentationDataUri: dataUri });
            setExtractedContent(content);
        }
        reader.onerror = (error) => {
            throw new Error("Failed to read file");
        }
    } catch (e: any) {
      console.error('Extraction failed:', e);
      setError('Failed to extract content from the presentation. The file might be corrupted or in an unsupported format.');
      toast({
        variant: 'destructive',
        title: 'Extraction Failed',
        description: e.message || 'An unexpected error occurred.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-16 sm:py-24">
      <header className="text-center max-w-4xl mx-auto mb-16">
        <h1 className="font-headline text-4xl md:text-5xl font-bold mb-4">
          Pitch Deck Analyzer
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground">
          Upload your .pptx pitch deck, and our AI will extract and display the key content for you.
        </p>
      </header>

      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle>Upload Presentation</CardTitle>
          <CardDescription>Select a .pptx file from your device.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
                <Input
                    type="file"
                    accept=".pptx,application/vnd.openxmlformats-officedocument.presentationml.presentation"
                    onChange={handleFileChange}
                    className="flex-grow"
                />
                <Button type="submit" disabled={isLoading || !file}>
                    <UploadCloud className="mr-2" />
                    {isLoading ? 'Analyzing...' : 'Analyze Deck'}
                </Button>
            </div>
             {file && <p className="text-sm text-muted-foreground">Selected file: {file.name}</p>}
          </form>
        </CardContent>
      </Card>

        {(isLoading || extractedContent || error) && (
             <Card className="max-w-3xl mx-auto mt-12">
                <CardHeader>
                    <CardTitle>Extracted Content</CardTitle>
                    <CardDescription>
                        {isLoading 
                            ? "AI is analyzing your presentation, please wait..."
                            : error 
                                ? "An error occurred during analysis."
                                : "Here is the extracted content from your presentation."
                        }
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {isLoading ? (
                        <PitchDeckSkeleton />
                    ) : error ? (
                        <div className="text-destructive">{error}</div>
                    ) : extractedContent ? (
                        <div className="space-y-6 prose prose-invert prose-lg max-w-none">
                            <h2>{extractedContent.title}</h2>
                            <p><em>{extractedContent.overallSummary}</em></p>
                            {extractedContent.slides.map((slide, index) => (
                                <div key={index} className="p-4 border rounded-lg">
                                    <h3 className="font-headline">Slide {index + 1}: {slide.title}</h3>
                                    <div className="flex items-start gap-2 mt-2">
                                        <FileText className="w-5 h-5 mt-1 shrink-0 text-primary" />
                                        <p>{slide.summary}</p>
                                    </div>
                                    <div className="flex items-start gap-2 mt-2 text-muted-foreground">
                                        <ImageIcon className="w-5 h-5 mt-1 shrink-0 text-primary" />
                                        <p><span className="font-semibold">Visuals:</span> {slide.imageDescription}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : null}
                </CardContent>
            </Card>
        )}
    </div>
  );
}
