/**
 * Newsletter signup form — embeddable in any page.
 * Uses the tRPC newsletter.subscribe mutation.
 */

import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const subscribe = trpc.newsletter.subscribe.useMutation({
    onSuccess: (data) => {
      if (data.alreadyExists) {
        toast.info("Sei già iscritto alla newsletter.");
      } else {
        setSubmitted(true);
        toast.success("Iscrizione confermata!");
      }
      setEmail("");
      setName("");
    },
    onError: () => {
      toast.error("Errore durante l'iscrizione. Riprova.");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    subscribe.mutate({ email, name: name || undefined });
  };

  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 50% 50%, oklch(0.58 0.1 42) 0%, transparent 60%)",
        }}
      />
      <div className="container relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <div className="v-line h-12 mx-auto mb-8" />
          <h2
            className="font-['Cormorant_Garamond'] font-light leading-[1.1] text-foreground mb-4"
            style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)" }}
          >
            Rimani in contatto
          </h2>
          <p className="font-['Jost'] font-light text-base text-muted-foreground leading-loose mb-10">
            Ricevi aggiornamenti su workshop, nuovi contenuti e risorse per fotografi.
          </p>

          {submitted ? (
            <div className="py-8">
              <p className="font-['Cormorant_Garamond'] italic text-xl text-primary">
                Grazie per esserti iscritto.
              </p>
              <p className="font-['Jost'] font-light text-sm text-muted-foreground mt-2">
                Ti contatterò presto con nuovi contenuti.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-0 max-w-xl mx-auto">
              <input
                type="text"
                placeholder="Il tuo nome (opzionale)"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="flex-1 bg-card border border-border px-5 py-4 font-['Jost'] text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
              />
              <input
                type="email"
                placeholder="La tua email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 bg-card border border-border border-t-0 sm:border-t sm:border-l-0 px-5 py-4 font-['Jost'] text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
              />
              <button
                type="submit"
                disabled={subscribe.isPending}
                className="cta-btn bg-primary text-primary-foreground border border-primary px-8 py-4 font-['Jost'] text-xs font-medium tracking-[0.2em] uppercase hover:opacity-90 transition-opacity disabled:opacity-50 shrink-0"
              >
                {subscribe.isPending ? "..." : "Iscriviti"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
