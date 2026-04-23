/**
 * OSMEL FABRE — Admin Panel
 * Protected page (admin role required).
 * Allows uploading/deleting gallery photos and hero images per page.
 * Also shows contact form submissions.
 */

import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { getLoginUrl } from "@/const";
import React, { useState, useRef, useCallback } from "react";
import { toast } from "sonner";

const HERO_PAGES = [
  { value: "home", label: "Home" },
  { value: "chi-sono", label: "Chi sono" },
  { value: "il-metodo", label: "Il Metodo" },
  { value: "servizi-donna", label: "Servizi — Donna" },
  { value: "servizi-uomo", label: "Servizi — Uomo" },
  { value: "formazione", label: "Formazione" },
  { value: "contatti", label: "Contatti" },
];

function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

interface PendingPhoto {
  id: string;
  file: File;
  dataUrl: string;
  subject: string;
  category: "Uomo" | "Donna";
  status: "pending" | "uploading" | "done" | "error";
}

// ── Upload Form ────────────────────────────────────────────────────────────────
function UploadForm({ onSuccess }: { onSuccess: () => void }) {
  const [type, setType] = useState<"gallery" | "hero">("gallery");
  const [page, setPage] = useState("home");
  const [pending, setPending] = useState<PendingPhoto[]>([]);
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const upload = trpc.photos.upload.useMutation();

  const addFiles = useCallback(async (files: FileList | File[]) => {
    const arr = Array.from(files).filter((f) => f.type.startsWith("image/"));
    const newItems: PendingPhoto[] = await Promise.all(
      arr.map(async (f) => ({
        id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
        file: f,
        dataUrl: await fileToDataUrl(f),
        subject: "",
        category: "Uomo" as const,
        status: "pending" as const,
      }))
    );
    setPending((prev) => [...prev, ...newItems]);
  }, []);

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    if (e.dataTransfer.files.length) addFiles(e.dataTransfer.files);
  }, [addFiles]);

  const updateItem = (id: string, patch: Partial<PendingPhoto>) =>
    setPending((prev) => prev.map((p) => p.id === id ? { ...p, ...patch } : p));

  const removeItem = (id: string) =>
    setPending((prev) => prev.filter((p) => p.id !== id));

  const handleUploadAll = async () => {
    const toUpload = pending.filter((p) => p.status === "pending");
    if (!toUpload.length) return;
    setUploading(true);

    for (const item of toUpload) {
      updateItem(item.id, { status: "uploading" });
      try {
        await upload.mutateAsync({
          dataUrl: item.dataUrl,
          filename: item.file.name,
          type,
          page: type === "hero" ? page : undefined,
          subject: item.subject || undefined,
          category: item.category,
        });
        updateItem(item.id, { status: "done" });
      } catch {
        updateItem(item.id, { status: "error" });
      }
    }

    setUploading(false);
    const allDone = pending.every((p) => p.status === "done" || (toUpload.find((t) => t.id === p.id)?.status === "done"));
    if (allDone) {
      setTimeout(() => { setPending([]); onSuccess(); }, 800);
    } else {
      onSuccess();
    }
  };

  const pendingCount = pending.filter((p) => p.status === "pending").length;

  return (
    <div className="space-y-6">
      {/* Type + Hero page selector */}
      <div className="flex flex-wrap gap-4 items-center">
        <div className="flex gap-3">
          {(["gallery", "hero"] as const).map((t) => (
            <button key={t} type="button" onClick={() => setType(t)}
              className={`px-5 py-2 font-['Jost'] text-xs tracking-[0.2em] uppercase border transition-colors duration-200 ${
                type === t ? "border-primary text-primary bg-primary/10" : "border-border text-muted-foreground hover:border-foreground"
              }`}
            >
              {t === "gallery" ? "Galleria" : "Hero"}
            </button>
          ))}
        </div>
        {type === "hero" && (
          <select value={page} onChange={(e) => setPage(e.target.value)}
            className="bg-card border border-border text-foreground font-['Jost'] text-sm px-4 py-2 focus:outline-none focus:border-primary"
          >
            {HERO_PAGES.map((p) => <option key={p.value} value={p.value}>{p.label}</option>)}
          </select>
        )}
      </div>

      {/* Drop zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        onClick={() => fileRef.current?.click()}
        className={`border-2 border-dashed rounded-sm cursor-pointer transition-colors duration-200 flex flex-col items-center justify-center gap-3 py-12 ${
          dragging ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
        }`}
      >
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="text-muted-foreground">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <p className="font-['Jost'] text-sm text-muted-foreground">
          Trascina le foto qui o <span className="text-primary underline">sfoglia</span>
        </p>
        <p className="font-['Jost'] text-xs text-muted-foreground/50">Puoi selezionare più file contemporaneamente</p>
        <input ref={fileRef} type="file" accept="image/*" multiple className="hidden"
          onChange={(e) => e.target.files && addFiles(e.target.files)} />
      </div>

      {/* Pending grid */}
      {pending.length > 0 && (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {pending.map((item) => (
              <div key={item.id} className="relative bg-card border border-border overflow-hidden">
                {/* Thumbnail */}
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img src={item.dataUrl} alt="" className="w-full h-full object-cover" />
                  {/* Status overlay */}
                  {item.status === "uploading" && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                      <span className="font-['Jost'] text-white text-xs tracking-[0.2em] uppercase animate-pulse">Caricamento...</span>
                    </div>
                  )}
                  {item.status === "done" && (
                    <div className="absolute inset-0 bg-green-900/70 flex items-center justify-center">
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17l-5-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </div>
                  )}
                  {item.status === "error" && (
                    <div className="absolute inset-0 bg-red-900/70 flex items-center justify-center">
                      <span className="font-['Jost'] text-white text-xs">Errore</span>
                    </div>
                  )}
                  {/* Remove button */}
                  {item.status === "pending" && (
                    <button onClick={() => removeItem(item.id)}
                      className="absolute top-2 right-2 w-6 h-6 bg-black/70 text-white flex items-center justify-center hover:bg-red-600 transition-colors text-xs"
                    >✕</button>
                  )}
                </div>
                {/* Metadata */}
                {item.status === "pending" && (
                  <div className="p-3 space-y-2">
                    <input
                      type="text"
                      value={item.subject}
                      onChange={(e) => updateItem(item.id, { subject: e.target.value })}
                      placeholder="Nome soggetto"
                      className="w-full bg-background border border-border text-foreground font-['Jost'] text-xs px-3 py-2 focus:outline-none focus:border-primary placeholder:text-muted-foreground/40"
                    />
                    <div className="flex gap-2">
                      {(["Uomo", "Donna"] as const).map((c) => (
                        <button key={c} type="button" onClick={() => updateItem(item.id, { category: c })}
                          className={`flex-1 py-1.5 font-['Jost'] text-[10px] tracking-[0.15em] uppercase border transition-colors ${
                            item.category === c ? "border-primary text-primary bg-primary/10" : "border-border text-muted-foreground"
                          }`}
                        >{c}</button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between gap-4">
            <button onClick={() => setPending([])} disabled={uploading}
              className="font-['Jost'] text-xs tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground border-b border-transparent hover:border-foreground transition-colors disabled:opacity-40"
            >
              Svuota tutto
            </button>
            <button onClick={handleUploadAll} disabled={uploading || pendingCount === 0}
              className="px-8 py-4 font-['Jost'] text-xs tracking-[0.25em] uppercase border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {uploading ? "Caricamento..." : `Carica ${pendingCount} foto`}
            </button>
          </div>
        </>
      )}
    </div>
  );
}

// ── Photo Grid ─────────────────────────────────────────────────────────────────
function PhotoGrid({ onDelete }: { onDelete: () => void }) {
  const { data: photos, isLoading } = trpc.photos.all.useQuery();
  const deleteMutation = trpc.photos.delete.useMutation({
    onSuccess: () => { toast.success("Foto eliminata"); onDelete(); },
    onError: (e) => toast.error(`Errore: ${e.message}`),
  });

  const [filter, setFilter] = useState<"all" | "gallery" | "hero">("all");

  if (isLoading) return (
    <div className="text-center py-12 font-['Jost'] text-sm text-muted-foreground">Caricamento...</div>
  );

  const filtered = filter === "all" ? photos : photos?.filter((p) => p.type === filter);

  return (
    <div>
      <div className="flex gap-4 mb-6">
        {(["all", "gallery", "hero"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`font-['Jost'] text-xs tracking-[0.2em] uppercase pb-1 border-b-2 transition-colors duration-200 ${
              filter === f ? "text-primary border-primary" : "text-muted-foreground border-transparent hover:text-foreground"
            }`}
          >
            {f === "all" ? "Tutte" : f === "gallery" ? "Galleria" : "Hero"}
          </button>
        ))}
        <span className="ml-auto font-['Jost'] text-xs text-muted-foreground">{filtered?.length ?? 0} foto</span>
      </div>

      {filtered?.length === 0 && (
        <p className="text-center py-12 font-['Jost'] text-sm text-muted-foreground">Nessuna foto</p>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {filtered?.map((photo) => (
          <div key={photo.id} className="relative group overflow-hidden bg-card">
            <img
              src={photo.url}
              alt={photo.subject ?? ""}
              className="w-full aspect-[3/4] object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-300 flex flex-col items-center justify-center gap-3 opacity-0 group-hover:opacity-100">
              <div className="text-center px-3">
                <p className="font-['Cormorant_Garamond'] text-white text-sm">{photo.subject ?? "—"}</p>
                <p className="font-['Jost'] text-white/60 text-[10px] tracking-[0.15em] uppercase mt-1">
                  {photo.type === "hero" ? `Hero · ${photo.page}` : `Galleria · ${photo.category}`}
                </p>
              </div>
              <button
                onClick={() => {
                  if (confirm("Eliminare questa foto?")) deleteMutation.mutate({ id: photo.id });
                }}
                className="px-4 py-2 bg-red-600/90 text-white font-['Jost'] text-[10px] tracking-[0.2em] uppercase hover:bg-red-600 transition-colors"
              >
                Elimina
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Contacts List ──────────────────────────────────────────────────────────────
function ContactsList() {
  const { data: contacts, isLoading, refetch } = trpc.contacts.all.useQuery();
  const markRead = trpc.contacts.markRead.useMutation({
    onSuccess: () => refetch(),
  });

  if (isLoading) return (
    <div className="text-center py-12 font-['Jost'] text-sm text-muted-foreground">Caricamento...</div>
  );

  if (!contacts?.length) return (
    <p className="text-center py-12 font-['Jost'] text-sm text-muted-foreground">Nessun messaggio ricevuto</p>
  );

  return (
    <div className="space-y-4">
      {contacts.map((c) => (
        <div
          key={c.id}
          className={`border p-6 transition-colors duration-200 ${
            c.read ? "border-border opacity-60" : "border-primary/40 bg-primary/5"
          }`}
        >
          <div className="flex items-start justify-between gap-4 mb-3">
            <div>
              <p className="font-['Cormorant_Garamond'] text-lg text-foreground">{c.name}</p>
              <p className="font-['Jost'] text-xs text-muted-foreground mt-0.5">{c.email}</p>
            </div>
            <div className="text-right shrink-0">
              <p className="font-['Jost'] text-xs text-primary tracking-[0.1em] uppercase">{c.subject}</p>
              <p className="font-['Jost'] text-[10px] text-muted-foreground mt-1">
                {new Date(c.createdAt).toLocaleDateString("it-IT", { day: "2-digit", month: "long", year: "numeric" })}
              </p>
            </div>
          </div>
          <p className="font-['Jost'] text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap">{c.message}</p>
          {!c.read && (
            <button
              onClick={() => markRead.mutate({ id: c.id })}
              className="mt-4 font-['Jost'] text-[10px] tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground transition-colors border-b border-transparent hover:border-foreground"
            >
              Segna come letto
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

// ── PDF Manager ───────────────────────────────────────────────────────────────
function PdfManager() {
  const utils = trpc.useUtils();
  const { data: pdfs, isLoading } = trpc.pdfs.list.useQuery();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  // Form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [isFree, setIsFree] = useState(false);
  const [stripeLink, setStripeLink] = useState("");
  const [isLatest, setIsLatest] = useState(false);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const pdfRef = useRef<HTMLInputElement>(null);
  const coverRef = useRef<HTMLInputElement>(null);

  const resetForm = () => {
    setTitle(""); setDescription(""); setPrice(""); setIsFree(false); setStripeLink(""); setIsLatest(false);
    setPdfFile(null); setCoverFile(null); setCoverPreview(null);
    setEditingId(null); setShowForm(false);
    if (pdfRef.current) pdfRef.current.value = "";
    if (coverRef.current) coverRef.current.value = "";
  };

  const uploadPdf = trpc.pdfs.upload.useMutation({
    onSuccess: (data) => {
      if (data.stripePaymentLink) {
        toast.success(`PDF caricato! Link Stripe generato automaticamente.`);
      } else {
        toast.success("PDF caricato con successo");
      }
      resetForm();
      utils.pdfs.list.invalidate();
    },
    onError: (e) => toast.error(`Errore: ${e.message}`),
  });

  const updatePdf = trpc.pdfs.update.useMutation({
    onSuccess: () => { toast.success("PDF aggiornato"); resetForm(); utils.pdfs.list.invalidate(); },
    onError: (e) => toast.error(`Errore: ${e.message}`),
  });

  const setLatest = trpc.pdfs.setLatest.useMutation({
    onSuccess: () => { toast.success("PDF impostato come ultimo"); utils.pdfs.list.invalidate(); },
    onError: (e) => toast.error(`Errore: ${e.message}`),
  });

  const deletePdf = trpc.pdfs.delete.useMutation({
    onSuccess: () => { toast.success("PDF eliminato"); utils.pdfs.list.invalidate(); },
    onError: (e) => toast.error(`Errore: ${e.message}`),
  });

  const generateStripeLink = trpc.pdfs.generateStripeLink.useMutation({
    onSuccess: () => { toast.success("Link Stripe generato!"); utils.pdfs.list.invalidate(); },
    onError: (e) => toast.error(`Errore Stripe: ${e.message}`),
  });

  // ManyChat
  const [manychatPdfId, setManychatPdfId] = useState<number | null>(null);
  const [manychatKeyword, setManychatKeyword] = useState("");
  const activateFlow = trpc.manychat.activateFlow.useMutation({
    onSuccess: (data) => {
      toast.success(`ManyChat aggiornato! Keyword: ${data.keyword}`);
      setManychatKeyword("");
      setManychatPdfId(null);
    },
    onError: (e) => toast.error(`Errore ManyChat: ${e.message}`),
  });

  const handleCoverFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setCoverFile(f);
    const reader = new FileReader();
    reader.onload = () => setCoverPreview(reader.result as string);
    reader.readAsDataURL(f);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) { toast.error("Il titolo è obbligatorio"); return; }

    let pdfDataUrl: string | undefined;
    let coverDataUrl: string | undefined;

    if (pdfFile) {
      pdfDataUrl = await new Promise<string>((res, rej) => {
        const r = new FileReader(); r.onload = () => res(r.result as string); r.onerror = rej; r.readAsDataURL(pdfFile);
      });
    }
    if (coverFile) {
      coverDataUrl = await new Promise<string>((res, rej) => {
        const r = new FileReader(); r.onload = () => res(r.result as string); r.onerror = rej; r.readAsDataURL(coverFile);
      });
    }

    if (editingId) {
      updatePdf.mutate({ id: editingId, title, description: description || undefined, price: price || undefined, stripePaymentLink: stripeLink || undefined, coverDataUrl, coverFilename: coverFile?.name });
    } else {
      if (!pdfDataUrl) { toast.error("Seleziona un file PDF"); return; }
      uploadPdf.mutate({ title, description: description || undefined, price: isFree ? "0" : (price || undefined), isFree, stripePaymentLink: isFree ? undefined : (stripeLink || undefined), pdfDataUrl, pdfFilename: pdfFile!.name, coverDataUrl, coverFilename: coverFile?.name, origin: window.location.origin, isLatest });
    }
  };

  const startEdit = (pdf: NonNullable<typeof pdfs>[0]) => {
    setEditingId(pdf.id);
    setTitle(pdf.title);
    setDescription(pdf.description ?? "");
    setPrice(pdf.price ?? "");
    setStripeLink(pdf.stripePaymentLink ?? "");
    setCoverPreview(pdf.coverUrl ?? null);
    setShowForm(true);
  };

  if (isLoading) return <div className="text-center py-12 font-['Jost'] text-sm text-muted-foreground">Caricamento...</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <p className="font-['Jost'] text-xs tracking-[0.2em] uppercase text-muted-foreground">{pdfs?.length ?? 0} PDF nell'archivio</p>
        <button
          onClick={() => { resetForm(); setShowForm(!showForm); }}
          className="font-['Jost'] text-xs tracking-[0.2em] uppercase border border-primary text-primary px-6 py-3 hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
        >
          {showForm ? "Annulla" : "+ Nuovo PDF"}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="border border-border p-8 mb-10 space-y-5">
          <h3 className="font-['Cormorant_Garamond'] text-2xl text-foreground font-light mb-6">
            {editingId ? "Modifica PDF" : "Carica nuovo PDF"}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block font-['Jost'] text-xs tracking-[0.15em] uppercase text-muted-foreground mb-2">Titolo *</label>
              <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required
                className="w-full bg-card border border-border text-foreground font-['Jost'] text-sm px-4 py-3 focus:outline-none focus:border-primary" />
            </div>
            <div className="flex items-end gap-4">
              {!isFree && (
                <div className="flex-1">
                  <label className="block font-['Jost'] text-xs tracking-[0.15em] uppercase text-muted-foreground mb-2">Prezzo (es. 29)</label>
                  <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="29"
                    className="w-full bg-card border border-border text-foreground font-['Jost'] text-sm px-4 py-3 focus:outline-none focus:border-primary placeholder:text-muted-foreground/40" />
                </div>
              )}
              <label className="flex items-center gap-2 cursor-pointer select-none pb-3">
                <input type="checkbox" checked={isFree} onChange={(e) => setIsFree(e.target.checked)} className="w-4 h-4 accent-primary" />
                <span className="font-['Jost'] text-xs tracking-[0.15em] uppercase text-muted-foreground">Gratuito</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block font-['Jost'] text-xs tracking-[0.15em] uppercase text-muted-foreground mb-2">Descrizione</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3}
              className="w-full bg-card border border-border text-foreground font-['Jost'] text-sm px-4 py-3 focus:outline-none focus:border-primary resize-none" />
          </div>

          {!isFree && (
            <div>
              <label className="block font-['Jost'] text-xs tracking-[0.15em] uppercase text-muted-foreground mb-2">
                Link Stripe (URL pagamento)
                {!editingId && price && parseFloat(price) > 0 && !stripeLink && (
                  <span className="ml-2 text-primary/70 normal-case font-normal">
                    — verrà generato automaticamente
                  </span>
                )}
              </label>
              <input type="url" value={stripeLink} onChange={(e) => setStripeLink(e.target.value)} placeholder={!editingId && price && parseFloat(price) > 0 ? "Lascia vuoto per generarlo automaticamente" : "https://buy.stripe.com/..."}
                className="w-full bg-card border border-border text-foreground font-['Jost'] text-sm px-4 py-3 focus:outline-none focus:border-primary placeholder:text-muted-foreground/40" />
            </div>
          )}

          {isFree && (
            <div className="border border-primary/30 bg-primary/5 px-4 py-3">
              <p className="font-['Jost'] text-xs text-primary/80 leading-relaxed">
                PDF gratuito — nessun pagamento richiesto. Il link di download diretto verrà usato in ManyChat quando attivi la keyword.
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block font-['Jost'] text-xs tracking-[0.15em] uppercase text-muted-foreground mb-2">
                File PDF {!editingId && "*"}
              </label>
              <input ref={pdfRef} type="file" accept=".pdf,application/pdf" onChange={(e) => setPdfFile(e.target.files?.[0] ?? null)}
                className="w-full font-['Jost'] text-sm text-muted-foreground file:mr-4 file:py-2 file:px-4 file:border file:border-border file:bg-card file:text-foreground file:text-xs file:tracking-[0.15em] file:uppercase file:cursor-pointer hover:file:border-primary" />
              {!editingId && (
                <p className="mt-1 font-['Jost'] text-[10px] text-muted-foreground/50">L'anteprima (prime 3 pagine) viene generata automaticamente</p>
              )}
            </div>
            <div>
              <label className="block font-['Jost'] text-xs tracking-[0.15em] uppercase text-muted-foreground mb-2">Immagine copertina</label>
              <input ref={coverRef} type="file" accept="image/*" onChange={handleCoverFile}
                className="w-full font-['Jost'] text-sm text-muted-foreground file:mr-4 file:py-2 file:px-4 file:border file:border-border file:bg-card file:text-foreground file:text-xs file:tracking-[0.15em] file:uppercase file:cursor-pointer hover:file:border-primary" />
            </div>
          </div>

          {coverPreview && (
            <div className="max-w-xs">
              <img src={coverPreview} alt="Copertina preview" className="w-full aspect-[3/4] object-cover" />
            </div>
          )}

          {!editingId && (
            <label className="flex items-center gap-3 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={isLatest}
                onChange={(e) => setIsLatest(e.target.checked)}
                className="w-4 h-4 accent-primary"
              />
              <span className="font-['Jost'] text-xs tracking-[0.15em] uppercase text-muted-foreground">
                Imposta come ultimo (in evidenza nella pagina Risorse)
              </span>
            </label>
          )}

          <button type="submit" disabled={uploadPdf.isPending || updatePdf.isPending}
            className="w-full py-4 font-['Jost'] text-xs tracking-[0.25em] uppercase border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors duration-300 disabled:opacity-40 disabled:cursor-not-allowed">
            {uploadPdf.isPending || updatePdf.isPending ? "Salvataggio..." : editingId ? "Aggiorna PDF" : "Carica PDF"}
          </button>
        </form>
      )}

      {/* PDF List */}
      <div className="space-y-4">
        {pdfs?.length === 0 && (
          <p className="text-center py-12 font-['Jost'] text-sm text-muted-foreground">Nessun PDF nell'archivio</p>
        )}
        {pdfs?.map((pdf) => (
          <React.Fragment key={pdf.id}>
          <div className={`border p-6 flex gap-6 items-start transition-colors duration-200 ${
            pdf.isLatest ? "border-primary/40 bg-primary/5" : "border-border"
          }`}>
            {/* Cover thumbnail */}
            <div className="shrink-0 w-16 h-20 overflow-hidden bg-card border border-border">
              {pdf.coverUrl ? (
                <img src={pdf.coverUrl} alt={pdf.title} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="font-['Jost'] text-[10px] text-muted-foreground">PDF</span>
                </div>
              )}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start gap-3 mb-1">
                <p className="font-['Cormorant_Garamond'] text-xl text-foreground font-light">{pdf.title}</p>
                {pdf.isLatest && (
                  <span className="shrink-0 bg-primary text-primary-foreground font-['Jost'] text-[9px] tracking-[0.2em] uppercase px-2 py-0.5">Ultimo</span>
                )}
              </div>
              {pdf.description && <p className="font-['Jost'] text-xs text-muted-foreground leading-relaxed mb-2 line-clamp-2">{pdf.description}</p>}
              <div className="flex gap-4 flex-wrap items-center">
                {pdf.price && pdf.price !== "0" && <span className="font-['Cormorant_Garamond'] text-lg text-primary">€ {pdf.price}</span>}
                {pdf.isFree && <span className="font-['Jost'] text-[10px] tracking-[0.15em] uppercase text-green-400">Gratuito</span>}
                {pdf.stripePaymentLink && (
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText(pdf.stripePaymentLink!);
                      toast.success("Link Stripe copiato!");
                    }}
                    className="font-['Jost'] text-[10px] text-primary/70 hover:text-primary underline underline-offset-2 truncate max-w-xs transition-colors"
                    title={pdf.stripePaymentLink}
                  >
                    🔗 Copia link Stripe
                  </button>
                )}
                {pdf.isFree && (
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText(`https://www.osmelfabre.it/download-free?id=${pdf.id}`);
                      toast.success("Link download copiato!");
                    }}
                    className="font-['Jost'] text-[10px] text-green-400/80 hover:text-green-400 underline underline-offset-2 truncate max-w-xs transition-colors"
                    title={`https://www.osmelfabre.it/download-free?id=${pdf.id}`}
                  >
                    🔗 Copia link gratuito
                  </button>
                )}
                {!pdf.isFree && !pdf.stripePaymentLink && pdf.price && parseFloat(pdf.price) > 0 && (
                  <button
                    type="button"
                    disabled={generateStripeLink.isPending}
                    onClick={() => generateStripeLink.mutate({ id: pdf.id, origin: window.location.origin })}
                    className="font-['Jost'] text-[10px] tracking-[0.15em] uppercase text-orange-400 hover:text-orange-300 border border-orange-700/50 px-3 py-1 transition-colors disabled:opacity-40"
                  >
                    {generateStripeLink.isPending ? "Generazione..." : "⚡ Genera link Stripe"}
                  </button>
                )}
              </div>
              <p className="font-['Jost'] text-[10px] text-muted-foreground mt-2">
                {new Date(pdf.createdAt).toLocaleDateString("it-IT", { day: "2-digit", month: "long", year: "numeric" })}
              </p>
            </div>

            {/* Actions */}
            <div className="shrink-0 flex flex-col gap-2">
              {!pdf.isLatest && (
                <button onClick={() => setLatest.mutate({ id: pdf.id })}
                  className="font-['Jost'] text-[10px] tracking-[0.15em] uppercase border border-primary text-primary px-3 py-2 hover:bg-primary hover:text-primary-foreground transition-colors">
                  Imposta ultimo
                </button>
              )}
              <button onClick={() => startEdit(pdf)}
                className="font-['Jost'] text-[10px] tracking-[0.15em] uppercase border border-border text-muted-foreground px-3 py-2 hover:border-foreground hover:text-foreground transition-colors">
                Modifica
              </button>
              <button
                onClick={() => setManychatPdfId(manychatPdfId === pdf.id ? null : pdf.id)}
                className="font-['Jost'] text-[10px] tracking-[0.15em] uppercase border border-orange-700/50 text-orange-400 px-3 py-2 hover:bg-orange-900/20 transition-colors">
                ManyChat
              </button>
              <button onClick={() => { if (confirm("Eliminare questo PDF?")) deletePdf.mutate({ id: pdf.id }); }}
                className="font-['Jost'] text-[10px] tracking-[0.15em] uppercase border border-red-800/40 text-red-400 px-3 py-2 hover:bg-red-900/20 transition-colors">
                Elimina
              </button>
            </div>
          </div>

          {/* ManyChat panel */}
          {manychatPdfId === pdf.id && (() => {
            const effectiveLink = pdf.isFree
              ? `https://www.osmelfabre.it/download-free?id=${pdf.id}`
              : pdf.stripePaymentLink;
            return (
              <div className="mt-3 border border-orange-700/30 bg-orange-900/10 p-4">
                <p className="font-['Jost'] text-[10px] tracking-[0.2em] uppercase text-orange-400 mb-3">Attiva automazione ManyChat</p>
                <p className="font-['Jost'] text-xs text-muted-foreground mb-3 leading-relaxed">
                  Inserisci la parola chiave che userai nel post Instagram/Facebook. Il sistema aggiornerà il link su ManyChat.
                </p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={manychatKeyword}
                    onChange={(e) => setManychatKeyword(e.target.value.toUpperCase())}
                    placeholder="Es. RITRATTO2025"
                    className="flex-1 bg-transparent border border-border px-3 py-2 font-['Jost'] text-xs text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-orange-500 uppercase"
                  />
                  <button
                    type="button"
                    disabled={!manychatKeyword.trim() || activateFlow.isPending || !effectiveLink}
                    onClick={() => activateFlow.mutate({ pdfId: pdf.id, keyword: manychatKeyword.trim() })}
                    className="font-['Jost'] text-[10px] tracking-[0.15em] uppercase bg-orange-700 text-white px-4 py-2 hover:bg-orange-600 disabled:opacity-40 transition-colors shrink-0">
                    {activateFlow.isPending ? "Attivazione..." : "Attiva"}
                  </button>
                </div>
                {effectiveLink ? (
                  <p className="font-['Jost'] text-[10px] text-orange-400/70 mt-2">
                    Link pronto: {effectiveLink.length > 60 ? effectiveLink.slice(0, 60) + "..." : effectiveLink}
                  </p>
                ) : (
                  <p className="font-['Jost'] text-[10px] text-red-400/70 mt-2">
                    ⚠ Nessun link trovato. {pdf.price && parseFloat(pdf.price) > 0 ? "Genera prima il link Stripe." : "Imposta un prezzo e genera il link Stripe."}
                  </p>
                )}
              </div>
            );
          })()}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

// ── Subscribers List ───────────────────────────────────────────────────────────
function SubscribersList() {
  const { data: subscribers, isLoading } = trpc.newsletter.list.useQuery();

  if (isLoading) return <div className="text-center py-12 font-['Jost'] text-sm text-muted-foreground">Caricamento...</div>;

  if (!subscribers?.length) return (
    <p className="text-center py-12 font-['Jost'] text-sm text-muted-foreground">Nessun iscritto alla newsletter</p>
  );

  return (
    <div>
      <p className="font-['Jost'] text-xs tracking-[0.2em] uppercase text-muted-foreground mb-6">{subscribers.length} iscritti</p>
      <div className="space-y-2">
        {subscribers.map((s) => (
          <div key={s.id} className="flex items-center justify-between border border-border px-5 py-4">
            <div>
              <p className="font-['Jost'] text-sm text-foreground">{s.email}</p>
              {s.name && <p className="font-['Jost'] text-xs text-muted-foreground mt-0.5">{s.name}</p>}
            </div>
            <p className="font-['Jost'] text-[10px] text-muted-foreground">
              {new Date(s.createdAt).toLocaleDateString("it-IT", { day: "2-digit", month: "long", year: "numeric" })}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Ebook Manager ─────────────────────────────────────────────────────────────
function EbookManager() {
  const utils = trpc.useUtils();
  const { data: ebooks, isLoading } = trpc.ebooks.list.useQuery();
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [dragging, setDragging] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const upload = trpc.ebooks.upload.useMutation({
    onSuccess: () => {
      toast.success("Ebook caricato!");
      setTitle(""); setDescription(""); setFile(null); setShowForm(false);
      utils.ebooks.list.invalidate();
    },
    onError: (e) => toast.error(`Errore: ${e.message}`),
  });

  const deleteEbook = trpc.ebooks.delete.useMutation({
    onSuccess: () => { toast.success("Ebook eliminato"); utils.ebooks.list.invalidate(); },
    onError: (e) => toast.error(`Errore: ${e.message}`),
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !file) { toast.error("Titolo e file sono obbligatori"); return; }
    const dataUrl = await fileToDataUrl(file);
    upload.mutate({ title, description: description || undefined, dataUrl, filename: file.name });
  };

  const baseUrl = "https://www.osmelfabre.it";

  if (isLoading) return <div className="text-center py-12 font-['Jost'] text-sm text-muted-foreground">Caricamento...</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <p className="font-['Jost'] text-xs tracking-[0.2em] uppercase text-muted-foreground">{ebooks?.length ?? 0} ebook</p>
        <button onClick={() => setShowForm(!showForm)}
          className="font-['Jost'] text-xs tracking-[0.2em] uppercase border border-primary text-primary px-6 py-3 hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
        >
          {showForm ? "Annulla" : "+ Nuovo ebook"}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="border border-border p-8 mb-10 space-y-5">
          <h3 className="font-['Cormorant_Garamond'] text-2xl font-light mb-4">Carica ebook HTML</h3>
          <div>
            <label className="block font-['Jost'] text-xs tracking-[0.15em] uppercase text-muted-foreground mb-2">Titolo *</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required
              className="w-full bg-card border border-border text-foreground font-['Jost'] text-sm px-4 py-3 focus:outline-none focus:border-primary" />
          </div>
          <div>
            <label className="block font-['Jost'] text-xs tracking-[0.15em] uppercase text-muted-foreground mb-2">Descrizione</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3}
              className="w-full bg-card border border-border text-foreground font-['Jost'] text-sm px-4 py-3 focus:outline-none focus:border-primary resize-none" />
          </div>
          {/* Drop zone */}
          <div
            onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={(e) => { e.preventDefault(); setDragging(false); const f = e.dataTransfer.files[0]; if (f) setFile(f); }}
            onClick={() => fileRef.current?.click()}
            className={`border-2 border-dashed cursor-pointer flex flex-col items-center justify-center gap-2 py-8 transition-colors ${
              dragging ? "border-primary bg-primary/5" : file ? "border-green-600 bg-green-900/10" : "border-border hover:border-primary/50"
            }`}
          >
            {file ? (
              <p className="font-['Jost'] text-sm text-green-400">✓ {file.name}</p>
            ) : (
              <>
                <p className="font-['Jost'] text-sm text-muted-foreground">Trascina il file HTML o <span className="text-primary underline">sfoglia</span></p>
                <p className="font-['Jost'] text-xs text-muted-foreground/50">Solo file .html</p>
              </>
            )}
            <input ref={fileRef} type="file" accept=".html,text/html" className="hidden"
              onChange={(e) => e.target.files?.[0] && setFile(e.target.files[0])} />
          </div>
          <button type="submit" disabled={upload.isPending || !title || !file}
            className="w-full py-4 font-['Jost'] text-xs tracking-[0.25em] uppercase border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors disabled:opacity-40"
          >
            {upload.isPending ? "Caricamento..." : "Carica ebook"}
          </button>
        </form>
      )}

      <div className="space-y-4">
        {ebooks?.map((ebook) => {
          const accessUrl = `${baseUrl}/ebook/accedi?id=${ebook.id}`;
          return (
            <div key={ebook.id} className="border border-border p-6">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <p className="font-['Cormorant_Garamond'] text-xl text-foreground">{ebook.title}</p>
                  {ebook.description && <p className="font-['Jost'] text-xs text-muted-foreground mt-1">{ebook.description}</p>}
                </div>
                <button onClick={() => { if (confirm("Eliminare questo ebook?")) deleteEbook.mutate({ id: ebook.id }); }}
                  className="font-['Jost'] text-[10px] tracking-[0.15em] uppercase text-red-400 hover:text-red-300 border border-red-800/50 px-3 py-1.5 shrink-0"
                >Elimina</button>
              </div>
              {/* Link da usare su ManyChat */}
              <div className="bg-card border border-border/50 px-4 py-3 flex items-center gap-3">
                <p className="font-['Jost'] text-[10px] tracking-[0.15em] uppercase text-primary shrink-0">Link ManyChat</p>
                <p className="font-['Jost'] text-xs text-muted-foreground truncate flex-1">{accessUrl}</p>
                <button onClick={() => { navigator.clipboard.writeText(accessUrl); toast.success("Copiato!"); }}
                  className="font-['Jost'] text-[10px] tracking-[0.15em] uppercase text-foreground border border-border px-3 py-1.5 hover:border-primary shrink-0"
                >Copia</button>
              </div>
            </div>
          );
        })}
        {ebooks?.length === 0 && (
          <p className="text-center py-12 font-['Jost'] text-sm text-muted-foreground">Nessun ebook caricato</p>
        )}
      </div>
    </div>
  );
}

// ── Main Admin Page ────────────────────────────────────────────────────────────
export default function Admin() {
  const { user, loading } = useAuth();
  const utils = trpc.useUtils();
  const [tab, setTab] = useState<"upload" | "photos" | "contacts" | "pdfs" | "subscribers" | "ebooks">("photos");

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="font-['Jost'] text-sm text-muted-foreground tracking-[0.2em] uppercase">Caricamento...</p>
    </div>
  );

  if (!user) {
    if (typeof window !== "undefined") window.location.replace("/admin-login");
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="font-['Jost'] text-sm text-muted-foreground tracking-[0.2em] uppercase">Reindirizzamento...</p>
      </div>
    );
  }

  if (user.role !== "admin") return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="font-['Jost'] text-sm text-muted-foreground">Accesso non autorizzato.</p>
    </div>
  );

  const refresh = () => {
    utils.photos.all.invalidate();
    utils.photos.gallery.invalidate();
  };

  return (
    <div className="min-h-screen pt-28 pb-24 px-6 md:px-12 lg:px-20">
      {/* Header */}
      <div className="mb-12">
        <p className="font-['Jost'] text-xs tracking-[0.3em] uppercase text-primary mb-3">Pannello Admin</p>
        <h1 className="font-['Cormorant_Garamond'] text-4xl md:text-5xl font-light text-foreground">
          Gestione Contenuti
        </h1>
        <p className="font-['Jost'] text-sm text-muted-foreground mt-3">
          Benvenuto, {user.name ?? "Admin"}
        </p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-6 border-b border-border mb-10">
        {([
          { key: "photos", label: "Foto" },
          { key: "upload", label: "Carica foto" },
          { key: "pdfs", label: "PDF" },
          { key: "contacts", label: "Messaggi" },
          { key: "subscribers", label: "Newsletter" },
          { key: "ebooks", label: "Ebook HTML" },
        ] as const).map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`font-['Jost'] text-xs tracking-[0.2em] uppercase pb-4 border-b-2 -mb-px transition-colors duration-200 ${
              tab === t.key ? "text-primary border-primary" : "text-muted-foreground border-transparent hover:text-foreground"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="max-w-5xl">
        {tab === "upload" && <UploadForm onSuccess={() => { refresh(); setTab("photos"); }} />}
        {tab === "photos" && <PhotoGrid onDelete={refresh} />}
        {tab === "contacts" && <ContactsList />}
        {tab === "pdfs" && <PdfManager />}
        {tab === "subscribers" && <SubscribersList />}
        {tab === "ebooks" && <EbookManager />}
      </div>
    </div>
  );
}
