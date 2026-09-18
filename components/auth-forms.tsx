"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { ShieldCheck, UserPlus, AlertCircle, ArrowRight } from "lucide-react";
import { useAuthStore } from "@/src/stores/auth-store";

export function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next");
  const { signIn } = useAuthStore();

  const [email, setEmail] = useState("admin@bic.app");
  const [password, setPassword] = useState("admin1234");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await signIn(email, password);
      if (!res.success) {
        setError(res.error || "Sign in failed.");
        setLoading(false);
        return;
      }

      const target = next || (res.user?.role === "ADMIN" ? "/leadership/overview" : "/portal/dashboard");
      router.push(target);
    } catch {
      setError("An unexpected error occurred. Please try again.");
      setLoading(false);
    }
  };

  return (
    <form className="card stack" onSubmit={handleSubmit}>
      <div className="stack-sm">
        <div className="row" style={{ gap: 8 }}>
          <ShieldCheck size={18} style={{ color: "var(--gold)" }} />
          <span className="eyebrow" style={{ color: "var(--gold)" }}>Console Access</span>
        </div>
        <h1 className="heading-lg" style={{ margin: 0 }}>Sign in to BIC</h1>
        <p className="muted" style={{ margin: 0, fontSize: "0.92rem" }}>
          Enter your registered email and password to access your discipleship portal.
        </p>
      </div>

      {error && (
        <div
          className="row"
          style={{
            background: "rgba(197, 48, 48, 0.1)",
            border: "1px solid rgba(197, 48, 48, 0.3)",
            color: "#c53030",
            padding: "10px 14px",
            borderRadius: 12,
            fontSize: "0.85rem",
            gap: 8,
          }}
        >
          <AlertCircle size={16} style={{ flexShrink: 0 }} />
          <span>{error}</span>
        </div>
      )}

      <div className="card stack-sm" style={{ background: "rgba(182, 139, 53, 0.08)", borderColor: "rgba(182, 139, 53, 0.25)", padding: 12 }}>
        <span className="eyebrow" style={{ color: "#5b4610", fontSize: "0.7rem" }}>
          Super Admin Credentials
        </span>
        <div className="row" style={{ gap: 12, fontSize: "0.82rem" }}>
          <span>Email: <strong>admin@bic.app</strong></span>
          <span>Password: <strong>admin1234</strong></span>
        </div>
      </div>

      <label className="field">
        <span style={{ fontWeight: 700, fontSize: "0.9rem" }}>Email address</span>
        <input
          name="email"
          type="email"
          placeholder="admin@bic.app"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>

      <label className="field">
        <span style={{ fontWeight: 700, fontSize: "0.9rem" }}>Password</span>
        <input
          name="password"
          type="password"
          placeholder="••••••••"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>

      <button
        className="button"
        type="submit"
        disabled={loading}
        style={{
          background: "var(--gold)",
          color: "#000",
          fontWeight: 800,
          marginTop: 6,
        }}
      >
        <span>{loading ? "Verifying..." : "Sign In"}</span>
        <ArrowRight size={16} style={{ marginLeft: 6 }} />
      </button>

      <div style={{ textAlign: "center", paddingTop: 8, borderTop: "1px solid var(--border)" }}>
        <p className="muted" style={{ fontSize: "0.82rem", margin: 0 }}>
          Don't have an account?{" "}
          <Link href="/signup" style={{ color: "var(--gold)", fontWeight: 700, textDecoration: "underline" }}>
            Sign up here
          </Link>
        </p>
      </div>
    </form>
  );
}

export function SignUpForm() {
  const router = useRouter();
  const { signUp } = useAuthStore();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    phone: "",
    city: "Harare",
    church: ""
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (!form.fullName.trim() || !form.email.trim() || !form.password) {
      setError("Please fill in all required fields.");
      setLoading(false);
      return;
    }

    try {
      const res = await signUp(form);
      if (!res.success) {
        setError(res.error || "Registration failed.");
        setLoading(false);
        return;
      }

      router.push("/portal/dashboard");
    } catch {
      setError("An unexpected error occurred. Please try again.");
      setLoading(false);
    }
  };

  return (
    <form className="card stack" onSubmit={handleSubmit}>
      <div className="stack-sm">
        <div className="row" style={{ gap: 8 }}>
          <UserPlus size={18} style={{ color: "var(--gold)" }} />
          <span className="eyebrow" style={{ color: "var(--gold)" }}>New Brother Registration</span>
        </div>
        <h1 className="heading-lg" style={{ margin: 0 }}>Join the Brotherhood</h1>
        <p className="muted" style={{ margin: 0, fontSize: "0.92rem" }}>
          Create your account to be placed into a discipleship circle and start Level 1 formation.
        </p>
      </div>

      {error && (
        <div
          className="row"
          style={{
            background: "rgba(197, 48, 48, 0.1)",
            border: "1px solid rgba(197, 48, 48, 0.3)",
            color: "#c53030",
            padding: "10px 14px",
            borderRadius: 12,
            fontSize: "0.85rem",
            gap: 8,
          }}
        >
          <AlertCircle size={16} style={{ flexShrink: 0 }} />
          <span>{error}</span>
        </div>
      )}

      <label className="field">
        <span style={{ fontWeight: 700, fontSize: "0.9rem" }}>Full name *</span>
        <input
          name="fullName"
          placeholder="e.g. Tawanda Moyo"
          required
          value={form.fullName}
          onChange={(e) => setForm((curr) => ({ ...curr, fullName: e.target.value }))}
        />
      </label>

      <label className="field">
        <span style={{ fontWeight: 700, fontSize: "0.9rem" }}>Email address *</span>
        <input
          name="email"
          type="email"
          placeholder="name@example.com"
          required
          value={form.email}
          onChange={(e) => setForm((curr) => ({ ...curr, email: e.target.value }))}
        />
      </label>

      <label className="field">
        <span style={{ fontWeight: 700, fontSize: "0.9rem" }}>Password *</span>
        <input
          name="password"
          type="password"
          placeholder="Choose a strong password"
          required
          value={form.password}
          onChange={(e) => setForm((curr) => ({ ...curr, password: e.target.value }))}
        />
      </label>

      <label className="field">
        <span style={{ fontWeight: 700, fontSize: "0.9rem" }}>Phone number</span>
        <input
          name="phone"
          placeholder="+263 77 ..."
          value={form.phone}
          onChange={(e) => setForm((curr) => ({ ...curr, phone: e.target.value }))}
        />
      </label>

      <div className="grid-2" style={{ gap: 12 }}>
        <label className="field">
          <span style={{ fontWeight: 700, fontSize: "0.9rem" }}>City</span>
          <input
            name="city"
            placeholder="Harare"
            value={form.city}
            onChange={(e) => setForm((curr) => ({ ...curr, city: e.target.value }))}
          />
        </label>

        <label className="field">
          <span style={{ fontWeight: 700, fontSize: "0.9rem" }}>Church / Fellowship</span>
          <input
            name="church"
            placeholder="Local church name"
            value={form.church}
            onChange={(e) => setForm((curr) => ({ ...curr, church: e.target.value }))}
          />
        </label>
      </div>

      <button
        className="button"
        type="submit"
        disabled={loading}
        style={{
          background: "var(--gold)",
          color: "#000",
          fontWeight: 800,
          marginTop: 6,
        }}
      >
        <span>{loading ? "Registering..." : "Create Account"}</span>
        <ArrowRight size={16} style={{ marginLeft: 6 }} />
      </button>

      <div style={{ textAlign: "center", paddingTop: 8, borderTop: "1px solid var(--border)" }}>
        <p className="muted" style={{ fontSize: "0.82rem", margin: 0 }}>
          Already have an account?{" "}
          <Link href="/signin" style={{ color: "var(--gold)", fontWeight: 700, textDecoration: "underline" }}>
            Sign in here
          </Link>
        </p>
      </div>
    </form>
  );
}
