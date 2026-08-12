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
          <Link href="/signup" className="button landing-join-link">
            Join
          </Link>
        </div>

        <div className="chm-26 landing-mobile-menu" aria-label="Mobile navigation">
          <input
            type="checkbox"
            id={id}
            className="chm-26__state"
            checked={open}
            onChange={(event) => setOpen(event.target.checked)}
          />
          <div className="chm-26__plate">
            <label htmlFor={id} className="chm-26__btn" aria-label={open ? "Close menu" : "Open menu"}>
              <Menu className="chm-26__menu-icon" aria-hidden="true" size={25} strokeWidth={2.4} />
              <X className="chm-26__close-icon" aria-hidden="true" size={25} strokeWidth={2.4} />
            </label>
          </div>
          <nav className="chm-26__menu" aria-label="Menu" aria-hidden={!open}>
            {menuLinks.map(({ href, label, Icon }, index) => (
              <Link key={href} href={href} style={{ "--i": index } as CSSProperties} tabIndex={open ? undefined : -1} onClick={() => setOpen(false)}>
                <span className="chm-26__link-icon" aria-hidden="true">
                  <Icon size={18} strokeWidth={2.2} />
                </span>
                {label}
              </Link>
            ))}
            <Link href="/signup" style={{ "--i": menuLinks.length } as CSSProperties} tabIndex={open ? undefined : -1} onClick={() => setOpen(false)}>
              <span className="chm-26__link-icon" aria-hidden="true">
                <ArrowRight size={18} strokeWidth={2.2} />
              </span>
              Join
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
