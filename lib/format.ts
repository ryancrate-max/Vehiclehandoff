export function parsePrice(input: string): number | null {
  const cleaned = input.replace(/[$,\s]/g, "").replace(/cad/gi, "").replace(/^c/i, "");
  if (!/^\d+(\.\d{1,2})?$/.test(cleaned)) return null;
  const value = Number(cleaned);
  if (!Number.isFinite(value) || value <= 0 || value > 100_000_000) return null;
  return Math.round(value * 100) / 100;
}

export function formatCad(amount: number): string {
  const [whole, frac] = amount.toFixed(2).split(".");
  const withCommas = whole.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return `C$${withCommas}.${frac}`;
}

export function postalOk(postal: string): boolean {
  return /^[A-Z]\d[A-Z]\s?\d[A-Z]\d$/i.test(postal.trim());
}

export function formatPostal(postal: string): string {
  const compact = postal.toUpperCase().replace(/\s+/g, "");
  if (compact.length !== 6) return postal.trim();
  return `${compact.slice(0, 3)} ${compact.slice(3)}`;
}

export function hinOk(hin: string): boolean {
  return /^[A-Z0-9]{12}$/i.test(hin.trim());
}

export function addDays(isoDate: string, days: number): string {
  const [year, month, day] = isoDate.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}

export function formatLongDate(isoDate: string): string {
  const [year, month, day] = isoDate.split("-").map(Number);
  if (!year || !month || !day) return isoDate;
  return new Intl.DateTimeFormat("en-CA", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(year, month - 1, day)));
}

export function formatSignedAt(iso: string): string {
  const date = new Date(iso);
  const day = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Toronto",
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
  const time = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Toronto",
    hour: "numeric",
    minute: "2-digit",
    hourCycle: "h23",
  }).format(date);
  return `${day} ${time} ET`;
}

export function formatAddress(parts: { address: string; city: string; province: string; postal: string }): string {
  const region = [parts.province, parts.postal].filter(Boolean).join(" ");
  const cityLine = [parts.city, region].filter(Boolean).join(", ");
  return [parts.address, cityLine].filter(Boolean).join(", ");
}

export function boatTitle(boat: { year: string; make: string; model: string }): string {
  return [boat.year, boat.make, boat.model].filter(Boolean).join(" ").trim();
}

export function clip(value: string, max: number): string {
  const trimmed = value.trim();
  return trimmed.length > max ? trimmed.slice(0, max) : trimmed;
}
