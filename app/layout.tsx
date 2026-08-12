import type { ReactNode } from "react";
import type { Metadata, Viewport } from "next";

import "@/app/globals.css";
import { SessionProvider } from "@/components/session-provider";
import { ScrollReveal } from "@/components/scroll-reveal";

export const metadata: Metadata = {
  title: "Brothers In Christ",
  description: "A structured discipleship brotherhood for Christian men.",
  icons: {
    icon: [
      { url: "/icon.png", sizes: "512x512", type: "image/png" }
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" }
    ]
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <ScrollReveal />
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
