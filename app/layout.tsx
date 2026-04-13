import type { ReactNode } from "react";
import type { Metadata } from "next";

import "@/app/globals.css";
import { SessionProvider } from "@/components/session-provider";

export const metadata: Metadata = {
  title: "Brothers In Christ",
  description: "A structured discipleship system for Christian men."
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
