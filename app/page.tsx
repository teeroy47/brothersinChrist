import Link from "next/link";
import { ArrowRight, BookOpenCheck, ClipboardCheck, Footprints, Home, LogIn, ShieldCheck, UsersRound } from "lucide-react";

import { BlurFade } from "@/components/blur-fade";
import { BlurFadeText } from "@/components/blur-fade-text";
import { HeroCarousel } from "@/components/hero-carousel";
import { LandingNav } from "@/components/landing-nav";

const missionPillars = [
  { label: "Scripture", value: "Prayer, devotion, and accountability stay close to the Word.", Icon: BookOpenCheck },
  { label: "Brotherhood", value: "Leaders can see the men, groups, and care rhythms entrusted to them.", Icon: UsersRound },
  { label: "Order", value: "Check-ins, attendance, and follow-up become clear without losing spiritual weight.", Icon: ClipboardCheck }
];

const pathSteps = [
  { step: "01", title: "Gather", detail: "Every brother enters a visible circle of care, prayer, and accountability." },
  { step: "02", title: "Grow", detail: "Formation levels make the next faithful step simple to see and follow." },
  { step: "03", title: "Lead", detail: "Mature men carry others with reports, follow-up, and consistent oversight." }
];

export default function LandingPage() {
  return (
    <>
      <LandingNav />

      <main className="landing-page">
        <section id="home" className="landing-hero section">
          <div className="container landing-hero-grid">
            <HeroCarousel>
              <div className="desktop-hero-copy">
                <BlurFadeText as="h1" text="Iron sharpens iron." delay={0.18} stagger={0.92} duration={1.32} yOffset={10} blur="16px" />
                <BlurFadeText as="p" text="As iron sharpens iron, so one man sharpens another. Proverbs 27:17" delay={3.02} stagger={0.08} duration={0.72} yOffset={4} blur="7px" />
                <BlurFade delay={3.38} duration={0.9} yOffset={5} blur="8px">
                  <Link href="/signup" className="button landing-primary-cta desktop-hero-cta">
                    Join
                  </Link>
                </BlurFade>
              </div>
            </HeroCarousel>

            <div className="stack landing-hero-copy mobile-hero-copy">
              <BlurFadeText as="h1" text="Iron sharpens iron." className="landing-title" delay={0.18} stagger={0.92} duration={1.32} yOffset={10} blur="16px" />
              <BlurFadeText as="p" text="As iron sharpens iron, so one man sharpens another." className="landing-lede" delay={3.08} stagger={0.08} duration={0.72} yOffset={4} blur="7px" />
              <BlurFade delay={3.82} duration={0.72} yOffset={4} blur="6px">
                <span className="eyebrow">Proverbs 27:17 Core Scripture</span>
              </BlurFade>
              <BlurFade delay={4.02} duration={0.76} yOffset={4} blur="6px">
                <div className="landing-cta-row">
                  <Link href="/signup" className="button landing-primary-cta">
                    Join
                  </Link>
                </div>
              </BlurFade>
            </div>
          </div>
        </section>

        <section id="mission" className="section landing-band">
          <div className="container landing-mission">
            <div className="landing-section-header">
              <span className="eyebrow">Mission</span>
              <h2 className="heading-lg">God's work can be spiritually alive and beautifully organized.</h2>
              <p className="muted">
                Brothers In Christ brings the visible work of discipleship into one calm place: men, prayer, Scripture, care, attendance, and follow-up.
              </p>
              <Link href="/signup" className="button landing-primary-cta landing-inline-cta">
                Join
                <ArrowRight aria-hidden="true" size={18} strokeWidth={2.2} />
              </Link>
            </div>

            <div className="landing-pillar-list">
              {missionPillars.map(({ label, value, Icon }) => (
                <div key={label} className="landing-pillar">
                  <span className="landing-pillar-icon" aria-hidden="true">
                    <Icon size={22} strokeWidth={2.1} />
                  </span>
                  <div>
                    <strong>{label}</strong>
                    <p>{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="path" className="section">
          <div className="container stack">
            <div className="landing-section-header">
              <span className="eyebrow">Path</span>
              <h2 className="heading-lg">A simple formation path for men who want to grow steadily.</h2>
              <p className="muted">
                The console keeps the journey legible without turning discipleship into noise.
              </p>
            </div>

            <div className="landing-path-list">
              {pathSteps.map((item) => (
                <div key={item.step} className="landing-path-step">
                  <span>{item.step}</span>
                  <div>
                    <strong>{item.title}</strong>
                    <p>{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container landing-final-cta">
            <span className="eyebrow">Enter the console</span>
            <h2 className="heading-lg">Bring clarity to the work God has entrusted to the brotherhood.</h2>
            <p className="muted">
              Start with demo access or create a profile and move into a structured discipleship environment built for serious men.
            </p>
            <div className="landing-cta-row">
              <Link href="/signup" className="button landing-primary-cta">
                Join
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="landing-footer">
        <div className="container landing-footer-inner">
          <div className="landing-footer-brand">
            <div className="landing-footer-mark" aria-hidden="true">
              <img src="/assets/bic-emblem.png" alt="" />
            </div>
            <div>
              <strong>Brothers In Christ</strong>
              <p>Structured discipleship for Kingdom men.</p>
            </div>
          </div>

          <nav className="landing-footer-links" aria-label="Footer navigation">
            <Link href="#home">
              <Home aria-hidden="true" size={17} strokeWidth={2.2} />
              Home
            </Link>
            <Link href="#mission">
              <ShieldCheck aria-hidden="true" size={17} strokeWidth={2.2} />
              Mission
            </Link>
            <Link href="#path">
              <Footprints aria-hidden="true" size={17} strokeWidth={2.2} />
              Path
            </Link>
          </nav>

          <div className="landing-footer-actions">
            <Link href="/signin" className="pill landing-footer-console">
              <LogIn aria-hidden="true" size={17} strokeWidth={2.2} />
              Login
            </Link>
            <Link href="/signup" className="button landing-primary-cta">
              Join
            </Link>
          </div>
        </div>

        <div className="container landing-footer-bottom">
          <span>Proverbs 27:17 Core Scripture</span>
          <span>Brothers In Christ. All stewardship belongs to God.</span>
        </div>
      </footer>
    </>
  );
}
