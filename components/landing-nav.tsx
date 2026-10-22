"use client";

import Link from "next/link";
import { ArrowRight, Footprints, Home, Menu, ShieldCheck, X } from "lucide-react";
import { usePathname } from "next/navigation";
import type { CSSProperties } from "react";
import { useEffect, useId, useState } from "react";

import { BrandMark } from "@/components/brand-mark";

const menuLinks = [
  { href: "#home", label: "Home", Icon: Home },
  { href: "#mission", label: "Mission", Icon: ShieldCheck },
  { href: "#path", label: "Path", Icon: Footprints }
];

export function LandingNav() {
  const [open, setOpen] = useState(false);
  const id = useId();
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="landing-header">
      <div className="container landing-header-inner">
        <BrandMark />

        <nav className="landing-desktop-nav" aria-label="Primary navigation">
          {menuLinks.map(({ href, label, Icon }) => (
            <Link key={href} href={href} className="pill">
              <Icon aria-hidden="true" size={17} strokeWidth={2.2} />
              {label}
            </Link>
          ))}
        </nav>

        <div className="landing-header-actions">
          <Link href="/signin" className="pill">
            Sign In
          </Link>
          <Link href="/signup" className="button landing-join-link">
            Join
          </Link>
        </div>

        <button
          type="button"
          className="landing-mobile-toggle"
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={22} strokeWidth={2.2} /> : <Menu size={22} strokeWidth={2.2} />}
        </button>

        {open && (
          <nav className="landing-mobile-menu" aria-label="Mobile Navigation">
            {menuLinks.map(({ href, label, Icon }) => (
              <Link key={href} href={href} onClick={() => setOpen(false)}>
                <Icon size={18} strokeWidth={2.2} />
                <span>{label}</span>
              </Link>
            ))}
            <Link href="/signin" onClick={() => setOpen(false)}>
              <ShieldCheck size={18} strokeWidth={2.2} />
              <span>Sign In</span>
            </Link>
            <Link href="/signup" onClick={() => setOpen(false)} style={{ color: "var(--gold)" }}>
              <ArrowRight size={18} strokeWidth={2.2} />
              <span>Join</span>
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
