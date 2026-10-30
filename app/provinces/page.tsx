import Link from "next/link";
import type { Metadata } from "next";
import { PROVINCES } from "@/lib/data";
export const metadata: Metadata = { title: "Private vehicle sale rules by province", description: "How to sell a vehicle privately in Ontario, British Columbia and Alberta, with official sources. More provinces coming soon.", alternates: { canonical: "/provinces" } };
export default function Provinces() {
  return <section><div className="wrap"><p className="eyebrow">Canada-wide</p><h1>Private sale rules, province by province</h1><p className="lead">Every note is based on the official provincial source. Ontario, BC and Alberta kits are live; the rest are being verified.</p>
    <div className="grid g3">{PROVINCES.filter((p) => p.live).map((p) => <div key={p.code} className="card"><span className="tag">Live</span><h3><Link href={`/provinces/${p.slug}`}>{p.name}</Link></h3><p>{p.rule}</p><p className="src">Source: <a href={p.source} rel="nofollow">{new URL(p.source!).hostname}</a></p></div>)}</div>
    <h2 style={{ marginTop: 36 }}>Coming soon</h2><p>{PROVINCES.filter((p) => !p.live).map((p) => <span key={p.code} className="badge" style={{ margin: 4 }}>{p.name} · coming soon</span>)}</p></div></section>;
}
