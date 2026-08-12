"use client";

import type { CSSProperties } from "react";

interface BlurFadeTextProps {
  text: string;
  as?: "h1" | "p" | "span";
  className?: string;
  wordClassName?: string;
  delay?: number;
  stagger?: number;
  duration?: number;
  yOffset?: number;
  blur?: string;
}

export function BlurFadeText({
  text,
  as = "span",
  className,
  wordClassName,
  delay = 0,
  stagger = 0.075,
  duration = 0.5,
  yOffset = 8,
  blur = "8px"
}: BlurFadeTextProps) {
  const Component = as;
  const words = text.split(" ");

  return (
    <Component className={["blur-fade-text", className].filter(Boolean).join(" ")}>
      {words.map((word, index) => (
        <span
          key={`${word}-${index}`}
          className={["blur-fade-word", wordClassName].filter(Boolean).join(" ")}
          style={
            {
              "--blur-fade-duration": `${duration}s`,
              "--blur-fade-delay": `${0.04 + delay + index * stagger}s`,
              "--blur-fade-y": `${yOffset}px`,
              "--blur-fade-blur": blur
            } as CSSProperties
          }
        >
          {word}
        </span>
      ))}
    </Component>
  );
}
