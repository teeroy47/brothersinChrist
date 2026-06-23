"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { useDemoSession } from "@/components/session-provider";
import { getSessionOptions } from "@/lib/mock-data";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function SignInForm() {
  const { signIn } = useDemoSession();
  const options = getSessionOptions();
  const router = useRouter();
  const [userId, setUserId] = useState(options[0]?.id ?? "");

  return (
    <form
      className="card stack"
      style={{ alignItems: "center", textAlign: "center", padding: "2rem" }}
      onSubmit={(event) => {
        event.preventDefault();
        signIn(userId);
        const next = typeof window === "undefined" ? null : new URLSearchParams(window.location.search).get("next");
        router.push(next || "/home");
      }}
    >
      <div className="stack-sm" style={{ alignItems: "center" }}>
        <span className="eyebrow">Demo access</span>
        <h1 className="heading-lg">Enter the brotherhood</h1>
        <p className="muted" style={{ margin: 0, maxWidth: "400px" }}>
          This starter uses seeded demo accounts so you can inspect member, leader, and admin experiences immediately.
        </p>
      </div>

      <div className="field" style={{ width: "100%", textAlign: "left" }}>
        <span>Select a role</span>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="dropdown-trigger-button" type="button">
              {options.find(o => o.id === userId)?.name || "Select role"}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent style={{ width: "var(--radix-dropdown-menu-trigger-width)" }}>
            <DropdownMenuRadioGroup value={userId} onValueChange={setUserId}>
              {options.map((option) => (
                <DropdownMenuRadioItem key={option.id} value={option.id}>
                  {option.name} · {option.description}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="row" style={{ width: "100%", marginTop: "8px" }}>
        <button className="button" type="submit" style={{ flex: 1 }}>
          Sign in
        </button>
      </div>
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
      style={{ alignItems: "center", textAlign: "center", padding: "2rem" }}
      onSubmit={(event) => {
        event.preventDefault();
        if (!form.fullName.trim()) {
          return;
        }

        signUp(form.fullName.trim());
        router.push("/home");
      }}
    >
      <div className="stack-sm" style={{ alignItems: "center" }}>
        <span className="eyebrow">Onboarding</span>
        <h1 className="heading-lg">Join the Brotherhood</h1>
        <p className="muted" style={{ margin: 0, maxWidth: "400px" }}>
          Essential details first. Non-essential history, testimony, and long-form goals can be added after entry.
        </p>
      </div>

      <label className="field" style={{ width: "100%", textAlign: "left" }}>
        <span>Full name</span>
        <input
          name="fullName"
          placeholder="Brother's full name"
          required
          value={form.fullName}
          onChange={(event) => setForm((current) => ({ ...current, fullName: event.target.value }))}
        />
      </label>
      <label className="field" style={{ width: "100%", textAlign: "left" }}>
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
      <label className="field" style={{ width: "100%", textAlign: "left" }}>
        <span>Phone number</span>
        <input
          name="phone"
          placeholder="+263 ..."
          required
          value={form.phone}
          onChange={(event) => setForm((current) => ({ ...current, phone: event.target.value }))}
        />
      </label>
      <label className="field" style={{ width: "100%", textAlign: "left" }}>
        <span>City</span>
        <input
          name="city"
          placeholder="Harare"
          value={form.city}
          onChange={(event) => setForm((current) => ({ ...current, city: event.target.value }))}
        />
      </label>
      <label className="field" style={{ width: "100%", textAlign: "left" }}>
        <span>Church or fellowship</span>
        <input
          name="church"
          placeholder="Church name"
          value={form.church}
          onChange={(event) => setForm((current) => ({ ...current, church: event.target.value }))}
        />
      </label>

      <div className="row" style={{ width: "100%", marginTop: "8px" }}>
        <button className="button" type="submit" style={{ flex: 1 }}>
          Create profile
        </button>
      </div>
    </form>
  );
}
