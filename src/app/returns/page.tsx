import type { Metadata } from 'next';
import Link from 'next/link';
import { BreadcrumbSchema, FAQSchema } from '@/components/seo/JsonLd';

const UPDATED = '2026-11-27';

export const metadata: Metadata = {
  title: 'Return & Refund Policy — Free 7-Day Returns',
  description: 'Anvaya Smart return policy: free 7-day returns on CORE, PULSE and OMNI baby monitors, how to start a return on WhatsApp, refunds for prepaid and Cash on Delivery orders, and the 1-year warranty.',
  alternates: { canonical: 'https://nxmplis.com/returns' },
};

const faqs = [
  { q: 'What is the Anvaya Smart return policy?', a: 'You can return an Anvaya CORE, PULSE or OMNI baby monitor within 7 days of delivery, and returns are free. Message us on WhatsApp at +91 79874 49366 or email info@nxmplis.com with your order number to start a return.' },
  { q: 'How do I get a refund on a Cash on Delivery order?', a: 'Once we receive and check the returned monitor, we refund Cash on Delivery orders to the bank account or UPI ID you share with us. Prepaid orders are refunded to the original payment method.' },
  { q: 'What if my monitor arrives damaged or stops working?', a: 'Tell us on WhatsApp as soon as possible with photos or a short video. If it arrived damaged or faulty, we replace it. After the return window, the 1-year warranty covers manufacturing defects.' },
  { q: 'I bought on Amazon.in. Does this policy apply?', a: 'Orders placed on Amazon.in follow Amazon’s return process. Start the return from Your Orders on Amazon. You can still message us on WhatsApp for help with setup or the warranty.' },
];

export default function ReturnsPage() {
  return (
    <div className="bg-[#faf8f5] min-h-screen">
      <BreadcrumbSchema items={[{ name: 'Home', url: 'https://nxmplis.com' }, { name: 'Return & Refund Policy', url: 'https://nxmplis.com/returns' }]} />
      <FAQSchema faqs={faqs} />
      <div className="container mx-auto px-4 max-w-3xl py-14">
        <h1 className="text-4xl md:text-5xl font-bold mb-3">Return &amp; refund policy</h1>
        <p className="text-sm text-muted-foreground mb-8">Last updated {new Date(UPDATED).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })} · Applies to orders placed on nxmplis.com and the Anvaya Smart official store</p>

        <div className="grid gap-3 sm:grid-cols-3 mb-10">
          {[
            ['7 days', 'to return, from the day it is delivered'],
            ['1 year', 'warranty against manufacturing defects'],
            ['Free', 'shipping and free returns in India'],
          ].map(([big, small]) => (
            <div key={big} className="bg-white border border-[#e2dbd4] rounded-2xl p-4">
              <div className="text-2xl font-bold text-primary">{big}</div>
              <div className="text-sm text-muted-foreground">{small}</div>
            </div>
          ))}
        </div>

        <div className="prose prose-base max-w-none prose-headings:font-bold prose-h2:text-2xl prose-h2:mt-10 prose-p:text-muted-foreground prose-li:text-muted-foreground">
          <h2>7-day returns</h2>
          <p>If an Anvaya CORE, PULSE or OMNI baby monitor isn’t right for you, you can return it within <strong>7 days of delivery</strong>.</p>
          <ul>
            <li>Return the monitor with everything that came in the box: camera, parent display (if you bought one), cables, adapter and mounting parts.</li>
            <li>Please pack it in the original box where possible, and reset the device in the Anvaya Smart app before sending it back.</li>
            <li><strong>Returns are free.</strong> We cover the cost of sending it back.</li>
          </ul>

          <h2>How to start a return</h2>
          <ol>
            <li>Message us on WhatsApp at <a href="https://wa.me/917987449366">+91 79874 49366</a> or email <a href="mailto:info@nxmplis.com">info@nxmplis.com</a> with your order number and the reason for the return.</li>
            <li>We confirm the return and tell you how to send it back.</li>
            <li>Once the monitor reaches us and we have checked it, we process your refund.</li>
          </ol>

          <h2>Refunds</h2>
          <ul>
            <li><strong>Prepaid orders</strong> (UPI, card, net banking): refunded to the original payment method.</li>
            <li><strong>Cash on Delivery orders</strong>: refunded to a bank account or UPI ID you share with us.</li>
            <li>We confirm on WhatsApp or email when your refund has been sent. Your bank may take a few more working days to show it.</li>
          </ul>

          <h2>Damaged or faulty on arrival</h2>
          <p>If your monitor arrives damaged, or doesn’t work when you set it up, message us on WhatsApp as soon as possible with photos or a short video of the problem. We will replace it or refund you.</p>

          <h2>1-year warranty</h2>
          <p>After the 7-day return window, every Anvaya monitor is covered by a <strong>1-year warranty</strong> against manufacturing defects. The warranty does not cover physical damage, water damage or damage from using a different power adapter. Message us on WhatsApp and we will help you troubleshoot first, then arrange a repair or replacement.</p>

          <h2>Shipping</h2>
          <p>Shipping is free across India. Orders usually leave within 1–2 days and arrive in 3–7 working days. Cash on Delivery is available.</p>

          <h2>Orders from Amazon.in</h2>
          <p>Orders placed on Amazon.in follow Amazon’s return process. Start the return from <em>Your Orders</em> on Amazon. We are still happy to help with setup and warranty questions on WhatsApp.</p>

          <h2>Questions</h2>
          <p>WhatsApp <a href="https://wa.me/917987449366">+91 79874 49366</a>, email <a href="mailto:info@nxmplis.com">info@nxmplis.com</a>, or see our <Link href="/contact">contact page</Link>.</p>
        </div>

        <section className="mt-12" aria-labelledby="returns-faq">
          <h2 id="returns-faq" className="text-2xl font-bold mb-5">Common questions</h2>
          <div className="space-y-4">
            {faqs.map(f => (
              <div key={f.q} className="bg-white rounded-xl border border-[#e2dbd4] p-5">
                <h3 className="font-bold mb-2">{f.q}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
