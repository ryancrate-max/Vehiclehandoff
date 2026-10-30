import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GUIDES, PROVINCES } from "@/lib/data";
import { JsonLd } from "@/components/brand";
import { siteUrl } from "@/lib/site";
export function generateStaticParams() { return GUIDES.map((g) => ({ slug: g.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const g = GUIDES.find((x) => x.slug === slug);
  return g ? { title: g.title, description: g.desc, alternates: { canonical: `/guides/${g.slug}` }, openGraph: { type: "article", title: g.title, description: g.desc } } : {};
}
export default async function Guide({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const g = GUIDES.find((x) => x.slug === slug);
  if (!g) notFound();
  const p = PROVINCES.find((x) => x.code === g.province)!;
  return <section><div className="wrap prose">
    <JsonLd data={{ "@context": "https://schema.org", "@type": "Article", headline: g.title, description: g.desc, inLanguage: "en-CA", url: `${siteUrl()}/guides/${g.slug}`, publisher: { "@id": `${siteUrl()}/#org` }, datePublished: "2026-10-28" }} />
    <p className="eyebrow">Guide · {p.name}</p><h1>{g.title}</h1><p className="lead">{g.desc}</p>
    <h2>The official rule</h2><p>{p.rule}</p><p className="src">Source: <a href={p.source} rel="nofollow">{p.source}</a></p>
    <h2>How VehicleHandoff helps</h2><p>Your kit walks both parties through the bill of sale, inspection and signatures, then gives the buyer a checklist of what to take to the registry.</p>
    <p><Link className="btn p" href={`/provinces/${p.slug}`}>See {p.name} kits</Link></p>
    <p className="src">This guide is general information, not legal advice. Always confirm with the official source.</p>
  </div></section>;
}
