import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin({
  requestConfig: "./i18n/request.ts",
});

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"] as const,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "*",
      },
      
    ],
  },
};

export default withNextIntl(nextConfig);