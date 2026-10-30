import { NextResponse } from "next/server";
import { jsonError } from "@/lib/http";
import { stripeMode } from "@/lib/payments";
import { KITS, PROVINCES } from "@/lib/data";
import { quote } from "@/lib/tax";
import { checkoutFields, createCheckoutSession } from "@/lib/stripe-checkout";

export async function GET() {
  const m = stripeMode();
  return NextResponse.json({ mode: m.mode, enabled: m.enabled, comingSoon: !m.enabled });
}

export async function POST(req: Request) {
  const m = stripeMode();
  if (!m.enabled) return jsonError(m.reason, 403);
  const body = (await req.json().catch(() => ({}))) as { kit?: string; province?: string };
  const kit = KITS.find((k) => k.slug === body.kit);
  const prov = PROVINCES.find((p) => p.code === (body.province || "").toUpperCase());
  if (!kit) return jsonError("Choose a kit.");
  if (!prov?.live) return jsonError("Kits for that province are coming soon.");
  const q = quote(kit.priceCents, prov.code);
  if (!q) return jsonError("Choose the buyer's province.");
  const origin = new URL(req.url).origin;
  try {
    const s = await createCheckoutSession(m.secretKey, checkoutFields({ kitSlug: kit.slug, kitName: kit.name, quote: q, successUrl: `${origin}/start?paid=1`, cancelUrl: `${origin}/start?paid=0` }));
    if (s.livemode && m.mode !== "live") return jsonError("Live-mode session refused.", 403);
    return NextResponse.json({ url: s.url });
  } catch (e) { return jsonError((e as Error).message, 502); }
}
