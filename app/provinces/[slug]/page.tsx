import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { KITS, PROVINCES } from "@/lib/data";
import { JsonLd } from "@/components/brand";
import { siteUrl } from "@/lib/site";
import { taxRule } from "@/lib/tax";

export function generateStaticParams() { return PROVINCES.map((p) => ({ slug: p.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = PROVINCES.find((x) => x.slug === slug);
  if (!p) return {};
  return { title: `How to sell a vehicle privately in ${p.name}`, description: p.live ? `Bill of sale, transfer steps and checklists for selling a car, snowmobile, ATV, trailer or RV privately in ${p.name}.` : `VehicleHandoff kits for ${p.name} are coming soon.`,
    alternates: { canonical: `/provinces/${p.slug}` }, robots: p.live ? undefined : { index: false, follow: true } };
}
export default async function ProvincePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = PROVINCES.find((x) => x.slug === slug);
  if (!p) notFound();
  const base = siteUrl();
  const t = taxRule(p.code);
  return <section><div className="wrap prose">
    <JsonLd data={{ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Provinces", item: `${base}/provinces` }, { "@type": "ListItem", position: 2, name: p.name, item: `${base}/provinces/${p.slug}` }] }} />
    <p className="eyebrow">{p.name}</p><h1>Selling a vehicle privately in {p.name}</h1>
    {p.live ? <>
      <p className="lead">{p.rule}</p>
      <p className="src">Source: <a href={p.source} rel="nofollow">{p.source}</a></p>
      <h2>Kits for {p.name}</h2>
      <ul className="feat">{KITS.map((k) => <li key={k.slug}><Link href={`/kits/${k.slug}`}>{k.name} kit</Link></li>)}</ul>
      {t && <p className="note">VehicleHandoff kits bought by a {p.name} buyer include {t.label} at {Math.round(t.rate * 100)}%. Vehicle sales tax owed to the province is separate and paid at registration.</p>}
    </> : <p className="note"><b>Coming soon.</b> We&apos;re verifying {p.name}&apos;s rules against official sources before launching kits here. A free basic bill of sale still works anywhere in Canada.</p>}
  </div></section>;
}
