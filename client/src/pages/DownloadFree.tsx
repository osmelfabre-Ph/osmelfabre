import { useState, useEffect } from "react";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";

export default function DownloadFree() {
  const pdfId = parseInt(new URLSearchParams(window.location.search).get("id") ?? "0");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [pdfTitle, setPdfTitle] = useState<string | null>(null);
  const [downloaded, setDownloaded] = useState(false);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const requestFree = trpc.pdfs.requestFreePdf.useMutation({
    onSuccess: (data) => {
      setDownloadUrl(data.pdfUrl);
      setPdfTitle(data.pdfTitle);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    requestFree.mutate({ pdfId, email, name: name || undefined });
  };

  const handleDownload = () => {
    if (!downloadUrl) return;
    setDownloaded(true);
    window.open(downloadUrl, "_blank");
  };

  if (!pdfId) return (
    <section className="min-h-screen flex items-center justify-center py-24">
      <p className="font-['Jost'] text-sm text-muted-foreground">PDF non trovato</p>
    </section>
  );

  return (
    <section className="min-h-screen flex items-center justify-center py-24">
      <div className="container max-w-xl text-center">

        {/* Email form — before download */}
        {!downloadUrl && (
          <div>
            <div className="v-line h-16 mx-auto mb-8" />
            <p className="font-['Jost'] text-[10px] font-medium tracking-[0.3em] uppercase text-primary mb-4">
              Download Gratuito
            </p>
            <h1 className="font-['Cormorant_Garamond'] font-light text-foreground mb-4" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>
              Inserisci la tua email
            </h1>
            <p className="font-['Jost'] font-light text-sm text-muted-foreground leading-loose mb-10">
              Lascia la tua email per ricevere il PDF gratuitamente e restare aggiornato sui nuovi contenuti.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4 text-left">
              <div>
                <label className="block font-['Jost'] text-xs tracking-[0.15em] uppercase text-muted-foreground mb-2">Nome</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Il tuo nome"
                  className="w-full bg-card border border-border text-foreground font-['Jost'] text-sm px-4 py-3 focus:outline-none focus:border-primary placeholder:text-muted-foreground/40"
                />
              </div>
              <div>
                <label className="block font-['Jost'] text-xs tracking-[0.15em] uppercase text-muted-foreground mb-2">Email *</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tua@email.it"
                  required
                  className="w-full bg-card border border-border text-foreground font-['Jost'] text-sm px-4 py-3 focus:outline-none focus:border-primary placeholder:text-muted-foreground/40"
                />
              </div>
              {requestFree.error && (
                <p className="font-['Jost'] text-xs text-red-400">{requestFree.error.message}</p>
              )}
              <button
                type="submit"
                disabled={requestFree.isPending || !email}
                className="w-full py-4 font-['Jost'] text-xs tracking-[0.25em] uppercase border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {requestFree.isPending ? "Caricamento..." : "Scarica il PDF"}
              </button>
            </form>
          </div>
        )}

        {/* Download button — after email submitted */}
        {downloadUrl && (
          <div>
            <div className="flex items-center justify-center mb-8">
              <div className="w-16 h-16 flex items-center justify-center" style={{ border: "1px solid oklch(0.58 0.1 42)" }}>
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                  <path d="M5 14l7 7L23 7" stroke="oklch(0.58 0.1 42)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>

            <p className="font-['Jost'] text-[10px] font-medium tracking-[0.3em] uppercase text-primary mb-4">
              Tutto pronto
            </p>
            <h1 className="font-['Cormorant_Garamond'] font-light text-foreground mb-6" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>
              {pdfTitle}
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

            <Link href="/risorse" className="inline-flex items-center gap-4 border border-border text-muted-foreground px-8 py-4 font-['Jost'] text-xs font-medium tracking-[0.2em] uppercase hover:border-foreground hover:text-foreground transition-colors duration-350 mt-6">
              <span>Vedi tutti i PDF</span>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
