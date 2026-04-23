/**
 * stripeProducts.ts
 * Helper per creare automaticamente prodotti, prezzi e payment link Stripe
 * quando viene caricato un nuovo PDF dall'Admin.
 */

import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-03-25.dahlia",
});

export interface CreateStripeProductResult {
  productId: string;
  priceId: string;
  paymentLink: string;
}

/**
 * Crea un prodotto Stripe, un prezzo e un payment link per un PDF.
 * La success_url include {CHECKOUT_SESSION_ID} che Stripe sostituisce automaticamente.
 * Il metadata pdf_id viene usato dal webhook per collegare il pagamento al PDF corretto.
 * Se coverUrl è fornita, viene impostata come immagine del prodotto nella pagina di checkout Stripe.
 */
export async function createStripeProductForPdf({
  title,
  description,
  priceInCents,
  pdfId,
  origin,
  coverUrl,
}: {
  title: string;
  description?: string;
  priceInCents: number;
  pdfId: number;
  origin: string;
  coverUrl?: string;
}): Promise<CreateStripeProductResult> {
  // 1. Crea il prodotto con immagine di copertina (se disponibile)
  const product = await stripe.products.create({
    name: title,
    description: description ?? undefined,
    ...(coverUrl ? { images: [coverUrl] } : {}),
    metadata: {
      pdf_id: String(pdfId),
      source: "osmelfabre",
    },
  });

  // 2. Crea il prezzo (in centesimi, EUR)
  const price = await stripe.prices.create({
    product: product.id,
    unit_amount: priceInCents,
    currency: "eur",
  });

  // 3. Crea il payment link con success_url che rimanda alla pagina di download
  const paymentLink = await stripe.paymentLinks.create({
    line_items: [{ price: price.id, quantity: 1 }],
    after_completion: {
      type: "redirect",
      redirect: {
        url: `${origin}/download-success?session_id={CHECKOUT_SESSION_ID}&pdf_id=${pdfId}`,
      },
    },
    billing_address_collection: "required",
    metadata: {
      pdf_id: String(pdfId),
    },
    allow_promotion_codes: true,
  });

  return {
    productId: product.id,
    priceId: price.id,
    paymentLink: paymentLink.url,
  };
}

/**
 * Aggiorna il nome/descrizione/immagine di un prodotto Stripe esistente.
 */
export async function updateStripeProduct({
  productId,
  title,
  description,
  coverUrl,
}: {
  productId: string;
  title?: string;
  description?: string;
  coverUrl?: string;
}) {
  if (!title && !description && !coverUrl) return;
  await stripe.products.update(productId, {
    ...(title ? { name: title } : {}),
    ...(description ? { description } : {}),
    ...(coverUrl ? { images: [coverUrl] } : {}),
  });
}
