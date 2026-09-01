import type { NextConfig } from "next";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  turbopack: {
    root: process.cwd()
  },
  images: {
    unoptimized: true
  },
  basePath,
  assetPrefix: basePath || undefined,
  allowedDevOrigins: [
    "192.168.1.36",
    "192.168.*.*",
    "10.*.*.*",
    "172.*.*.*",
    "127.0.0.1",
    "*.local",
    "*.lan"
  ]
};

export default nextConfig;
