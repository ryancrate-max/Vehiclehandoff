import type { Metadata } from "next";
import { Receipt } from "@/components/receipt";
import { stripeMode } from "@/lib/payments";
export const metadata: Metadata = { title: "Start a kit", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";
export default async function Start({ searchParams }: { searchParams: Promise<{ kit?: string }> }) {
  const { kit } = await searchParams;
  const mode = stripeMode();
  return <section><div className="wrap" style={{ maxWidth: 680 }}><p className="eyebrow">Start a kit</p><h1>Start your handoff</h1>
    <div className="prog"><span className="on" /><span /><span /><span /></div>
    <Receipt initialKit={kit || "used-car-truck"} checkoutOn={mode.enabled} /></div></section>;
}
