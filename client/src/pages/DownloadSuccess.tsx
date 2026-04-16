/**
 * OSMEL FABRE — Pagina di Download PDF
 * Mostrata dopo il pagamento Stripe di un PDF.
 * Verifica la sessione e mostra il link di download sicuro (pre-signed URL).
 */

import { useEffect, useState } from "react";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";

function useQueryParams() {
  const params = new URLSearchParams(window.location.search);
  return {
    sessionId: params.get("session_id") ?? "",
    pdfId: params.get("pdf_id") ?? "",
  };
}

export default function DownloadSuccess() {
  const { sessionId } = useQueryParams();
  const [downloaded, setDownloaded] = useState(false);

  const { data, isLoading, error } = trpc.pdfs.verifyPurchase.useQuery(
    { sessionId },
    { enabled: !!sessionId, retry: 3, retryDelay: 2000 }
  );

  const trackDownload = trpc.pdfs.trackDownload.useMutation();

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleDownload = () => {
    if (!data?.pdfUrl) return;
    // Track the download
    if (sessionId) {
      trackDownload.mutate({ sessionId });
    }
    setDownloaded(true);
    // Open the pre-signed URL in a new tab
    window.open(data.pdfUrl, "_blank");
  };

  return (
    <section className="min-h-screen flex items-center justify-center py-24">
      <div className="container max-w-xl text-center">

        {/* Loading — attende il webhook Stripe (può richiedere qualche secondo) */}
        {isLoading && (
          <div>
            <div className="v-line h-16 mx-auto mb-8" />
            <p className="font-['Jost'] text-sm font-light text-muted-foreground tracking-[0.15em] uppercase">
              Verifica pagamento in corso…
            </p>
            <p className="font-['Jost'] text-xs text-muted-foreground/60 mt-3">
              Potrebbe richiedere qualche secondo
            </p>
          </div>
        )}

        {/* Errore / sessione non trovata */}
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
              Pagamento non verificato
            </h1>
            <p className="font-['Jost'] font-light text-sm text-muted-foreground leading-loose mb-10">
              Non riusciamo a verificare il tuo pagamento. Se hai completato l'acquisto,
              attendi qualche minuto e ricarica la pagina. Per assistenza scrivi a{" "}
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

        {/* Successo — mostra il pulsante di download */}
        {!isLoading && data?.verified && (
          <div>
            {/* Checkmark */}
            <div className="flex items-center justify-center mb-8">
              <div
                className="w-16 h-16 flex items-center justify-center"
                style={{ border: "1px solid oklch(0.58 0.1 42)" }}
              >
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                  <path
                    d="M5 14l7 7L23 7"
                    stroke="oklch(0.58 0.1 42)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>

            <p className="font-['Jost'] text-[10px] font-medium tracking-[0.3em] uppercase text-primary mb-4">
              Acquisto Completato
            </p>
            <h1
              className="font-['Cormorant_Garamond'] font-light text-foreground mb-6"
              style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
            >
              {data.pdfTitle}
            </h1>

            <div className="h-sep mb-8 max-w-xs mx-auto" />

            {data.customerEmail && (
              <p className="font-['Jost'] font-light text-sm text-muted-foreground leading-loose mb-8">
                Grazie per il tuo acquisto,{" "}
                <span className="text-foreground font-medium">{data.customerEmail}</span>.
              </p>
            )}

            {/* Download button */}
            <button
              onClick={handleDownload}
              className="inline-flex items-center gap-4 border border-primary text-primary px-10 py-5 font-['Jost'] text-xs font-medium tracking-[0.2em] uppercase hover:bg-primary hover:text-primary-foreground transition-colors duration-350 mb-4"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0">
                <path d="M8 2v8M4 7l4 4 4-4M2 13h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>{downloaded ? "Scarica di nuovo" : "Scarica il PDF"}</span>
            </button>

            {downloaded && (
              <p className="font-['Jost'] text-xs text-primary/70 mb-8">
                Il file si è aperto in una nuova scheda. Se non lo vedi, controlla i popup bloccati.
              </p>
            )}

            {/* Info box */}
            <div className="text-left p-8 border border-border mb-10 mt-6">
              <h3 className="font-['Cormorant_Garamond'] text-xl text-primary font-light mb-4">
                Informazioni sul download
              </h3>
              <div className="space-y-3">
                {[
                  "Il link di download è valido per 24 ore",
                  "Salva il PDF sul tuo dispositivo dopo averlo scaricato",
                  "Per assistenza: info@osmelfabre.it",
                ].map((step, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <span className="font-['Jost'] text-xs text-primary/60 w-5 shrink-0 mt-0.5">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-['Jost'] text-sm font-light text-muted-foreground leading-relaxed">
                      {step}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <Link
              href="/"
              className="inline-flex items-center gap-4 border border-border text-muted-foreground px-8 py-4 font-['Jost'] text-xs font-medium tracking-[0.2em] uppercase hover:border-foreground hover:text-foreground transition-colors duration-350"
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
