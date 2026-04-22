import { useState } from "react";
import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { useReveal } from "@/hooks/useReveal";

export default function AdminLogin() {
  const [, setLocation] = useLocation();
  const addRef = useReveal();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const adminLogin = trpc.auth.adminLogin.useMutation({
    onSuccess: () => {
      setLocation("/admin");
      window.location.reload();
    },
    onError: (err) => {
      setError(err.message || "Credenziali non valide");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    adminLogin.mutate({ email, password });
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
      style={{ background: "oklch(0.135 0.004 80)" }}
    >
      {/* Sfondo sfumato */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 70% 40%, oklch(0.58 0.1 42 / 0.05) 0%, transparent 60%)",
        }}
      />

      <div className="relative z-10 w-full max-w-sm px-6">
        {/* Logo / titolo */}
        <div className="text-center mb-12">
          <div
            ref={addRef}
            className="reveal mx-auto mb-6"
            style={{
              width: "1px",
              height: "48px",
              background: "oklch(0.58 0.1 42 / 0.5)",
            }}
          />
          <p
            ref={addRef}
            className="reveal font-['Jost'] text-[10px] font-medium tracking-[0.35em] uppercase mb-3"
            style={{ color: "oklch(0.58 0.1 42)" }}
          >
            Accesso riservato
          </p>
          <h1
            ref={addRef}
            className="reveal delay-100 font-['Cormorant_Garamond'] font-light"
            style={{
              fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
              color: "oklch(0.96 0.005 80)",
            }}
          >
            Pannello Admin
          </h1>
        </div>

        {/* Form */}
        <form
          ref={addRef as any}
          className="reveal delay-200 space-y-5"
          onSubmit={handleSubmit}
        >
          <div>
            <label
              className="block font-['Jost'] text-[10px] font-medium tracking-[0.25em] uppercase mb-2"
              style={{ color: "oklch(0.96 0.005 80 / 0.4)" }}
            >
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              className="w-full bg-transparent border-b py-3 font-['Jost'] text-sm font-light outline-none transition-colors duration-300 focus:border-b-[oklch(0.58_0.1_42)]"
              style={{
                borderBottomColor: "oklch(0.96 0.005 80 / 0.2)",
                color: "oklch(0.96 0.005 80)",
              }}
              onFocus={(e) =>
                (e.currentTarget.style.borderBottomColor = "oklch(0.58 0.1 42)")
              }
              onBlur={(e) =>
                (e.currentTarget.style.borderBottomColor =
                  "oklch(0.96 0.005 80 / 0.2)")
              }
            />
          </div>

          <div>
            <label
              className="block font-['Jost'] text-[10px] font-medium tracking-[0.25em] uppercase mb-2"
              style={{ color: "oklch(0.96 0.005 80 / 0.4)" }}
            >
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              className="w-full bg-transparent border-b py-3 font-['Jost'] text-sm font-light outline-none transition-colors duration-300"
              style={{
                borderBottomColor: "oklch(0.96 0.005 80 / 0.2)",
                color: "oklch(0.96 0.005 80)",
              }}
              onFocus={(e) =>
                (e.currentTarget.style.borderBottomColor = "oklch(0.58 0.1 42)")
              }
              onBlur={(e) =>
                (e.currentTarget.style.borderBottomColor =
                  "oklch(0.96 0.005 80 / 0.2)")
              }
            />
          </div>

          {error && (
            <p
              className="font-['Jost'] text-xs text-center"
              style={{ color: "oklch(0.65 0.15 25)" }}
            >
              {error}
            </p>
          )}

          <div className="pt-4">
            <button
              type="submit"
              disabled={adminLogin.isPending}
              className="w-full border py-4 font-['Jost'] text-xs font-medium tracking-[0.2em] uppercase transition-colors duration-300 disabled:opacity-50"
              style={{
                borderColor: "oklch(0.58 0.1 42)",
                color: "oklch(0.58 0.1 42)",
                background: "transparent",
              }}
              onMouseEnter={(e) => {
                if (!adminLogin.isPending) {
                  (e.currentTarget as HTMLButtonElement).style.background =
                    "oklch(0.58 0.1 42)";
                  (e.currentTarget as HTMLButtonElement).style.color =
                    "oklch(0.135 0.004 80)";
                }
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background =
                  "transparent";
                (e.currentTarget as HTMLButtonElement).style.color =
                  "oklch(0.58 0.1 42)";
              }}
            >
              {adminLogin.isPending ? "Accesso in corso..." : "Accedi"}
            </button>
          </div>
        </form>

        {/* Link torna al sito */}
        <div className="text-center mt-10">
          <button
            onClick={() => setLocation("/")}
            className="font-['Jost'] text-[10px] tracking-[0.2em] uppercase transition-colors duration-300"
            style={{ color: "oklch(0.96 0.005 80 / 0.25)" }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLButtonElement).style.color =
                "oklch(0.96 0.005 80 / 0.6)")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLButtonElement).style.color =
                "oklch(0.96 0.005 80 / 0.25)")
            }
          >
            ← Torna al sito
          </button>
        </div>
      </div>
    </div>
  );
}
