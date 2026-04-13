import Link from "next/link";

import { SignUpForm } from "@/components/auth-forms";

export default function SignUpPage() {
  return (
    <div className="stack">
      <SignUpForm />
      <Link href="/signin" className="muted">
        Already have an account?
      </Link>
    </div>
  );
}
