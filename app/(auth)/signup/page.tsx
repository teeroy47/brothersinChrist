import Link from "next/link";

import { SignUpForm } from "@/components/auth-forms";

export default function SignUpPage() {
  return (
    <div className="stack">
      <SignUpForm />
      <div className="row" style={{ justifyContent: "center" }}>
        <Link href="/signin" className="muted" style={{ fontSize: "0.9rem" }}>
          Already have an account? Sign in
        </Link>
      </div>
    </div>
  );
}
