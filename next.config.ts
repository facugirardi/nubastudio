import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // El layout raíz vive en app/[lang]: las URLs que no existen se resuelven en app/global-not-found.tsx.
    globalNotFound: true,
    // El CSS de la app pesa ~4 KB: en el <head> evita una petición que bloquea el primer render.
    inlineCss: true,
  },
  turbopack: {
    resolveAlias: {
      // Next mete siempre sus polyfills de 2019 (~14 KB sin comprimir); ver app/lib/polyfill-baseline.ts.
      "../build/polyfills/polyfill-module": "./app/lib/polyfill-baseline.ts",
    },
  },
  poweredByHeader: false,
  compress: true,
  images: {
    formats: ["image/webp"],
    qualities: [90, 95],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
      {
        source: "/images/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },
};

export default nextConfig;
