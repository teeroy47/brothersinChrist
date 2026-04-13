"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { useDemoSession } from "@/components/session-provider";
import { getSessionOptions } from "@/lib/mock-data";

export function SignInForm() {
  const { signIn } = useDemoSession();
  const options = getSessionOptions();
  const router = useRouter();
  const [userId, setUserId] = useState(options[0]?.id ?? "");

  return (
    <form
      className="card stack"
      onSubmit={(event) => {
        event.preventDefault();
        signIn(userId);
        const next = typeof window === "undefined" ? null : new URLSearchParams(window.location.search).get("next");
        router.push(next || "/home");
      }}
    >
      <div className="stack-sm">
        <span className="eyebrow">Demo access</span>
        <h1 className="heading-lg">Enter the brotherhood</h1>
        <p className="muted" style={{ margin: 0 }}>
          This starter uses seeded demo accounts so you can inspect member, leader, and admin experiences immediately.
        </p>
      </div>

      <label className="field">
        <span>Select a role</span>
        <select name="userId" value={userId} onChange={(event) => setUserId(event.target.value)}>
          {options.map((option) => (
            <option key={option.id} value={option.id}>
              {option.name} · {option.description}
            </option>
          ))}
        </select>
      </label>

      <button className="button" type="submit">
        Sign in
      </button>
    </form>
  );
}

export function SignUpForm() {
  const { signUp } = useDemoSession();
  const router = useRouter();
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    city: "",
    church: ""
  });

  return (
    <form
      className="card stack"
      onSubmit={(event) => {
        event.preventDefault();
        if (!form.fullName.trim()) {
          return;
        }

        signUp(form.fullName.trim());
        router.push("/home");
      }}
    >
      <div className="stack-sm">
        <span className="eyebrow">Onboarding</span>
        <h1 className="heading-lg">Join the system</h1>
        <p className="muted" style={{ margin: 0 }}>
          Essential details first. Non-essential history, testimony, and long-form goals can be added after entry.
        </p>
      </div>

      <label className="field">
        <span>Full name</span>
        <input
          name="fullName"
          placeholder="Brother's full name"
          required
          value={form.fullName}
          onChange={(event) => setForm((current) => ({ ...current, fullName: event.target.value }))}
        />
      </label>
      <label className="field">
        <span>Email</span>
        <input
          name="email"
          type="email"
          placeholder="name@example.com"
          required
          value={form.email}
          onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
        />
      </label>
      <label className="field">
        <span>Phone number</span>
        <input
          name="phone"
          placeholder="+263 ..."
          required
          value={form.phone}
          onChange={(event) => setForm((current) => ({ ...current, phone: event.target.value }))}
        />
      </label>
      <label className="field">
        <span>City</span>
        <input
          name="city"
          placeholder="Harare"
          value={form.city}
          onChange={(event) => setForm((current) => ({ ...current, city: event.target.value }))}
        />
      </label>
      <label className="field">
        <span>Church or fellowship</span>
        <input
          name="church"
          placeholder="Church name"
          value={form.church}
          onChange={(event) => setForm((current) => ({ ...current, church: event.target.value }))}
        />
      </label>

      <button className="button" type="submit">
        Create profile
      </button>
    </form>
  );
}
