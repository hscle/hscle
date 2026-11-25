"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
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
        <p className="kicker">The daily</p>
        <h1 className="wordmark">
          HSC<i>LE</i>
        </h1>
        <p className="tagline">One exam-style question for each HSC subject, every day, with a full worked solution.</p>
        <p className="micro">
          Resets <Countdown />
        </p>
      </section>

      <section className="orbs">
        {results.map(({ s, a }) => {
          const status = !ready ? "\u00a0" : a ? (a.correct ? "Correct" : "Answered") : "Today";
          return (
            <Link key={s.id} href={`/daily/${s.id}/`} className="orb-link" style={{ ["--accent" as string]: s.color }}>
              <span className={`orb ${a ? "done" : ""}`}>{s.glyph}</span>
              <span className="orb-name">{s.short}</span>
              <span className={`micro orb-status ${a ? (a.correct ? "good" : "bad") : ""}`}>{status}</span>
            </Link>
          );
        })}
      </section>

      <section className="summary">
        <span className="micro">
          Streak<b>{ready ? current : "–"}</b>
        </span>
        <span className="micro">
          Today<b>{ready ? `${correctCount}/${doneCount}` : "–"}</b>
        </span>
        <span className="micro">
          Best<b>{ready ? best : "–"}</b>
        </span>
      </section>

      {doneCount > 0 && (
        <section className="share">
          <button type="button" className="btn" onClick={share}>
            {copied ? "Copied" : "Share today's result"}
          </button>
        </section>
      )}
    </>
  );
}
