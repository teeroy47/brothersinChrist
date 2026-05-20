import type { ReactNode } from "react";
import type { Metadata, Viewport } from "next";

import "@/app/globals.css";
import { SessionProvider } from "@/components/session-provider";
import { ScrollReveal } from "@/components/scroll-reveal";

export const metadata: Metadata = {
  title: "Brothers In Christ",
  description: "A structured discipleship brotherhood for Christian men."
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ScrollReveal />
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
