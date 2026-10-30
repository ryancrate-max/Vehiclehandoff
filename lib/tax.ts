/** Same province tax logic as BoatHandoff (lib/tax.ts), priced per vehicle kit. */
export const HST_NUMBER = "80698 3383 RT0001";

const HST_15 = new Set(["NB", "NL", "PE"]);
const GST_5 = new Set(["AB", "BC", "MB", "SK", "QC", "YT", "NT", "NU"]);

export type TaxQuote = {
  province: string;
  label: "HST" | "GST";
  rate: number;
  ratePercent: number;
  subtotalCents: number;
  taxCents: number;
  totalCents: number;
  hstNumber: string;
};

export function taxRule(province: string): { label: "HST" | "GST"; rate: number } | null {
  const code = province.trim().toUpperCase();
  if (code === "ON") return { label: "HST", rate: 0.13 };
  if (code === "NS") return { label: "HST", rate: 0.14 };
  if (HST_15.has(code)) return { label: "HST", rate: 0.15 };
  if (GST_5.has(code)) return { label: "GST", rate: 0.05 };
  return null;
}

export function quote(subtotalCents: number, province: string): TaxQuote | null {
  const rule = taxRule(province);
  if (!rule) return null;
  const taxCents = Math.round(subtotalCents * rule.rate);
  return {
    province: province.trim().toUpperCase(),
    label: rule.label,
    rate: rule.rate,
    ratePercent: Math.round(rule.rate * 100),
    subtotalCents,
    taxCents,
    totalCents: subtotalCents + taxCents,
    hstNumber: HST_NUMBER,
  };
}
