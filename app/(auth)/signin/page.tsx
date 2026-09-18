import Link from "next/link";
import { Suspense } from "react";

import { SignInForm } from "@/components/auth-forms";

export default function SignInPage() {
  return (
    <div className="auth-form-wrap stack">
      <Suspense fallback={<div className="card" style={{ padding: 24, textAlign: "center" }}>Loading form...</div>}>
        <SignInForm />
      </Suspense>
      <div className="row" style={{ justifyContent: "space-between" }}>
        <Link href="/forgot-password" className="muted">
          Forgot password
        </Link>
        <Link href="/signup" className="muted">
          Need an account?
        </Link>
      </div>
    </div>
  );
}
