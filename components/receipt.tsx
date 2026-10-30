"use client";
import { useState } from "react";
import { PROVINCES, KITS } from "@/lib/data";
import { quote, HST_NUMBER } from "@/lib/tax";
import { formatCad } from "@/lib/format";

/** Receipt preview, same approach as BoatHandoff's KitReceipt: subtotal + GST/HST line by buyer province. Checkout is off. */
export function Receipt({ initialKit = "used-car-truck", checkoutOn = false }: { initialKit?: string; checkoutOn?: boolean }) {
  const [kit, setKit] = useState(initialKit);
  const [prov, setProv] = useState("");
  const k = KITS.find((x) => x.slug === kit) ?? KITS[0];
  const q = quote(k.priceCents, prov);
  return (
    <div className="card receipt">
      <div className="row">
        <div>
          <label htmlFor="kit">Vehicle kit</label>
          <select id="kit" value={kit} onChange={(e) => setKit(e.target.value)}>
            {KITS.map((x) => <option key={x.slug} value={x.slug}>{x.name} — {formatCad(x.priceCents / 100)}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="prov">Buyer&apos;s province</label>
          <select id="prov" value={prov} onChange={(e) => setProv(e.target.value)}>
            <option value="">Select</option>
            {PROVINCES.map((p) => <option key={p.code} value={p.code}>{p.name}{p.live ? "" : " (coming soon)"}</option>)}
          </select>
        </div>
      </div>
      {q ? (
        <dl>
          <dt>{k.name} kit</dt><dd>{formatCad(q.subtotalCents / 100)}</dd>
          <dt>{q.label} {q.ratePercent}% ({q.province})</dt><dd>{formatCad(q.taxCents / 100)}</dd>
          <dt className="t">Total</dt><dd className="t">{formatCad(q.totalCents / 100)}</dd>
        </dl>
      ) : <p className="src">Choose the buyer&apos;s province to calculate the tax line.</p>}
      <p className="src">GST/HST # {HST_NUMBER}</p>
      {checkoutOn ? <button className="btn p">Continue to payment</button> : <p className="note"><b>Paid kits are coming soon.</b> Checkout is off — no payment can be taken yet. The free basic bill of sale is available now.</p>}
    </div>
  );
}
