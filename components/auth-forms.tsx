import { getSessionOptions } from "@/lib/mock-data";

import { registerAction, signInAction } from "@/components/auth-actions";

export function SignInForm() {
  const options = getSessionOptions();

  return (
    <form action={signInAction} className="card stack">
      <div className="stack-sm">
        <span className="eyebrow">Demo access</span>
        <h1 className="heading-lg">Enter the brotherhood</h1>
        <p className="muted" style={{ margin: 0 }}>
          This starter uses seeded demo accounts so you can inspect member, leader, and admin experiences immediately.
        </p>
      </div>

      <label className="field">
        <span>Select a role</span>
        <select name="userId" defaultValue={options[0]?.id}>
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
  return (
    <form action={registerAction} className="card stack">
      <div className="stack-sm">
        <span className="eyebrow">Onboarding</span>
        <h1 className="heading-lg">Join the system</h1>
        <p className="muted" style={{ margin: 0 }}>
          Essential details first. Non-essential history, testimony, and long-form goals can be added after entry.
        </p>
      </div>

      <label className="field">
        <span>Full name</span>
        <input name="fullName" placeholder="Brother's full name" required />
      </label>
      <label className="field">
        <span>Email</span>
        <input name="email" type="email" placeholder="name@example.com" required />
      </label>
      <label className="field">
        <span>Phone number</span>
        <input name="phone" placeholder="+263 ..." required />
      </label>
      <label className="field">
        <span>City</span>
        <input name="city" placeholder="Harare" />
      </label>
      <label className="field">
        <span>Church or fellowship</span>
        <input name="church" placeholder="Church name" />
      </label>

      <button className="button" type="submit">
        Create profile
      </button>
    </form>
  );
}
