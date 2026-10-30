import { NextResponse } from "next/server";
import { jsonError } from "@/lib/http";
import { stripeMode } from "@/lib/payments";
import { verifyStripeSignature } from "@/lib/stripe-signature";
import { db, purchaseFromSession, recordPurchase, type SessionLike } from "@/lib/purchases";

type StripeEvent = { type?: string; livemode?: boolean; data?: { object?: SessionLike } };

export async function POST(req: Request) {
  const m = stripeMode();
  if (!m.enabled) return jsonError("Checkout is off.", 403);
  const signature = req.headers.get("stripe-signature");
  if (!signature) return jsonError("Missing Stripe signature.", 400);
  const payload = await req.text();
  const ok = await verifyStripeSignature(payload, signature, m.webhookSecret);
  if (!ok) return jsonError("Bad signature.", 400);
  let event: StripeEvent;
  try { event = JSON.parse(payload) as StripeEvent; } catch { return jsonError("Invalid Stripe event.", 400); }
  if (event.livemode && m.mode !== "live") return jsonError("Live-mode events are refused.", 400);
  if (event.type === "checkout.session.completed") {
    const session = event.data?.object;
    if (!session?.metadata?.kit) return NextResponse.json({ received: true, ignored: true });
    const result = purchaseFromSession(session, { allowLive: m.mode === "live" });
    if (!result.ok) return jsonError(result.error);
    const d = db();
    if (!d) return jsonError("Database is not available.", 500);
    await recordPurchase(d, result.purchase);
    return NextResponse.json({ received: true, recorded: result.purchase.session_id });
  }
  return NextResponse.json({ received: true });
}
