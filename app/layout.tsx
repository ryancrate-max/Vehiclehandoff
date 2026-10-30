import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { Header, Footer, JsonLd } from "@/components/brand";
import { SITE_DESCRIPTION, siteUrl } from "@/lib/site";
import "./site.css";

const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"], variable: "--font-jakarta", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: { default: "VehicleHandoff — Private vehicle sale kits for Canada", template: "%s | VehicleHandoff" },
  description: SITE_DESCRIPTION,
  applicationName: "VehicleHandoff",
  alternates: { canonical: "/" },
  openGraph: { type: "website", locale: "en_CA", siteName: "VehicleHandoff", title: "VehicleHandoff — Private vehicle sale kits for Canada", description: SITE_DESCRIPTION, url: "/" },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const base = siteUrl();
  return (
    <html lang="en-CA" className={jakarta.variable}>
      <body>
        <JsonLd data={{ "@context": "https://schema.org", "@graph": [
          { "@type": "Organization", "@id": `${base}/#org`, name: "VehicleHandoff", url: base, logo: `${base}/icon.svg`, areaServed: "CA" },
          { "@type": "WebSite", "@id": `${base}/#site`, name: "VehicleHandoff", url: base, inLanguage: "en-CA", publisher: { "@id": `${base}/#org` } },
        ] }} />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
