/**
 * OSMEL FABRE — Home Page
 * Design: Minimalismo Sensoriale
 * Background: Deep charcoal warm (#1A1A18)
 * Text: Ivory white (#F5F0E8)
 * Accent: Burnt terracotta (#C4704A)
 * Display font: Cormorant Garamond | Body: Jost Light
 */

import SEO from "@/components/SEO";
import { useReveal } from "@/hooks/useReveal";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";

const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663510175502/Jt7ZRyXY4rb5NpEBkocwTA/CHRISMADSENBW-32_3daa1d99.webp";
const ACTOR_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663510175502/Jt7ZRyXY4rb5NpEBkocwTA/ALICE-13_a7a0d3e3.webp";

export default function Home() {
  const addRef = useReveal();
  const { data: galleryPhotos } = trpc.photos.gallery.useQuery();

  return (
    <>
      <SEO
        title="Fotografia di Ritratto a Roma"
        description="Osmel Fabre — Fotografo di ritratto a Roma. Ritratti professionali, book per attori, formazione e mentoring. Identità e presenza attraverso il ritratto."
        url="/"
      />
      {/* ── HERO ────────────────────────────────────────────── */}
      <section
        className="relative flex items-stretch overflow-hidden"
        style={{ height: "100vh", maxHeight: "100vh", background: "oklch(0.135 0.004 80)" }}
      >
        {/* Left — text column (50%), centered with padding */}
        <div className="relative z-10 flex flex-col justify-center w-full lg:w-[50%] px-8 md:px-20 lg:pl-[20%] shrink-0">
          <p
            ref={addRef}
            className="reveal font-['Jost'] text-xs font-medium tracking-[0.3em] uppercase text-primary mb-6"
          >
            Fotografia di Ritratto
          </p>
          <h1
            ref={addRef}
            className="reveal delay-100 font-['Cormorant_Garamond'] font-light leading-[1.05] text-foreground mb-8"
            style={{ fontSize: "clamp(3.5rem, 5.5vw, 7.5rem)", whiteSpace: "nowrap" }}
          >
            Osmel Fabre
          </h1>
          <p
            ref={addRef}
            className="reveal delay-200 font-['Cormorant_Garamond'] italic text-2xl md:text-3xl text-foreground/80 leading-relaxed mb-10"
          >
            Identità e presenza attraverso il ritratto.
          </p>
          <div ref={addRef} className="reveal delay-300 flex flex-col sm:flex-row gap-4">
            <Link
              href="/contatti"
              className="inline-flex items-center gap-4 border border-primary text-primary px-8 py-4 font-['Jost'] text-xs font-medium tracking-[0.2em] uppercase hover:bg-primary hover:text-primary-foreground transition-all duration-300 self-start whitespace-nowrap"
            >
              <span>Prenota una sessione</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <Link
              href="/il-metodo"
              className="inline-flex items-center gap-4 text-foreground/50 px-8 py-4 font-['Jost'] text-xs font-medium tracking-[0.2em] uppercase hover:text-foreground transition-colors duration-300 self-start whitespace-nowrap"
            >
              <span>Scopri il metodo</span>
            </Link>
          </div>
        </div>

        {/* Right — photo column (60%), desktop only */}
        <div className="hidden lg:block relative flex-1 overflow-hidden">
          {/* Left-edge fade into dark background */}
          <div
            className="absolute inset-y-0 left-0 z-10"
            style={{ width: "380px", background: "linear-gradient(to right, oklch(0.135 0.004 80) 0%, oklch(0.135 0.004 80 / 0.08) 70%, transparent 100%)" }}
          />
          {/* Bottom fade */}
          <div
            className="absolute inset-x-0 bottom-0 h-32 z-10"
            style={{ background: "linear-gradient(to top, oklch(0.135 0.004 80) 0%, transparent 100%)" }}
          />
          <img
            src={HERO_IMG}
            alt="Ritratto fotografico professionale"
            className="w-full h-full object-top"
            style={{ filter: "brightness(0.85)", transform: "scale(1.2)", transformOrigin: "center center", objectFit: "cover" }}
          />
        </div>

        {/* Mobile: full-bleed photo behind text */}
        <div className="absolute inset-0 lg:hidden">
          <img
            src={HERO_IMG}
            alt="Ritratto fotografico professionale"
            className="w-full h-full object-cover object-top"
            style={{ filter: "brightness(0.7)" }}
          />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to top, oklch(0.135 0.004 80) 0%, oklch(0.135 0.004 80 / 0.4) 50%, transparent 80%)" }}
          />
        </div>

        {/* Scroll arrow — bottom center */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2">
          <span className="font-['Jost'] text-[9px] tracking-[0.3em] uppercase text-foreground/40">Scroll</span>
          <div className="w-px bg-foreground/30" style={{ height: "40px" }} />
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            className="text-foreground/50"
            style={{ animation: "heroArrowBounce 2s ease-in-out infinite" }}
          >
            <path d="M3 6.5L9 12.5L15 6.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </section>

      {/* ── MANIFESTO ───────────────────────────────────────── */}
      <section className="py-24 md:py-36">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-0 items-start">
            {/* Left: vertical label */}
            <div className="lg:col-span-2 flex lg:flex-col items-center lg:items-start gap-4 lg:gap-0">
              <div className="v-line h-16 hidden lg:block mb-4" />
              <span
                ref={addRef}
                className="reveal font-['Jost'] text-[10px] font-medium tracking-[0.3em] uppercase text-primary"
              >
                01 — Manifesto
              </span>
            </div>

            {/* Right: content */}
            <div className="lg:col-span-10 lg:pl-8">
              <h2
                ref={addRef}
                className="reveal font-['Cormorant_Garamond'] font-light leading-[1.1] text-foreground mb-10"
                style={{ fontSize: "clamp(2rem, 4.5vw, 3.8rem)" }}
              >
                Non fotografo semplicemente persone.
              </h2>
              <div ref={addRef} className="reveal delay-100 h-sep mb-10 max-w-xs" />
              <p
                ref={addRef}
                className="reveal delay-200 font-['Cormorant_Garamond'] italic text-xl md:text-2xl text-foreground/70 leading-relaxed mb-10 max-w-2xl"
              >
                Lavoro su ciò che una persona trasmette quando è davanti a uno sguardo.
              </p>
              <p
                ref={addRef}
                className="reveal delay-300 font-['Jost'] font-light text-base text-muted-foreground leading-loose max-w-xl"
              >
                Nel ritratto, la differenza non è tecnica.{" "}
                <span className="text-foreground font-medium">È presenza.</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── PER CHI ─────────────────────────────────────────── */}
      <section className="py-24 md:py-32 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 50%, oklch(0.58 0.1 42) 0%, transparent 60%)",
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
                02 — Per chi
              </span>
            </div>

            <div className="lg:col-span-10 lg:pl-8">
              <h2
                ref={addRef}
                className="reveal font-['Cormorant_Garamond'] font-light leading-[1.1] text-foreground mb-14"
                style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)" }}
              >
                Per chi è questo lavoro
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border">
                {[
                  {
                    title: "Professionisti\ne imprenditori",
                    desc: "Una rappresentazione coerente di sé, non solo una bella immagine.",
                  },
                  {
                    title: "Attori\ne attrici",
                    desc: "Book che comunicano presenza, carattere e versatilità espressiva.",
                  },
                  {
                    title: "Fotografi\nin evoluzione",
                    desc: "Per chi vuole approfondire il proprio approccio al ritratto in modo consapevole.",
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    ref={addRef}
                    className={`reveal delay-${(i + 1) * 100} bg-card p-8 md:p-10 flex flex-col gap-4 group hover:bg-secondary transition-colors duration-300`}
                  >
                    <span className="font-['Cormorant_Garamond'] text-4xl text-primary font-light">
                      —
                    </span>
                    <h3 className="font-['Cormorant_Garamond'] text-xl md:text-2xl text-foreground font-light leading-snug whitespace-pre-line">
                      {item.title}
                    </h3>
                    <p className="font-['Jost'] text-sm font-light text-muted-foreground leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>

              <p
                ref={addRef}
                className="reveal delay-400 font-['Cormorant_Garamond'] italic text-lg text-foreground/60 mt-10 leading-relaxed"
              >
                Persone che non cercano solo una bella immagine,
                <br />
                ma una rappresentazione coerente di sé.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── COSA FACCIO ─────────────────────────────────────── */}
      <section className="py-24 md:py-32">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-0 items-start">
            <div className="lg:col-span-2 flex lg:flex-col items-center lg:items-start gap-4 lg:gap-0">
              <div className="v-line h-16 hidden lg:block mb-4" />
              <span
                ref={addRef}
                className="reveal font-['Jost'] text-[10px] font-medium tracking-[0.3em] uppercase text-primary"
              >
                03 — Cosa faccio
              </span>
            </div>

            <div className="lg:col-span-10 lg:pl-8">
              <h2
                ref={addRef}
                className="reveal font-['Cormorant_Garamond'] font-light leading-[1.1] text-foreground mb-14"
                style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)" }}
              >
                Cosa faccio
              </h2>

              <div className="space-y-0">
                {[
                  { label: "Ritratti professionali maschili e femminili", href: "/servizi" },
                  { label: "Book per attori e attrici", href: "/servizi" },
                  { label: "Percorsi di formazione e mentoring", href: "/formazione" },
                  { label: "Metodo Osmel Fabre", href: "/il-metodo" },
                ].map((item, i) => (
                  <Link
                    key={i}
                    href={item.href}
                    ref={addRef as any}
                    className={`reveal delay-${(i + 1) * 100} flex items-center gap-6 py-6 border-b border-border group hover:border-primary transition-colors duration-300`}
                  >
                    <span className="font-['Jost'] text-xs text-primary/60 w-6 shrink-0 font-medium">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-['Cormorant_Garamond'] text-xl md:text-2xl text-foreground font-light group-hover:text-primary transition-colors duration-300">
                      {item.label}
                    </span>
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="ml-auto shrink-0 opacity-0 group-hover:opacity-60 transition-opacity duration-300 text-primary">
                      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── QUOTE SECTION ───────────────────────────────────── */}
      <section className="py-24 md:py-40 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 80% 50%, oklch(0.58 0.1 42) 0%, transparent 60%)",
          }}
        />
        <div className="container relative z-10">
          <div
            ref={addRef}
            className="reveal max-w-3xl mx-auto lg:mx-0 lg:ml-[16.666%]"
          >
            <div className="v-line h-16 mb-8" />
            <blockquote
              className="font-['Cormorant_Garamond'] font-light leading-[1.15] text-foreground"
              style={{ fontSize: "clamp(2.2rem, 5vw, 4.5rem)" }}
            >
              Un ritratto non è una foto.
            </blockquote>
            <p
              ref={addRef}
              className="reveal delay-200 font-['Cormorant_Garamond'] italic text-xl md:text-2xl text-foreground/60 mt-8 leading-relaxed"
            >
              È il punto in cui tecnica, percezione e identità si incontrano.
            </p>
          </div>
        </div>
      </section>

      {/* ── FOTO STRIP ──────────────────────────────────────── */}
      {galleryPhotos && galleryPhotos.length > 0 && (
        <section className="py-0 overflow-hidden">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide" style={{ scrollSnapType: "x mandatory" }}>
            {galleryPhotos.slice(0, 6).map((photo, i) => (
              <div
                key={photo.id}
                className="shrink-0"
                style={{ width: "clamp(240px, 30vw, 400px)", height: "clamp(300px, 40vw, 520px)", scrollSnapAlign: "start" }}
              >
                <img
                  src={photo.url}
                  alt={photo.subject ?? `Ritratto ${i + 1}`}
                  className="w-full h-full object-cover"
                  style={{ filter: "brightness(0.85)" }}
                />
              </div>
            ))}
            <div className="shrink-0 flex items-center justify-center px-12" style={{ minWidth: "200px" }}>
              <Link
                href="/galleria"
                className="font-['Jost'] text-xs tracking-[0.2em] uppercase text-primary hover:text-foreground transition-colors duration-300 whitespace-nowrap"
              >
                Vedi tutta la galleria →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ── SERVIZI ─────────────────────────────────────────── */}
      <section className="py-0 relative overflow-hidden">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-stretch">
            {/* Image */}
            <div
              ref={addRef}
              className="reveal relative overflow-hidden"
              style={{ minHeight: "500px" }}
            >
              <img
                src={ACTOR_IMG}
                alt="Servizi fotografici Osmel Fabre"
                className="absolute inset-0 w-full h-full object-cover object-center"
                style={{ filter: "brightness(0.6)" }}
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to right, transparent 60%, oklch(0.135 0.004 80) 100%)",
                }}
              />
            </div>

            {/* Content */}
            <div
              ref={addRef}
              className="reveal delay-200 bg-card p-10 md:p-16 flex flex-col justify-center"
            >
              <span className="font-['Jost'] text-[10px] font-medium tracking-[0.3em] uppercase text-primary mb-6">
                04 — Servizi fotografici
              </span>
              <h2
                className="font-['Cormorant_Garamond'] font-light leading-[1.1] text-foreground mb-6"
                style={{ fontSize: "clamp(1.8rem, 3vw, 2.8rem)" }}
              >
                Servizi fotografici
              </h2>
              <p className="font-['Jost'] font-light text-base text-muted-foreground leading-loose mb-10 max-w-sm">
                Scopri le sessioni disponibili e trova quella più adatta al tuo percorso.
              </p>
              <Link href="/servizi" className="cta-btn inline-flex items-center gap-4 border border-primary text-primary px-8 py-4 font-['Jost'] text-xs font-medium tracking-[0.2em] uppercase hover:text-primary-foreground transition-colors duration-350 self-start">
                  <span>Vai ai servizi fotografici</span>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── FORMAZIONE ──────────────────────────────────────── */}
      <section className="py-24 md:py-32">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-0 items-start">
            <div className="lg:col-span-2 flex lg:flex-col items-center lg:items-start gap-4 lg:gap-0">
              <div className="v-line h-16 hidden lg:block mb-4" />
              <span
                ref={addRef}
                className="reveal font-['Jost'] text-[10px] font-medium tracking-[0.3em] uppercase text-primary"
              >
                05 — Formazione
              </span>
            </div>

            <div className="lg:col-span-10 lg:pl-8">
              <h2
                ref={addRef}
                className="reveal font-['Cormorant_Garamond'] font-light leading-[1.1] text-foreground mb-8"
                style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)" }}
              >
                Formazione
              </h2>
              <p
                ref={addRef}
                className="reveal delay-100 font-['Jost'] font-light text-base text-muted-foreground leading-loose mb-12 max-w-2xl"
              >
                Libri, workshop e mentoring per fotografi che vogliono lavorare sul ritratto in modo consapevole.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border mb-12">
                {[
                  { label: "Libri", desc: "Testi sul metodo e sulla filosofia del ritratto." },
                  { label: "Workshop", desc: "Sessioni pratiche per approfondire tecnica e visione." },
                  { label: "Mentoring", desc: "Percorsi individuali per fotografi che vogliono evolvere." },
                ].map((item, i) => (
                  <div
                    key={i}
                    ref={addRef}
                    className={`reveal delay-${(i + 1) * 100} bg-card p-8 md:p-10 flex flex-col gap-4 hover:bg-secondary transition-colors duration-300`}
                  >
                    <h3 className="font-['Cormorant_Garamond'] text-xl text-foreground font-light">
                      {item.label}
                    </h3>
                    <p className="font-['Jost'] text-sm font-light text-muted-foreground leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>

              <Link
                  href="/formazione"
                  ref={addRef}
                  className="reveal delay-400 cta-btn inline-flex items-center gap-4 border border-primary text-primary px-8 py-4 font-['Jost'] text-xs font-medium tracking-[0.2em] uppercase hover:text-primary-foreground transition-colors duration-350"
                >
                  <span>Scopri la formazione</span>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>
      {/* ── RECENSIONI ──────────────────────────────────────── */}
      <section className="py-24 md:py-36 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 50% 50%, oklch(0.58 0.1 42) 0%, transparent 70%)",
          }}
        />
        <div className="container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-0 items-start mb-16">
            <div className="lg:col-span-2 flex lg:flex-col items-center lg:items-start gap-4 lg:gap-0">
              <div className="v-line h-16 hidden lg:block mb-4" />
              <span
                ref={addRef}
                className="reveal font-['Jost'] text-[10px] font-medium tracking-[0.3em] uppercase text-primary"
              >
                Cosa dicono
              </span>
            </div>
            <div className="lg:col-span-10 lg:pl-8">
              <div className="flex flex-col md:flex-row md:items-end gap-6 mb-14">
                <h2
                  ref={addRef}
                  className="reveal font-['Cormorant_Garamond'] font-light leading-[1.1] text-foreground"
                  style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)" }}
                >
                  66 recensioni su Google
                </h2>
                <div ref={addRef} className="reveal delay-100 flex items-center gap-2 mb-1">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M8 1l1.8 3.6L14 5.3l-3 2.9.7 4.1L8 10.4l-3.7 1.9.7-4.1-3-2.9 4.2-.7z" fill="oklch(0.58 0.1 42)" />
                      </svg>
                    ))}
                  </div>
                  <span className="font-['Cormorant_Garamond'] text-2xl text-primary">5.0</span>
                </div>
              </div>

              {/* Carousel / Grid recensioni */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
                {[
                  {
                    name: "Carlotta Parodi",
                    role: "Local Guide",
                    text: "La luce, quando cade nelle mani di chi sa ascoltare, smette di essere semplice illuminazione e diventa carattere. Osmel Fabre ha questo raro talento: non fotografa le persone, le rivela. I suoi ritratti hanno sempre un'anima.",
                  },
                  {
                    name: "Manuela Palmeri",
                    role: "Cliente",
                    text: "Un'esperienza fotografica unica. In studio ho trovato due persone genuine ed empatiche che mi hanno messa subito a mio agio. Osmel ha saputo catturare la mia essenza, permettendomi di aprirmi davvero e trasformare emozioni profonde in immagini intense e autentiche.",
                  },
                  {
                    name: "Simon Rizzoni",
                    role: "Local Guide · 20 recensioni",
                    text: "La sessione fotografica con Osmel è stata STRAORDINARIA. Il livello di professionalità è 10/10, lo studio e gli accessori sono di primo livello, ti mette a tuo agio e non ti porta via molto tempo — la sessione è durata circa 2 ore.",
                  },
                  {
                    name: "Elena Ababii",
                    role: "Local Guide · 43 recensioni",
                    text: "Ho conosciuto Osmel attraverso il suo workshop a Torino sul 'Ritratto Maschile Consapevole', e sono rimasta davvero colpita dal suo approccio e metodo. È stata la mia prima esperienza in studio — e di certo non sarà l'ultima!",
                  },
                  {
                    name: "Carlo g.",
                    role: "8 recensioni",
                    text: "Ho partecipato al workshop di ritratto maschile. Osmel ci ha guidati con leggerezza e calore, e abbiamo imparato concetti e tecniche quasi senza accorgercene. Ora riguardiamo le foto e diciamo: l'ho scattata io? Sono io?",
                  },
                  {
                    name: "Kiersten Miller",
                    role: "Cliente",
                    text: "Osmel è incredibilmente talentuoso, oltre che caldo e accogliente. Mette i soggetti a loro agio, il che gli permette di catturare la loro vera essenza.",
                  },
                ].map((r, i) => (
                  <div
                    key={i}
                    ref={addRef}
                    className={`reveal delay-${(i % 3) * 100} bg-card p-8 md:p-10 flex flex-col gap-5 group hover:bg-secondary transition-colors duration-300`}
                  >
                    {/* Stars */}
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, s) => (
                        <svg key={s} width="12" height="12" viewBox="0 0 16 16" fill="none">
                          <path d="M8 1l1.8 3.6L14 5.3l-3 2.9.7 4.1L8 10.4l-3.7 1.9.7-4.1-3-2.9 4.2-.7z" fill="oklch(0.58 0.1 42)" />
                        </svg>
                      ))}
                    </div>
                    {/* Quote */}
                    <p className="font-['Cormorant_Garamond'] italic text-lg text-foreground/80 leading-relaxed flex-1">
                      &ldquo;{r.text}&rdquo;
                    </p>
                    {/* Author */}
                    <div className="border-t border-border pt-5">
                      <p className="font-['Jost'] text-sm font-medium text-foreground">{r.name}</p>
                      <p className="font-['Jost'] text-xs text-muted-foreground mt-0.5">{r.role}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Link a Google */}
              <div ref={addRef} className="reveal delay-300 mt-10 flex items-center gap-3">
                <div className="v-line h-8" />
                <a
                  href="https://g.co/kgs/osmelfabre"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-['Jost'] text-xs tracking-[0.2em] uppercase text-muted-foreground hover:text-primary transition-colors"
                >
                  Leggi tutte le 66 recensioni su Google →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
