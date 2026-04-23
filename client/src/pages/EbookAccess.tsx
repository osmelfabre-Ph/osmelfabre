import { useState } from "react";
import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import SEO from "@/components/SEO";

export default function EbookAccess() {
  const [, navigate] = useLocation();
  const params = new URLSearchParams(window.location.search);
  const ebookId = parseInt(params.get("id") ?? "0", 10);

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [done, setDone] = useState(false);
  const [token, setToken] = useState("");
  const [title, setTitle] = useState("");

  const { data: info, isLoading: infoLoading } = trpc.ebooks.info.useQuery(
    { id: ebookId },
    { enabled: ebookId > 0, retry: false }
  );

  const requestAccess = trpc.ebooks.requestAccess.useMutation({
    onSuccess: (data) => {
      setToken(data.token);
      setTitle(data.title);
      setDone(true);
    },
    onError: (e) => toast.error(e.message),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    requestAccess.mutate({ ebookId, email, name: name || undefined });
  };

  const handleRead = () => {
    window.open(`/ebook/leggi?token=${encodeURIComponent(token)}`, "_blank");
  };

  if (!ebookId || (!infoLoading && !info)) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="font-['Jost'] text-muted-foreground">Ebook non trovato.</p>
      </div>
    );
  }

  return (
    <>
      <SEO title={info?.title ?? "Accedi all'ebook"} url={`/ebook/accedi?id=${ebookId}`} />
      <div className="min-h-screen bg-background flex items-center justify-center px-6">
        <div className="w-full max-w-md">
          {/* Logo */}
          <a href="/" className="block mb-12 text-center">
            <span className="font-['Cormorant_Garamond'] text-2xl font-light tracking-[0.1em] text-foreground hover:text-primary transition-colors">
              Osmel Fabre
            </span>
          </a>

          {!done ? (
            <>
              <div className="mb-8">
                <p className="font-['Jost'] text-[10px] font-medium tracking-[0.3em] uppercase text-primary mb-3">
                  Ebook gratuito
                </p>
                <h1 className="font-['Cormorant_Garamond'] font-light text-3xl text-foreground mb-3">
                  {infoLoading ? "Caricamento…" : info?.title}
                </h1>
                {info?.description && (
                  <p className="font-['Jost'] text-sm font-light text-muted-foreground leading-relaxed">
                    {info.description}
                  </p>
                )}
              </div>

              <div className="h-px bg-border mb-8" />

              <p className="font-['Jost'] text-sm text-muted-foreground mb-6 leading-relaxed">
                Inserisci la tua email per accedere. Riceverai anche contenuti esclusivi sulla fotografia.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nome (opzionale)"
                  className="w-full bg-card border border-border text-foreground font-['Jost'] text-sm px-4 py-3 focus:outline-none focus:border-primary placeholder:text-muted-foreground/40"
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="La tua email *"
                  required
                  className="w-full bg-card border border-border text-foreground font-['Jost'] text-sm px-4 py-3 focus:outline-none focus:border-primary placeholder:text-muted-foreground/40"
                />
                <button
                  type="submit"
                  disabled={requestAccess.isPending || !email}
                  className="w-full py-4 font-['Jost'] text-xs tracking-[0.25em] uppercase border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {requestAccess.isPending ? "Elaborazione…" : "Accedi all'ebook →"}
                </button>
              </form>

              <p className="mt-6 font-['Jost'] text-[10px] text-muted-foreground/50 text-center leading-relaxed">
                Nessuno spam. Puoi disiscriverti in qualsiasi momento.
              </p>
            </>
          ) : (
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                  <path d="M20 6L9 17l-5-5" stroke="oklch(0.58 0.1 42)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h2 className="font-['Cormorant_Garamond'] font-light text-3xl text-foreground mb-3">
                Accesso confermato
              </h2>
              <p className="font-['Jost'] text-sm text-muted-foreground mb-8 leading-relaxed">
                Il link è valido per 7 giorni. Clicca per leggere <strong>{title}</strong>.
              </p>
              <button
                onClick={handleRead}
                className="inline-flex items-center gap-3 border border-primary text-primary px-8 py-4 font-['Jost'] text-xs tracking-[0.2em] uppercase hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
              >
                <span>Leggi ora</span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
