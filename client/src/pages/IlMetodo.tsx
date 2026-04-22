/**
 * OSMEL FABRE — Il Metodo
 * Design: Minimalismo Sensoriale
 */

import SEO from "@/components/SEO";
import { useReveal } from "@/hooks/useReveal";

const METODO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663510175502/Jt7ZRyXY4rb5NpEBkocwTA/GIANNIROSATO-11_d7a5f876.jpg";

const PILLARS = [
  { label: "Fotografia", desc: "La tecnica come strumento, non come fine." },
  { label: "PNL", desc: "Programmazione Neuro-Linguistica applicata alla relazione fotografo-soggetto." },
  { label: "Prossemica", desc: "La gestione dello spazio fisico e della distanza come linguaggio." },
  { label: "Psicologia del ritratto", desc: "Comprensione degli stati interni e della loro espressione visiva." },
];

const WORK_ON = [
  "Respirazione",
  "Postura",
  "Gestione dello spazio",
  "Intenzione dello sguardo",
  "Relazione fotografo-soggetto",
];

const FOR_WHO = [
  {
    title: "Fotografi",
    desc: "Per chi vuole andare oltre la tecnica e lavorare sulla relazione con il soggetto.",
  },
  {
    title: "Professionisti",
    desc: "Per chi vuole essere rappresentato in modo autentico, non costruito.",
  },
];

export default function IlMetodo() {
  const addRef = useReveal();

  return (
    <>
      <SEO
        title="Il Metodo — Approccio al Ritratto"
        description="Il metodo Osmel Fabre: un approccio al ritratto che lavora su respirazione, postura, intenzione dello sguardo e relazione fotografo-soggetto."
        url="/il-metodo"
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
            Il Metodo
          </p>
          <h1
            ref={addRef}
            className="reveal delay-100 font-['Cormorant_Garamond'] font-light leading-[1.05] text-foreground mb-6"
            style={{ fontSize: "clamp(3.5rem, 5.5vw, 7.5rem)", whiteSpace: "nowrap" }}
          >
            Il Metodo
          </h1>
          <p
            ref={addRef}
            className="reveal delay-200 font-['Cormorant_Garamond'] italic text-2xl md:text-3xl text-foreground/80 leading-relaxed"
          >
            Un approccio al ritratto che unisce tecnica, psicologia e comunicazione non verbale.
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
            src={METODO_IMG}
            alt="Il Metodo Osmel Fabre"
            className="w-full h-full object-top"
            style={{ filter: "brightness(0.85)", transform: "scale(1.2)", transformOrigin: "center center", objectFit: "cover" }}
          />
        </div>

        {/* Mobile: full-bleed photo behind text */}
        <div className="absolute inset-0 lg:hidden">
          <img
            src={METODO_IMG}
            alt="Il Metodo Osmel Fabre"
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

      {/* ── I QUATTRO PILASTRI ──────────────────────────────── */}
      <section className="py-24 md:py-36">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-0">
            <div className="lg:col-span-2 flex lg:flex-col items-center lg:items-start gap-4 lg:gap-0">
              <div className="v-line h-16 hidden lg:block mb-4" />
              <span
                ref={addRef}
                className="reveal font-['Jost'] text-[10px] font-medium tracking-[0.3em] uppercase text-primary"
              >
                01 — Origini
              </span>
            </div>
            <div className="lg:col-span-10 lg:pl-8">
              <h2
                ref={addRef}
                className="reveal font-['Cormorant_Garamond'] font-light leading-[1.1] text-foreground mb-12"
                style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)" }}
              >
                Nasce dall'integrazione tra quattro discipline
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border">
                {PILLARS.map((p, i) => (
                  <div
                    key={i}
                    ref={addRef}
                    className={`reveal delay-${(i + 1) * 100} bg-card p-8 md:p-10 flex flex-col gap-4 hover:bg-secondary transition-colors duration-300`}
                  >
                    <span className="font-['Jost'] text-[10px] font-medium tracking-[0.25em] uppercase text-primary">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="font-['Cormorant_Garamond'] text-2xl text-foreground font-light">
                      {p.label}
                    </h3>
                    <p className="font-['Jost'] text-sm font-light text-muted-foreground leading-relaxed">
                      {p.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── IL PRINCIPIO ────────────────────────────────────── */}
      <section className="py-24 md:py-32 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 50%, oklch(0.58 0.1 42) 0%, transparent 60%)",
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
                02 — Il principio
              </span>
            </div>
            <div className="lg:col-span-10 lg:pl-8">
              <h2
                ref={addRef}
                className="reveal font-['Cormorant_Garamond'] font-light leading-[1.1] text-foreground mb-8"
                style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)" }}
              >
                Nel ritratto, il problema non è il volto.
              </h2>
              <p
                ref={addRef}
                className="reveal delay-100 font-['Cormorant_Garamond'] italic text-xl md:text-2xl text-foreground/60 leading-relaxed max-w-2xl mb-10"
              >
                È lo stato in cui si trova la persona.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border max-w-2xl">
                {[
                  { state: "Tensione", result: "La vedi." },
                  { state: "Presenza", result: "La senti." },
                ].map((item, i) => (
                  <div
                    key={i}
                    ref={addRef}
                    className={`reveal delay-${(i + 1) * 100} bg-card p-8 flex flex-col gap-3`}
                  >
                    <span className="font-['Jost'] text-xs font-medium tracking-[0.2em] uppercase text-primary">
                      Se è {item.state.toLowerCase()}
                    </span>
                    <p className="font-['Cormorant_Garamond'] text-2xl text-foreground font-light italic">
                      {item.result}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SU COSA SI LAVORA ───────────────────────────────── */}
      <section className="py-24 md:py-32">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-0">
            <div className="lg:col-span-2 flex lg:flex-col items-center lg:items-start gap-4 lg:gap-0">
              <div className="v-line h-16 hidden lg:block mb-4" />
              <span
                ref={addRef}
                className="reveal font-['Jost'] text-[10px] font-medium tracking-[0.3em] uppercase text-primary"
              >
                03 — Su cosa si lavora
              </span>
            </div>
            <div className="lg:col-span-10 lg:pl-8">
              <h2
                ref={addRef}
                className="reveal font-['Cormorant_Garamond'] font-light leading-[1.1] text-foreground mb-12"
                style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)" }}
              >
                Cinque aree di intervento
              </h2>
              <div className="space-y-0">
                {WORK_ON.map((item, i) => (
                  <div
                    key={i}
                    ref={addRef}
                    className={`reveal delay-${(i + 1) * 100} flex items-center gap-6 py-5 border-b border-border group hover:border-primary transition-colors duration-300`}
                  >
                    <span className="font-['Jost'] text-xs text-primary/60 w-6 shrink-0 font-medium">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-['Cormorant_Garamond'] text-xl md:text-2xl text-foreground font-light group-hover:text-primary transition-colors duration-300">
                      {item}
                    </span>
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
              "radial-gradient(circle at 80% 50%, oklch(0.58 0.1 42) 0%, transparent 60%)",
          }}
        />
        <div className="container relative z-10">
          <div ref={addRef} className="reveal max-w-3xl mx-auto lg:mx-0 lg:ml-[16.666%]">
            <div className="v-line h-16 mb-8" />
            <blockquote
              className="font-['Cormorant_Garamond'] font-light leading-[1.15] text-foreground"
              style={{ fontSize: "clamp(2rem, 4.5vw, 4rem)" }}
            >
              Non un'immagine costruita.
            </blockquote>
            <p
              ref={addRef}
              className="reveal delay-200 font-['Cormorant_Garamond'] italic text-xl md:text-2xl text-foreground/60 mt-8 leading-relaxed"
            >
              Ma un'immagine che emerge.
            </p>
          </div>
        </div>
      </section>

      {/* ── A CHI È RIVOLTO ─────────────────────────────────── */}
      <section className="py-24 md:py-32">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-0">
            <div className="lg:col-span-2 flex lg:flex-col items-center lg:items-start gap-4 lg:gap-0">
              <div className="v-line h-16 hidden lg:block mb-4" />
              <span
                ref={addRef}
                className="reveal font-['Jost'] text-[10px] font-medium tracking-[0.3em] uppercase text-primary"
              >
                04 — A chi è rivolto
              </span>
            </div>
            <div className="lg:col-span-10 lg:pl-8">
              <h2
                ref={addRef}
                className="reveal font-['Cormorant_Garamond'] font-light leading-[1.1] text-foreground mb-12"
                style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)" }}
              >
                Il metodo è alla base di tutto
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border mb-12">
                {FOR_WHO.map((item, i) => (
                  <div
                    key={i}
                    ref={addRef}
                    className={`reveal delay-${(i + 1) * 100} bg-card p-8 md:p-10 flex flex-col gap-4 hover:bg-secondary transition-colors duration-300`}
                  >
                    <h3 className="font-['Cormorant_Garamond'] text-2xl text-foreground font-light">
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
                className="reveal delay-300 font-['Jost'] font-light text-sm text-muted-foreground leading-loose max-w-xl"
              >
                Il metodo è alla base sia dei ritratti che della formazione — non è un modulo separato, ma il filo che attraversa ogni lavoro.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
