import { NextResponse } from "next/server";
import { jsonError } from "@/lib/http";
import { emailContact, storeContact, validateContact, type ContactMessage } from "@/lib/contact";

export const runtime = "nodejs";

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return jsonError("Invalid request.");
  }
  // Honeypot: real people never fill the hidden "website" field.
  if (String(body.website ?? "").trim()) return NextResponse.json({ ok: true });
  const result = validateContact(body);
  if (!result.ok) return jsonError(result.error);
  const msg: ContactMessage = {
    ...result.value,
    id: `cm_${crypto.randomUUID().replace(/-/g, "")}`,
    createdAt: new Date().toISOString(),
    emailed: false,
  };
  try {
    msg.emailed = await emailContact(msg);
  } catch {
    msg.emailed = false;
  }
  try {
    await storeContact(msg);
  } catch {
    if (!msg.emailed) return jsonError("Sorry, we couldn't send that. Please email support@vehiclehandoff.ca.", 500);
  }
  return NextResponse.json({ ok: true, id: msg.id, emailed: msg.emailed });
}

export async function GET() {
  return jsonError("Send a message with POST.", 405);
}
