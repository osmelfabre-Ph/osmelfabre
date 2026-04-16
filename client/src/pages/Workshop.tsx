/**
 * OSMEL FABRE — Workshop: L'Uomo Davanti all'Obiettivo
 * Masterclass di Fotografia Maschile — 2 giorni
 */

import SEO from "@/components/SEO";
import { useEffect, useState } from "react";
import { Link } from "wouter";

const STRIPE_LINK = "https://buy.stripe.com/cNi8wP8z72NEcwkdsL3Je0p";

// Countdown target: 13 aprile 2026 23:59:59
const COUNTDOWN_TARGET = new Date("2026-04-13T23:59:59").getTime();

const LEARN_ITEMS = [
  {
    title: "La Fotografia Maschile come Linguaggio",
    desc: "Perché fotografare un uomo è diverso da fotografare una donna. Le resistenze psicologiche dell'uomo davanti alla fotocamera, il suo rapporto con l'immagine, il controllo e la vulnerabilità.",
  },
  {
    title: "PNL e Prossemica Applicati al Ritratto",
    desc: "Imparerai a leggere i segnali non verbali del soggetto, riconoscere le sue resistenze e guidarlo verso uno stato di presenza autentica senza dirigerlo.",
  },
  {
    title: "Pratica Intensiva con Modello",
    desc: "Sessioni guidate dove applicherai il metodo in tempo reale. Riceverai feedback diretto su posing, ripresa, gestione della luce e della composizione.",
  },
  {
    title: "Grooming e Preparazione del Soggetto",
    desc: "Con Ilaria Di Lauro (@idlmakeup.grooming), esploreremo l'importanza del grooming nel lavoro fotografico e come influenza la presenza del soggetto.",
  },
  {
    title: "Il Mercato della Fotografia Maschile",
    desc: "Analizzeremo il mercato, le opportunità, come posizionarsi come autorità in questo segmento e come vendersi a professionisti e imprenditori.",
  },
  {
    title: "Materiali e Risorse",
    desc: "Riceverai una dispensa completa di 40+ pagine con il Metodo Osmel Fabre, template pratici, checklist per le sessioni fotografiche e accesso a risorse digitali.",
  },
];

const PILLARS = [
  {
    num: "1",
    title: "PNL Applicata al Ritratto",
    desc: "Come leggere i segnali non verbali del soggetto, riconoscere le resistenze e guidarlo verso uno stato di presenza autentica senza dirigerlo.",
  },
  {
    num: "2",
    title: "Prossemica Fotografica",
    desc: "Come usare lo spazio, la distanza e il tempo per creare una \"zona neutra\" dove l'uomo non deve performare, ma può semplicemente essere.",
  },
  {
    num: "3",
    title: "Fotografia come Atto di Interruzione",
    desc: "Il ritratto maschile non deve essere \"bello\". Deve essere un momento di tregua, dove il controllo si sospende e emerge la persona oltre il ruolo.",
  },
];

const INCLUDES = [
  "14 ore di formazione intensiva",
  "Pratica individuale guidata con modello",
  "Portfolio review personalizzata 1-1",
  "Dispensa completa (40+ pagine)",
  "Shopper esclusiva",
  "Certificato di partecipazione",
  "Accesso gruppo supporto 30 giorni",
];

const NOT_INCLUDES = [
  { label: "Vitto e alloggio", desc: "Non sono inclusi pasti (eccetto caffè/acqua) né pernottamenti." },
  { label: "Trasporto", desc: "Ogni partecipante organizza il proprio trasporto verso la location." },
  { label: "Attrezzatura fotografica", desc: "Devi portare la tua fotocamera e obiettivi." },
  { label: "Editing/Post-produzione", desc: "Il workshop è focalizzato sulla cattura e il metodo." },
  { label: "Sessioni private successive", desc: "Il supporto è limitato al gruppo per 30 giorni." },
  { label: "Modelli per sessioni private", desc: "I modelli sono forniti solo durante le ore di workshop." },
];

const FAQS = [
  { q: "Devo portare la mia attrezzatura?", a: "Sì, ogni partecipante porta la propria fotocamera e obiettivi. Non è necessaria attrezzatura particolarmente costosa: anche una reflex/mirrorless entry-level va bene." },
  { q: "Quali obiettivi consigli?", a: "Un 50mm o 85mm è l'ideale per il ritratto. Va bene anche uno zoom 24-70mm o 70-200mm. L'importante è avere almeno un obiettivo luminoso (f/2.8 o più aperto)." },
  { q: "È un workshop tecnico o concettuale?", a: "Entrambi. Lavoriamo sulla tecnica (luce, composizione, gestione della sessione), ma soprattutto sull'approccio: come creare le condizioni perché emerga la presenza del soggetto." },
  { q: "Ho già fatto altri workshop di ritratto. Questo è diverso?", a: "Sì. La maggior parte dei workshop insegna a \"dirigere\" il soggetto con pose e istruzioni. Questo workshop insegna l'opposto: come tenere spazio perché il soggetto si riveli spontaneamente." },
  { q: "Cosa devo portare oltre alla fotocamera?", a: "Il tuo portfolio di 10-15 ritratti (digitale va bene) per la review personalizzata. E la motivazione a metterti in gioco." },
  { q: "Riceverò le foto dei modelli scattate durante il workshop?", a: "Sì, le foto che scatti durante la pratica sono tue e le porti via. Potrai usarle per il tuo portfolio (con le dovute liberatorie)." },
  { q: "Ci sarà un certificato?", a: "Sì, riceverai un certificato di partecipazione firmato da Osmel Fabre, che attesta la tua formazione nel Metodo Osmel Fabre." },
  { q: "E se non sono sicuro di essere pronto?", a: "Scrivici comunque. A volte il dubbio è solo la resistenza che cerca di proteggerti dal cambiamento." },
];

function useCountdown(target: number) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0, expired: false });

  useEffect(() => {
    const tick = () => {
      const now = Date.now();
      const dist = target - now;
      if (dist <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, expired: true });
        return;
      }
      setTimeLeft({
        days: Math.floor(dist / (1000 * 60 * 60 * 24)),
        hours: Math.floor((dist % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((dist % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((dist % (1000 * 60)) / 1000),
        expired: false,
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [target]);

  return timeLeft;
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="border-b border-border cursor-pointer"
      onClick={() => setOpen(!open)}
    >
      <div className="flex items-center justify-between py-5 gap-4">
        <span className="font-['Cormorant_Garamond'] text-lg text-foreground font-light">{q}</span>
        <span className="text-primary shrink-0 text-xl font-light">{open ? "−" : "+"}</span>
      </div>
      {open && (
        <p className="font-['Jost'] text-sm font-light text-muted-foreground leading-relaxed pb-5">
          {a}
        </p>
      )}
    </div>
  );
}

export default function Workshop() {
  const countdown = useCountdown(COUNTDOWN_TARGET);

  return (
    <>
      <SEO
        title="Workshop — L'Uomo Davanti all'Obiettivo"
        description="Masterclass di fotografia maschile con Osmel Fabre: 2 giorni intensivi per fotografi che vogliono padroneggiare il ritratto maschile. Posti limitati."
        url="/workshop-di-ritratto-maschile.html"
      />
      {/* ── URGENCY BANNER ──────────────────────────────────── */}
      <div
        className="w-full text-center py-3 px-4 font-['Jost'] text-xs font-medium tracking-[0.15em] uppercase"
        style={{ background: "oklch(0.58 0.1 42)", color: "oklch(0.135 0.004 80)", marginTop: "60px" }}
      >
        Solo 4 posti disponibili per Milano 18-19 Aprile · 5 posti per Bologna 23-24 Maggio
      </div>

      {/* ── HERO ────────────────────────────────────────────── */}
      <section
        className="relative flex items-center overflow-hidden pt-24 pb-20"
        style={{ minHeight: "90vh" }}
      >
        {/* Hero background photo */}
        <div className="absolute inset-0">
          <img
            src="https://d2xsxph8kpxj0f.cloudfront.net/310519663510175502/Jt7ZRyXY4rb5NpEBkocwTA/OSMEL-23_5d7550ba.jpg"
            alt="Workshop di Ritratto Maschile — Osmel Fabre"
            className="w-full h-full object-cover object-center"
            style={{ filter: "brightness(0.35)" }}
          />
          {/* Dark gradient overlay for text readability */}
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to right, oklch(0.08 0.004 80 / 0.85) 0%, oklch(0.08 0.004 80 / 0.4) 60%, transparent 100%)" }}
          />
        </div>
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at 20% 50%, oklch(0.58 0.1 42 / 0.08) 0%, transparent 60%)" }}
        />
        <div className="container relative z-10 max-w-3xl">
          <p className="font-['Jost'] text-xs font-medium tracking-[0.3em] uppercase text-primary mb-6">
            Masterclass di Fotografia Maschile
          </p>
          <h1
            className="font-['Cormorant_Garamond'] font-light leading-[1.05] text-foreground mb-6"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
          >
            L'Uomo Davanti<br />all'Obiettivo
          </h1>
          <p className="font-['Jost'] font-light text-base text-muted-foreground leading-loose mb-10 max-w-xl">
            Il 90% dei fotografi fotografa solo donne. Diventa l'autorità in fotografia maschile consapevole e monetizza un mercato che nessuno sta sfruttando.
          </p>

          {/* Countdown */}
          <div
            className="mb-8 p-6 inline-block"
            style={{ background: "oklch(0.58 0.1 42 / 0.08)", border: "1px solid oklch(0.58 0.1 42 / 0.3)" }}
          >
            <span className="font-['Jost'] text-[10px] tracking-[0.3em] uppercase text-primary block mb-4">
              {countdown.expired ? "Iscrizioni Chiuse" : "Iscrizioni Chiudono In"}
            </span>
            <div className="flex gap-6">
              {[
                { val: countdown.days, label: "Giorni" },
                { val: countdown.hours, label: "Ore" },
                { val: countdown.minutes, label: "Minuti" },
                { val: countdown.seconds, label: "Secondi" },
              ].map((item) => (
                <div key={item.label} className="flex flex-col items-center">
                  <span
                    className="font-['Cormorant_Garamond'] font-light text-primary"
                    style={{ fontSize: "2.5rem", lineHeight: 1 }}
                  >
                    {String(item.val).padStart(2, "0")}
                  </span>
                  <span className="font-['Jost'] text-[9px] tracking-[0.2em] uppercase text-muted-foreground mt-2">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Dates */}
          <div className="flex flex-wrap gap-3 mb-10">
            {["18-19 Aprile 2026 | Milano", "23-24 Maggio 2026 | Bologna"].map((d) => (
              <span
                key={d}
                className="font-['Jost'] text-xs tracking-[0.15em] uppercase px-5 py-3"
                style={{ border: "1px solid oklch(0.58 0.1 42)", color: "oklch(0.58 0.1 42)" }}
              >
                {d}
              </span>
            ))}
          </div>

          <a
            href="#pricing"
            className="cta-btn inline-flex items-center gap-4 font-['Jost'] text-xs font-medium tracking-[0.2em] uppercase px-10 py-4 text-foreground"
            style={{ background: "oklch(0.58 0.1 42)", color: "oklch(0.135 0.004 80)" }}
          >
            Prenota il Tuo Posto
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </section>

      {/* ── IL METODO ───────────────────────────────────────── */}
      <section className="py-24 md:py-32 bg-card">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-0">
            <div className="lg:col-span-2 flex lg:flex-col items-center lg:items-start gap-4 lg:gap-0">
              <div className="v-line h-16 hidden lg:block mb-4" />
              <span className="font-['Jost'] text-[10px] font-medium tracking-[0.3em] uppercase text-primary">
                01 — Il Metodo
              </span>
            </div>
            <div className="lg:col-span-10 lg:pl-8">
              <h2
                className="font-['Cormorant_Garamond'] font-light leading-[1.1] text-foreground mb-4"
                style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)" }}
              >
                Metodo Osmel Fabre
              </h2>
              <p className="font-['Cormorant_Garamond'] italic text-xl text-foreground/60 mb-12">
                Presenza, Non Espressione
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border">
                {PILLARS.map((p) => (
                  <div key={p.num} className="bg-card p-8 md:p-10 flex flex-col gap-4 hover:bg-secondary transition-colors duration-300">
                    <span className="font-['Jost'] text-[10px] font-medium tracking-[0.25em] uppercase text-primary">{p.num}</span>
                    <h3 className="font-['Cormorant_Garamond'] text-xl text-foreground font-light">{p.title}</h3>
                    <p className="font-['Jost'] text-sm font-light text-muted-foreground leading-relaxed">{p.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── COSA AFFRONTEREMO ───────────────────────────────── */}
      <section className="py-24 md:py-32">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-0">
            <div className="lg:col-span-2 flex lg:flex-col items-center lg:items-start gap-4 lg:gap-0">
              <div className="v-line h-16 hidden lg:block mb-4" />
              <span className="font-['Jost'] text-[10px] font-medium tracking-[0.3em] uppercase text-primary">
                02 — Cosa Affronteremo
              </span>
            </div>
            <div className="lg:col-span-10 lg:pl-8">
              <h2
                className="font-['Cormorant_Garamond'] font-light leading-[1.1] text-foreground mb-4"
                style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)" }}
              >
                Un'immersione nel metodo consapevole
              </h2>
              <p className="font-['Jost'] font-light text-sm text-muted-foreground mb-12 max-w-xl leading-loose">
                Fotografare l'uomo oltre il ruolo, oltre la posa, oltre il "sorridi"
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border">
                {LEARN_ITEMS.map((item, i) => (
                  <div key={i} className="bg-card p-8 md:p-10 flex flex-col gap-3 hover:bg-secondary transition-colors duration-300"
                    style={{ borderLeft: "2px solid oklch(0.58 0.1 42)" }}
                  >
                    <h3 className="font-['Cormorant_Garamond'] text-xl text-foreground font-light">{item.title}</h3>
                    <p className="font-['Jost'] text-sm font-light text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROGRAMMA ───────────────────────────────────────── */}
      <section className="py-24 md:py-32 bg-card">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-0">
            <div className="lg:col-span-2 flex lg:flex-col items-center lg:items-start gap-4 lg:gap-0">
              <div className="v-line h-16 hidden lg:block mb-4" />
              <span className="font-['Jost'] text-[10px] font-medium tracking-[0.3em] uppercase text-primary">
                03 — Il Programma
              </span>
            </div>
            <div className="lg:col-span-10 lg:pl-8">
              <h2
                className="font-['Cormorant_Garamond'] font-light leading-[1.1] text-foreground mb-12"
                style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)" }}
              >
                Due giorni intensivi
              </h2>
              {[
                {
                  day: "Sabato — La Teoria e la Visione",
                  items: [
                    { time: "10:00 – 13:00", desc: "Fondamenti del Metodo" },
                    { time: "13:00 – 14:00", desc: "Pausa pranzo (non inclusa)" },
                    { time: "14:00 – 17:00", desc: "Dimostrazione Live con modello" },
                    { time: "17:00 – 18:00", desc: "Review e Q&A" },
                  ],
                },
                {
                  day: "Domenica — La Pratica e il Metodo",
                  items: [
                    { time: "09:30 – 13:00", desc: "Pratica Individuale Guidata" },
                    { time: "13:00 – 14:00", desc: "Pausa pranzo (non inclusa)" },
                    { time: "14:00 – 17:30", desc: "Portfolio Review Personalizzata 1-1" },
                    { time: "17:30 – 18:00", desc: "Certificazione e Chiusura" },
                  ],
                },
              ].map((day, di) => (
                <div key={di} className="mb-6 p-8 md:p-10 border border-border">
                  <h3 className="font-['Cormorant_Garamond'] text-xl text-primary font-light mb-6 pb-4 border-b border-border">
                    {day.day}
                  </h3>
                  <div className="space-y-0">
                    {day.items.map((item, ii) => (
                      <div key={ii} className="flex gap-6 py-4 border-b border-border last:border-0">
                        <span className="font-['Jost'] text-xs text-primary min-w-[140px] shrink-0">{item.time}</span>
                        <span className="font-['Jost'] text-sm font-light text-foreground">{item.desc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── COSA INCLUDE ────────────────────────────────────── */}
      <section className="py-24 md:py-32">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-0">
            <div className="lg:col-span-2 flex lg:flex-col items-center lg:items-start gap-4 lg:gap-0">
              <div className="v-line h-16 hidden lg:block mb-4" />
              <span className="font-['Jost'] text-[10px] font-medium tracking-[0.3em] uppercase text-primary">
                04 — Cosa Include
              </span>
            </div>
            <div className="lg:col-span-10 lg:pl-8">
              <h2
                className="font-['Cormorant_Garamond'] font-light leading-[1.1] text-foreground mb-12"
                style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)" }}
              >
                Tutto quello che ricevi
              </h2>
              <div className="space-y-0 mb-16">
                {INCLUDES.map((item, i) => (
                  <div key={i} className="flex items-center gap-6 py-5 border-b border-border group hover:border-primary transition-colors duration-300">
                    <span className="text-primary font-light text-lg shrink-0">—</span>
                    <span className="font-['Cormorant_Garamond'] text-xl text-foreground font-light group-hover:text-primary transition-colors duration-300">{item}</span>
                  </div>
                ))}
              </div>

              <h3 className="font-['Cormorant_Garamond'] text-xl text-foreground/60 font-light mb-8">Cosa NON Include</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border">
                {NOT_INCLUDES.map((item, i) => (
                  <div key={i} className="bg-card p-6 flex flex-col gap-2">
                    <span className="font-['Jost'] text-xs font-medium text-foreground/70">{item.label}</span>
                    <p className="font-['Jost'] text-xs font-light text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CHI È OSMEL ─────────────────────────────────────── */}
      <section className="py-24 md:py-32 bg-card">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-0">
            <div className="lg:col-span-2 flex lg:flex-col items-center lg:items-start gap-4 lg:gap-0">
              <div className="v-line h-16 hidden lg:block mb-4" />
              <span className="font-['Jost'] text-[10px] font-medium tracking-[0.3em] uppercase text-primary">
                05 — Chi è Osmel
              </span>
            </div>
            <div className="lg:col-span-10 lg:pl-8 max-w-2xl">
              <h2
                className="font-['Cormorant_Garamond'] font-light leading-[1.1] text-foreground mb-8"
                style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)" }}
              >
                Chi è Osmel Fabre
              </h2>
              <p className="font-['Jost'] font-light text-base text-muted-foreground leading-loose mb-5">
                <strong className="text-foreground">Osmel Fabre</strong> è fotografo ritrattista, autore e formatore specializzato in Fotografia Maschile Consapevole.
              </p>
              <p className="font-['Jost'] font-light text-base text-muted-foreground leading-loose mb-5">
                Con oltre 15 anni di esperienza nel ritratto, ha sviluppato un metodo proprietario che integra <strong className="text-foreground">PNL e Prossemica</strong> per fotografare l'uomo al di là del ruolo, rivelando presenza invece di espressione.
              </p>
              <p className="font-['Jost'] font-light text-base text-muted-foreground leading-loose mb-5">
                Ha tenuto 10+ workshop in tutta Italia (Roma, Milano, Napoli, Torino), formato centinaia di fotografi e costruito un portfolio riconosciuto per la sua intensità e autenticità.
              </p>
              <p className="font-['Cormorant_Garamond'] italic text-xl text-primary mt-6 leading-relaxed">
                Osmel è l'unico fotografo in Italia che insegna la ritrattistica maschile come linguaggio consapevole, non come tecnica.
              </p>
              <Link href="/chi-sono" className="cta-btn inline-flex items-center gap-4 border border-primary text-primary px-8 py-4 font-['Jost'] text-xs font-medium tracking-[0.2em] uppercase hover:text-primary-foreground transition-colors duration-350 mt-8">
                <span>Scopri di più</span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── PRICING ─────────────────────────────────────────── */}
      <section id="pricing" className="py-24 md:py-32">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-0">
            <div className="lg:col-span-2 flex lg:flex-col items-center lg:items-start gap-4 lg:gap-0">
              <div className="v-line h-16 hidden lg:block mb-4" />
              <span className="font-['Jost'] text-[10px] font-medium tracking-[0.3em] uppercase text-primary">
                06 — Prenota
              </span>
            </div>
            <div className="lg:col-span-10 lg:pl-8">
              <h2
                className="font-['Cormorant_Garamond'] font-light leading-[1.1] text-foreground mb-4"
                style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)" }}
              >
                Prenota il Tuo Posto
              </h2>
              <p className="font-['Jost'] font-light text-sm text-muted-foreground mb-12 leading-loose">
                18-19 Aprile 2026 · Milano · Solo 6 partecipanti<br />
                23-24 Maggio 2026 · Bologna · Solo 6 partecipanti
              </p>

              {/* Pricing card */}
              <div className="max-w-lg border border-border">
                <div className="p-10 border-b border-border text-center">
                  <p className="font-['Jost'] text-[10px] font-medium tracking-[0.3em] uppercase text-primary mb-4">
                    L'Uomo Davanti all'Obiettivo
                  </p>
                  <div className="font-['Cormorant_Garamond'] font-light text-foreground" style={{ fontSize: "4rem", lineHeight: 1 }}>
                    €700
                  </div>
                  <span className="font-['Jost'] text-xs text-muted-foreground">/persona</span>
                </div>
                <div className="p-10">
                  <div className="space-y-0 mb-10">
                    {INCLUDES.map((item, i) => (
                      <div key={i} className="flex items-center gap-4 py-3 border-b border-border last:border-0">
                        <span className="text-primary shrink-0">—</span>
                        <span className="font-['Jost'] text-sm font-light text-foreground">{item}</span>
                      </div>
                    ))}
                  </div>
                  <a
                    href={STRIPE_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-center font-['Jost'] text-xs font-semibold tracking-[0.2em] uppercase py-5 transition-all duration-300"
                    style={{ background: "oklch(0.58 0.1 42)", color: "oklch(0.135 0.004 80)" }}
                  >
                    Iscriviti Ora — €700
                  </a>
                  <p className="font-['Jost'] text-[10px] text-muted-foreground text-center mt-4 tracking-[0.1em]">
                    Pagamento sicuro con Stripe · Conferma immediata via email
                  </p>
                </div>
              </div>

              {/* Cancellation policy */}
              <div className="max-w-lg mt-10 p-8 border border-border">
                <h3 className="font-['Cormorant_Garamond'] text-xl text-primary font-light mb-6">Politica di Cancellazione</h3>
                <div className="space-y-3">
                  {[
                    ["Fino a 30 giorni prima", "Rimborso completo (100%)"],
                    ["Da 15 a 29 giorni prima", "Rimborso del 50%"],
                    ["Meno di 15 giorni prima", "Nessun rimborso (posto trasferibile)"],
                    ["Assenza il giorno del workshop", "Nessun rimborso. Accesso al gruppo per 30 giorni."],
                  ].map(([when, what]) => (
                    <div key={when} className="flex flex-col gap-1">
                      <span className="font-['Jost'] text-xs font-medium text-foreground">{when}</span>
                      <span className="font-['Jost'] text-xs font-light text-muted-foreground">{what}</span>
                    </div>
                  ))}
                  <p className="font-['Jost'] text-[10px] text-muted-foreground pt-4 border-t border-border">
                    Per cancellazioni: <a href="mailto:info@osmelfabre.it" className="text-primary">info@osmelfabre.it</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

       {/* ── TESTIMONIANZE ────────────────────────────────────── */}
      <section className="py-24 md:py-32">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-0">
            <div className="lg:col-span-2 flex lg:flex-col items-center lg:items-start gap-4 lg:gap-0">
              <div className="v-line h-16 hidden lg:block mb-4" />
              <span className="font-['Jost'] text-[10px] font-medium tracking-[0.3em] uppercase text-primary">
                07 — Recensioni
              </span>
            </div>
            <div className="lg:col-span-10 lg:pl-8">
              <h2
                className="font-['Cormorant_Garamond'] font-light leading-[1.1] text-foreground mb-4"
                style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)" }}
              >
                Cosa dicono i partecipanti
              </h2>
              <div className="flex items-center gap-3 mb-12">
                <div className="flex gap-1">
                  {[1,2,3,4,5].map(s => (
                    <svg key={s} width="16" height="16" viewBox="0 0 24 24" fill="oklch(0.58 0.1 42)">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  ))}
                </div>
                <span className="font-['Jost'] text-sm font-light text-muted-foreground">5,0 · 66 recensioni Google</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border">
                {[
                  {
                    name: "Samanta Rocchinq",
                    date: "4 mesi fa",
                    text: "Ho partecipato ad uno dei workshop di Osmel sul ritratto Consapevole, un percorso importante per me, di presa di coscienza sul proprio io. Un percorso interiore che, passo dopo passo, mi ha permesso di arrivare a lui e di trovare ciò che cercavo.",
                  },
                  {
                    name: "Manuela Palmeri",
                    date: "4 mesi fa",
                    text: "Un'esperienza fotografica unica. In studio ho trovato due persone autentiche ed empatiche, capaci di mettermi subito a mio agio. Osmel ha saputo cogliere la mia essenza, permettendomi di aprirmi davvero e di trasformare emozioni profonde in immagini. Super disponibili, atmosfera di totale accoglienza, empatica all'istante. Foto stratosferiche.",
                  },
                  {
                    name: "Elena Ababii",
                    date: "6 mesi fa",
                    text: "Ho conosciuto Osmel tramite il suo workshop organizzato a Torino sul tema \"Ritratto maschile consapevole\" e sono stata davvero impressionata nel scoprire il suo approccio e il suo metodo per ritrarre le persone. È impossibile non sentirsi a proprio agio con lui.",
                  },
                ].map((t, i) => (
                  <div key={i} className="bg-card p-8 md:p-10 flex flex-col gap-5">
                    <div className="flex gap-1">
                      {[1,2,3,4,5].map(s => (
                        <svg key={s} width="12" height="12" viewBox="0 0 24 24" fill="oklch(0.58 0.1 42)">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                        </svg>
                      ))}
                    </div>
                    <p className="font-['Cormorant_Garamond'] italic text-lg text-foreground/80 leading-relaxed flex-1">
                      “{t.text}”
                    </p>
                    <div>
                      <p className="font-['Jost'] text-sm font-medium text-foreground">{t.name}</p>
                      <p className="font-['Jost'] text-[10px] tracking-[0.2em] uppercase text-muted-foreground mt-1">{t.date} · Google</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ────────────────────────────────────────────── */}
      <section className="py-24 md:py-32 bg-card">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-0">
            <div className="lg:col-span-2 flex lg:flex-col items-center lg:items-start gap-4 lg:gap-0">
              <div className="v-line h-16 hidden lg:block mb-4" />
              <span className="font-['Jost'] text-[10px] font-medium tracking-[0.3em] uppercase text-primary">
                08 — FAQ
              </span>
            </div>
            <div className="lg:col-span-10 lg:pl-8 max-w-2xl">
              <h2
                className="font-['Cormorant_Garamond'] font-light leading-[1.1] text-foreground mb-12"
                style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)" }}
              >
                Domande frequenti
              </h2>
              {FAQS.map((faq, i) => (
                <FaqItem key={i} q={faq.q} a={faq.a} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTATTO ────────────────────────────────────────── */}
      <section className="py-20 md:py-28">
        <div className="container text-center">
          <p className="font-['Cormorant_Garamond'] italic text-xl text-foreground/60 mb-4">Hai domande?</p>
          <a
            href="mailto:info@osmelfabre.it"
            className="font-['Cormorant_Garamond'] text-2xl text-primary hover:text-primary/80 transition-colors"
          >
            info@osmelfabre.it
          </a>
        </div>
      </section>
    </>
  );
}
