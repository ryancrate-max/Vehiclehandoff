import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { KITS, PROVINCES } from "@/lib/data";
import { formatCad } from "@/lib/format";
import { JsonLd } from "@/components/brand";
import { Receipt } from "@/components/receipt";
import { siteUrl } from "@/lib/site";

export function generateStaticParams() { return KITS.map((k) => ({ slug: k.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const k = KITS.find((x) => x.slug === slug);
  if (!k) return {};
  return { title: `${k.name} bill of sale & private sale kit (Canada)`, description: `${k.blurb} ${formatCad(k.priceCents / 100)} + tax. Free basic bill of sale.`, alternates: { canonical: `/kits/${k.slug}` } };
}
export default async function KitPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const k = KITS.find((x) => x.slug === slug);
  if (!k) notFound();
  const base = siteUrl();
  return (
    <section><div className="wrap">
      <JsonLd data={{ "@context": "https://schema.org", "@type": "Product", name: `VehicleHandoff ${k.name} kit`, description: k.blurb, brand: { "@type": "Brand", name: "VehicleHandoff" }, url: `${base}/kits/${k.slug}`,
        offers: { "@type": "Offer", priceCurrency: "CAD", price: (k.priceCents / 100).toFixed(2), availability: "https://schema.org/PreOrder", url: `${base}/kits/${k.slug}` } }} />
      <JsonLd data={{ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
        { "@type": "ListItem", position: 1, name: "Kits", item: `${base}/kits` }, { "@type": "ListItem", position: 2, name: k.name, item: `${base}/kits/${k.slug}` }] }} />
      <p className="eyebrow">{k.icon} Kit</p>
      <h1>{k.name} bill of sale &amp; private sale kit</h1>
      <p className="lead">{k.blurb}</p>
      <div className="grid g3" style={{ marginTop: 24 }}>
        <div className="card"><h3>What the kit checks</h3><ul className="feat">{k.checklist.map((c) => <li key={c}>{c}</li>)}</ul></div>
        <div className="card"><h3>Pick your province</h3><ul className="feat">{PROVINCES.map((p) => <li key={p.code}>{p.live ? <Link href={`/provinces/${p.slug}`}>{p.name}</Link> : <span className="soon">{p.name}</span>} {p.live ? <span className="tag">Live</span> : <span className="tag off">Coming soon</span>}</li>)}</ul></div>
        <Receipt initialKit={k.slug} />
      </div>
    </div></section>
  );
}
