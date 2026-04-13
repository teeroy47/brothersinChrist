import Link from "next/link";

import { SignInForm } from "@/components/auth-forms";

export default function SignInPage() {
  return (
    <div className="stack">
      <SignInForm />
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
