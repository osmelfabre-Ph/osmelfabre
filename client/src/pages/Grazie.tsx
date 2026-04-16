/**
 * OSMEL FABRE — Pagina di ringraziamento post-pagamento
 * Verifies the Stripe session ID from the URL query param,
 * then shows the download button only if the purchase is confirmed.
 */

import { useEffect, useState } from "react";
import { trpc } from "@/lib/trpc";
import { Link } from "wouter";

function useSessionId() {
  const [sessionId, setSessionId] = useState<string | null>(null);
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setSessionId(params.get("session_id"));
  }, []);
  return sessionId;
}

export default function Grazie() {
  const sessionId = useSessionId();
  const trackDownload = trpc.pdfs.trackDownload.useMutation();

  const { data, isLoading, error } = trpc.pdfs.verifyPurchase.useQuery(
    { sessionId: sessionId! },
    { enabled: !!sessionId, retry: false }
  );

  const handleDownload = () => {
    if (!sessionId || !data?.pdfUrl) return;
    trackDownload.mutate({ sessionId });
    // Open PDF in new tab
    window.open(data.pdfUrl, "_blank");
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{ paddingTop: "80px" }}
    >
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.135 0.004 80) 0%, oklch(0.16 0.008 60) 100%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 50% 40%, oklch(0.58 0.1 42) 0%, transparent 60%)",
        }}
      />

      <div className="relative z-10 container max-w-2xl text-center py-24">
        {isLoading || !sessionId ? (
          <div>
            <div className="v-line h-16 mx-auto mb-8" />
            <p className="font-['Jost'] font-light text-muted-foreground">
              Verifica del pagamento in corso…
            </p>
          </div>
        ) : error || !data?.verified ? (
          <div>
            <div className="v-line h-16 mx-auto mb-8" />
            <h1
              className="font-['Cormorant_Garamond'] font-light text-foreground mb-6"
              style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
            >
              Pagamento non verificato
            </h1>
            <p className="font-['Jost'] font-light text-base text-muted-foreground leading-loose mb-10">
              Non è stato possibile verificare il tuo acquisto. Se hai completato il pagamento, contattami a{" "}
              <a href="mailto:info@osmelfabre.it" className="text-primary underline">
                info@osmelfabre.it
              </a>{" "}
              con la ricevuta Stripe.
            </p>
            <Link
              href="/"
              className="font-['Jost'] text-xs font-medium tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground transition-colors"
            >
              ← Torna alla home
            </Link>
          </div>
        ) : (
          <div>
            <div className="v-line h-16 mx-auto mb-8" />
            <p className="font-['Jost'] text-xs font-medium tracking-[0.3em] uppercase text-primary mb-6">
              Acquisto confermato
            </p>
            <h1
              className="font-['Cormorant_Garamond'] font-light text-foreground mb-4"
              style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}
            >
              Grazie.
            </h1>
            <p
              className="font-['Cormorant_Garamond'] italic text-xl md:text-2xl text-foreground/70 leading-relaxed mb-4"
            >
              {data.pdfTitle}
            </p>
            {data.customerEmail && (
              <p className="font-['Jost'] font-light text-sm text-muted-foreground mb-10">
                Una copia è stata inviata a <span className="text-foreground">{data.customerEmail}</span>
              </p>
            )}

            <div className="h-sep max-w-xs mx-auto mb-10" />

            <button
              onClick={handleDownload}
              className="cta-btn inline-flex items-center gap-4 border border-primary text-primary px-10 py-5 font-['Jost'] text-xs font-medium tracking-[0.2em] uppercase hover:text-primary-foreground transition-colors duration-350 mb-12"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="shrink-0">
                <path d="M9 2v10M5 8l4 4 4-4M3 15h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>Scarica il PDF</span>
            </button>

            <p className="font-['Jost'] font-light text-xs text-muted-foreground leading-loose">
              Il link è valido per questa sessione. Conserva questa pagina o la ricevuta email per accedere nuovamente.
            </p>

            <div className="mt-12">
              <Link
                href="/risorse"
                className="font-['Jost'] text-xs font-medium tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground transition-colors"
              >
                ← Torna all'archivio
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
