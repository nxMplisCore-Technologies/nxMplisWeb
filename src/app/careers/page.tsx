'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { JOBS } from '@/lib/data';
import { MapPin, Briefcase } from "lucide-react";

const formSchema = z.object({
  fullName: z.string().min(2, { message: "Full name must be at least 2 characters." }),
  phone: z.string().min(7, { message: "Please enter a valid phone number." }),
  email: z.string().email({ message: "Please enter a valid email address." }).optional().or(z.literal('')),
  resume: z.any().refine(files => files?.length === 1, "Resume is required."),
  coverLetter: z.string().optional(),
});

function ApplyForm({ jobTitle }: { jobTitle: string }) {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { fullName: "", phone: "", email: "", coverLetter: "" },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast({
      title: "Application Submitted!",
      description: `Thank you for applying for the ${jobTitle} position.`,
    });
    setIsOpen(false);
    form.reset();
  }
  
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>Apply Now</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="font-headline">Apply for {jobTitle}</DialogTitle>
          <DialogDescription>
            Fill out the form below to submit your application.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Evelyn Reed" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone / WhatsApp *</FormLabel>
                  <FormControl>
                    <Input type="tel" placeholder="+91 98765 43210" autoComplete="tel" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address (optional)</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="e.reed@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="resume"
              render={({ field: { onChange, onBlur, name, ref } }) => (
                <FormItem>
                  <FormLabel>Resume/CV</FormLabel>
                  <FormControl>
                    <Input type="file" accept=".pdf,.doc,.docx" onChange={e => onChange(e.target.files)} onBlur={onBlur} name={name} ref={ref} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="coverLetter"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cover Letter (Optional)</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Tell us why you're a great fit..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">Submit Application</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default function CareersPage() {
  return (
    <div className="container mx-auto px-4 py-16 sm:py-24">
      <header className="text-center max-w-4xl mx-auto mb-16">
        <h1 className="font-headline text-4xl md:text-5xl font-bold mb-4">
          Join Our Mission
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground">
          We're seeking the brightest minds in hardware, software, and AI to help us invent the future of wellness technology. If you're passionate about solving hard problems, we want to hear from you.
        </p>
      </header>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {JOBS.map((job) => (
          <Card key={job.title} className="flex flex-col bg-card/50">
            <CardHeader>
              <CardTitle className="font-headline text-xl">{job.title}</CardTitle>
              <CardDescription className="flex flex-col sm:flex-row gap-x-4 gap-y-1 pt-2">
                <span className="flex items-center gap-2"><MapPin className="w-4 h-4" /> {job.location}</span>
                <span className="flex items-center gap-2"><Briefcase className="w-4 h-4" /> {job.type}</span>
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-muted-foreground text-sm">We are looking for a highly motivated {job.title.toLowerCase()} to join our dynamic team and contribute to our cutting-edge projects.</p>
            </CardContent>
            <CardFooter>
              <ApplyForm jobTitle={job.title} />
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
