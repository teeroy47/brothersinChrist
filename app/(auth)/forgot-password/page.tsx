import Link from "next/link";

export default function ForgotPasswordPage() {
  return (
    <div className="card stack">
      <span className="eyebrow">Recovery</span>
      <h1 className="heading-lg">Reset access</h1>
      <p className="muted" style={{ margin: 0 }}>
        Connect this screen to your email provider or auth service. For the MVP scaffold, use the demo sign-in to inspect the full product flow.
      </p>
      <Link href="/signin" className="button">
        Back to sign in
      </Link>
    </div>
  );
}
