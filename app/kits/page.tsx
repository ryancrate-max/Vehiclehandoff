import Link from "next/link";
import type { Metadata } from "next";
import { KITS } from "@/lib/data";
import { formatCad } from "@/lib/format";
export const metadata: Metadata = { title: "Private sale kits by vehicle", description: "Bill of sale and transfer kits for used cars, trucks, snowmobiles, ATVs, trailers and RVs sold privately in Canada.", alternates: { canonical: "/kits" } };
export default function Kits() {
  return <section><div className="wrap"><p className="eyebrow">Kits</p><h1>Private sale kits by vehicle</h1>
    <div className="grid g3">{KITS.map((k) => <Link key={k.slug} className="card veh" style={{ textAlign: "left" }} href={`/kits/${k.slug}`}><div className="ic">{k.icon}</div><h3>{k.name}</h3><p>{k.blurb}</p><p className="price">{formatCad(k.priceCents / 100)}</p></Link>)}</div></div></section>;
}
