import Link from "next/link";
import { Leaf } from "@/components/brand";
import { KITS } from "@/lib/data";
import { formatCad } from "@/lib/format";

export default function Home() {
  return (
    <>
      <div className="hero"><div className="wrap">
        <Leaf className="bigleaf" />
        <span className="badge"><Leaf /> Made for Canadian sellers, coast to coast · from the makers of BoatHandoff</span>
        <h1>Sell it privately,<br />hand it off cleanly.</h1>
        <p className="lead">Guided bill of sale, province-specific transfer checklist, inspection report and e-signatures for used cars, snowmobiles, ATVs, trailers and RVs. Both parties leave with a signed PDF.</p>
        <Link className="btn p" href="/kits">Choose your vehicle</Link>
        <Link className="btn s" href="/pricing">Free bill of sale</Link>
        <p className="src">✓ Ontario, BC &amp; Alberta live now — more provinces coming &nbsp; ✓ Rules cited from official sources &nbsp; ✓ No account needed for the free tier</p>
      </div></div>
      <section><div className="wrap">
        <p className="eyebrow">What are you selling?</p>
        <h2>Pick a vehicle, get the right paperwork</h2>
        <div className="grid g5">
          {KITS.map((k) => (
            <Link key={k.slug} className="card veh" href={`/kits/${k.slug}`}>
              <div className="ic">{k.icon}</div><h3>{k.name}</h3>
              <div className="src">Kit {formatCad(k.priceCents / 100)} · basic bill of sale free</div>
            </Link>
          ))}
        </div>
      </div></section>
      <section className="alt"><div className="wrap">
        <h2>How a handoff works</h2>
        <ol className="steps">
          <li><b>Tell us the vehicle and province.</b> We load the rules that apply — like Ontario&apos;s UVIP and 6-day registration window.</li>
          <li><b>Fill the guided bill of sale.</b> VIN check digit, odometer, lien disclosure and as-is wording.</li>
          <li><b>Walk the inspection together.</b> A photo checklist made for the vehicle type.</li>
          <li><b>Both sign on your phones.</b> Each party gets the signed PDF and a &quot;what to file next&quot; checklist.</li>
        </ol>
      </div></section>
      <section><div className="wrap grid g3">
        <div className="card"><h3>Province-accurate</h3><p>Every rule links to the official provincial source, so you know what the registry expects.</p></div>
        <div className="card"><h3>Safer handoffs</h3><p>Lien search links, payment-safety tips and a shared inspection record protect both sides.</p></div>
        <div className="card"><h3>Done in one visit</h3><p>Fill, inspect and sign in the driveway. No printer needed unless your province requires ink.</p></div>
      </div></section>
    </>
  );
}
