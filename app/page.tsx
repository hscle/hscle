"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { dailyQuestion } from "@/lib/daily";
import { secondsUntilNextDay } from "@/lib/dates";
import { dailyFor, streaks } from "@/lib/progress";
import { useStore } from "@/lib/store";
import { SUBJECTS } from "@/lib/subjects";

function Countdown() {
  const [s, setS] = useState<number | null>(null);
  useEffect(() => {
    const tick = () => setS(secondsUntilNextDay());
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, []);
  if (s === null) return null;
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  return (
    <span className="mono">
      {String(h).padStart(2, "0")}:{String(m).padStart(2, "0")}:{String(sec).padStart(2, "0")}
    </span>
  );
}

export default function Home() {
  const { attempts, today, ready } = useStore();
  const [copied, setCopied] = useState(false);
  const { current, best } = streaks(attempts, today);
  const results = SUBJECTS.map((s) => ({ s, a: dailyFor(attempts, s.id, today) }));
  const doneCount = results.filter((r) => r.a).length;
  const correctCount = results.filter((r) => r.a?.correct).length;

  async function share() {
    const line = results.map((r) => (r.a ? (r.a.correct ? "🟩" : "🟥") : "⬜")).join("");
    const text = `HSCLE ${today}\n${line} ${correctCount}/${SUBJECTS.length}\n🔥 ${current} day streak\n${window.location.origin}`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard blocked */
    }
  }

  return (
    <>
      <section className="hero">
        <h1>Today&apos;s HSC questions</h1>
        <p className="muted">
          One exam-style question per subject, every day, with a full worked solution. New questions in <Countdown />.
        </p>
        <div className="stats-row">
          <div className="stat">
            <div className="stat-num">🔥 {ready ? current : "–"}</div>
            <div className="stat-label">day streak</div>
          </div>
          <div className="stat">
            <div className="stat-num">{ready ? `${doneCount}/${SUBJECTS.length}` : "–"}</div>
            <div className="stat-label">done today</div>
          </div>
          <div className="stat">
            <div className="stat-num">{ready ? best : "–"}</div>
            <div className="stat-label">best streak</div>
          </div>
        </div>
      </section>

      <section className="grid">
        {results.map(({ s, a }) => {
          const q = dailyQuestion(s.id, today);
          return (
            <Link key={s.id} href={`/daily/${s.id}/`} className="card subject-card" style={{ ["--accent" as string]: s.color }}>
              <div className="subject-emoji">{s.emoji}</div>
              <div className="subject-name">{s.name}</div>
              <div className="muted small">{ready ? q.topic : "\u00a0"}</div>
              <div className={`status ${a ? (a.correct ? "good" : "bad") : ""}`}>
                {!ready ? "" : a ? (a.correct ? "✅ Correct" : "❌ Answered") : "Answer now →"}
              </div>
            </Link>
          );
        })}
      </section>

      {doneCount > 0 && (
        <section className="share">
          <button type="button" className="btn" onClick={share}>
            {copied ? "Copied!" : "📋 Share today's result"}
          </button>
          <span className="muted small">Challenge your friends to beat your score.</span>
        </section>
      )}
    </>
  );
}
