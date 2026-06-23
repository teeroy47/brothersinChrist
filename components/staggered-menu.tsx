"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { BrandMark } from "@/components/brand-mark";

export interface StaggeredMenuItem {
  label: string;
  ariaLabel?: string;
  link: string;
}

export interface StaggeredMenuProps {
  position?: "left" | "right";
  items: StaggeredMenuItem[];
  socialItems?: StaggeredMenuItem[];
  displaySocials?: boolean;
  displayItemNumbering?: boolean;
  menuButtonColor?: string;
  openMenuButtonColor?: string;
  changeMenuColorOnOpen?: boolean;
  colors?: string[];
  logoUrl?: string;
  accentColor?: string;
  onMenuOpen?: () => void;
  onMenuClose?: () => void;
}

export default function StaggeredMenu({
  position = "right",
  items,
  socialItems = [],
  displaySocials = false,
  displayItemNumbering = false,
  menuButtonColor = "#000",
  openMenuButtonColor = "#fff",
  changeMenuColorOnOpen = true,
  colors = ["#111827", "#0a0e17"],
  accentColor = "var(--gold)",
  onMenuOpen,
  onMenuClose,
}: StaggeredMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      onMenuOpen?.();
    } else {
      document.body.style.overflow = "";
      onMenuClose?.();
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen, onMenuOpen, onMenuClose]);

  const toggleMenu = () => setIsOpen(!isOpen);

  if (!isMounted) return null;

  const btnColor = isOpen && changeMenuColorOnOpen ? openMenuButtonColor : menuButtonColor;

  return (
    <>
      <button
        onClick={toggleMenu}
        style={{
          background: "transparent",
          border: "none",
          cursor: "pointer",
          zIndex: 100,
          position: "relative",
          width: 44,
          height: 44,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 6,
        }}
        aria-label="Toggle mobile menu"
      >
        <span
          style={{
            display: "block",
            width: 24,
            height: 2,
            background: btnColor,
            transition: "all 0.3s ease",
            transform: isOpen ? "rotate(45deg) translate(5px, 6px)" : "none",
          }}
        />
        <span
          style={{
            display: "block",
            width: 24,
            height: 2,
            background: btnColor,
            transition: "all 0.3s ease",
            opacity: isOpen ? 0 : 1,
          }}
        />
        <span
          style={{
            display: "block",
            width: 24,
            height: 2,
            background: btnColor,
            transition: "all 0.3s ease",
            transform: isOpen ? "rotate(-45deg) translate(5px, -6px)" : "none",
          }}
        />
      </button>

      {/* Backdrop */}
      <div className={`staggered-backdrop ${isOpen ? "open" : ""}`} onClick={() => setIsOpen(false)} />

      {/* Menu Overlay Layers */}
      <div
        className={`staggered-overlay ${position}`}
        style={{
          pointerEvents: isOpen ? "auto" : "none",
        }}
      >
        {/* Animated Background Layers */}
        {colors.map((color, index) => (
          <div
            key={index}
            className={`staggered-layer ${isOpen ? "open" : ""}`}
            style={{
              background: color,
              transition: `transform 0.6s cubic-bezier(0.7, 0, 0.3, 1) ${index * 0.1}s`,
              zIndex: 91 + index,
            }}
          />
        ))}

        {/* Content Layer */}
        <div
          className="no-scrollbar"
          style={{
            position: "relative",
            zIndex: 99,
            padding: "80px 24px 40px",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            opacity: isOpen ? 1 : 0,
            transition: "opacity 0.4s ease 0.4s",
            color: "#fff",
            overflowY: "auto",
          }}
        >
          <div style={{ flex: "1 0 auto", display: "flex", flexDirection: "column", margin: "auto 0", padding: "24px 0", gap: 32 }}>
            <nav style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              {items.map((item, i) => (
                <Link
                  key={item.label}
                  href={item.link}
                  onClick={() => setIsOpen(false)}
                  style={{
                    fontSize: "2.5rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    textDecoration: "none",
                    color: "#fff",
                    transform: isOpen ? "translateY(0)" : "translateY(40px)",
                    opacity: isOpen ? 1 : 0,
                    transition: `transform 0.5s cubic-bezier(0.2, 1, 0.3, 1) ${0.3 + i * 0.1}s, opacity 0.5s ease ${0.3 + i * 0.1}s, color 0.2s ease`,
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = accentColor)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#fff")}
                  aria-label={item.ariaLabel}
                >
                  {displayItemNumbering && (
                    <span style={{ fontSize: "1rem", color: accentColor, marginRight: 16, verticalAlign: "top" }}>
                      0{i + 1}
                    </span>
                  )}
                  {item.label}
                </Link>
              ))}
            </nav>
            
            <div style={{ marginTop: 40, borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: 40 }}>
              <div className="row" style={{ gap: 16 }}>
                <Link href="/signin" className="button-secondary" style={{ color: "#fff", borderColor: "rgba(255,255,255,0.2)" }} onClick={() => setIsOpen(false)}>
                  Sign In
                </Link>
                <Link href="/signup" className="button" style={{ background: accentColor, color: "#000" }} onClick={() => setIsOpen(false)}>
                  Join BIC
                </Link>
              </div>
            </div>
          </div>

          {displaySocials && socialItems.length > 0 && (
            <div
              style={{
                display: "flex",
                gap: 24,
                opacity: isOpen ? 1 : 0,
                transition: "opacity 0.4s ease 0.6s",
              }}
            >
              {socialItems.map((social) => (
                <a
                  key={social.label}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: "rgba(255,255,255,0.6)",
                    textDecoration: "none",
                    textTransform: "uppercase",
                    fontSize: "0.85rem",
                    letterSpacing: "0.1em",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = accentColor)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.6)")}
                >
                  {social.label}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
