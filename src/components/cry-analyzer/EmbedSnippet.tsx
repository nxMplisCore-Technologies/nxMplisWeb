'use client';

import { useState } from 'react';
import { Code2, Check, Copy } from 'lucide-react';

// The text link below the iframe is what gives nxmplis.com a backlink:
// links inside an iframe belong to our page, not the host site's.
const SNIPPET = `<iframe src="https://nxmplis.com/embed/cry-analyzer" title="Free AI baby cry analyzer" width="100%" height="600" style="border:0;max-width:460px;border-radius:16px" allow="microphone" loading="lazy"></iframe>
<p style="font-size:13px">Free <a href="https://nxmplis.com/cry-analyzer">AI baby cry analyzer</a> by Anvaya Smart</p>`;

export function EmbedSnippet() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(SNIPPET);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const el = document.getElementById('cry-embed-code') as HTMLTextAreaElement | null;
      el?.select();
    }
  };
  return (
    <section className="container mx-auto px-4 max-w-3xl py-12" aria-labelledby="embed-heading">
      <div className="bg-white rounded-2xl border border-[#e2dbd4] p-6 md:p-8">
        <div className="flex items-center gap-2 mb-2 text-primary">
          <Code2 className="w-5 h-5" aria-hidden="true" />
          <h2 id="embed-heading" className="text-xl font-bold text-foreground">Add this free tool to your website</h2>
        </div>
        <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
          Run a parenting blog, clinic site or new-parent community? Paste this code into any page and your readers can use the cry analyzer there. It's free, needs no sign-up and stays up to date automatically.
        </p>
        <label htmlFor="cry-embed-code" className="sr-only">Embed code</label>
        <textarea id="cry-embed-code" readOnly value={SNIPPET} rows={5}
          className="w-full font-mono text-xs bg-[#faf8f5] border border-[#e2dbd4] rounded-xl p-3 text-foreground resize-none" />
        <button type="button" onClick={copy}
          className="mt-3 inline-flex items-center gap-2 bg-primary text-white text-sm font-semibold px-4 py-2 rounded-xl hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
          {copied ? <><Check className="w-4 h-4" /> Copied</> : <><Copy className="w-4 h-4" /> Copy embed code</>}
        </button>
        <p className="text-xs text-muted-foreground mt-3">
          On WordPress, paste it into a Custom HTML block. Recording needs the microphone permission, which the code already asks for.
        </p>
      </div>
    </section>
  );
}
