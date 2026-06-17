'use client';
import { useState } from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, MapPin, ArrowRight, MessageCircle, CheckCircle2 } from 'lucide-react';

const formSchema = z.object({
  fullName: z.string().min(2, 'Please enter your full name'),
  phone: z.string().min(7, 'Please enter a valid phone number'),
  email: z.string().email('Please enter a valid email').optional().or(z.literal('')),
  inquiryType: z.enum(["early-access", "investor", "partner", "careers", "general"]),
  message: z.string().min(2, 'Please enter a message'),
});

const contacts = [
  { icon: Phone, label: 'Call / WhatsApp', value: '+91 79874 49366', href: 'tel:+917987449366' },
  { icon: MessageCircle, label: 'WhatsApp', value: 'Chat on WhatsApp →', href: 'https://wa.me/917987449366' },
  { icon: Mail, label: 'Email', value: 'admin@nxmplis.com', href: 'mailto:admin@nxmplis.com' },
  { icon: MapPin, label: 'Based in', value: 'Hyderabad, India', href: null },
];

export default function ContactPage() {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { fullName: "", phone: "", email: "", message: "" },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error('Failed');
      setSubmitted(true);
    } catch {
      toast({ title: "Something went wrong", description: "Please try emailing admin@nxmplis.com directly.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-[#faf8f5] min-h-screen">
      <section className="bg-gradient-to-br from-[#f5ede0] via-[#faf8f5] to-[#e8f2ee] py-16 text-center">
        <div className="container mx-auto px-4 max-w-2xl animate-fade-in">
          <p className="text-sm font-semibold uppercase tracking-widest mb-4" style={{color:'#e8957a'}}>Get in Touch</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">We'd love to hear from you.</h1>
          <p className="text-lg text-muted-foreground">Whether you're a parent, investor, partner, or just curious — reach out.</p>
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            <a href="tel:+917987449366" className="inline-flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-full font-semibold hover:bg-primary/90 transition-colors text-sm">
              <Phone className="w-4 h-4" /> +91 79874 49366
            </a>
            <a href="https://wa.me/917987449366" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-white border border-primary text-primary px-5 py-2.5 rounded-full font-semibold hover:bg-primary/5 transition-colors text-sm">
              <MessageCircle className="w-4 h-4" /> WhatsApp Us
            </a>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-16 max-w-5xl mx-auto">
          <div>
            <h2 className="text-2xl font-bold mb-6">Send us a message</h2>

            {submitted ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <CheckCircle2 className="w-16 h-16 text-primary mb-4" />
                <h3 className="text-2xl font-bold mb-2">Message received!</h3>
                <p className="text-muted-foreground mb-6">We'll reply within 24 hours. You can also reach us directly at <a href="tel:+917987449366" className="text-primary font-semibold">+91 79874 49366</a>.</p>
                <Button variant="outline" onClick={() => { setSubmitted(false); form.reset(); }}>Send another message</Button>
              </div>
            ) : (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                  <FormField control={form.control} name="fullName" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground font-medium">Full name</FormLabel>
                      <FormControl><Input placeholder="Priya Sharma" {...field} className="bg-white border-[#e2dbd4] focus:border-primary" /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <div className="grid sm:grid-cols-2 gap-4">
                    <FormField control={form.control} name="phone" render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground font-medium">Phone / WhatsApp *</FormLabel>
                        <FormControl><Input type="tel" placeholder="+91 98765 43210" {...field} className="bg-white border-[#e2dbd4] focus:border-primary" /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="email" render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground font-medium">Email (optional)</FormLabel>
                        <FormControl><Input type="email" placeholder="priya@example.com" {...field} className="bg-white border-[#e2dbd4] focus:border-primary" /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                  </div>
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
                  <Button type="submit" size="lg" disabled={loading} className="w-full bg-primary text-white hover:bg-primary/90 gap-2">
                    {loading ? 'Sending...' : <><span>Send Message</span><ArrowRight className="w-4 h-4" /></>}
                  </Button>
                </form>
              </Form>
            )}
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
                    {c.href ? (
                      <a href={c.href} target={c.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className="font-semibold text-sm text-primary hover:underline">{c.value}</a>
                    ) : (
                      <div className="font-semibold text-sm">{c.value}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-gradient-to-br from-[#e8f2ee] to-[#f5ede0] rounded-2xl p-6 border border-[#c8ddd7]">
              <p className="text-sm font-semibold uppercase tracking-widest mb-2" style={{color:'#e8957a'}}>Interested in early access?</p>
              <h3 className="text-xl font-bold mb-2">Reserve your Anvaya Smart</h3>
              <p className="text-sm text-muted-foreground mb-4">Join 47 Indian families who've already reserved. First 100 save ₹2,000 off launch price.</p>
              <Button asChild className="text-white font-bold gap-2 w-full" style={{background:'linear-gradient(135deg,#e8957a,#d4784a)', boxShadow:'0 4px 20px rgba(232,149,122,0.4)'}}>
                <a href="/quiz">Take the Quiz — Find Your Pod <ArrowRight className="w-4 h-4" /></a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
