import type { ReactNode } from "react";
import { BrandMark } from "@/components/brand-mark";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <main className="auth-page section">
      <div className="container auth-shell">
        <div className="auth-logo-wrap">
          <BrandMark />
          <p>Brothers In Christ</p>
        </div>
        {children}
      </div>
    </main>
  );
}
