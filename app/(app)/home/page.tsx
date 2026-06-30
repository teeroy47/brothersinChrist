"use client";

import Link from "next/link";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import { BrandMark } from "@/components/brand-mark";
import { ProgressCard, SectionHeader } from "@/components/cards";
import { useDemoSession } from "@/components/session-provider";
import {
  events,
  getGroupById,
  getLevelById,
  getPostsForRole,
  getProgressMetricsForUser,
  getUserById,
  notifications,
} from "@/lib/mock-data";
import { formatDateLabel } from "@/lib/utils";

export default function HomePage() {
  const { session } = useDemoSession();

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: "ease-out-cubic",
      offset: 50,
    });
  }, []);

  if (!session) return null;

  const user = getUserById(session.id);
  if (!user) return null;

  const level = getLevelById(user.levelId);
  const group = getGroupById(user.groupId);
  const visiblePosts = getPostsForRole(session.role, user.levelId);
  const upcoming = events.find(
    (e) =>
      e.groupId === user.groupId ||
      e.levelId === user.levelId ||
      e.audience === "all"
  );
  const metrics = getProgressMetricsForUser(user.id);

  return (
    <>
      <div className="hp">

        {/* ── 1. IDENTITY HERO ── */}
        <div className="hp-hero" data-aos="fade-down">
          <span className="hp-hero__watermark" aria-hidden="true">✝</span>

          <div className="hp-hero__top">
            <div>
              <BrandMark compact />
              <div className="hp-hero__eyebrow" style={{ marginTop: 12 }}>Welcome back</div>
              <h2 className="hp-hero__name">
                {user.profile.firstName || "Brother"}
              </h2>
              <div className="hp-hero__placement">
                {level?.title} · {group?.name}
              </div>
            </div>
            <span className="hp-hero__score">
              {user.consistencyScore}% consistency
            </span>
          </div>

          {user.recentActivity && (
            <p className="hp-hero__activity">{user.recentActivity}</p>
          )}

          <blockquote className="hp-hero__scripture">
            <div className="hp-hero__scripture-ref">Proverbs 27:17 · Core scripture</div>
            <p className="hp-hero__scripture-text">
              As iron sharpens iron, so one man sharpens another.
            </p>
          </blockquote>

          <div className="hp-hero__ctas">
            <Link href="/check-in" className="hp-btn-primary">
              Submit check-in
            </Link>
            <Link href="/progress" className="hp-btn-secondary">
              View progress
            </Link>
          </div>
        </div>

        {/* ── 2. PROGRESS METRICS — immediately after greeting ── */}
        <div data-aos="fade-up" data-aos-delay="100">
          <div className="hp-section-label">Progress summary · Visible growth across the areas that matter</div>
          <div className="hp-progress">
            {metrics.map((metric) => (
              <ProgressCard key={metric.id} {...metric} />
            ))}
          </div>
        </div>

        {/* ── 3. TODAY'S DEVOTION + UPCOMING MEETING ── */}
        <div className="hp-row-2">
          <div className="hp-card" data-aos="fade-up" data-aos-delay="200">
            <div className="hp-card__body">
              <div className="hp-card__eyebrow">Today&apos;s devotion</div>
              <h3 className="hp-card__title">{visiblePosts[0]?.title}</h3>
              <p className="hp-card__text">{visiblePosts[0]?.excerpt}</p>
            </div>
          </div>

          <div className="hp-card" data-aos="fade-up" data-aos-delay="300">
            <div className="hp-card__body">
              <div className="hp-card__eyebrow">Upcoming meeting</div>
              <h3 className="hp-card__title">{upcoming?.title ?? "No event scheduled"}</h3>
              <p className="hp-card__text">
                {upcoming
                  ? `${formatDateLabel(upcoming.when)} · ${upcoming.location}`
                  : "Check back soon for your next group meeting."}
              </p>
            </div>
          </div>
        </div>

        {/* ── 4. WHAT NEXT + ENCOURAGEMENT ── */}
        <div className="hp-row-2">
          <div className="hp-card" data-aos="fade-up" data-aos-delay="400">
            <div className="hp-card__body">
              <div className="hp-card__eyebrow">This week</div>
              <h3 className="hp-card__title">What should you do next?</h3>
              <p className="hp-card__text" style={{ marginBottom: 16 }}>
                Keep the next act of obedience and accountability clear.
              </p>
              <div className="hp-links">
                <Link href="/check-in"   className="hp-link-pill">Submit weekly check-in</Link>
                <Link href="/groups"     className="hp-link-pill">Open your group</Link>
                <Link href="/attendance" className="hp-link-pill">Mark attendance</Link>
                <Link href="/community"  className="hp-link-pill">Read latest teaching</Link>
                <Link href="/groups"     className="hp-link-pill">Message your leader</Link>
                <Link href="/progress"   className="hp-link-pill">Review progress</Link>
                <Link href="/merch"      className="hp-link-pill">Open merch</Link>
              </div>
            </div>
          </div>

          <div className="hp-card" data-aos="fade-up" data-aos-delay="500">
            <div className="hp-card__body">
              <div className="hp-card__eyebrow">Encouragement</div>
              <h3 className="hp-card__title">Brotherhood reminder</h3>
              <p className="hp-card__text" style={{ marginBottom: 16 }}>
                Strength is formed in hidden faithfulness.
              </p>
              <blockquote className="hp-quote">
                <p>
                  A disciplined man is not built by pressure alone. He is built
                  by repeated surrender, truth, and brotherhood.
                </p>
              </blockquote>
              {notifications[0] && (
                <div className="hp-notification">
                  <div className="hp-notification__title">{notifications[0].title}</div>
                  <p className="hp-notification__body">{notifications[0].body}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ── 5. VISION + MISSION — anchoring the page at the bottom ── */}
        <div className="hp-mission-grid">
          <div className="hp-mission-cell" data-aos="zoom-in" data-aos-delay="600">
            <span className="hp-mission-cell__watermark" aria-hidden="true">✝</span>
            <div className="hp-mission-cell__label">Vision</div>
            <p className="hp-mission-cell__text">
              To build a global brotherhood of kingdom men who reflect Jesus
              Christ and bear lasting fruit.
            </p>
          </div>
          <div className="hp-mission-cell" data-aos="zoom-in" data-aos-delay="700">
            <div className="hp-mission-cell__label">Mission</div>
            <p className="hp-mission-cell__text">
              To sharpen each other daily into the full image of Christ.
            </p>
          </div>
        </div>

      </div>
    </>
  );
}
