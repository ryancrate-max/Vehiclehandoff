import { contactEmailHtml, contactEmailSubject, contactEmailText } from "./contact-email";
import { appendFile, mkdir } from "fs/promises";
import path from "path";
import { db as getD1 } from "./purchases";

import { TOPICS } from "./contact-topics";
export { TOPICS };
export const SUPPORT_TO = "ryan@cratemb.com";

export type ContactMessage = {
  id: string;
  createdAt: string;
  name: string;
  email: string;
  saleNumber: string;
  topic: string;
  subject: string;
  message: string;
  emailed: boolean;
};

export function validateContact(body: Record<string, unknown>):
  | { ok: true; value: Omit<ContactMessage, "id" | "createdAt" | "emailed"> }
  | { ok: false; error: string } {
  const str = (k: string, max: number) => String(body[k] ?? "").trim().slice(0, max);
  const name = str("name", 120);
  const email = str("email", 200);
  const saleNumber = str("saleNumber", 40);
  const topic = str("topic", 60);
  const subject = str("subject", 200);
  const message = str("message", 5000);
  if (!name) return { ok: false, error: "Please add your name." };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { ok: false, error: "Please add a valid email." };
  if (!(TOPICS as readonly string[]).includes(topic)) return { ok: false, error: "Please pick a topic." };
  if (message.length < 5) return { ok: false, error: "Please write a short message." };
  return { ok: true, value: { name, email, saleNumber, topic, subject: subject || `VehicleHandoff: ${topic}`, message } };
}

export async function storeContact(msg: ContactMessage): Promise<void> {
  const db = getD1();
  if (db) {
    await db.prepare(
      `CREATE TABLE IF NOT EXISTS contact_messages (
        id TEXT PRIMARY KEY, created_at TEXT NOT NULL, name TEXT NOT NULL, email TEXT NOT NULL,
        sale_number TEXT, topic TEXT NOT NULL, subject TEXT, message TEXT NOT NULL, emailed INTEGER NOT NULL DEFAULT 0)`,
    ).bind().run();
    await db
      .prepare(
        "INSERT INTO contact_messages (id, created_at, name, email, sale_number, topic, subject, message, emailed) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
      )
      .bind(msg.id, msg.createdAt, msg.name, msg.email, msg.saleNumber, msg.topic, msg.subject, msg.message, msg.emailed ? 1 : 0)
      .run();
    return;
  }
  const dir = process.env.SALE_DATA_DIR || path.join(process.cwd(), "data");
  await mkdir(dir, { recursive: true });
  await appendFile(path.join(dir, "contact-messages.jsonl"), JSON.stringify(msg) + "\n");
}

type Fetcher = { fetch(input: string, init?: RequestInit): Promise<Response> };

function mailer(): Fetcher | null {
  const holder = globalThis as typeof globalThis & { [key: symbol]: { env?: { MAILER?: Fetcher } } | undefined };
  return holder[Symbol.for("__cloudflare-context__")]?.env?.MAILER ?? null;
}

/** Sends the notification to SUPPORT_TO via the private vehiclehandoff-mailer Worker (service binding MAILER). */
export async function emailContact(msg: ContactMessage): Promise<boolean> {
  const svc = mailer();
  if (!svc) return false;
  const res = await svc.fetch("https://mailer.internal/send", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      subject: contactEmailSubject(msg),
      html: contactEmailHtml(msg),
      text: contactEmailText(msg),
      replyTo: msg.email,
      replyName: msg.name,
    }),
  });
  const json = (await res.json().catch(() => ({}))) as { ok?: boolean; code?: string; error?: string };
  if (!json.ok) console.error("contact email failed", res.status, json.code, json.error);
  return Boolean(json.ok);
}
