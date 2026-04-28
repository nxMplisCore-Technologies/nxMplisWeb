import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Contact Anvaya Smart | WhatsApp Support India | Nxmliscore',
  description: 'Get in touch with Anvaya Smart. WhatsApp support, investor relations, career opportunities. Based in Hyderabad, India. hello@nxmplis.com',
  keywords: ["contact Anvaya Smart", "Nxmliscore support", "baby monitor support India"],
  alternates: { canonical: 'https://nxmplis.com/contact' },
  openGraph: { title: 'Contact Anvaya Smart | WhatsApp Support India | Nxmliscore', description: 'Get in touch with Anvaya Smart. WhatsApp support, investor relations, career opportunities. Based in Hyderabad, India. hello@nxmplis.com', url: 'https://nxmplis.com/contact', images: [{ url: '/anvaya-product.png' }] },
};

'use client';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, MapPin, ArrowRight } from 'lucide-react';

const formSchema = z.object({
  fullName: z.string().min(2),
  email: z.string().email(),
  inquiryType: z.enum(["early-access", "investor", "partner", "careers", "general"]),
  message: z.string().min(10),
});

const contacts = [
  { icon: Mail, label: 'Email', value: 'hello@nxmplis.com' },
  { icon: Phone, label: 'WhatsApp', value: '+91 98765 43210' },
  { icon: MapPin, label: 'Based in', value: 'Hyderabad, India' },
];

export default function ContactPage() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { fullName: "", email: "", message: "" },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast({ title: "Message sent!", description: "We'll get back to you within 24 hours." });
    form.reset();
  }

  return (
    <div className="bg-[#faf8f5] min-h-screen">
      <section className="bg-gradient-to-br from-[#f5ede0] via-[#faf8f5] to-[#e8f2ee] py-16 text-center">
        <div className="container mx-auto px-4 max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-widest mb-4" style={{color:'#e8957a'}}>Get in Touch</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">We'd love to hear from you.</h1>
          <p className="text-lg text-muted-foreground">Whether you're a parent, investor, partner, or just curious — reach out.</p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-16 max-w-5xl mx-auto">
          <div>
            <h2 className="text-2xl font-bold mb-6">Send us a message</h2>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <FormField control={form.control} name="fullName" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground font-medium">Full name</FormLabel>
                    <FormControl><Input placeholder="Priya Sharma" {...field} className="bg-white border-[#e2dbd4] focus:border-primary" /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="email" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground font-medium">Email address</FormLabel>
                    <FormControl><Input type="email" placeholder="priya@example.com" {...field} className="bg-white border-[#e2dbd4] focus:border-primary" /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="inquiryType" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground font-medium">Reason for reaching out</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-white border-[#e2dbd4]">
                          <SelectValue placeholder="Select a reason..." />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="early-access">Early Access / Product</SelectItem>
                        <SelectItem value="investor">Investor Relations</SelectItem>
                        <SelectItem value="partner">Partnership</SelectItem>
                        <SelectItem value="careers">Careers</SelectItem>
                        <SelectItem value="general">General Question</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="message" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground font-medium">Your message</FormLabel>
                    <FormControl><Textarea placeholder="Tell us how we can help..." className="min-h-[140px] bg-white border-[#e2dbd4] focus:border-primary" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <Button type="submit" size="lg" className="w-full bg-primary text-white hover:bg-primary/90 gap-2">
                  Send Message <ArrowRight className="w-4 h-4" />
                </Button>
              </form>
            </Form>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-6">Contact details</h2>
            <div className="space-y-4 mb-10">
              {contacts.map(c => (
                <div key={c.label} className="flex items-center gap-4 bg-white rounded-xl p-4 border border-[#e2dbd4]">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <c.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground font-medium uppercase tracking-wide">{c.label}</div>
                    <div className="font-semibold text-sm">{c.value}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-gradient-to-br from-[#e8f2ee] to-[#f5ede0] rounded-2xl p-6 border border-[#c8ddd7]">
              <p className="text-sm font-semibold uppercase tracking-widest mb-2" style={{color:'#e8957a'}}>Interested in early access?</p>
              <h3 className="text-xl font-bold mb-2">Reserve your Anvaya Smart</h3>
              <p className="text-sm text-muted-foreground mb-4">Join 47 Indian families who've already reserved. First 100 save ₹2,000 off launch price.</p>
              <Button asChild className="bg-primary text-white hover:bg-primary/90 gap-2 w-full">
                <a href="/early-access">Get Early Access <ArrowRight className="w-4 h-4" /></a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
