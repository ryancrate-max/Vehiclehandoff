import type { Metadata } from "next";
import { ContactForm } from "./contact-form";
export const metadata: Metadata = {
  title: "Contact VehicleHandoff",
  description: "Questions about your vehicle sale kit, a payment, or an ownership transfer? Send VehicleHandoff a message.",
  alternates: { canonical: "/contact" },
};
export default async function ContactPage({ searchParams }: { searchParams: Promise<{ sale?: string; topic?: string }> }) {
  const { sale, topic } = await searchParams;
  return <section><div className="wrap" style={{ maxWidth: 640 }}>
    <p className="eyebrow">Contact</p><h1>Contact us</h1>
    <p>A real person reads every message. We usually reply within one business day.</p>
    <ContactForm initialSale={(sale || "").slice(0, 40)} initialTopic={topic || (sale ? "Problem with my kit" : "")} />
    <p style={{ marginTop: 20 }}>Or email support@vehiclehandoff.ca</p>
    <p style={{ fontSize: ".9rem", color: "#5a5470" }}>VehicleHandoff is not a law firm and doesn&apos;t give legal advice. We are not a provincial registry and can&apos;t process ownership transfers for you.</p>
  </div></section>;
}
