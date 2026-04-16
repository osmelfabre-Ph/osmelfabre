/**
 * OSMEL FABRE — Formazione
 * Design: Minimalismo Sensoriale
 */

import SEO from "@/components/SEO";
import { useReveal } from "@/hooks/useReveal";
import { Link } from "wouter";

const WORKSHOP_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663510175502/Jt7ZRyXY4rb5NpEBkocwTA/formazione-cameras_ee66c0d0.jpg";

const BOOKS = [
  {
    num: "01",
    title: "Il Ritratto Consapevole",
    subtitle: "PNL, Prossemica e Psicologia nel Ritratto — Metodo Osmel Fabre",
    cover: "https://d2xsxph8kpxj0f.cloudfront.net/310519663510175502/Jt7ZRyXY4rb5NpEBkocwTA/IL-RITRATTO-CONSAPEVOLE---COPERTINA-kindle_86c75690.webp",
    link: "https://amzn.to/3PR6UKK",
  },
  {
    num: "02",
    title: "Trattato sulla Fotografia Maschile",
    subtitle: "Presenza, percezione e identità nel ritratto maschile",
    cover: "https://d2xsxph8kpxj0f.cloudfront.net/310519663510175502/Jt7ZRyXY4rb5NpEBkocwTA/TRATTATOSULLAFOTOGRAFIAMASCHILE_COVER---kindle_55343543.webp",
    link: "https://amzn.to/41Ynkn8",
  },
  {
    num: "03",
    title: "Corso di Fotografia",
    subtitle: "Fondamenti, Tecnica e Visione — Masterclass 2026",
    cover: "https://d2xsxph8kpxj0f.cloudfront.net/310519663510175502/Jt7ZRyXY4rb5NpEBkocwTA/fotografia_libro_completo_coopertina_3639f738.webp",
    link: "https://amzn.to/4tGtGDJ",
  },
];

const WORKSHOP_TOPICS = [
  "Luce",
  "Direzione del soggetto",
  "Comunicazione",
  "Costruzione del ritratto",
];

const MENTORING_GOALS = [
  "Migliorare la qualità dei ritratti",
  "Lavorare sulla relazione con il soggetto",
  "Sviluppare un linguaggio personale",
];

export default function Formazione() {
  const addRef = useReveal();

  return (
    <>
      <SEO
        title="Formazione Fotografica — Mentoring e Corsi"
        description="Formazione fotografica con Osmel Fabre: mentoring individuale, percorsi di apprendimento e libri consigliati per fotografi che vogliono approfondire il ritratto."
        url="/formazione"
      />
      {/* ── HERO ────────────────────────────────────────────── */}
      <section
        className="relative flex items-stretch overflow-hidden"
        style={{ height: "100vh", maxHeight: "100vh", background: "oklch(0.135 0.004 80)" }}
      >
        {/* Left — text column (40%) */}
        <div className="relative z-10 flex flex-col justify-center w-full lg:w-[50%] px-8 md:px-20 lg:pl-[20%] shrink-0">
          <p
            ref={addRef}
            className="reveal font-['Jost'] text-xs font-medium tracking-[0.3em] uppercase text-primary mb-6"
          >
            Formazione
          </p>
          <h1
            ref={addRef}
            className="reveal delay-100 font-['Cormorant_Garamond'] font-light leading-[1.05] text-foreground mb-6"
            style={{ fontSize: "clamp(3.5rem, 5.5vw, 7.5rem)", whiteSpace: "nowrap" }}
          >
            Formazione
          </h1>
          <p
            ref={addRef}
            className="reveal delay-200 font-['Cormorant_Garamond'] italic text-2xl md:text-3xl text-foreground/80 leading-relaxed"
          >
            Un percorso dedicato ai fotografi che vogliono lavorare sul ritratto in modo più profondo.
          </p>
        </div>

        {/* Right — photo scaled to 60%, desktop only */}
        <div className="hidden lg:flex relative flex-1 items-center justify-center overflow-hidden">
          {/* Left-edge fade */}
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
            src={WORKSHOP_IMG}
            alt="Formazione fotografica Osmel Fabre"
            className="w-full h-full object-top"
            style={{ filter: "brightness(0.85)", transform: "scale(1.2)", transformOrigin: "center center", objectFit: "cover" }}
          />
        </div>

        {/* Mobile: full-bleed photo behind text */}
        <div className="absolute inset-0 lg:hidden">
          <img
            src={WORKSHOP_IMG}
            alt="Formazione fotografica Osmel Fabre"
            className="w-full h-full object-cover object-top"
            style={{ filter: "brightness(0.4)" }}
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
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="text-foreground/50" style={{ animation: "heroArrowBounce 2s ease-in-out infinite" }}>
            <path d="M3 6.5L9 12.5L15 6.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </section>

      {/* ── LIBRI ───────────────────────────────────────────── */}
      <section className="py-24 md:py-36">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-0">
            <div className="lg:col-span-2 flex lg:flex-col items-center lg:items-start gap-4 lg:gap-0">
              <div className="v-line h-16 hidden lg:block mb-4" />
              <span
                ref={addRef}
                className="reveal font-['Jost'] text-[10px] font-medium tracking-[0.3em] uppercase text-primary"
              >
                01 — Libri
              </span>
            </div>
            <div className="lg:col-span-10 lg:pl-8">
              <h2
                ref={addRef}
                className="reveal font-['Cormorant_Garamond'] font-light leading-[1.1] text-foreground mb-12"
                style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)" }}
              >
                Pubblicazioni
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {BOOKS.map((book, i) => (
                  <a
                    key={i}
                    href={book.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    ref={addRef}
                    className={`reveal delay-${(i + 1) * 100} group flex flex-col`}
                  >
                    {/* Cover */}
                    <div className="relative overflow-hidden mb-5" style={{ aspectRatio: "2/3" }}>
                      <img
                        src={book.cover}
                        alt={book.title}
                        className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                    </div>
                    {/* Info */}
                    <span className="font-['Jost'] text-[10px] text-primary/60 font-medium tracking-[0.2em] uppercase mb-2">{book.num}</span>
                    <p className="font-['Cormorant_Garamond'] text-xl text-foreground font-light leading-snug mb-1 group-hover:text-primary transition-colors duration-300">
                      {book.title}
                    </p>
                    <p className="font-['Cormorant_Garamond'] italic text-sm text-muted-foreground leading-relaxed">
                      {book.subtitle}
                    </p>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── WORKSHOP ────────────────────────────────────────── */}
      <section className="py-24 md:py-32 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 80% 50%, oklch(0.58 0.1 42) 0%, transparent 60%)",
          }}
        />
        <div className="container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-0">
            <div className="lg:col-span-2 flex lg:flex-col items-center lg:items-start gap-4 lg:gap-0">
              <div className="v-line h-16 hidden lg:block mb-4" />
              <span
                ref={addRef}
                className="reveal font-['Jost'] text-[10px] font-medium tracking-[0.3em] uppercase text-primary"
              >
                02 — Workshop
              </span>
            </div>
            <div className="lg:col-span-10 lg:pl-8">
              <h2
                ref={addRef}
                className="reveal font-['Cormorant_Garamond'] font-light leading-[1.1] text-foreground mb-8"
                style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)" }}
              >
                Sessioni pratiche
              </h2>
              <p
                ref={addRef}
                className="reveal delay-100 font-['Jost'] font-light text-base text-muted-foreground leading-loose mb-12 max-w-xl"
              >
                Sessioni in cui lavoriamo insieme su tutti gli elementi che compongono un ritratto consapevole.
              </p>
              <div className="space-y-0 max-w-2xl mb-12">
                {WORKSHOP_TOPICS.map((topic, i) => (
                  <div
                    key={i}
                    ref={addRef}
                    className={`reveal delay-${(i + 1) * 100} flex items-center gap-6 py-5 border-b border-border group hover:border-primary transition-colors duration-300`}
                  >
                    <span className="font-['Jost'] text-xs text-primary/60 w-6 shrink-0 font-medium">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-['Cormorant_Garamond'] text-xl md:text-2xl text-foreground font-light group-hover:text-primary transition-colors duration-300">
                      {topic}
                    </span>
                  </div>
                ))}
              </div>
              <Link href="/workshop-di-ritratto-maschile.html" className="cta-btn inline-flex items-center gap-4 border border-primary text-primary px-8 py-4 font-['Jost'] text-xs font-medium tracking-[0.2em] uppercase hover:text-primary-foreground transition-colors duration-350">
                <span>Scopri il Workshop</span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── MENTORING ───────────────────────────────────────── */}
      <section className="py-24 md:py-32">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-0">
            <div className="lg:col-span-2 flex lg:flex-col items-center lg:items-start gap-4 lg:gap-0">
              <div className="v-line h-16 hidden lg:block mb-4" />
              <span
                ref={addRef}
                className="reveal font-['Jost'] text-[10px] font-medium tracking-[0.3em] uppercase text-primary"
              >
                03 — Mentoring 1:1
              </span>
            </div>
            <div className="lg:col-span-10 lg:pl-8">
              <h2
                ref={addRef}
                className="reveal font-['Cormorant_Garamond'] font-light leading-[1.1] text-foreground mb-8"
                style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)" }}
              >
                Percorsi personalizzati
              </h2>
              <p
                ref={addRef}
                className="reveal delay-100 font-['Jost'] font-light text-base text-muted-foreground leading-loose mb-12 max-w-xl"
              >
                Per fotografi che vogliono lavorare in modo individuale sul proprio approccio al ritratto.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border mb-12">
                {MENTORING_GOALS.map((goal, i) => (
                  <div
                    key={i}
                    ref={addRef}
                    className={`reveal delay-${(i + 1) * 100} bg-card p-8 md:p-10 flex flex-col gap-4 hover:bg-secondary transition-colors duration-300`}
                  >
                    <span className="font-['Jost'] text-[10px] font-medium tracking-[0.25em] uppercase text-primary">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="font-['Cormorant_Garamond'] text-xl text-foreground font-light leading-snug">
                      {goal}
                    </p>
                  </div>
                ))}
              </div>
              <Link href="/contatti" className="cta-btn inline-flex items-center gap-4 border border-primary text-primary px-8 py-4 font-['Jost'] text-xs font-medium tracking-[0.2em] uppercase hover:text-primary-foreground transition-colors duration-350">
                  <span>Richiedi informazioni</span>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── OBIETTIVO ───────────────────────────────────────── */}
      <section className="py-24 md:py-40 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 50%, oklch(0.58 0.1 42) 0%, transparent 60%)",
          }}
        />
        <div className="container relative z-10">
          <div ref={addRef} className="reveal max-w-3xl mx-auto lg:mx-0 lg:ml-[16.666%]">
            <div className="v-line h-16 mb-8" />
            <blockquote
              className="font-['Cormorant_Garamond'] font-light leading-[1.15] text-foreground"
              style={{ fontSize: "clamp(2rem, 4.5vw, 4rem)" }}
            >
              Non insegnare a fare foto.
            </blockquote>
            <p
              ref={addRef}
              className="reveal delay-200 font-['Cormorant_Garamond'] italic text-xl md:text-2xl text-foreground/60 mt-8 leading-relaxed"
            >
              Ma insegnare a costruire ritratti.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
