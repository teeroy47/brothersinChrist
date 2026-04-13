import Link from "next/link";

import { BrandMark } from "@/components/brand-mark";
import { MetricCard, SectionHeader } from "@/components/cards";
import { levels } from "@/lib/mock-data";

export default function LandingPage() {
  return (
    <>
      <header className="container" style={{ padding: "20px 0" }}>
        <div className="space-between">
          <BrandMark />
          <div className="row">
            <Link href="/signin" className="pill">
              Sign in
            </Link>
            <Link href="/signup" className="button">
              Join BIC
            </Link>
          </div>
        </div>
      </header>

      <main>
        <section className="section">
          <div className="container hero-grid">
            <div className="stack" style={{ gap: 24 }}>
              <span className="eyebrow">Kingdom men. Structured growth. Real accountability.</span>
              <h1 className="heading-xl">A discipleship platform for men who intend to grow.</h1>
              <p className="muted" style={{ fontSize: "1.05rem", maxWidth: 680, margin: 0 }}>
                Brothers In Christ is a mobile-first system for levels, small groups, check-ins, attendance, teaching, and leader oversight. It is built for seriousness, not noise.
              </p>
              <div className="row">
                <Link href="/signup" className="button">
                  Start the journey
                </Link>
                <Link href="/signin" className="button-secondary">
                  Open demo access
                </Link>
              </div>
              <div className="quote-block muted">
                “As iron sharpens iron, so one man sharpens another.” Proverbs 27:17
              </div>
            </div>

            <div className="card card-dark stack">
              <span className="eyebrow" style={{ color: "rgba(255,255,255,.65)" }}>What the system answers</span>
              <div className="stack-sm">
                <strong className="heading-md">Where do I belong?</strong>
                <span style={{ color: "rgba(255,255,255,.72)" }}>Every brother has a level, a group, and visible leadership covering.</span>
              </div>
              <div className="stack-sm">
                <strong className="heading-md">What should I do this week?</strong>
                <span style={{ color: "rgba(255,255,255,.72)" }}>Daily dashboard cards keep prayer, teaching, attendance, and check-ins clear.</span>
              </div>
              <div className="stack-sm">
                <strong className="heading-md">Who is checking on me?</strong>
                <span style={{ color: "rgba(255,255,255,.72)" }}>Leaders monitor consistency, follow-up needs, and prayer burdens without turning this into social media.</span>
              </div>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container stack">
            <SectionHeader
              eyebrow="Mission"
              title="Build men who walk with God, stay disciplined, and raise other men."
              body="The system is designed around spiritual growth, brotherhood, bodily discipline, and mature leadership. The experience is calm, clean, and operational."
            />
            <div className="grid-4">
              <MetricCard label="God" value="Prayer + Word" detail="Daily devotion, theology, obedience, Scripture memory." tone="strong" />
              <MetricCard label="Mind" value="Renewal" detail="Truth-shaped thinking, emotional maturity, consistency." />
              <MetricCard label="Body" value="Discipline" detail="Health, strength, restraint, embodied stewardship." />
              <MetricCard label="Life" value="Leadership" detail="Responsibility, service, accountability, discipleship." />
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container stack">
            <SectionHeader
              eyebrow="How it works"
              title="Simple workflows that support real ministry."
              body="Join the brotherhood, enter a level, stay connected to a small group, submit a weekly check-in, attend meetings, and grow under visible leadership."
            />
            <div className="grid-3">
              <div className="card stack-sm">
                <strong className="heading-md">1. Belong</strong>
                <p className="muted" style={{ margin: 0 }}>Each man is placed in a level and small group, with accountability and leader coverage from day one.</p>
              </div>
              <div className="card stack-sm">
                <strong className="heading-md">2. Engage</strong>
                <p className="muted" style={{ margin: 0 }}>Check-ins, teachings, group activity, and attendance tracking make growth tangible without overcomplication.</p>
              </div>
              <div className="card stack-sm">
                <strong className="heading-md">3. Mature</strong>
                <p className="muted" style={{ margin: 0 }}>Progress markers and leader oversight help men move toward service, leadership, and multiplication.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container stack">
            <SectionHeader
              eyebrow="Levels"
              title="A meaningful progression, not a game."
              body="Every level names expectations, growth markers, and curriculum so brothers know what maturity looks like."
            />
            <div className="grid-3">
              {levels.map((level) => (
                <div key={level.id} className="card stack-sm">
                  <span className="eyebrow">{level.id.replace("-", " ")}</span>
                  <strong className="heading-md">{level.title}</strong>
                  <p className="muted" style={{ margin: 0 }}>{level.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container grid-2">
            <div className="card stack">
              <SectionHeader
                eyebrow="Small groups"
                title="Brotherhood is carried by real relationships."
                body="The group space supports weekly check-ins, prayer requests, encouragement, attendance history, and a view of who needs follow-up."
              />
            </div>
            <div className="card stack">
              <SectionHeader
                eyebrow="Why accountability matters"
                title="Men grow faster when someone is close enough to ask the hard questions."
                body="BIC keeps accountability direct, private, and spiritually useful without turning it into a surveillance system."
              />
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container grid-2">
            <div className="card card-dark stack">
              <span className="eyebrow" style={{ color: "rgba(255,255,255,.65)" }}>Testimonials</span>
              <h2 className="heading-lg">Placeholder for brotherhood testimonies</h2>
              <p style={{ color: "rgba(255,255,255,.76)", margin: 0 }}>
                Use this section for real stories from men whose prayer, discipline, leadership, and brotherhood life have deepened through the system.
              </p>
            </div>
            <div className="card stack">
              <SectionHeader
                eyebrow="Call to action"
                title="Enter a serious discipleship environment."
                body="This is not just a community. It is a system for building strong Kingdom men in a traceable, accountable way."
              />
              <div className="row">
                <Link href="/signup" className="button">
                  Join Brothers In Christ
                </Link>
                <Link href="/signin" className="button-secondary">
                  Explore the demo
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="container" style={{ padding: "24px 0 48px" }}>
        <div className="space-between">
          <span className="muted">Brothers In Christ. Kingdom-focused discipleship for men.</span>
          <span className="muted">Home · Levels · Groups · Community · Profile</span>
        </div>
      </footer>
    </>
  );
}
