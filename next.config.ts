import type { NextConfig } from "next";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const securityHeaders = [
  {
    key: "Content-Security-Policy",
    value:
      "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self'; frame-ancestors 'none';",
  },
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
];

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  images: {
    unoptimized: true,
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
    "*.lan",
  ],
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
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
  },
};

export default nextConfig;
