import type { TaxQuote } from "./tax";

export function checkoutFields(input: { kitSlug: string; kitName: string; quote: TaxQuote; successUrl: string; cancelUrl: string }): Record<string, string> {
  return {
    mode: "payment",
    success_url: input.successUrl,
    cancel_url: input.cancelUrl,
    "metadata[kit]": input.kitSlug,
    "metadata[province]": input.quote.province,
    "line_items[0][quantity]": "1",
    "line_items[0][price_data][currency]": "cad",
    "line_items[0][price_data][unit_amount]": String(input.quote.subtotalCents),
    "line_items[0][price_data][product_data][name]": `VehicleHandoff ${input.kitName} kit`,
    "line_items[1][quantity]": "1",
    "line_items[1][price_data][currency]": "cad",
    "line_items[1][price_data][unit_amount]": String(input.quote.taxCents),
    "line_items[1][price_data][product_data][name]": `${input.quote.label} ${input.quote.ratePercent}% (${input.quote.province})`,
  };
}

export async function createCheckoutSession(secretKey: string, fields: Record<string, string>) {
  const response = await fetch("https://api.stripe.com/v1/checkout/sessions", {
    method: "POST",
    headers: { Authorization: `Bearer ${secretKey}`, "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams(fields),
  });
  const data = (await response.json()) as { id?: string; url?: string | null; livemode?: boolean; error?: { message?: string } };
  if (!response.ok || !data.id) throw new Error(data.error?.message || "Stripe did not start checkout.");
  return { id: data.id, url: data.url ?? null, livemode: Boolean(data.livemode) };
}
