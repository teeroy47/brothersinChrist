"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";

import { withBasePath } from "@/lib/paths";

const slides = [
  {
    src: "/assets/brothers-outdoors.jpeg",
    alt: "Brothers In Christ men gathered outdoors",
    label: "Brotherhood gathered"
  },
  {
    src: "/assets/brothers-indoors.jpeg",
    alt: "Brothers In Christ men gathered indoors",
    label: "Men sharpened together"
  }
];

export function HeroCarousel({ children }: { children?: ReactNode }) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length);
    }, 2000);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <div id="console" className="hero-carousel" aria-label="Brothers In Christ photo carousel">
      <div className="hero-carousel-stage">
        <div className="hero-carousel-track">
          {slides.map((slide, index) => (
            <div key={slide.src} className="hero-carousel-slide" data-active={index === activeIndex ? "true" : undefined} aria-hidden={index !== activeIndex}>
              <Image
                src={withBasePath(slide.src)}
                alt={slide.alt}
                fill
                priority={index === 0}
                sizes="(min-width: 900px) 94vw, 100vw"
                className="hero-carousel-image"
              />
            </div>
          ))}
        </div>

        {children}
      </div>
    </div>
  );
}
