/**
 * OSMEL FABRE — Shared Layout
 * Design: Minimalismo Sensoriale
 * Shared nav + footer used across all pages
 */

import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { getLoginUrl } from "@/const";

// Workshop dates
const MILAN_DATE = new Date("2026-04-18T09:30:00");
const BOLOGNA_DATE = new Date("2026-05-23T09:30:00");

function useWorkshopCountdown() {
  const [days, setDays] = useState<number | null>(null);
  const [city, setCity] = useState<string>("");

  useEffect(() => {
    function calc() {
      const now = new Date();
      const milanMs = MILAN_DATE.getTime() - now.getTime();
      const bolognaMs = BOLOGNA_DATE.getTime() - now.getTime();

      if (milanMs > 0) {
        setDays(Math.ceil(milanMs / (1000 * 60 * 60 * 24)));
        setCity("Milano");
      } else if (bolognaMs > 0) {
        setDays(Math.ceil(bolognaMs / (1000 * 60 * 60 * 24)));
        setCity("Bologna");
      } else {
        setDays(null);
        setCity("");
      }
    }
    calc();
    const id = setInterval(calc, 60_000);
    return () => clearInterval(id);
  }, []);

  return { days, city };
}

const NAV_LINKS = [
  { href: "/chi-sono", label: "Chi sono" },
  { href: "/il-metodo", label: "Il Metodo" },
  { href: "/servizi", label: "Servizi" },
  { href: "/galleria", label: "Galleria" },
  { href: "/formazione", label: "Formazione" },
  { href: "/workshop-di-ritratto-maschile.html", label: "Workshop" },
  { href: "/risorse", label: "Risorse" },
  { href: "/contatti", label: "Contatti" },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [location] = useLocation();
  const { data: user } = trpc.auth.me.useQuery();
  const { days, city } = useWorkshopCountdown();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* ── NAV ─────────────────────────────────────────────── */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: scrolled
            ? "oklch(0.135 0.004 80 / 0.97)"
            : "linear-gradient(to bottom, oklch(0.135 0.004 80 / 0.92) 0%, transparent 100%)",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled ? "1px solid oklch(0.28 0.004 80)" : "none",
        }}
      >
        <div className="flex items-center justify-between px-6 md:px-12 lg:px-20 py-5">
          <Link href="/" className="flex items-center hover:opacity-80 transition-opacity duration-300" aria-label="Osmel Fabre — Home">
            {/* Firma calligrafica Osmel Fabre — PNG ritagliata dal CDN */}
            <img
              src="https://d2xsxph8kpxj0f.cloudfront.net/310519663510175502/Jt7ZRyXY4rb5NpEBkocwTA/firma-osmel-cropped_d636af2d.png"
              alt="Osmel Fabre"
              className="h-16 w-auto"
              style={{ maxWidth: "300px" }}
            />
          </Link>

          {/* Workshop countdown pill */}
          {days !== null && (
            <Link
              href="/workshop-di-ritratto-maschile.html"
              className="hidden lg:flex items-center gap-2 px-3 py-1.5 border border-primary/40 hover:border-primary transition-colors duration-300 group"
            >
              <span
                className="w-1.5 h-1.5 rounded-full animate-pulse"
                style={{ background: "oklch(0.58 0.1 42)" }}
              />
              <span className="font-['Jost'] text-[10px] font-medium tracking-[0.15em] uppercase text-primary/70 group-hover:text-primary transition-colors duration-300">
                {city}: {days} {days === 1 ? "giorno" : "giorni"}
              </span>
            </Link>
          )}

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-10">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`font-['Jost'] text-xs font-medium tracking-[0.2em] uppercase transition-colors duration-300 ${
                  location === link.href
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
            {user?.role === "admin" && (
              <Link
                href="/admin"
                className={`font-['Jost'] text-xs font-medium tracking-[0.2em] uppercase transition-colors duration-300 border border-primary/40 px-3 py-1.5 ${
                  location === "/admin" ? "text-primary" : "text-primary/60 hover:text-primary"
                }`}
              >
                Admin
              </Link>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            <span
              className={`block w-6 h-px bg-foreground transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
            />
            <span
              className={`block w-6 h-px bg-foreground transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`block w-6 h-px bg-foreground transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
            />
          </button>
        </div>

        {/* Mobile menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-500 ${
            menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
          style={{ background: "oklch(0.135 0.004 80 / 0.98)" }}
        >
          <div className="flex flex-col px-6 pb-8 pt-2 gap-6 border-t border-border">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`font-['Jost'] text-sm font-medium tracking-[0.2em] uppercase transition-colors duration-300 ${
                  location === link.href ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
            {user?.role === "admin" && (
              <Link
                href="/admin"
                className="font-['Jost'] text-sm font-medium tracking-[0.2em] uppercase text-primary/70"
              >
                Admin
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* ── PAGE CONTENT ────────────────────────────────────── */}
      <main>{children}</main>

      {/* ── FOOTER ──────────────────────────────────────────── */}
      <footer className="py-16 md:py-20 border-t border-border">
        <div className="container">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div>
              <Link href="/" className="font-['Cormorant_Garamond'] text-2xl font-light tracking-[0.1em] text-foreground mb-2 hover:text-primary transition-colors duration-300 block">
                Osmel Fabre
              </Link>
              <p className="font-['Jost'] text-xs font-light text-muted-foreground tracking-[0.15em] uppercase">
                Fotografia di Ritratto
              </p>
            </div>

            <div className="hidden md:flex items-center gap-8">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-['Jost'] text-xs font-light text-muted-foreground hover:text-foreground transition-colors duration-300 tracking-wide"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="flex flex-col md:items-end gap-2">
              <a
                href="https://www.instagram.com/osmelfabre"
                target="_blank"
                rel="noopener noreferrer"
                className="font-['Jost'] text-xs font-light text-muted-foreground hover:text-primary transition-colors duration-300 tracking-wide"
              >
                @osmelfabre
              </a>
              <p className="font-['Jost'] text-xs font-light text-muted-foreground/50">
                © {new Date().getFullYear()} Osmel Fabre. Tutti i diritti riservati.
              </p>
              {!user && (
                <a
                  href="/admin-login"
                  className="font-['Jost'] text-xs font-medium tracking-[0.2em] uppercase transition-colors duration-300 border border-primary/40 px-3 py-1.5 text-primary/60 hover:text-primary hover:border-primary"
                >
                  Accedi
                </a>
              )}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
