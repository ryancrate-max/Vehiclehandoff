import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  poweredByHeader: false,
  async redirects() {
    // Exact host matches only: *.vehiclehandoff.pages.dev preview aliases are NOT redirected.
    return [
      { source: "/:path*", has: [{ type: "host", value: "vehiclehandoff.pages.dev" }], destination: "https://vehiclehandoff.ca/:path*", permanent: true },
      { source: "/:path*", has: [{ type: "host", value: "www.vehiclehandoff.ca" }], destination: "https://vehiclehandoff.ca/:path*", permanent: true },
    ];
  },
  async headers() {
    return [
      { source: "/:path*", headers: [
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        { key: "X-Frame-Options", value: "SAMEORIGIN" },
      ] },
      ...["/start", "/sale/:path*", "/sign/:path*", "/api/:path*"].map((source) => ({ source, headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] })),
    ];
  },
};
export default nextConfig;
