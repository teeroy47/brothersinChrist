"use client";

import { useState } from "react";
import { checkInTemplate, submissions } from "@/lib/mock-data";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function CheckInPage() {
  // Simple state for boolean questions
  const [answers, setAnswers] = useState<Record<string, string>>({});

  return (
    <div className="stack">
      <div className="card card-dark stack">
        <span className="eyebrow" style={{ color: "rgba(255,255,255,.65)" }}>Weekly check-in</span>
        <h2 className="heading-lg" style={{ margin: 0 }}>{checkInTemplate.title}</h2>
        <p style={{ color: "rgba(255,255,255,.76)", margin: 0 }}>
          A simple recurring reflection for prayer, Scripture, attendance, accountability, and support needs.
        </p>
      </div>

      <form className="card stack">
        {checkInTemplate.questions.map((question) => (
          <div key={question.id} className="field">
            <span>{question.prompt}</span>
            {question.type === "text" ? <textarea placeholder="Write briefly and honestly." /> : null}
            {question.type === "boolean" ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="dropdown-trigger-button" type="button">
                    {answers[question.id] === "yes" ? "Yes" : answers[question.id] === "no" ? "No" : "Select"}
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuRadioGroup 
                    value={answers[question.id] || ""} 
                    onValueChange={(val) => setAnswers(prev => ({ ...prev, [question.id]: val }))}
                  >
                    <DropdownMenuRadioItem value="yes">Yes</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="no">No</DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : null}
            {question.type === "rating" ? <input type="range" min={1} max={5} defaultValue={3} /> : null}
          </div>
        ))}
        <button type="button" className="button">
          Submit check-in
        </button>
      </form>

      <div className="card stack">
        <strong className="heading-md">Recent review snapshot</strong>
        {submissions.map((submission) => (
          <div key={submission.id} className="metric stack-sm">
            <strong>{submission.weekLabel}</strong>
            <span className="muted">{submission.flags.length ? submission.flags.join(" · ") : "No concern flags"}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
