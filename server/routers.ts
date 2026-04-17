import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { storagePut, storageGet } from "./storage";
import { PDFDocument } from "pdf-lib";
import {
  getGalleryPhotos,
  getHeroPhotoByPage,
  getAllPhotos,
  insertPhoto,
  deletePhoto,
  insertContact,
  getAllContacts,
  markContactRead,
  getAllPdfs,
  getLatestPdf,
  getPdfById,
  insertPdf,
  updatePdf,
  setLatestPdf,
  deletePdf,
  insertPurchase,
  getPurchaseBySessionId,
  incrementDownloadCount,
  getAllPurchases,
  insertSubscriber,
  getAllSubscribers,
  upsertUser,
} from "./db";
import { notifyOwner } from "./_core/notification";
import { createStripeProductForPdf, updateStripeProduct } from "./stripeProducts";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-03-25.dahlia",
});

// Admin guard middleware
const adminProcedure = protectedProcedure.use(({ ctx, next }) => {
  if (ctx.user.role !== "admin") {
    throw new TRPCError({ code: "FORBIDDEN", message: "Admin access required" });
  }
  return next({ ctx });
});

export const appRouter = router({
  system: systemRouter,

  auth: router({
    me: publicProcedure.query((opts) => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
    adminLogin: publicProcedure
      .input(z.object({ email: z.string().email(), password: z.string().min(1) }))
      .mutation(async ({ ctx, input }) => {
        const { ENV } = await import("./_core/env");
        const { sdk } = await import("./_core/sdk");
        if (
          input.email !== ENV.adminEmail ||
          input.password !== ENV.adminPassword
        ) {
          throw new TRPCError({ code: "UNAUTHORIZED", message: "Credenziali non valide" });
        }
        // Ensure admin user exists in DB
        const ADMIN_OPEN_ID = "admin-local-" + Buffer.from(ENV.adminEmail).toString("base64").slice(0, 16);
        await upsertUser({
          openId: ADMIN_OPEN_ID,
          name: "Osmel Fabre",
          email: ENV.adminEmail,
          loginMethod: "password",
          role: "admin",
          lastSignedIn: new Date(),
        });
        const token = await sdk.signSession(
          { openId: ADMIN_OPEN_ID, appId: ENV.appId || "admin", name: "Osmel Fabre" },
          { expiresInMs: 1000 * 60 * 60 * 24 * 30 } // 30 giorni
        );
        const cookieOptions = getSessionCookieOptions(ctx.req);
        ctx.res.cookie(COOKIE_NAME, token, {
          ...cookieOptions,
          maxAge: 1000 * 60 * 60 * 24 * 30,
        });
        return { success: true } as const;
      }),
  }),

  // ── PHOTOS (public read) ───────────────────────────────────────────────────
  photos: router({
    gallery: publicProcedure.query(async () => {
      return getGalleryPhotos();
    }),

    hero: publicProcedure
      .input(z.object({ page: z.string() }))
      .query(async ({ input }) => {
        return getHeroPhotoByPage(input.page);
      }),

    all: adminProcedure.query(async () => {
      return getAllPhotos();
    }),

    upload: adminProcedure
      .input(
        z.object({
          dataUrl: z.string(),
          filename: z.string(),
          type: z.enum(["gallery", "hero"]),
          page: z.string().optional(),
          subject: z.string().optional(),
          category: z.enum(["Uomo", "Donna"]).optional(),
          sortOrder: z.number().optional(),
        })
      )
      .mutation(async ({ input }) => {
        const matches = input.dataUrl.match(/^data:(.+);base64,(.+)$/);
        if (!matches) throw new TRPCError({ code: "BAD_REQUEST", message: "Invalid image data" });
        const mimeType = matches[1];
        const buffer = Buffer.from(matches[2], "base64");
        const ext = input.filename.split(".").pop() ?? "jpg";
        const fileKey = `osmel-photos/${input.type}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
        const { url } = await storagePut(fileKey, buffer, mimeType);
        await insertPhoto({
          url,
          fileKey,
          type: input.type,
          page: input.page ?? null,
          subject: input.subject ?? null,
          category: input.category ?? "Uomo",
          sortOrder: input.sortOrder ?? 0,
          active: true,
        });
        return { url, fileKey };
      }),

    delete: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        await deletePhoto(input.id);
        return { success: true };
      }),
  }),

  // ── CONTACTS ──────────────────────────────────────────────────────────────
  contacts: router({
    submit: publicProcedure
      .input(
        z.object({
          name: z.string().min(2).max(128),
          email: z.string().email(),
          subject: z.string().min(1).max(64),
          message: z.string().min(10).max(5000),
        })
      )
      .mutation(async ({ input }) => {
        await insertContact(input);
        await notifyOwner({
          title: `Nuovo messaggio da ${input.name}`,
          content: `**Da:** ${input.name} (${input.email})\n**Oggetto:** ${input.subject}\n\n${input.message}`,
        });
        return { success: true };
      }),

    all: adminProcedure.query(async () => {
      return getAllContacts();
    }),

    markRead: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        await markContactRead(input.id);
        return { success: true };
      }),
  }),

  // ── PDFs (public archive + admin management) ───────────────────────────────
  pdfs: router({
    // Public: list all active PDFs for the archive page
    list: publicProcedure.query(async () => {
      return getAllPdfs();
    }),

    // Public: get the latest PDF (used on the download page after payment)
    latest: publicProcedure.query(async () => {
      return getLatestPdf();
    }),

    // Public: request free PDF download — collects email, subscribes to newsletter, returns URL
    requestFreePdf: publicProcedure
      .input(z.object({ pdfId: z.number(), email: z.string().email(), name: z.string().optional() }))
      .mutation(async ({ input }) => {
        const pdf = await getPdfById(input.pdfId);
        if (!pdf || !pdf.isFree) {
          throw new TRPCError({ code: "NOT_FOUND", message: "PDF gratuito non trovato" });
        }
        // Subscribe to MailerLite newsletter
        const apiKey = process.env.MAILERLITE_API_KEY;
        const groupId = process.env.MAILERLITE_NEWSLETTER_GROUP_ID;
        if (apiKey && groupId) {
          try {
            const [firstName, ...rest] = (input.name ?? "").split(" ");
            await fetch("https://connect.mailerlite.com/api/subscribers", {
              method: "POST",
              headers: { "Authorization": `Bearer ${apiKey}`, "Content-Type": "application/json", "Accept": "application/json" },
              body: JSON.stringify({ email: input.email, fields: { name: firstName || undefined, last_name: rest.join(" ") || undefined }, groups: [groupId], status: "active" }),
            });
          } catch (err: any) {
            console.error("[MailerLite] Errore iscrizione PDF gratuito:", err.message);
          }
        }
        let downloadUrl: string;
        try {
          const result = await storageGet(pdf.pdfKey);
          downloadUrl = result.url;
        } catch {
          downloadUrl = pdf.pdfUrl;
        }
        return { pdfTitle: pdf.title, pdfUrl: downloadUrl };
      }),

    // Public: get download URL for a free PDF (no payment required)
    downloadFree: publicProcedure
      .input(z.object({ pdfId: z.number() }))
      .query(async ({ input }) => {
        const pdf = await getPdfById(input.pdfId);
        if (!pdf || !pdf.isFree) {
          throw new TRPCError({ code: "NOT_FOUND", message: "PDF gratuito non trovato" });
        }
        let downloadUrl: string;
        try {
          const result = await storageGet(pdf.pdfKey);
          downloadUrl = result.url;
        } catch {
          downloadUrl = pdf.pdfUrl;
        }
        return { pdfTitle: pdf.title, pdfUrl: downloadUrl };
      }),

    // Public: verify a Stripe session and return a secure (pre-signed) download URL
    verifyPurchase: publicProcedure
      .input(z.object({ sessionId: z.string() }))
      .query(async ({ input }) => {
        // First check if webhook already recorded the purchase
        let purchase = await getPurchaseBySessionId(input.sessionId);

        // Fallback: if webhook hasn't fired yet, query Stripe API directly
        if (!purchase) {
          try {
            const session = await stripe.checkout.sessions.retrieve(input.sessionId);
            if (session.payment_status === "paid") {
              // Workshop payment (no pdf_id in metadata) — verify directly without a DB record
              if (!session.metadata?.pdf_id) {
                return {
                  verified: true,
                  pdfTitle: null,
                  pdfUrl: null,
                  customerEmail: session.customer_details?.email ?? session.customer_email ?? null,
                };
              }
              // PDF purchase — register and return download info
              const pdfId = parseInt(session.metadata.pdf_id);
              await insertPurchase({
                stripeSessionId: session.id,
                pdfId,
                customerEmail: session.customer_details?.email ?? session.customer_email ?? null,
                customerName: session.customer_details?.name ?? null,
                downloadCount: 0,
              });
              purchase = await getPurchaseBySessionId(input.sessionId);
            }
          } catch (err) {
            console.error("[verifyPurchase] Stripe API fallback failed:", err);
          }
        }

        if (!purchase) {
          throw new TRPCError({ code: "NOT_FOUND", message: "Acquisto non trovato" });
        }
        const pdf = await getPdfById(purchase.pdfId);
        if (!pdf) {
          throw new TRPCError({ code: "NOT_FOUND", message: "PDF non trovato" });
        }
        // Generate a secure pre-signed download URL (expires in 24h)
        let downloadUrl: string;
        try {
          const result = await storageGet(pdf.pdfKey);
          downloadUrl = result.url;
        } catch {
          // Fallback to direct URL if pre-signed generation fails
          downloadUrl = pdf.pdfUrl;
        }
        return {
          verified: true,
          pdfTitle: pdf.title,
          pdfUrl: downloadUrl,
          customerEmail: purchase.customerEmail,
        };
      }),

    // Public: increment download count when user actually downloads
    trackDownload: publicProcedure
      .input(z.object({ sessionId: z.string() }))
      .mutation(async ({ input }) => {
        await incrementDownloadCount(input.sessionId);
        return { success: true };
      }),

      // Admin: upload a new PDF
    upload: adminProcedure
      .input(
        z.object({
          title: z.string().min(1).max(256),
          description: z.string().optional(),
          price: z.string().optional(),
          isFree: z.boolean().default(false),
          stripePaymentLink: z.string().url().optional().or(z.literal("")),
          isLatest: z.boolean().default(false),
          // PDF file as base64
          pdfDataUrl: z.string(),
          pdfFilename: z.string(),
          // Cover image as base64 (optional)
          coverDataUrl: z.string().optional(),
          coverFilename: z.string().optional(),
          // Origin for Stripe success_url (passed from frontend)
          origin: z.string().optional(),
        })
      )
      .mutation(async ({ input, ctx }) => {
        // Upload PDF
        const pdfMatches = input.pdfDataUrl.match(/^data:(.+);base64,(.+)$/);
        if (!pdfMatches) throw new TRPCError({ code: "BAD_REQUEST", message: "Invalid PDF data" });
        const pdfBuffer = Buffer.from(pdfMatches[2], "base64");
        const pdfExt = input.pdfFilename.split(".").pop() ?? "pdf";
        const pdfKey = `osmel-pdfs/${Date.now()}-${Math.random().toString(36).slice(2)}.${pdfExt}`;
        const { url: pdfUrl } = await storagePut(pdfKey, pdfBuffer, "application/pdf");

        // Auto-generate preview PDF: extract first 3 pages from the full PDF
        let previewUrl: string | undefined;
        let previewKey: string | undefined;
        try {
          const fullPdfDoc = await PDFDocument.load(pdfBuffer);
          const totalPages = fullPdfDoc.getPageCount();
          const previewPageCount = Math.min(3, totalPages);
          const previewDoc = await PDFDocument.create();
          const pagesToCopy = Array.from({ length: previewPageCount }, (_, i) => i);
          const copiedPages = await previewDoc.copyPages(fullPdfDoc, pagesToCopy);
          copiedPages.forEach((page) => previewDoc.addPage(page));
          const previewBytes = await previewDoc.save();
          previewKey = `osmel-previews/${Date.now()}-${Math.random().toString(36).slice(2)}.pdf`;
          const result = await storagePut(previewKey, Buffer.from(previewBytes), "application/pdf");
          previewUrl = result.url;
          console.log(`[PDF Preview] Generated preview with ${previewPageCount}/${totalPages} pages`);
        } catch (err) {
          console.error("[PDF Preview] Failed to generate preview:", err);
          // Non-fatal: PDF is uploaded without preview
        }

        // Upload cover image (optional)
        let coverUrl: string | undefined;
        let coverKey: string | undefined;
        if (input.coverDataUrl && input.coverFilename) {
          const coverMatches = input.coverDataUrl.match(/^data:(.+);base64,(.+)$/);
          if (coverMatches) {
            const coverMime = coverMatches[1];
            const coverBuffer = Buffer.from(coverMatches[2], "base64");
            const coverExt = input.coverFilename.split(".").pop() ?? "jpg";
            coverKey = `osmel-covers/${Date.now()}-${Math.random().toString(36).slice(2)}.${coverExt}`;
            const result = await storagePut(coverKey, coverBuffer, coverMime);
            coverUrl = result.url;
          }
        }

        // Insert PDF first to get the ID
        await insertPdf({
          title: input.title,
          description: input.description ?? null,
          pdfUrl,
          pdfKey,
          coverUrl: coverUrl ?? null,
          coverKey: coverKey ?? null,
          stripePaymentLink: input.stripePaymentLink || null,
          previewUrl: previewUrl ?? null,
          previewKey: previewKey ?? null,
          price: input.isFree ? "0" : (input.price ?? "0"),
          isFree: input.isFree ?? false,
          isLatest: false,
          active: true,
        });

        // Get the newly inserted PDF to get its ID
        const allPdfs = await getAllPdfs();
        const newPdf = allPdfs[0]; // most recent

        // Auto-create Stripe product + payment link if price > 0, not free, and no manual link provided
        let stripePaymentLink = input.stripePaymentLink || null;
        let stripeProductId: string | null = null;
        let stripePriceId: string | null = null;

        if (newPdf && !stripePaymentLink && !input.isFree && input.price && parseFloat(input.price) > 0) {
          try {
            const origin = input.origin ?? ctx.req.headers.origin ?? "https://osmelfabre.it";
            const priceInCents = Math.round(parseFloat(input.price) * 100);
            const stripeResult = await createStripeProductForPdf({
              title: input.title,
              description: input.description,
              priceInCents,
              pdfId: newPdf.id,
              origin,
              coverUrl: coverUrl ?? undefined,
            });
            stripePaymentLink = stripeResult.paymentLink;
            stripeProductId = stripeResult.productId;
            stripePriceId = stripeResult.priceId;
            // Update the PDF record with Stripe data
            await updatePdf(newPdf.id, {
              stripePaymentLink,
              stripeProductId,
              stripePriceId,
            });
          } catch (err) {
            console.error("[Stripe] Failed to create product for PDF:", err);
            // Non-fatal: PDF is uploaded, Stripe link can be added manually
          }
        }

        // If marked as latest, OR if it's the first PDF ever, set as latest
        const isFirstPdf = allPdfs.length === 1; // allPdfs already includes the newly inserted one
        if ((input.isLatest || isFirstPdf) && newPdf) {
          await setLatestPdf(newPdf.id);
        }

        await notifyOwner({
          title: `Nuovo PDF caricato: ${input.title}`,
          content: `Un nuovo PDF è stato caricato nell'archivio: **${input.title}**${stripePaymentLink ? `\n**Link Stripe:** ${stripePaymentLink}` : ""}`,
        });

        return { success: true, pdfUrl, stripePaymentLink };
      }),

    // Admin: update PDF metadata (title, description, price, stripe link, cover)
    update: adminProcedure
      .input(
        z.object({
          id: z.number(),
          title: z.string().min(1).max(256).optional(),
          description: z.string().optional(),
          price: z.string().optional(),
          stripePaymentLink: z.string().optional(),
          coverDataUrl: z.string().optional(),
          coverFilename: z.string().optional(),
        })
      )
      .mutation(async ({ input }) => {
        const { id, coverDataUrl, coverFilename, ...data } = input;
        // Upload new cover if provided
        if (coverDataUrl && coverFilename) {
          const coverMatches = coverDataUrl.match(/^data:(.+);base64,(.+)$/);
          if (coverMatches) {
            const coverMimeType = coverMatches[1];
            const coverBuffer = Buffer.from(coverMatches[2], "base64");
            const coverExt = coverFilename.split(".").pop() ?? "jpg";
            const coverKey = `osmel-covers/${Date.now()}-${Math.random().toString(36).slice(2)}.${coverExt}`;
            const { url: coverUrl } = await storagePut(coverKey, coverBuffer, coverMimeType);
            (data as Record<string, unknown>).coverUrl = coverUrl;
            (data as Record<string, unknown>).coverKey = coverKey;
          }
        }
        await updatePdf(id, data);
        // Se il PDF ha un prodotto Stripe, aggiorna anche lì titolo/descrizione/copertina
        const existingPdf = await getPdfById(id);
        if (existingPdf?.stripeProductId) {
          try {
            await updateStripeProduct({
              productId: existingPdf.stripeProductId,
              title: input.title,
              description: input.description,
              coverUrl: (data as Record<string, unknown>).coverUrl as string | undefined,
            });
          } catch (err) {
            console.error("[Stripe] Failed to update product:", err);
          }
        }
        return { success: true };
      }),

    // Admin: set a PDF as the "latest" (the one downloaded after payment)
    setLatest: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        await setLatestPdf(input.id);
        return { success: true };
      }),

    // Admin: soft-delete a PDF
    delete: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        await deletePdf(input.id);
        return { success: true };
      }),

    // Admin: list all purchases
    purchases: adminProcedure.query(async () => {
      return getAllPurchases();
    }),
  }),

  // ── MANYCHAT ─────────────────────────────────────────────────────────────
  manychat: router({
    // Admin: aggiorna i Bot Fields ManyChat con il link e titolo del PDF corrente
    activateFlow: adminProcedure
      .input(
        z.object({
          pdfId: z.number(),
          keyword: z.string().min(1).max(50),
        })
      )
      .mutation(async ({ input }) => {
        const apiToken = process.env.MANYCHAT_API_TOKEN;
        if (!apiToken) {
          throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "MANYCHAT_API_TOKEN non configurato" });
        }

        // Recupera il PDF
        const pdf = await getPdfById(input.pdfId);
        if (!pdf) {
          throw new TRPCError({ code: "NOT_FOUND", message: "PDF non trovato" });
        }

        const origin = process.env.APP_ORIGIN ?? "https://www.osmelfabre.it";
        const stripeLink = pdf.isFree
          ? `${origin}/download-free?id=${pdf.id}`
          : (pdf.stripePaymentLink ?? "");
        const pdfTitle = pdf.title ?? "";

        // Aggiorna Bot Field: pdf_acquisto_link (ID: 5006077)
        const linkRes = await fetch("https://api.manychat.com/fb/page/setBotField", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${apiToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ field_id: 5006077, field_value: stripeLink }),
        });
        const linkData = await linkRes.json() as any;
        if (linkData.status !== "success") {
          throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: `Errore aggiornamento link ManyChat: ${JSON.stringify(linkData)}` });
        }

        // Aggiorna Bot Field: pdf_titolo (ID: 5006078)
        const titleRes = await fetch("https://api.manychat.com/fb/page/setBotField", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${apiToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ field_id: 5006078, field_value: pdfTitle }),
        });
        const titleData = await titleRes.json() as any;
        if (titleData.status !== "success") {
          throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: `Errore aggiornamento titolo ManyChat: ${JSON.stringify(titleData)}` });
        }

        console.log(`[ManyChat] Bot Fields aggiornati — PDF: "${pdfTitle}", Link: ${stripeLink}, Keyword: ${input.keyword}`);

        return {
          success: true,
          keyword: input.keyword.toUpperCase(),
          stripeLink,
          pdfTitle,
          message: `Bot Fields aggiornati. Keyword da usare nel post: ${input.keyword.toUpperCase()}`,
        };
      }),
  }),

  // ── NEWSLETTER ────────────────────────────────────────────────────────────
  newsletter: router({
    subscribe: publicProcedure
      .input(
        z.object({
          email: z.string().email(),
          name: z.string().max(256).optional(),
        })
      )
      .mutation(async ({ input }) => {
        const result = await insertSubscriber({
          email: input.email,
          name: input.name ?? null,
          source: "website",
        });
        if (!result.alreadyExists) {
          await notifyOwner({
            title: `Nuova iscrizione newsletter: ${input.email}`,
            content: `**Email:** ${input.email}\n**Nome:** ${input.name ?? "—"}`,
          });
        }
        return { success: true, alreadyExists: result.alreadyExists };
      }),

    // Admin: list all subscribers
    list: adminProcedure.query(async () => {
      return getAllSubscribers();
    }),
  }),
});

export type AppRouter = typeof appRouter;
