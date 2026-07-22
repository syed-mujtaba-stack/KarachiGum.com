import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  // Note: 'output: standalone' is NOT needed for Vercel — Vercel handles packaging automatically.
  // It's only needed for Docker/self-hosted deployments.
  serverExternalPackages: ["@google-analytics/data"],
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn.sanity.io" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
};

export default nextConfig;

