"use client";

import { useState } from "react";
import { TOPICS } from "@/lib/contact-topics";

const field: React.CSSProperties = { width: "100%", maxWidth: "100%", boxSizing: "border-box", padding: "12px 14px", borderRadius: 12, border: "1px solid #ffe0cc", fontSize: 16, background: "#fff" };
const label: React.CSSProperties = { display: "grid", gap: 6, fontWeight: 600, color: "#1b1446", fontSize: 15 };

export function ContactForm({ initialSale = "", initialTopic = "" }: { initialSale?: string; initialTopic?: string }) {
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("sending");
    const data = Object.fromEntries(new FormData(event.currentTarget).entries());
    const res = await fetch("/api/contact", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(data) });
    if (res.ok) {
      setState("sent");
    } else {
      const json = (await res.json().catch(() => ({}))) as { error?: string };
      setError(json.error || "Something went wrong. Please email support@vehiclehandoff.ca.");
      setState("error");
    }
  }

  if (state === "sent") {
    return (
      <div className="card feat" role="status">
        <h3>Thanks, we got your message</h3>
        <p>We usually reply within one business day, to the email you gave us.</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="card" style={{ display: "grid", gap: 16 }}>
      <label style={label}>Your name<input style={field} name="name" required autoComplete="name" /></label>
      <label style={label}>Email<input style={field} name="email" type="email" required autoComplete="email" /></label>
      <label style={label}>Kit order number <span style={{ fontWeight: 400, color: "#4d6178" }}>(optional, from your receipt)</span><input style={field} name="saleNumber" defaultValue={initialSale} /></label>
      <label style={label}>Topic
        <select style={field} name="topic" required defaultValue={TOPICS.includes(initialTopic as (typeof TOPICS)[number]) ? initialTopic : ""}>
          <option value="" disabled>Choose a topic</option>
          {TOPICS.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
      </label>
      <label style={label}>Message<textarea style={{ ...field, minHeight: 140 }} name="message" required /></label>
      <div aria-hidden="true" style={{ position: "absolute", left: "-10000px", width: 1, height: 1, overflow: "hidden" }}>
        <label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
      </div>
      {state === "error" ? <p style={{ color: "#c0392b", margin: 0 }}>{error}</p> : null}
      <button className="btn btn-wrap" type="submit" disabled={state === "sending"}>{state === "sending" ? "Sending..." : "Send message"}</button>
    </form>
  );
}
