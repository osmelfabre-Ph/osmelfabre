import SEO from "@/components/SEO";
import { useLocation } from "wouter";
import { useReveal } from "@/hooks/useReveal";

export default function NotFound() {
  const [, setLocation] = useLocation();
  const addRef = useReveal();

  return (
    <>
      <SEO
        title="Pagina non trovata — Osmel Fabre"
        description="La pagina che stai cercando non esiste o è stata spostata. Torna alla home di Osmel Fabre, fotografo di ritratto maschile."
        url="/404"
      />
    <div
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
      style={{ background: "oklch(0.135 0.004 80)" }}
    >
      {/* Sfondo sfumato */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 30% 60%, oklch(0.58 0.1 42 / 0.06) 0%, transparent 60%)",
        }}
      />

      {/* Numero 404 decorativo */}
      <div
        className="absolute select-none pointer-events-none"
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "clamp(12rem, 30vw, 28rem)",
          fontWeight: 300,
          lineHeight: 1,
          color: "oklch(0.58 0.1 42 / 0.06)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          letterSpacing: "-0.05em",
          whiteSpace: "nowrap",
        }}
      >
        404
      </div>

      {/* Contenuto principale */}
      <div className="relative z-10 text-center px-6 max-w-xl">
        {/* Linea verticale */}
        <div
          ref={addRef}
          className="reveal mx-auto mb-8"
          style={{
            width: "1px",
            height: "60px",
            background: "oklch(0.58 0.1 42 / 0.5)",
          }}
        />

        <p
          ref={addRef}
          className="reveal font-['Jost'] text-[10px] font-medium tracking-[0.35em] uppercase mb-6"
          style={{ color: "oklch(0.58 0.1 42)" }}
        >
          Pagina non trovata
        </p>

        <h1
          ref={addRef}
          className="reveal delay-100 font-['Cormorant_Garamond'] font-light leading-[1.1] mb-6"
          style={{
            fontSize: "clamp(2.5rem, 6vw, 5rem)",
            color: "oklch(0.96 0.005 80)",
          }}
        >
          Questa pagina<br />non esiste
        </h1>

        <p
          ref={addRef}
          className="reveal delay-200 font-['Cormorant_Garamond'] italic leading-relaxed mb-12"
          style={{
            fontSize: "clamp(1.1rem, 2vw, 1.4rem)",
            color: "oklch(0.96 0.005 80 / 0.55)",
          }}
        >
          Forse è stata spostata, o forse non è mai esistita.<br />
          Torna alla home e continua a esplorare.
        </p>

        {/* CTA */}
        <div ref={addRef} className="reveal delay-300 flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => setLocation("/")}
            className="inline-flex items-center gap-4 border px-8 py-4 font-['Jost'] text-xs font-medium tracking-[0.2em] uppercase transition-colors duration-300 group"
            style={{
              borderColor: "oklch(0.58 0.1 42)",
              color: "oklch(0.58 0.1 42)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "oklch(0.58 0.1 42)";
              (e.currentTarget as HTMLButtonElement).style.color = "oklch(0.135 0.004 80)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "transparent";
              (e.currentTarget as HTMLButtonElement).style.color = "oklch(0.58 0.1 42)";
            }}
          >
            <span>Torna alla home</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <button
            onClick={() => setLocation("/contatti")}
            className="inline-flex items-center gap-4 border px-8 py-4 font-['Jost'] text-xs font-medium tracking-[0.2em] uppercase transition-colors duration-300"
            style={{
              borderColor: "oklch(0.96 0.005 80 / 0.2)",
              color: "oklch(0.96 0.005 80 / 0.5)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = "oklch(0.96 0.005 80 / 0.5)";
              (e.currentTarget as HTMLButtonElement).style.color = "oklch(0.96 0.005 80)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = "oklch(0.96 0.005 80 / 0.2)";
              (e.currentTarget as HTMLButtonElement).style.color = "oklch(0.96 0.005 80 / 0.5)";
            }}
          >
            <span>Contatti</span>
          </button>
        </div>
      </div>

      {/* Footer minimo */}
      <div
        ref={addRef}
        className="reveal delay-400 absolute bottom-8 left-0 right-0 text-center"
      >
        <span
          className="font-['Jost'] text-[10px] tracking-[0.25em] uppercase"
          style={{ color: "oklch(0.96 0.005 80 / 0.2)" }}
        >
          Osmel Fabre — Fotografia di Ritratto
        </span>
      </div>
    </div>
    </>
  );
}
