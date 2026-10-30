import { NextResponse } from "next/server";

export function jsonError(error: string, status = 400) {
  return NextResponse.json({ error }, { status });
}

export function requestKey(req: Request): string {
  const url = new URL(req.url);
  return req.headers.get("x-sale-key") || url.searchParams.get("key") || "";
}

export function torontoYear(date = new Date()): number {
  return Number(new Intl.DateTimeFormat("en-CA", { timeZone: "America/Toronto", year: "numeric" }).format(date));
}
