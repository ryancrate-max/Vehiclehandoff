import { NextResponse } from "next/server";
import { getPurchase } from "@/lib/purchases";

/** Kit access check: unlocked once the webhook recorded the paid session. */
export async function GET(req: Request) {
  const id = new URL(req.url).searchParams.get("session_id") || "";
  const p = await getPurchase(id);
  if (!p) return NextResponse.json({ unlocked: false });
  return NextResponse.json({ unlocked: true, kit: p.kit, province: p.province, amountTotal: p.amount_total, currency: p.currency, paidAt: p.created_at });
}
