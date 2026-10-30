import type { MetadataRoute } from "next";
import { GUIDES, KITS, PROVINCES } from "@/lib/data";
import { siteUrl } from "@/lib/site";
export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl();
  const now = new Date("2026-10-28");
  const paths = ["", "/kits", "/provinces", "/pricing", "/faq", "/guides", "/privacy", "/terms",
    ...KITS.map((k) => `/kits/${k.slug}`), ...PROVINCES.filter((p) => p.live).map((p) => `/provinces/${p.slug}`), ...GUIDES.map((g) => `/guides/${g.slug}`)];
  return paths.map((p) => ({ url: `${base}${p || "/"}`, lastModified: now, changeFrequency: p === "" ? "weekly" : "monthly", priority: p === "" ? 1 : p.startsWith("/kits/") || p.startsWith("/provinces/") ? 0.8 : 0.6 }));
}
