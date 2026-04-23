import express, { type Express } from "express";
import Stripe from "stripe";
import { insertPurchase, getPurchaseBySessionId, getLatestPdf, getPdfById } from "./db";
import { notifyOwner } from "./_core/notification";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-03-25.dahlia",
});

// ── MailerLite: iscrivi il cliente alla newsletter dopo il pagamento ──────────
async function subscribeToMailerLite(email: string, name?: string | null): Promise<void> {
  const apiKey = process.env.MAILERLITE_API_KEY;
  const groupId = process.env.MAILERLITE_NEWSLETTER_GROUP_ID;

  if (!apiKey || !groupId) {
    console.warn("[MailerLite] Credenziali mancanti, skip iscrizione newsletter");
    return;
  }

  try {
    const [firstName, ...rest] = (name ?? "").split(" ");
    const lastName = rest.join(" ") || undefined;

    const response = await fetch("https://connect.mailerlite.com/api/subscribers", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({
        email,
        fields: {
          name: firstName || undefined,
          last_name: lastName || undefined,
        },
        groups: [groupId],
        status: "active",
      }),
    });

    const data = await response.json() as any;

    if (response.ok) {
      console.log(`[MailerLite] Iscritto alla newsletter: ${email}`);
    } else {
      console.error(`[MailerLite] Errore iscrizione ${email}:`, data);
    }
  } catch (err: any) {
    console.error("[MailerLite] Errore chiamata API:", err.message);
  }
}

export function registerStripeWebhook(app: Express) {
  app.post(
    "/api/stripe/webhook",
    express.raw({ type: "application/json" }),
    async (req, res) => {
      const sig = req.headers["stripe-signature"];
      const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

      if (!webhookSecret) {
        console.error("[Stripe Webhook] STRIPE_WEBHOOK_SECRET not set");
        return res.status(500).json({ error: "Webhook secret not configured" });
      }

      let event: Stripe.Event;

      try {
        event = stripe.webhooks.constructEvent(req.body, sig!, webhookSecret);
      } catch (err: any) {
        console.error("[Stripe Webhook] Signature verification failed:", err.message);
        return res.status(400).json({ error: `Webhook Error: ${err.message}` });
      }

      // Handle test events
      if (event.id.startsWith("evt_test_")) {
        console.log("[Stripe Webhook] Test event detected, returning verification response");
        return res.json({ verified: true });
      }

      console.log(`[Stripe Webhook] Event received: ${event.type} (${event.id})`);

      if (event.type === "checkout.session.completed") {
        const session = event.data.object as Stripe.Checkout.Session;

        // Avoid duplicate processing
        const existing = await getPurchaseBySessionId(session.id);
        if (existing) {
          console.log(`[Stripe Webhook] Session ${session.id} already processed`);
          return res.json({ received: true });
        }

        const customerEmail = session.customer_details?.email ?? session.customer_email ?? null;
        const customerName = session.customer_details?.name ?? null;
        const isWorkshop = !session.metadata?.pdf_id;

        if (isWorkshop) {
          // Workshop payment — no PDF to link, just notify and subscribe
          if (customerEmail) {
            await subscribeToMailerLite(customerEmail, customerName);
          }
          await notifyOwner({
            title: `Nuova iscrizione Workshop!`,
            content: `**Email:** ${customerEmail ?? "—"}\n**Nome:** ${customerName ?? "—"}\n**Sessione Stripe:** ${session.id}`,
          });
          console.log(`[Stripe Webhook] Workshop registration recorded for session ${session.id}`);
          return res.json({ received: true });
        }

        // PDF purchase — find the PDF and record the purchase
        const pdfId = parseInt(session.metadata!.pdf_id);

        await insertPurchase({
          stripeSessionId: session.id,
          pdfId,
          customerEmail,
          customerName,
          downloadCount: 0,
        });

        const purchasedPdf = await getPdfById(pdfId);

        // ── Iscrizione automatica MailerLite ──────────────────────────────────
        if (customerEmail) {
          await subscribeToMailerLite(customerEmail, customerName);
        }

        await notifyOwner({
          title: `Nuovo acquisto PDF!`,
          content: `**PDF:** ${purchasedPdf?.title ?? `ID ${pdfId}`}\n**Email:** ${customerEmail ?? "—"}\n**Nome:** ${customerName ?? "—"}\n**Importo:** € ${purchasedPdf?.price ?? "—"}`,
        });

        console.log(`[Stripe Webhook] Purchase recorded for session ${session.id}`);
      }

      return res.json({ received: true });
    }
  );
}
