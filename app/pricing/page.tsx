import type { Metadata } from "next";
import { Receipt } from "@/components/receipt";
export const metadata: Metadata = { title: "Pricing", description: "Free basic bill of sale. Snowmobile, ATV and trailer kits C$19, car and truck C$29, RV C$39, plus GST/HST.", alternates: { canonical: "/pricing" } };
export default function Pricing() {
  return <section><div className="wrap"><p className="eyebrow">Pricing</p><h1>Simple, one-time prices</h1>
    <div className="grid g3">
      <div className="card"><h3>Basic</h3><div className="price">Free</div><ul className="feat"><li>Bill of sale PDF</li><li>Province checklist</li><li>Print &amp; sign on paper</li></ul></div>
      <div className="card hl"><h3>Kit</h3><div className="price">C$19–29</div><p className="src">Snowmobile, ATV, trailer C$19 · car/truck C$29</p><ul className="feat"><li>Guided bill of sale</li><li>Inspection photo report</li><li>E-signatures, both parties</li><li>Deadline reminders</li></ul></div>
      <div className="card"><h3>RV &amp; camper</h3><div className="price">C$39</div><ul className="feat"><li>Everything in Kit</li><li>RV/camper inspection list</li><li>Payment-safety guide</li></ul></div>
    </div>
    <h2 style={{ marginTop: 36 }}>See your total</h2><div style={{ maxWidth: 560 }}><Receipt /></div></div></section>;
}
