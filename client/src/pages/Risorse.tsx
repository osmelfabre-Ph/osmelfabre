/**
 * OSMEL FABRE — Risorse / Archivio PDF
 * Shows all available PDFs with cover images and Stripe payment links.
 * The latest PDF is highlighted; older ones are in the archive section.
 * Preview modal: shows the preview PDF (first pages) in an iframe before purchase.
 */

import SEO from "@/components/SEO";
import { useReveal } from "@/hooks/useReveal";
import { trpc } from "@/lib/trpc";
import NewsletterSignup from "@/components/NewsletterSignup";
import { useState } from "react";

// ── Preview Modal ─────────────────────────────────────────────────────────────
function PdfPreviewModal({
  previewUrl,
  title,
  stripePaymentLink,
  price,
  onClose,
}: {
  previewUrl: string;
  title: string;
  stripePaymentLink?: string | null;
  price?: string | null;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/85 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative z-10 w-full max-w-4xl max-h-[90vh] flex flex-col bg-card border border-border shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border shrink-0">
          <div>
            <p className="font-['Jost'] text-[10px] tracking-[0.25em] uppercase text-primary mb-1">
              Anteprima
            </p>
            <h3 className="font-['Cormorant_Garamond'] text-xl text-foreground font-light">
              {title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors border border-border hover:border-primary"
            aria-label="Chiudi anteprima"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* PDF Viewer */}
        <div className="flex-1 overflow-hidden" style={{ minHeight: "400px" }}>
          <iframe
            src={`${previewUrl}#toolbar=0&navpanes=0&scrollbar=1`}
            className="w-full h-full"
            style={{ minHeight: "400px", height: "60vh" }}
            title={`Anteprima: ${title}`}
          />
        </div>

        {/* Footer CTA */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-border bg-card shrink-0">
          <div>
            <p className="font-['Jost'] text-xs text-muted-foreground mb-1">
              Stai visualizzando un'anteprima delle prime pagine
            </p>
            {price && price !== "0" && (
              <p className="font-['Cormorant_Garamond'] text-2xl text-primary">
                € {price}
              </p>
            )}
          </div>
          {stripePaymentLink ? (
            <a
              href={stripePaymentLink}
              target="_blank"
              rel="noopener noreferrer"
              className="cta-btn inline-flex items-center gap-3 border border-primary text-primary px-6 py-3 font-['Jost'] text-xs font-medium tracking-[0.2em] uppercase hover:text-primary-foreground transition-colors duration-350"
            >
              <span>Acquista e scarica</span>
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="shrink-0">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          ) : (
            <button
              onClick={onClose}
              className="font-['Jost'] text-xs tracking-[0.2em] uppercase text-muted-foreground border border-border px-6 py-3 hover:border-primary hover:text-foreground transition-colors"
            >
              Chiudi
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function Risorse() {
  const addRef = useReveal();
  const { data: pdfs, isLoading } = trpc.pdfs.list.useQuery();
  const [previewPdf, setPreviewPdf] = useState<{
    url: string;
    title: string;
    stripePaymentLink?: string | null;
    price?: string | null;
  } | null>(null);

  const latestPdf = pdfs?.find((p) => p.isLatest);
  const archivePdfs = pdfs?.filter((p) => !p.isLatest) ?? [];

  return (
    <>
      <SEO
        title="Risorse — Guide e PDF Fotografici"
        description="Guide e PDF di fotografia di Osmel Fabre: scarica risorse pratiche su ritratto, luce, postura e identità visiva. Acquisto sicuro con Stripe."
        url="/risorse"
      />
      {/* ── HERO ────────────────────────────────────────────── */}
      <section className="relative min-h-[50vh] flex items-end overflow-hidden pt-24">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.135 0.004 80) 0%, oklch(0.16 0.008 60) 100%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 30% 60%, oklch(0.58 0.1 42) 0%, transparent 60%)",
          }}
        />
        <div className="relative z-10 container pb-20 md:pb-28">
          <p
            ref={addRef}
            className="reveal font-['Jost'] text-xs font-medium tracking-[0.3em] uppercase text-primary mb-6"
          >
            Risorse per fotografi
          </p>
          <h1
            ref={addRef}
            className="reveal delay-100 font-['Cormorant_Garamond'] font-light leading-[1.05] text-foreground mb-6"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5.5rem)" }}
          >
            Archivio
          </h1>
          <p
            ref={addRef}
            className="reveal delay-200 font-['Cormorant_Garamond'] italic text-xl md:text-2xl text-foreground/70 leading-relaxed max-w-xl"
          >
            Guide, metodi e strumenti per fotografi che vogliono andare oltre la tecnica.
          </p>
        </div>
      </section>

      {/* ── LATEST PDF ──────────────────────────────────────── */}
      {isLoading ? (
        <section className="py-24">
          <div className="container">
            <div className="h-64 bg-card animate-pulse rounded" />
          </div>
        </section>
      ) : latestPdf ? (
        <section className="py-24 md:py-32">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-0 items-start mb-8">
              <div className="lg:col-span-2 flex lg:flex-col items-center lg:items-start gap-4 lg:gap-0">
                <div className="v-line h-16 hidden lg:block mb-4" />
                <span
                  ref={addRef}
                  className="reveal font-['Jost'] text-[10px] font-medium tracking-[0.3em] uppercase text-primary"
                >
                  Ultima uscita
                </span>
              </div>
              <div className="lg:col-span-10 lg:pl-8">
                <h2
                  ref={addRef}
                  className="reveal font-['Cormorant_Garamond'] font-light leading-[1.1] text-foreground mb-12"
                  style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)" }}
                >
                  Disponibile ora
                </h2>

                <div
                  ref={addRef}
                  className="reveal grid grid-cols-1 md:grid-cols-2 gap-0 bg-card"
                >
                  {/* Cover */}
                  <div className="relative overflow-hidden" style={{ minHeight: "400px" }}>
                    {latestPdf.coverUrl ? (
                      <img
                        src={latestPdf.coverUrl}
                        alt={`Copertina: ${latestPdf.title}`}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    ) : (
                      <div
                        className="absolute inset-0 flex items-center justify-center"
                        style={{
                          background:
                            "linear-gradient(135deg, oklch(0.18 0.006 80) 0%, oklch(0.22 0.01 60) 100%)",
                        }}
                      >
                        <span className="font-['Cormorant_Garamond'] text-6xl text-primary/30">PDF</span>
                      </div>
                    )}
                    {/* "Nuovo" badge */}
                    <div className="absolute top-4 left-4 bg-primary text-primary-foreground px-3 py-1 font-['Jost'] text-[10px] font-medium tracking-[0.2em] uppercase">
                      Nuovo
                    </div>
                    {/* Preview overlay button */}
                    {latestPdf.previewUrl && (
                      <button
                        onClick={() =>
                          setPreviewPdf({
                            url: latestPdf.previewUrl!,
                            title: latestPdf.title,
                            stripePaymentLink: latestPdf.stripePaymentLink,
                            price: latestPdf.price,
                          })
                        }
                        className="absolute inset-0 flex items-end justify-center pb-6 opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black/40"
                      >
                        <span className="flex items-center gap-2 bg-card/90 text-foreground font-['Jost'] text-xs tracking-[0.2em] uppercase px-5 py-3 border border-border">
                          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="shrink-0">
                            <path d="M1 8s2.5-5 7-5 7 5 7 5-2.5 5-7 5-7-5-7-5z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.5" />
                          </svg>
                          Sfoglia anteprima
                        </span>
                      </button>
                    )}
                  </div>

                  {/* Info */}
                  <div className="p-10 md:p-12 flex flex-col justify-between">
                    <div>
                      <h3
                        className="font-['Cormorant_Garamond'] font-light text-foreground mb-4 leading-snug"
                        style={{ fontSize: "clamp(1.5rem, 2.5vw, 2.2rem)" }}
                      >
                        {latestPdf.title}
                      </h3>
                      {latestPdf.description && (
                        <p className="font-['Jost'] font-light text-sm text-muted-foreground leading-loose mb-8">
                          {latestPdf.description}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col gap-4">
                      {latestPdf.price && latestPdf.price !== "0" && (
                        <p className="font-['Cormorant_Garamond'] text-3xl text-primary">
                          € {latestPdf.price}
                        </p>
                      )}
                      <div className="flex flex-wrap gap-4 items-center">
                        {latestPdf.stripePaymentLink ? (
                          <a
                            href={latestPdf.stripePaymentLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="cta-btn inline-flex items-center gap-4 border border-primary text-primary px-8 py-4 font-['Jost'] text-xs font-medium tracking-[0.2em] uppercase hover:text-primary-foreground transition-colors duration-350"
                          >
                            <span>Acquista e scarica</span>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0">
                              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </a>
                        ) : (
                          <p className="font-['Jost'] text-sm text-muted-foreground italic">
                            Link di acquisto in arrivo.
                          </p>
                        )}
                        {latestPdf.previewUrl && (
                          <button
                            onClick={() =>
                              setPreviewPdf({
                                url: latestPdf.previewUrl!,
                                title: latestPdf.title,
                                stripePaymentLink: latestPdf.stripePaymentLink,
                                price: latestPdf.price,
                              })
                            }
                            className="inline-flex items-center gap-2 font-['Jost'] text-xs tracking-[0.15em] uppercase text-muted-foreground border-b border-muted-foreground/30 hover:text-foreground hover:border-foreground transition-colors pb-0.5"
                          >
                            <svg width="13" height="13" viewBox="0 0 16 16" fill="none" className="shrink-0">
                              <path d="M1 8s2.5-5 7-5 7 5 7 5-2.5 5-7 5-7-5-7-5z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                              <circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.5" />
                            </svg>
                            Sfoglia anteprima
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <section className="py-24">
          <div className="container">
            <p className="font-['Jost'] font-light text-muted-foreground text-center">
              Nessuna risorsa disponibile al momento. Torna presto.
            </p>
          </div>
        </section>
      )}

      {/* ── ARCHIVE ─────────────────────────────────────────── */}
      {archivePdfs.length > 0 && (
        <section className="py-24 md:py-32 relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 80% 50%, oklch(0.58 0.1 42) 0%, transparent 60%)",
            }}
          />
          <div className="container relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-0 items-start">
              <div className="lg:col-span-2 flex lg:flex-col items-center lg:items-start gap-4 lg:gap-0">
                <div className="v-line h-16 hidden lg:block mb-4" />
                <span
                  ref={addRef}
                  className="reveal font-['Jost'] text-[10px] font-medium tracking-[0.3em] uppercase text-primary"
                >
                  Archivio
                </span>
              </div>
              <div className="lg:col-span-10 lg:pl-8">
                <h2
                  ref={addRef}
                  className="reveal font-['Cormorant_Garamond'] font-light leading-[1.1] text-foreground mb-12"
                  style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)" }}
                >
                  Edizioni precedenti
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
                  {archivePdfs.map((pdf, i) => (
                    <div
                      key={pdf.id}
                      ref={addRef}
                      className={`reveal delay-${(i % 3) * 100} bg-card flex flex-col group`}
                    >
                      {/* Cover */}
                      <div className="relative overflow-hidden" style={{ aspectRatio: "3/4" }}>
                        {pdf.coverUrl ? (
                          <img
                            src={pdf.coverUrl}
                            alt={`Copertina: ${pdf.title}`}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            style={{ filter: "brightness(0.8)" }}
                          />
                        ) : (
                          <div
                            className="w-full h-full flex items-center justify-center"
                            style={{
                              background:
                                "linear-gradient(135deg, oklch(0.18 0.006 80) 0%, oklch(0.22 0.01 60) 100%)",
                            }}
                          >
                            <span className="font-['Cormorant_Garamond'] text-4xl text-primary/30">PDF</span>
                          </div>
                        )}
                        {/* Preview overlay button */}
                        {pdf.previewUrl && (
                          <button
                            onClick={() =>
                              setPreviewPdf({
                                url: pdf.previewUrl!,
                                title: pdf.title,
                                stripePaymentLink: pdf.stripePaymentLink,
                                price: pdf.price,
                              })
                            }
                            className="absolute inset-0 flex items-end justify-center pb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40"
                          >
                            <span className="flex items-center gap-2 bg-card/90 text-foreground font-['Jost'] text-[10px] tracking-[0.2em] uppercase px-4 py-2 border border-border">
                              <svg width="12" height="12" viewBox="0 0 16 16" fill="none" className="shrink-0">
                                <path d="M1 8s2.5-5 7-5 7 5 7 5-2.5 5-7 5-7-5-7-5z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.5" />
                              </svg>
                              Anteprima
                            </span>
                          </button>
                        )}
                      </div>

                      {/* Info */}
                      <div className="p-6 flex flex-col gap-3 flex-1">
                        <h3 className="font-['Cormorant_Garamond'] text-xl text-foreground font-light leading-snug">
                          {pdf.title}
                        </h3>
                        {pdf.description && (
                          <p className="font-['Jost'] text-xs font-light text-muted-foreground leading-relaxed line-clamp-2">
                            {pdf.description}
                          </p>
                        )}
                        <div className="mt-auto pt-4 flex items-center justify-between gap-3 flex-wrap">
                          {pdf.price && pdf.price !== "0" && (
                            <span className="font-['Cormorant_Garamond'] text-xl text-primary">
                              € {pdf.price}
                            </span>
                          )}
                          <div className="flex items-center gap-4">
                            {pdf.previewUrl && (
                              <button
                                onClick={() =>
                                  setPreviewPdf({
                                    url: pdf.previewUrl!,
                                    title: pdf.title,
                                    stripePaymentLink: pdf.stripePaymentLink,
                                    price: pdf.price,
                                  })
                                }
                                className="font-['Jost'] text-[10px] font-medium tracking-[0.2em] uppercase text-muted-foreground border-b border-muted-foreground/30 hover:text-foreground hover:border-foreground transition-colors pb-0.5"
                              >
                                Anteprima
                              </button>
                            )}
                            {pdf.stripePaymentLink ? (
                              <a
                                href={pdf.stripePaymentLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-['Jost'] text-[10px] font-medium tracking-[0.2em] uppercase text-primary border-b border-primary/30 hover:border-primary transition-colors pb-0.5"
                              >
                                Acquista →
                              </a>
                            ) : (
                              <span className="font-['Jost'] text-[10px] text-muted-foreground italic">
                                Non disponibile
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── NEWSLETTER ──────────────────────────────────────── */}
      <NewsletterSignup />

      {/* ── PREVIEW MODAL ───────────────────────────────────── */}
      {previewPdf && (
        <PdfPreviewModal
          previewUrl={previewPdf.url}
          title={previewPdf.title}
          stripePaymentLink={previewPdf.stripePaymentLink}
          price={previewPdf.price}
          onClose={() => setPreviewPdf(null)}
        />
      )}
    </>
  );
}
