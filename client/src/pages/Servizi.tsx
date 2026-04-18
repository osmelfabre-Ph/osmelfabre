/**
 * OSMEL FABRE — Servizi Fotografici
 * Design: Minimalismo Sensoriale
 */

import SEO from "@/components/SEO";
import { useReveal } from "@/hooks/useReveal";
import { Link } from "wouter";

const DONNA_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663510175502/Jt7ZRyXY4rb5NpEBkocwTA/CARLOTTAPARODI-1_cdaf8a60.webp";
const UOMO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663510175502/Jt7ZRyXY4rb5NpEBkocwTA/LUCAPANTINI-2026-53_afa9fac3.webp";
const MBP_IMG = ""; // TODO: incolla qui l'URL dopo aver caricato la foto dall'admin

const DONNA_INCLUDES = [
  "Trucco e parrucco professionale",
  "Sessione fotografica in studio (3 ore)",
  "Direzione durante lo shooting",
  "Selezione e consegna di circa 30 immagini digitali",
];

const UOMO_INCLUDES = [
  "Grooming uomo (trucco e barba)",
  "Sessione fotografica in studio (2,5 ore)",
  "Direzione durante lo shooting",
  "Selezione e consegna di circa 30 immagini digitali",
];

function ServiceCard({
  img,
  imgAlt,
  sectionNum,
  title,
  subtitle,
  description,
  includes,
  price,
  imgRight = false,
  addRef,
}: {
  img: string;
  imgAlt: string;
  sectionNum: string;
  title: string;
  subtitle: string;
  description: string;
  includes: string[];
  price: string;
  imgRight?: boolean;
  addRef: (el: HTMLElement | null) => void;
}) {
  return (
    <section className="py-0">
      <div className="container">
        <div
          className={`grid grid-cols-1 lg:grid-cols-2 gap-0 items-stretch ${imgRight ? "lg:flex-row-reverse" : ""}`}
          style={{ direction: imgRight ? "rtl" : "ltr" }}
        >
          {/* Image */}
          <div
            ref={addRef}
            className="reveal relative overflow-hidden"
            style={{ minHeight: "560px", direction: "ltr" }}
          >
            <img
              src={img}
              alt={imgAlt}
              className="absolute inset-0 w-full h-full object-cover object-top"
              style={{ filter: "brightness(0.55)" }}
            />
            <div
              className="absolute inset-0"
              style={{
                background: imgRight
                  ? "linear-gradient(to left, transparent 60%, oklch(0.135 0.004 80) 100%)"
                  : "linear-gradient(to right, transparent 60%, oklch(0.135 0.004 80) 100%)",
              }}
            />
            {/* Price badge */}
            <div className="absolute bottom-8 left-8 flex flex-col gap-1" style={{ direction: "ltr" }}>
              <span className="font-['Jost'] text-[10px] font-medium tracking-[0.3em] uppercase text-primary/80">
                Investimento
              </span>
              <span
                className="font-['Cormorant_Garamond'] font-light text-foreground"
                style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
              >
                {price}
              </span>
            </div>
          </div>

          {/* Content */}
          <div
            ref={addRef}
            className="reveal delay-200 bg-card p-10 md:p-14 lg:p-16 flex flex-col justify-center"
            style={{ direction: "ltr" }}
          >
            <span className="font-['Jost'] text-[10px] font-medium tracking-[0.3em] uppercase text-primary mb-5">
              {sectionNum}
            </span>
            <h2
              className="font-['Cormorant_Garamond'] font-light leading-[1.1] text-foreground mb-3"
              style={{ fontSize: "clamp(1.8rem, 3vw, 2.8rem)" }}
            >
              {title}
            </h2>
            <p className="font-['Cormorant_Garamond'] italic text-lg text-primary mb-8">
              {subtitle}
            </p>
            <p className="font-['Jost'] font-light text-sm text-muted-foreground leading-loose mb-10 max-w-sm">
              {description}
            </p>

            <div className="mb-10">
              <p className="font-['Jost'] text-[10px] font-medium tracking-[0.25em] uppercase text-muted-foreground mb-5">
                Cosa include
              </p>
              <div className="space-y-0">
                {includes.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 py-3 border-b border-border"
                  >
                    <span className="w-1 h-1 rounded-full bg-primary shrink-0" />
                    <span className="font-['Jost'] text-sm font-light text-foreground/80">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <Link href="/contatti" className="cta-btn inline-flex items-center gap-4 border border-primary text-primary px-8 py-4 font-['Jost'] text-xs font-medium tracking-[0.2em] uppercase hover:text-primary-foreground transition-colors duration-350 self-start">
                <span>Richiedi informazioni</span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Servizi() {
  const addRef = useReveal();

  return (
    <>
      <SEO
        title="Servizi Fotografici — Ritratti e Book Attori"
        description="Servizi fotografici Osmel Fabre: ritratti professionali maschili e femminili, book per attori e attrici a Roma. Sessioni in studio con direzione professionale."
        url="/servizi"
      />
      {/* ── HEADER ──────────────────────────────────────────── */}
      <section className="pt-40 pb-20 md:pt-52 md:pb-28">
        <div className="container">
          <p
            ref={addRef}
            className="reveal font-['Jost'] text-xs font-medium tracking-[0.3em] uppercase text-primary mb-5"
          >
            Servizi fotografici
          </p>
          <h1
            ref={addRef}
            className="reveal delay-100 font-['Cormorant_Garamond'] font-light leading-[1.05] text-foreground mb-8"
            style={{ fontSize: "clamp(3rem, 7vw, 6rem)" }}
          >
            Sessioni<br />fotografiche
          </h1>
          <p
            ref={addRef}
            className="reveal delay-200 font-['Jost'] font-light text-base text-muted-foreground leading-loose max-w-xl"
          >
            Ogni sessione non è solo uno shooting. È un lavoro guidato in cui costruiamo insieme presenza, intenzione e coerenza dell'immagine.
          </p>
        </div>
      </section>

      {/* ── THE MEN'S BRAND PHOTOGRAPHY ────────────────────── */}
      <section className="py-0">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-stretch">
            {/* Image */}
            <div
              ref={addRef}
              className="reveal relative overflow-hidden"
              style={{ minHeight: "560px" }}
            >
              {MBP_IMG && (
                <img
                  src={MBP_IMG}
                  alt="The Men's Brand Photography — fotografia corporate maschile"
                  className="absolute inset-0 w-full h-full object-cover object-top"
                  style={{ filter: "brightness(0.55)" }}
                />
              )}
              <div
                className="absolute inset-0"
                style={{
                  background: "linear-gradient(to right, transparent 60%, oklch(0.135 0.004 80) 100%)",
                }}
              />
            </div>
            {/* Content */}
            <div
              ref={addRef}
              className="reveal delay-200 bg-card p-10 md:p-14 lg:p-16 flex flex-col justify-center"
            >
              <span className="font-['Jost'] text-[10px] font-medium tracking-[0.3em] uppercase text-primary mb-5">
                Specializzazione — Fotografia Corporate Maschile
              </span>
              <h2
                className="font-['Cormorant_Garamond'] font-light leading-[1.1] text-foreground mb-3"
                style={{ fontSize: "clamp(1.8rem, 3vw, 2.8rem)" }}
              >
                The Men's Brand<br />Photography
              </h2>
              <p className="font-['Cormorant_Garamond'] italic text-lg text-primary mb-8">
                L'immagine professionale per l'uomo che costruisce il proprio brand
              </p>
              <p className="font-['Jost'] font-light text-sm text-muted-foreground leading-loose mb-10 max-w-sm">
                Un progetto dedicato esclusivamente alla fotografia di ritratto per professionisti, imprenditori e brand maschili. Immagine, identità e comunicazione visiva al servizio della tua presenza nel mercato.
              </p>
              <a
                href="https://www.themenbrandphotography.com"
                target="_blank"
                rel="noopener noreferrer"
                className="cta-btn inline-flex items-center gap-4 border border-primary text-primary px-8 py-4 font-['Jost'] text-xs font-medium tracking-[0.2em] uppercase hover:text-primary-foreground transition-colors duration-350 self-start"
              >
                <span>Scopri il progetto</span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      <div className="h-px bg-border" />

      {/* ── BOOK DONNA ──────────────────────────────────────── */}
      <ServiceCard
        img={DONNA_IMG}
        imgAlt="Book fotografico donna / attrice"
        sectionNum="01 — Donna / Attrice"
        title="Book fotografico donna / attrice"
        subtitle="Immagine professionale e coerente"
        description="Pensata per attrici e professioniste che desiderano un ritratto pulito, autentico e utilizzabile nel proprio percorso."
        includes={DONNA_INCLUDES}
        price="400 €"
        addRef={addRef}
      />

      <div className="h-px bg-border" />

      {/* ── BOOK UOMO ───────────────────────────────────────── */}
      <ServiceCard
        img={UOMO_IMG}
        imgAlt="Book fotografico uomo / attore"
        sectionNum="02 — Uomo / Attore"
        title="Book fotografico uomo / attore"
        subtitle="Rappresentazione della presenza maschile"
        description="Lavoro su postura, sguardo e costruzione dell'immagine in modo essenziale e credibile."
        includes={UOMO_INCLUDES}
        price="350 €"
        imgRight
        addRef={addRef}
      />

      {/* ── COME LAVORIAMO ──────────────────────────────────── */}
      <section className="py-24 md:py-40 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 50% 50%, oklch(0.58 0.1 42) 0%, transparent 60%)",
          }}
        />
        <div className="container relative z-10">
          <div ref={addRef} className="reveal max-w-3xl mx-auto lg:mx-0 lg:ml-[16.666%]">
            <div className="v-line h-16 mb-8" />
            <span className="font-['Jost'] text-[10px] font-medium tracking-[0.3em] uppercase text-primary mb-6 block">
              Come lavoriamo
            </span>
            <blockquote
              className="font-['Cormorant_Garamond'] font-light leading-[1.15] text-foreground mb-8"
              style={{ fontSize: "clamp(1.8rem, 3.5vw, 3.2rem)" }}
            >
              Ogni sessione non è solo uno shooting.
            </blockquote>
            <p
              ref={addRef}
              className="reveal delay-100 font-['Jost'] font-light text-base text-muted-foreground leading-loose max-w-xl mb-10"
            >
              È un lavoro guidato in cui costruiamo insieme presenza, intenzione e coerenza dell'immagine — per ottenere fotografie realmente utilizzabili.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border max-w-2xl">
              {["Presenza", "Intenzione", "Coerenza"].map((item, i) => (
                <div
                  key={i}
                  ref={addRef}
                  className={`reveal delay-${(i + 1) * 100} bg-card p-6 md:p-8`}
                >
                  <span className="font-['Cormorant_Garamond'] text-xl text-foreground font-light">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
