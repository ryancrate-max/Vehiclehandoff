import type { Metadata } from "next";
import { FAQ } from "@/lib/data";
import { JsonLd } from "@/components/brand";
export const metadata: Metadata = { title: "FAQ", description: "Answers about private vehicle sales, bills of sale and VehicleHandoff kits in Canada.", alternates: { canonical: "/faq" } };
export default function Faq() {
  return <section><div className="wrap prose">
    <JsonLd data={{ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: FAQ.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })) }} />
    <p className="eyebrow">FAQ</p><h1>Questions, answered</h1>{FAQ.map(([q, a]) => <details key={q} open><summary>{q}</summary><p>{a}</p></details>)}</div></section>;
}
