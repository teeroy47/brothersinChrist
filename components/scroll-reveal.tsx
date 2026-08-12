"use client";

import { useEffect } from "react";

const revealSelector = [
  ".card",
  ".metric",
  ".scripture-lockup",
  ".merch-preview",
  ".landing-section-header",
  ".landing-pillar",
  ".landing-path-step",
  ".landing-final-cta",
  ".landing-footer",
  ".landing-footer-brand",
  ".landing-footer-links",
  ".landing-footer-actions",
  ".landing-footer-bottom"
].join(",");

export function ScrollReveal() {
  useEffect(() => {
    const root = document.documentElement;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      return;
    }

    root.classList.add("scroll-reveal-ready");

    const targets = Array.from(document.querySelectorAll<HTMLElement>(revealSelector)).filter((element) => {
      return !element.closest(".mobile-nav") && !element.closest(".sidebar");
    });

    targets.forEach((element, index) => {
      element.classList.add("reveal-on-scroll");
      element.style.setProperty("--reveal-delay", `${Math.min(index % 5, 4) * 95}ms`);
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: "0px 0px -14% 0px",
        threshold: 0.18
      }
    );

    targets.forEach((element) => observer.observe(element));

    return () => {
      observer.disconnect();
      root.classList.remove("scroll-reveal-ready");
      targets.forEach((element) => {
        element.classList.remove("reveal-on-scroll", "is-visible");
        element.style.removeProperty("--reveal-delay");
      });
    };
  }, []);

  return null;
}
