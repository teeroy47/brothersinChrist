import Link from "next/link";

import { SignInForm } from "@/components/auth-forms";

export default function SignInPage() {
  return (
    <div className="stack">
      <SignInForm />
      <div className="row" style={{ justifyContent: "center", gap: "24px" }}>
        <Link href="/forgot-password" className="muted" style={{ fontSize: "0.9rem" }}>
          Forgot password?
        </Link>
        <Link href="/signup" className="muted" style={{ fontSize: "0.9rem" }}>
          Need an account?
        </Link>
      </div>
    </div>
  );
}
