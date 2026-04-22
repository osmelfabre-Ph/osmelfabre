/**
 * Galleria — Osmel Fabre
 * Design: Minimalismo Sensoriale
 * Dark charcoal bg, Cormorant Garamond titles, Jost body
 * Masonry editorial grid with lightbox overlay
 */

import SEO from "@/components/SEO";
import { useReveal } from "@/hooks/useReveal";
import { useEffect, useState, useMemo } from "react";
import { trpc } from "@/lib/trpc";

const CDN = "https://d2xsxph8kpxj0f.cloudfront.net/310519663510175502/Jt7ZRyXY4rb5NpEBkocwTA";

// Static fallback photos (shown while DB is empty or loading)
const STATIC_PHOTOS = [
  { src: `${CDN}/CHRISMADSENBW-32_3daa1d99.webp`, name: "Chris Madsen", cat: "Uomo" },
  { src: `${CDN}/ALICE-13_a7a0d3e3.webp`, name: "Alice", cat: "Donna" },
  { src: `${CDN}/GIANNIROSATO-11_d7a5f876.jpg`, name: "Gianni Rosato", cat: "Uomo" },
  { src: `${CDN}/CARLOTTAPARODI-1_cdaf8a60.webp`, name: "Carlotta Parodi", cat: "Donna" },
  { src: `${CDN}/LUCAPANTINI-2026-53_afa9fac3.webp`, name: "Luca Pantini", cat: "Uomo" },
  { src: `${CDN}/DANILOVOLPE-3_750199b7.webp`, name: "Danilo Volpe", cat: "Uomo" },
  { src: `${CDN}/CARLOTTAPARODI-3_6f281af0.webp`, name: "Carlotta Parodi", cat: "Donna" },
  { src: `${CDN}/ALICE-10_53ddd458.webp`, name: "Alice", cat: "Donna" },
  { src: `${CDN}/ANDREA-3_d8970887.webp`, name: "Andrea", cat: "Uomo" },
  { src: `${CDN}/ANDREA-14_0c83f6d0.webp`, name: "Andrea", cat: "Uomo" },
  { src: `${CDN}/ANGELOTANZI-6_4fd60796.webp`, name: "Angelo Tanzi", cat: "Uomo" },
  { src: `${CDN}/CHRISMADSENBW-51_057085f9.webp`, name: "Chris Madsen", cat: "Uomo" },
  { src: `${CDN}/DANILOVOLPE-2_03d4cab3.webp`, name: "Danilo Volpe", cat: "Uomo" },
  { src: `${CDN}/ERIC-25_5b456fde.webp`, name: "Eric", cat: "Uomo" },
  { src: `${CDN}/ERIC-23_027f8d42.webp`, name: "Eric", cat: "Uomo" },
  { src: `${CDN}/GIAMPAOLOBIANCHI-4_93e52e0f.webp`, name: "Giampaolo Bianchi", cat: "Uomo" },
  { src: `${CDN}/ILARIA-DEC2024--5_f3e710c8.webp`, name: "Ilaria", cat: "Donna" },
  { src: `${CDN}/ILARIA-DEC2024--13_24defe75.webp`, name: "Ilaria", cat: "Donna" },
  { src: `${CDN}/LUCAPANTINIIG-3_e29fb5c7.jpg`, name: "Luca Pantini", cat: "Uomo" },
  { src: `${CDN}/LUCAPANTINI-14_0855080f.webp`, name: "Luca Pantini", cat: "Uomo" },
  { src: `${CDN}/ALESSIATONA-6_8107f715.webp`, name: "Alessia Tona", cat: "Donna" },
];

const CATS = ["Tutti", "Uomo", "Donna"];

export default function Galleria() {
  const addRef = useReveal();
  const [active, setActive] = useState("Tutti");
  const [lightbox, setLightbox] = useState<number | null>(null);

  // Load from API; fall back to static CDN photos if DB is empty
  const { data: dbPhotos } = trpc.photos.gallery.useQuery();

  const PHOTOS = useMemo(() => {
    if (dbPhotos && dbPhotos.length > 0) {
      return dbPhotos.map((p) => ({
        src: p.url,
        name: p.subject ?? "",
        cat: p.category ?? "Uomo",
      }));
    }
    return STATIC_PHOTOS;
  }, [dbPhotos]);

  const filtered = active === "Tutti" ? PHOTOS : PHOTOS.filter((p) => p.cat === active);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (lightbox === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowRight") setLightbox((i) => (i !== null ? Math.min(i + 1, filtered.length - 1) : null));
      if (e.key === "ArrowLeft") setLightbox((i) => (i !== null ? Math.max(i - 1, 0) : null));
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightbox, filtered.length]);

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    document.body.style.overflow = lightbox !== null ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [lightbox]);

  return (
    <div className="min-h-screen">
      <SEO
        title="Galleria — Portfolio Fotografico"
        description="Portfolio fotografico di Osmel Fabre: ritratti professionali, book per attori, fotografia maschile e femminile. Scopri i lavori più recenti."
        url="/galleria"
      />
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="pt-36 pb-16 md:pt-48 md:pb-20 px-6 md:px-12 lg:px-20">
        <div className="max-w-5xl">
          <p
            ref={addRef}
            className="reveal font-['Jost'] text-xs font-medium tracking-[0.3em] uppercase text-primary mb-6"
          >
            Portfolio
          </p>
          <h1
            ref={addRef}
            className="reveal delay-100 font-['Cormorant_Garamond'] text-5xl md:text-7xl lg:text-8xl font-light text-foreground leading-[0.9] mb-8"
          >
            Galleria
          </h1>
          <p
            ref={addRef}
            className="reveal delay-200 font-['Jost'] font-light text-base text-muted-foreground leading-loose max-w-md"
          >
            Una selezione di ritratti. Ogni immagine è il risultato di un incontro,
            di uno stato, di una presenza.
          </p>
        </div>
      </section>

      {/* ── FILTER TABS ──────────────────────────────────────── */}
      <section className="px-6 md:px-12 lg:px-20 pb-12">
        <div className="flex items-center gap-8 border-b border-border pb-6">
          {CATS.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`font-['Jost'] text-xs font-medium tracking-[0.25em] uppercase transition-colors duration-300 pb-1 border-b-2 ${
                active === cat
                  ? "text-primary border-primary"
                  : "text-muted-foreground border-transparent hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
          <span className="ml-auto font-['Jost'] text-xs text-muted-foreground tracking-wide">
            {filtered.length} {filtered.length === 1 ? "ritratto" : "ritratti"}
          </span>
        </div>
      </section>

      {/* ── MASONRY GRID ─────────────────────────────────────── */}
      <section className="px-6 md:px-12 lg:px-20 pb-24">
        <div
          className="columns-1 sm:columns-2 lg:columns-3 gap-4"
          style={{ columnGap: "1rem" }}
        >
          {filtered.map((photo, idx) => (
            <div
              key={photo.src}
              ref={addRef}
              className="reveal break-inside-avoid mb-4 group relative overflow-hidden cursor-pointer"
              style={{ animationDelay: `${(idx % 6) * 80}ms` }}
              onClick={() => setLightbox(idx)}
            >
              <img
                src={photo.src}
                alt={photo.name}
                loading="lazy"
                className="w-full h-auto block transition-transform duration-700 group-hover:scale-105"
                style={{ display: "block" }}
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-500 flex items-end p-5 opacity-0 group-hover:opacity-100">
                <div>
                  <p className="font-['Cormorant_Garamond'] text-white text-xl font-light">
                    {photo.name}
                  </p>
                  <p className="font-['Jost'] text-white/60 text-xs tracking-[0.2em] uppercase mt-1">
                    {photo.cat}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── LIGHTBOX ─────────────────────────────────────────── */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ background: "oklch(0.08 0.003 80 / 0.97)" }}
          onClick={() => setLightbox(null)}
        >
          {/* Close */}
          <button
            className="absolute top-6 right-8 font-['Jost'] text-white/60 hover:text-white text-xs tracking-[0.3em] uppercase transition-colors duration-200 z-10"
            onClick={() => setLightbox(null)}
          >
            Chiudi ✕
          </button>

          {/* Prev */}
          {lightbox > 0 && (
            <button
              className="absolute left-6 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors duration-200 p-4 z-10"
              onClick={(e) => { e.stopPropagation(); setLightbox(lightbox - 1); }}
              aria-label="Precedente"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          )}

          {/* Image */}
          <div
            className="max-w-3xl max-h-[85vh] mx-16"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={filtered[lightbox].src}
              alt={filtered[lightbox].name}
              className="max-h-[80vh] max-w-full object-contain"
              style={{ boxShadow: "0 40px 80px oklch(0 0 0 / 0.6)" }}
            />
            <div className="mt-4 flex items-center justify-between">
              <p className="font-['Cormorant_Garamond'] text-white/80 text-lg font-light">
                {filtered[lightbox].name}
              </p>
              <p className="font-['Jost'] text-white/40 text-xs tracking-[0.2em] uppercase">
                {lightbox + 1} / {filtered.length}
              </p>
            </div>
          </div>

          {/* Next */}
          {lightbox < filtered.length - 1 && (
            <button
              className="absolute right-6 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors duration-200 p-4 z-10"
              onClick={(e) => { e.stopPropagation(); setLightbox(lightbox + 1); }}
              aria-label="Successivo"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          )}
        </div>
      )}
    </div>
  );
}
