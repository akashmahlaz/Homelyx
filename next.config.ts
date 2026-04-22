import createNextIntlPlugin from "next-intl/plugin";
import type { NextConfig } from "next";

const withNextIntl = createNextIntlPlugin({
  requestConfig: "./i18n/request.ts",
});

const nextConfig: NextConfig = {
  experimental: {
    ppr: true,
    inlineCss: true,
    useCache: true,
  },
  images: {
    formats: ["image/avif", "image/webp"] as const,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.shopify.com",
        pathname: "/s/files/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
};

export default withNextIntl(nextConfig);