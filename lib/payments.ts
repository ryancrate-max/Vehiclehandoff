/** Stripe mode, copied from BoatHandoff. Checkout stays OFF unless test keys are set; live keys are refused unless STRIPE_ALLOW_LIVE=true. */
export type StripeMode =
  | { mode: "off"; enabled: false; reason: string }
  | { mode: "test"; enabled: true; secretKey: string; webhookSecret: string }
  | { mode: "live"; enabled: true; secretKey: string; webhookSecret: string };

const LIVE_PREFIXES = ["sk_live", "pk_live", "rk_live"];
export function keyLooksLive(key: string): boolean {
  return LIVE_PREFIXES.some((p) => key.startsWith(p));
}

export function stripeMode(env: Record<string, string | undefined> = process.env): StripeMode {
  const secretKey = env.STRIPE_SECRET_KEY || "";
  const publishable = env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "";
  const webhookSecret = env.STRIPE_WEBHOOK_SECRET || "";
  const allowLive = env.STRIPE_ALLOW_LIVE === "true";
  const liveKey = keyLooksLive(secretKey) || keyLooksLive(publishable);
  if (liveKey && !allowLive) return { mode: "off", enabled: false, reason: "Live Stripe keys were refused. STRIPE_ALLOW_LIVE is off." };
  if (liveKey && allowLive && secretKey.startsWith("sk_live_") && webhookSecret) return { mode: "live", enabled: true, secretKey, webhookSecret };
  if (secretKey.startsWith("sk_test_") && webhookSecret) return { mode: "test", enabled: true, secretKey, webhookSecret };
  return { mode: "off", enabled: false, reason: "Paid kits are coming soon. Checkout is off." };
}
