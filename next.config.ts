import type { NextConfig } from "next";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
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
  ],
  async redirects() {
    return [
      { source: "/home", destination: "/portal/dashboard", permanent: false },
      { source: "/check-in", destination: "/portal/check-in", permanent: false },
      { source: "/levels", destination: "/portal/levels", permanent: false },
      { source: "/groups", destination: "/portal/circle", permanent: false },
      { source: "/attendance", destination: "/portal/attendance", permanent: false },
      { source: "/profile", destination: "/portal/profile", permanent: false },
      { source: "/progress", destination: "/portal/dashboard", permanent: false },
      { source: "/community", destination: "/portal/circle", permanent: false },
      { source: "/leader", destination: "/leadership/overview", permanent: false },
      { source: "/admin", destination: "/leadership/overview", permanent: false },
    ];
  }
};

export default nextConfig;
