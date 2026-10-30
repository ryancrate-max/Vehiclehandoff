import type { Metadata } from "next";
import { Receipt } from "@/components/receipt";
import { stripeMode } from "@/lib/payments";
import { getPurchase } from "@/lib/purchases";
import { KITS } from "@/lib/data";
export const metadata: Metadata = { title: "Start a kit", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";
export default async function Start({ searchParams }: { searchParams: Promise<{ kit?: string; paid?: string; session_id?: string }> }) {
  const { kit, paid, session_id } = await searchParams;
  const mode = stripeMode();
  const purchase = paid === "1" && session_id ? await getPurchase(session_id).catch(() => null) : null;
  const bought = purchase ? KITS.find((k) => k.slug === purchase.kit) : null;
  return <section><div className="wrap" style={{ maxWidth: 680 }}><p className="eyebrow">Start a kit</p><h1>Start your handoff</h1>
    {purchase ? <div className="card" style={{ padding: 16, marginBottom: 16 }}><strong>Kit unlocked.</strong> Your {bought?.name || purchase.kit} kit for {purchase.province} is paid (C${(purchase.amount_total / 100).toFixed(2)}).</div>
      : paid === "1" ? <div className="card" style={{ padding: 16, marginBottom: 16 }}>Payment received. Your kit unlocks in a few seconds. Refresh this page.</div> : null}
    <div className="prog"><span className="on" /><span /><span /><span /></div>
    <Receipt initialKit={purchase?.kit || kit || "used-car-truck"} checkoutOn={mode.enabled} /></div></section>;
}
