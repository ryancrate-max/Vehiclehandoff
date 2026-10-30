export function siteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL || "https://vehiclehandoff.ca";
  return raw.replace(/\/$/, "");
}
export const SITE_NAME = "VehicleHandoff";
export const SITE_DESCRIPTION =
  "Private-sale kits for Canadians selling or buying a used car, snowmobile, ATV, trailer or RV: guided bill of sale, province transfer checklist, inspection report and e-signatures.";
