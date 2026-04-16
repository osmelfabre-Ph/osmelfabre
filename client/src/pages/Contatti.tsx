/**
 * OSMEL FABRE — Contatti
 * Design: Minimalismo Sensoriale
 */

import SEO from "@/components/SEO";
import { useReveal } from "@/hooks/useReveal";
import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

const CONTATTI_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663510175502/Jt7ZRyXY4rb5NpEBkocwTA/osmel-contatti-2025_d31f278d.jpg";

export default function Contatti() {
  const addRef = useReveal();
  const [formState, setFormState] = useState({
    nome: "",
    email: "",
    oggetto: "",
    messaggio: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const submitContact = trpc.contacts.submit.useMutation({
    onSuccess: () => setSubmitted(true),
    onError: (e) => toast.error(`Errore nell'invio: ${e.message}`),
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitContact.mutate({
      name: formState.nome,
      email: formState.email,
      subject: formState.oggetto,
      message: formState.messaggio,
    });
  };

  return (
    <>
      <SEO
        title="Contatti — Prenota una Sessione Fotografica"
        description="Contatta Osmel Fabre per prenotare una sessione fotografica a Roma. Ritratti professionali, book attori, formazione. Rispondo entro 24 ore."
        url="/contatti"
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
            Contatti
          </p>
          <h1
            ref={addRef}
            className="reveal delay-100 font-['Cormorant_Garamond'] font-light leading-[1.05] text-foreground mb-6"
            style={{ fontSize: "clamp(3.5rem, 5.5vw, 7.5rem)", whiteSpace: "nowrap" }}
          >
            Scrivimi
          </h1>
          <p
            ref={addRef}
            className="reveal delay-200 font-['Cormorant_Garamond'] italic text-2xl md:text-3xl text-foreground/80 leading-relaxed"
          >
            Ogni richiesta viene valutata personalmente.
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
            src={CONTATTI_BG}
            alt="Osmel Fabre fotografo"
            className="w-full h-full"
            style={{ filter: "brightness(0.85)", objectFit: "cover", objectPosition: "center top" }}
          />
        </div>

        {/* Mobile: full-bleed photo behind text */}
        <div className="absolute inset-0 lg:hidden">
          <img
            src={CONTATTI_BG}
            alt="Studio fotografico"
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

      {/* ── FORM + INFO ─────────────────────────────────────── */}
      <section className="py-24 md:py-36">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-0">
            {/* Left: info */}
            <div className="lg:col-span-4 lg:pr-12">
              <div className="v-line h-16 mb-8 hidden lg:block" />
              <p
                ref={addRef}
                className="reveal font-['Jost'] font-light text-base text-muted-foreground leading-loose mb-12"
              >
                Se vuoi informazioni su servizi fotografici, workshop o mentoring, puoi scrivermi qui.
              </p>

              <div className="space-y-8">
                <div ref={addRef} className="reveal">
                  <p className="font-['Jost'] text-[10px] font-medium tracking-[0.3em] uppercase text-primary mb-2">
                    Email
                  </p>
                  <a
                    href="mailto:info@osmelfabre.it"
                    className="font-['Cormorant_Garamond'] text-xl text-foreground font-light hover:text-primary transition-colors duration-300"
                  >
                    info@osmelfabre.it
                  </a>
                </div>

                <div ref={addRef} className="reveal delay-100">
                  <p className="font-['Jost'] text-[10px] font-medium tracking-[0.3em] uppercase text-primary mb-2">
                    Instagram
                  </p>
                  <a
                    href="https://www.instagram.com/osmelfabre"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-['Cormorant_Garamond'] text-xl text-foreground font-light hover:text-primary transition-colors duration-300"
                  >
                    @osmelfabre
                  </a>
                </div>
              </div>
            </div>

            {/* Right: form */}
            <div className="lg:col-span-8 lg:pl-8 lg:border-l lg:border-border">
              {submitted ? (
                <div
                  ref={addRef}
                  className="reveal flex flex-col gap-6 py-16"
                >
                  <div className="v-line h-16 mb-4" />
                  <h2
                    className="font-['Cormorant_Garamond'] font-light text-foreground"
                    style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
                  >
                    Messaggio inviato.
                  </h2>
                  <p className="font-['Cormorant_Garamond'] italic text-xl text-foreground/60 leading-relaxed">
                    Ti risponderò il prima possibile.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-0">
                  {/* Nome */}
                  <div
                    ref={addRef}
                    className="reveal border-b border-border pb-0"
                  >
                    <label className="block font-['Jost'] text-[10px] font-medium tracking-[0.25em] uppercase text-primary mb-3 pt-6">
                      Nome
                    </label>
                    <input
                      type="text"
                      name="nome"
                      required
                      value={formState.nome}
                      onChange={handleChange}
                      placeholder="Il tuo nome"
                      className="w-full bg-transparent font-['Cormorant_Garamond'] text-xl text-foreground font-light placeholder:text-muted-foreground/40 outline-none pb-5 focus:placeholder:opacity-0 transition-all duration-300"
                    />
                  </div>

                  {/* Email */}
                  <div
                    ref={addRef}
                    className="reveal delay-100 border-b border-border pb-0"
                  >
                    <label className="block font-['Jost'] text-[10px] font-medium tracking-[0.25em] uppercase text-primary mb-3 pt-6">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formState.email}
                      onChange={handleChange}
                      placeholder="La tua email"
                      className="w-full bg-transparent font-['Cormorant_Garamond'] text-xl text-foreground font-light placeholder:text-muted-foreground/40 outline-none pb-5 focus:placeholder:opacity-0 transition-all duration-300"
                    />
                  </div>

                  {/* Oggetto */}
                  <div
                    ref={addRef}
                    className="reveal delay-200 border-b border-border pb-0"
                  >
                    <label className="block font-['Jost'] text-[10px] font-medium tracking-[0.25em] uppercase text-primary mb-3 pt-6">
                      Oggetto
                    </label>
                    <select
                      name="oggetto"
                      required
                      value={formState.oggetto}
                      onChange={handleChange}
                      className="w-full bg-transparent font-['Cormorant_Garamond'] text-xl text-foreground font-light outline-none pb-5 appearance-none cursor-pointer"
                      style={{ color: formState.oggetto ? undefined : "oklch(0.6 0.008 80 / 0.4)" }}
                    >
                      <option value="" disabled>Seleziona un argomento</option>
                      <option value="book-donna" style={{ background: "oklch(0.135 0.004 80)" }}>Book fotografico donna / attrice</option>
                      <option value="book-uomo" style={{ background: "oklch(0.135 0.004 80)" }}>Book fotografico uomo / attore</option>
                      <option value="workshop" style={{ background: "oklch(0.135 0.004 80)" }}>Workshop</option>
                      <option value="mentoring" style={{ background: "oklch(0.135 0.004 80)" }}>Mentoring 1:1</option>
                      <option value="altro" style={{ background: "oklch(0.135 0.004 80)" }}>Altro</option>
                    </select>
                  </div>

                  {/* Messaggio */}
                  <div
                    ref={addRef}
                    className="reveal delay-300 border-b border-border pb-0"
                  >
                    <label className="block font-['Jost'] text-[10px] font-medium tracking-[0.25em] uppercase text-primary mb-3 pt-6">
                      Messaggio
                    </label>
                    <textarea
                      name="messaggio"
                      required
                      rows={5}
                      value={formState.messaggio}
                      onChange={handleChange}
                      placeholder="Scrivi qui il tuo messaggio..."
                      className="w-full bg-transparent font-['Cormorant_Garamond'] text-xl text-foreground font-light placeholder:text-muted-foreground/40 outline-none pb-5 resize-none focus:placeholder:opacity-0 transition-all duration-300"
                    />
                  </div>

                  <div ref={addRef} className="reveal delay-400 pt-10">
                    <button
                      type="submit"
                      disabled={submitContact.isPending}
                      className="cta-btn inline-flex items-center gap-4 border border-primary text-primary px-10 py-4 font-['Jost'] text-xs font-medium tracking-[0.2em] uppercase hover:text-primary-foreground transition-colors duration-350 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span>{submitContact.isPending ? "Invio in corso..." : "Invia messaggio"}</span>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0">
                        <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── QUOTE ───────────────────────────────────────────── */}
      <section className="py-24 md:py-40 relative overflow-hidden border-t border-border">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 50% 50%, oklch(0.58 0.1 42) 0%, transparent 60%)",
          }}
        />
        <div className="container relative z-10">
          <div ref={addRef} className="reveal max-w-3xl mx-auto lg:mx-0 lg:ml-[16.666%]">
            <div className="v-line h-16 mb-8" />
            <blockquote
              className="font-['Cormorant_Garamond'] font-light leading-[1.15] text-foreground"
              style={{ fontSize: "clamp(1.8rem, 4vw, 3.5rem)" }}
            >
              Uno scatto non è solo un'immagine.
            </blockquote>
            <p
              ref={addRef}
              className="reveal delay-200 font-['Cormorant_Garamond'] italic text-xl md:text-2xl text-foreground/60 mt-8 leading-relaxed"
            >
              È un momento in cui qualcosa diventa visibile.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
