import { KITS } from "./data";
import { quote } from "./tax";

type D1Stmt = { bind(...v: unknown[]): D1Stmt; run(): Promise<unknown>; first<T>(): Promise<T | null> };
export type D1Like = { prepare(sql: string): D1Stmt };

/** D1 binding from the OpenNext Cloudflare context (same lookup BoatHandoff uses). */
export function db(): D1Like | null {
  const holder = globalThis as unknown as { [k: symbol]: { env?: { DB?: D1Like } } | undefined };
  return holder[Symbol.for("__cloudflare-context__")]?.env?.DB ?? null;
}

export type SessionLike = {
  id?: string; payment_status?: string | null; status?: string | null; livemode?: boolean;
  currency?: string | null; amount_total?: number | null; metadata?: Record<string, string> | null;
  customer_details?: { email?: string | null } | null; customer_email?: string | null; created?: number;
};
export type Purchase = { session_id: string; kit: string; province: string; email: string | null; amount_total: number; currency: string; livemode: number; payment_status: string; created_at: string };

/** Same checks as BoatHandoff's unlockFromSession: paid, CAD, known kit, amount = kit price + tax, no live unless allowed. */
export function purchaseFromSession(s: SessionLike, opts?: { allowLive?: boolean }): { ok: true; purchase: Purchase } | { ok: false; error: string } {
  if (!s.id) return { ok: false, error: "Missing session id." };
  if (s.livemode && !opts?.allowLive) return { ok: false, error: "Live-mode Checkout sessions are refused." };
  const kit = KITS.find((k) => k.slug === s.metadata?.kit);
  if (!kit) return { ok: false, error: "Unknown kit on the payment." };
  const q = quote(kit.priceCents, s.metadata?.province || "");
  if (!q) return { ok: false, error: "Unknown province on the payment." };
  const paid = s.payment_status === "paid" || (s.status === "complete" && s.payment_status !== "unpaid");
  if (!paid) return { ok: false, error: "Payment is not complete." };
  if ((s.currency || "cad").toLowerCase() !== "cad") return { ok: false, error: "Currency must be CAD." };
  if (s.amount_total != null && s.amount_total !== q.totalCents) return { ok: false, error: "Amount does not match the kit price plus tax." };
  return { ok: true, purchase: {
    session_id: s.id, kit: kit.slug, province: q.province, email: s.customer_details?.email || s.customer_email || null,
    amount_total: s.amount_total ?? q.totalCents, currency: "cad", livemode: s.livemode ? 1 : 0, payment_status: "paid",
    created_at: new Date((s.created ? s.created * 1000 : Date.now())).toISOString(),
  } };
}

export async function recordPurchase(d: D1Like, p: Purchase) {
  await d.prepare(`INSERT INTO purchases (session_id, kit, province, email, amount_total, currency, livemode, payment_status, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?) ON CONFLICT(session_id) DO NOTHING`)
    .bind(p.session_id, p.kit, p.province, p.email, p.amount_total, p.currency, p.livemode, p.payment_status, p.created_at).run();
}

export async function getPurchase(sessionId: string): Promise<Purchase | null> {
  if (!/^cs_(test|live)_[A-Za-z0-9]+$/.test(sessionId)) return null;
  const d = db();
  if (!d) return null;
  return d.prepare("SELECT * FROM purchases WHERE session_id = ?").bind(sessionId).first<Purchase>();
}
