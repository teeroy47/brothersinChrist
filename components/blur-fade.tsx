"use client";

import type { CSSProperties, ReactNode } from "react";
import { useEffect, useRef, useState } from "react";

type MarginType = `${number}px` | `${number}px ${number}px` | `${number}px ${number}px ${number}px` | `${number}px ${number}px ${number}px ${number}px`;

interface BlurFadeProps {
  children: ReactNode;
  className?: string;
  duration?: number;
  delay?: number;
  yOffset?: number;
  inView?: boolean;
  inViewMargin?: MarginType;
  blur?: string;
}

export function BlurFade({
  children,
  className,
  duration = 0.4,
  delay = 0,
  yOffset = 6,
  inView = false,
  inViewMargin = "-50px",
  blur = "6px"
}: BlurFadeProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(!inView);

  useEffect(() => {
    if (!inView) {
      setIsVisible(true);
      return;
    }

    const element = ref.current;
    if (!element || !("IntersectionObserver" in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: inViewMargin }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [inView, inViewMargin]);

  return (
    <div
      ref={ref}
      className={["blur-fade", isVisible ? "is-visible" : "", className].filter(Boolean).join(" ")}
      style={
        {
          "--blur-fade-duration": `${duration}s`,
          "--blur-fade-delay": `${0.04 + delay}s`,
          "--blur-fade-y": `${yOffset}px`,
          "--blur-fade-blur": blur
        } as CSSProperties
      }
    >
      {children}
    </div>
  );
}
