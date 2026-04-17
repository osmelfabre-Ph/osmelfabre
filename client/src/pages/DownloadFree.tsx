import { useState, useEffect } from "react";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";

export default function DownloadFree() {
  const pdfId = parseInt(new URLSearchParams(window.location.search).get("id") ?? "0");
  const [downloaded, setDownloaded] = useState(false);

  const { data, isLoading, error } = trpc.pdfs.downloadFree.useQuery(
    { pdfId },
    { enabled: !!pdfId }
  );

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const handleDownload = () => {
    if (!data?.pdfUrl) return;
    setDownloaded(true);
    window.open(data.pdfUrl, "_blank");
  };

  return (
    <section className="min-h-screen flex items-center justify-center py-24">
      <div className="container max-w-xl text-center">

        {isLoading && (
          <p className="font-['Jost'] text-sm font-light text-muted-foreground tracking-[0.15em] uppercase">
            Caricamento…
          </p>
        )}

        {!isLoading && (error || !data) && (
          <div>
            <p className="font-['Jost'] text-[10px] font-medium tracking-[0.3em] uppercase text-primary mb-4">
              Attenzione
            </p>
            <h1 className="font-['Cormorant_Garamond'] font-light text-foreground mb-6" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>
              PDF non trovato
            </h1>
            <Link href="/" className="inline-flex items-center gap-4 border border-primary text-primary px-8 py-4 font-['Jost'] text-xs font-medium tracking-[0.2em] uppercase hover:text-primary-foreground transition-colors duration-350">
              Torna alla Home
            </Link>
          </div>
        )}

        {!isLoading && data && (
          <div>
            <div className="flex items-center justify-center mb-8">
              <div className="w-16 h-16 flex items-center justify-center" style={{ border: "1px solid oklch(0.58 0.1 42)" }}>
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                  <path d="M14 4v14M7 11l7 7 7-7M4 22h20" stroke="oklch(0.58 0.1 42)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>

            <p className="font-['Jost'] text-[10px] font-medium tracking-[0.3em] uppercase text-primary mb-4">
              Download Gratuito
            </p>
            <h1 className="font-['Cormorant_Garamond'] font-light text-foreground mb-6" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>
              {data.pdfTitle}
            </h1>

            <div className="h-sep mb-8 max-w-xs mx-auto" />

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

            <Link href="/risorse" className="inline-flex items-center gap-4 border border-border text-muted-foreground px-8 py-4 font-['Jost'] text-xs font-medium tracking-[0.2em] uppercase hover:border-foreground hover:text-foreground transition-colors duration-350 mt-4">
              <span>Vedi tutti i PDF</span>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
