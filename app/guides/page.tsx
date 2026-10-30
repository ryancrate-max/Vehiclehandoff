import Link from "next/link";
import type { Metadata } from "next";
import { GUIDES } from "@/lib/data";
export const metadata: Metadata = { title: "Guides to selling a vehicle privately in Canada", description: "Plain-English guides to private vehicle sales in Ontario, BC and Alberta.", alternates: { canonical: "/guides" } };
export default function Guides() {
  return <section><div className="wrap"><p className="eyebrow">Guides</p><h1>Plain-English guides</h1><div className="grid g3">{GUIDES.map((g) => <Link key={g.slug} className="card veh" style={{ textAlign: "left" }} href={`/guides/${g.slug}`}><p className="eyebrow">Guide</p><h3>{g.title}</h3><p className="src">{g.desc}</p></Link>)}</div><p className="src" style={{ marginTop: 18 }}>More guides are added every couple of weeks.</p></div></section>;
}
