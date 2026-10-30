import { NextResponse } from "next/server";
import { jsonError } from "@/lib/http";
import { stripeMode } from "@/lib/payments";
import { verifyStripeSignature } from "@/lib/stripe-signature";

export async function POST(req: Request) {
  const m = stripeMode();
  if (!m.enabled) return jsonError("Checkout is off.", 403);
  const payload = await req.text();
  const ok = await verifyStripeSignature(payload, req.headers.get("stripe-signature") || "", m.webhookSecret);
  if (!ok) return jsonError("Bad signature.", 400);
  // TODO: record paid kit (D1) once checkout is turned on.
  return NextResponse.json({ received: true });
}
