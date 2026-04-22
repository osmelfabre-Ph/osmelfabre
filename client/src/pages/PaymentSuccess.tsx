/**
 * OSMEL FABRE — Pagina di Conferma Pagamento Workshop
 * Mostrata dopo il completamento del pagamento Stripe
 */

import { useEffect } from "react";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";

function useSessionId() {
  const params = new URLSearchParams(window.location.search);
  return params.get("session_id") ?? "";
}

export default function PaymentSuccess() {
  const sessionId = useSessionId();

  const { data, isLoading, error } = trpc.pdfs.verifyPurchase.useQuery(
    { sessionId },
    { enabled: !!sessionId, retry: 2 }
  );

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="min-h-screen flex items-center justify-center py-24">
      <div className="container max-w-xl text-center">
        {/* Loading */}
        {isLoading && (
          <div>
            <div className="v-line h-16 mx-auto mb-8" />
            <p className="font-['Jost'] text-sm font-light text-muted-foreground tracking-[0.15em] uppercase">
              Verifica in corso…
            </p>
          </div>
        )}

        {/* Error / not found */}
        {!isLoading && (error || !data?.verified) && (
          <div>
            <div className="v-line h-16 mx-auto mb-8" />
            <p className="font-['Jost'] text-[10px] font-medium tracking-[0.3em] uppercase text-primary mb-4">
              Attenzione
            </p>
            <h1
              className="font-['Cormorant_Garamond'] font-light text-foreground mb-6"
              style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
            >
              Sessione non trovata
            </h1>
            <p className="font-['Jost'] font-light text-sm text-muted-foreground leading-loose mb-10">
              Non riusciamo a verificare il tuo pagamento. Se hai completato l'acquisto, riceverai una conferma via email entro pochi minuti.
              Per assistenza scrivi a{" "}
              <a href="mailto:info@osmelfabre.it" className="text-primary">
                info@osmelfabre.it
              </a>
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-4 border border-primary text-primary px-8 py-4 font-['Jost'] text-xs font-medium tracking-[0.2em] uppercase hover:text-primary-foreground transition-colors duration-350"
            >
              Torna alla Home
            </Link>
          </div>
        )}

        {/* Success */}
        {!isLoading && data?.verified && (
          <div>
            {/* Checkmark */}
            <div className="flex items-center justify-center mb-8">
              <div
                className="w-16 h-16 flex items-center justify-center"
                style={{ border: "1px solid oklch(0.58 0.1 42)" }}
              >
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                  <path d="M5 14l7 7L23 7" stroke="oklch(0.58 0.1 42)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>

            <p className="font-['Jost'] text-[10px] font-medium tracking-[0.3em] uppercase text-primary mb-4">
              Iscrizione Confermata
            </p>
            <h1
              className="font-['Cormorant_Garamond'] font-light text-foreground mb-6"
              style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
            >
              Benvenuto nel Workshop
            </h1>

            <div className="h-sep mb-8 max-w-xs mx-auto" />

            <p className="font-['Cormorant_Garamond'] italic text-xl text-foreground/70 mb-8 leading-relaxed">
              L'Uomo Davanti all'Obiettivo
            </p>

            {data.customerEmail && (
              <p className="font-['Jost'] font-light text-sm text-muted-foreground leading-loose mb-10">
                Una conferma è stata inviata a{" "}
                <span className="text-foreground font-medium">{data.customerEmail}</span>.
                <br />
                Riceverai a breve tutti i dettagli logistici.
              </p>
            )}

            {!data.customerEmail && (
              <p className="font-['Jost'] font-light text-sm text-muted-foreground leading-loose mb-10">
                Una conferma è stata inviata alla tua email.
                <br />
                Riceverai a breve tutti i dettagli logistici del workshop.
              </p>
            )}

            {/* Info box */}
            <div className="text-left p-8 border border-border mb-10">
              <h3 className="font-['Cormorant_Garamond'] text-xl text-primary font-light mb-6">Cosa succede ora</h3>
              <div className="space-y-4">
                {[
                  "Riceverai un'email di conferma con tutti i dettagli",
                  "Ti contatteremo per comunicarti la location esatta",
                  "Verrai aggiunto al gruppo di supporto WhatsApp",
                  "Porta la tua fotocamera e 10-15 ritratti per la review",
                ].map((step, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <span className="font-['Jost'] text-xs text-primary/60 w-5 shrink-0 mt-0.5">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-['Jost'] text-sm font-light text-muted-foreground leading-relaxed">{step}</span>
                  </div>
                ))}
              </div>
            </div>

            <p className="font-['Jost'] font-light text-xs text-muted-foreground mb-8">
              Per qualsiasi domanda:{" "}
              <a href="mailto:info@osmelfabre.it" className="text-primary">
                info@osmelfabre.it
              </a>
            </p>

            <Link
              href="/"
              className="inline-flex items-center gap-4 border border-primary text-primary px-8 py-4 font-['Jost'] text-xs font-medium tracking-[0.2em] uppercase hover:text-primary-foreground transition-colors duration-350"
            >
              <span>Torna alla Home</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
