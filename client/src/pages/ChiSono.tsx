/**
 * OSMEL FABRE — Chi sono
 * Design: Minimalismo Sensoriale
 */

import SEO from "@/components/SEO";
import { useReveal } from "@/hooks/useReveal";

const CHI_SONO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663510175502/Jt7ZRyXY4rb5NpEBkocwTA/OSMEL-2025-3-2_5480de8b.webp";

const BOOKS = [
  "Fotografia Consapevole — PNL, Prossemica e Psicologia nel ritratto",
  "Trattato sulla fotografia maschile — Presenza, percezione e identità nel ritratto maschile",
  "Corso di fotografia: Fondamenti, tecnica e visione",
];

export default function ChiSono() {
  const addRef = useReveal();

  return (
    <>
      <SEO
        title="Chi Sono — Fotografo di Ritratto"
        description="Osmel Fabre, fotografo di ritratto a Roma. Scopri la mia storia, il mio approccio al ritratto e la mia visione della fotografia di identità."
        url="/chi-sono"
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
            Chi sono
          </p>
          <h1
            ref={addRef}
            className="reveal delay-100 font-['Cormorant_Garamond'] font-light leading-[1.05] text-foreground mb-6"
            style={{ fontSize: "clamp(3.5rem, 5.5vw, 7.5rem)", whiteSpace: "nowrap" }}
          >
            Osmel Fabre
          </h1>
          <p
            ref={addRef}
            className="reveal delay-200 font-['Cormorant_Garamond'] italic text-2xl md:text-3xl text-foreground/80 leading-relaxed"
          >
            Fotografo e autore. Da oltre vent'anni nel ritratto.
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
            src={CHI_SONO_IMG}
            alt="Osmel Fabre fotografo"
            className="w-full h-full object-top"
            style={{ filter: "brightness(0.85)", transform: "scale(1.2)", transformOrigin: "center center", objectFit: "cover" }}
          />
        </div>

        {/* Mobile: full-bleed photo behind text */}
        <div className="absolute inset-0 lg:hidden">
          <img
            src={CHI_SONO_IMG}
            alt="Osmel Fabre fotografo"
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

      {/* ── IL MIO LAVORO ───────────────────────────────────── */}
      <section className="py-24 md:py-36">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-0">
            <div className="lg:col-span-2 flex lg:flex-col items-center lg:items-start gap-4 lg:gap-0">
              <div className="v-line h-16 hidden lg:block mb-4" />
              <span
                ref={addRef}
                className="reveal font-['Jost'] text-[10px] font-medium tracking-[0.3em] uppercase text-primary"
              >
                01 — Il mio lavoro
              </span>
            </div>
            <div className="lg:col-span-10 lg:pl-8">
              <p
                ref={addRef}
                className="reveal font-['Jost'] font-light text-base text-muted-foreground leading-loose mb-10 max-w-2xl"
              >
                Da oltre vent'anni lavoro nel ritratto, esplorando non solo l'immagine, ma il modo in cui una persona viene percepita. Nel tempo ho sviluppato un approccio che unisce fotografia, psicologia e comunicazione non verbale.
              </p>
              <div className="h-sep mb-10 max-w-xs" ref={addRef} />
              <h2
                ref={addRef}
                className="reveal delay-100 font-['Cormorant_Garamond'] font-light leading-[1.1] text-foreground mb-6"
                style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)" }}
              >
                Non mi interessa creare immagini perfette.
              </h2>
              <p
                ref={addRef}
                className="reveal delay-200 font-['Cormorant_Garamond'] italic text-xl md:text-2xl text-foreground/60 leading-relaxed max-w-2xl"
              >
                Mi interessa creare immagini vere. Immagini in cui una persona si riconosce — e in cui gli altri percepiscono qualcosa di chiaro.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── PORTRAIT ────────────────────────────────────────── */}
      <section className="py-0">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-stretch">
            {/* Portrait */}
            <div
              ref={addRef}
              className="reveal relative overflow-hidden"
              style={{ minHeight: "560px" }}
            >
              <img
                src={CHI_SONO_IMG}
                alt="Osmel Fabre fotografo con Hasselblad"
                className="absolute inset-0 w-full h-full object-cover object-top"
                style={{ filter: "brightness(0.85)" }}
              />
            </div>
            {/* Text */}
            <div
              ref={addRef}
              className="reveal delay-200 bg-card p-10 md:p-16 flex flex-col justify-center"
            >
              <span className="font-['Jost'] text-[10px] font-medium tracking-[0.3em] uppercase text-primary mb-6">
                Il fotografo
              </span>
              <h2
                className="font-['Cormorant_Garamond'] font-light leading-[1.1] text-foreground mb-8"
                style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)" }}
              >
                Osmel Fabre
              </h2>
              <p className="font-['Jost'] font-light text-base text-muted-foreground leading-loose max-w-sm">
                Da oltre vent'anni lavoro sul ritratto. Non come tecnica, ma come relazione tra chi guarda e chi è guardato.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── AUTORE ──────────────────────────────────────────── */}
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
                02 — Autore
              </span>
            </div>
            <div className="lg:col-span-10 lg:pl-8">
              <h2
                ref={addRef}
                className="reveal font-['Cormorant_Garamond'] font-light leading-[1.1] text-foreground mb-12"
                style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)" }}
              >
                Libri pubblicati
              </h2>
              <div className="space-y-0">
                {BOOKS.map((book, i) => (
                  <div
                    key={i}
                    ref={addRef}
                    className={`reveal delay-${(i + 1) * 100} flex items-start gap-6 py-7 border-b border-border group`}
                  >
                    <span className="font-['Jost'] text-xs text-primary/60 w-6 shrink-0 font-medium mt-1">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-['Cormorant_Garamond'] text-xl md:text-2xl text-foreground font-light leading-snug">
                      {book}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FORMAZIONE ──────────────────────────────────────── */}
      <section className="py-24 md:py-32">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-0">
            <div className="lg:col-span-2 flex lg:flex-col items-center lg:items-start gap-4 lg:gap-0">
              <div className="v-line h-16 hidden lg:block mb-4" />
              <span
                ref={addRef}
                className="reveal font-['Jost'] text-[10px] font-medium tracking-[0.3em] uppercase text-primary"
              >
                03 — Formazione
              </span>
            </div>
            <div className="lg:col-span-10 lg:pl-8">
              <h2
                ref={addRef}
                className="reveal font-['Cormorant_Garamond'] font-light leading-[1.1] text-foreground mb-8"
                style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)" }}
              >
                Affianco fotografi ritrattisti
              </h2>
              <p
                ref={addRef}
                className="reveal delay-100 font-['Jost'] font-light text-base text-muted-foreground leading-loose mb-10 max-w-2xl"
              >
                Da diversi anni lavoro con fotografi ritrattisti professionisti attraverso workshop e mentoring 1:1, concentrandomi sull'approccio psicologico al ritratto e sulla direzione della persona.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border">
                {[
                  { label: "Workshop", desc: "Sessioni pratiche sull'approccio psicologico al ritratto." },
                  { label: "Mentoring 1:1", desc: "Percorsi individuali per fotografi che vogliono evolvere il proprio metodo." },
                ].map((item, i) => (
                  <div
                    key={i}
                    ref={addRef}
                    className={`reveal delay-${(i + 1) * 100} bg-card p-8 md:p-10 flex flex-col gap-4 hover:bg-secondary transition-colors duration-300`}
                  >
                    <h3 className="font-['Cormorant_Garamond'] text-2xl text-foreground font-light">
                      {item.label}
                    </h3>
                    <p className="font-['Jost'] text-sm font-light text-muted-foreground leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── QUOTE ───────────────────────────────────────────── */}
      <section className="py-24 md:py-40 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 50%, oklch(0.58 0.1 42) 0%, transparent 60%)",
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
              style={{ fontSize: "clamp(2rem, 4.5vw, 4rem)" }}
            >
              La fotografia non è solo tecnica.
            </blockquote>
            <p
              ref={addRef}
              className="reveal delay-200 font-['Cormorant_Garamond'] italic text-xl md:text-2xl text-foreground/60 mt-8 leading-relaxed"
            >
              È relazione, percezione, presenza. Ed è lì che nasce davvero un ritratto.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
