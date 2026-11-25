"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { dailyQuestion } from "@/lib/daily";
import { secondsUntilNextDay } from "@/lib/dates";
import { dailyFor, streaks } from "@/lib/progress";
import { useStore } from "@/lib/store";
import { COMING_SOON, GROUPS, SUBJECTS } from "@/lib/subjects";
import type { Attempt } from "@/lib/types";

function Countdown() {
  const [s, setS] = useState<number | null>(null);
  useEffect(() => {
    const tick = () => setS(secondsUntilNextDay());
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, []);
  if (s === null) return <span className="num">--:--:--</span>;
  const pad = (n: number) => String(n).padStart(2, "0");
  return (
    <span className="num">
      {pad(Math.floor(s / 3600))}:{pad(Math.floor((s % 3600) / 60))}:{pad(s % 60)}
    </span>
  );
}

function longDate(day: string) {
  return new Date(day + "T12:00:00Z").toLocaleDateString("en-AU", {
    weekday: "long",
    day: "numeric",
    month: "long",
    timeZone: "UTC",
  });
}

const Flame = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2c1 3.5 5 6 5 11a5 5 0 0 1-10 0c0-2.2 1-3.8 2.2-5 .2 1.6 1 2.6 2 3C11 8.5 11.3 5 12 2Z" />
  </svg>
);
const Check = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12.5 10 17l9-10" />
  </svg>
);
const Cross = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" aria-hidden="true">
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);
const Arrow = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

function Status({ a }: { a?: Attempt }) {
  if (!a)
    return (
      <span className="status go">
        <span className="st-txt">Answer</span> <Arrow />
      </span>
    );
  return a.correct ? (
    <span className="status good">
      <Check /> <span className="st-txt">Correct</span>
    </span>
  ) : (
    <span className="status bad">
      <Cross /> <span className="st-txt">Missed</span>
    </span>
  );
}

/** A small, fixed "calendar" pattern for the Archive card. Decorative only. */
const CAL_ART = "gg.gbg.gggg.bggg.gg.gbgg.ggg".split("");

export default function Home() {
  const { attempts, today, ready } = useStore();
  const [copied, setCopied] = useState(false);
  const { current, best, activeToday } = streaks(attempts, today);
  const results = SUBJECTS.map((s) => ({ s, a: ready ? dailyFor(attempts, s.id, today) : undefined }));
  const done = results.filter((r) => r.a).length;
  const correct = results.filter((r) => r.a?.correct).length;
  const next = ready ? results.find((r) => !r.a)?.s : undefined;

  async function share() {
    const line = results.map((r) => (r.a ? (r.a.correct ? "🟩" : "🟥") : "⬜")).join("");
    const text = `HSCLE ${today}\n${line} ${correct}/${SUBJECTS.length}\nStreak: ${current}\n${window.location.origin}`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard blocked */
    }
  }

  const live = GROUPS.filter((g) => SUBJECTS.some((s) => s.group === g.id));
  const soon = GROUPS.filter((g) => !SUBJECTS.some((s) => s.group === g.id));

  return (
    <>
      <section className="hero">
        <div className="hero-main">
          <p className="date">{ready ? longDate(today) : " "}</p>
          <h1>
            Daily <em>questions</em>
          </h1>
          <p className="sub">
            One HSC exam-style question per subject, every day. Answer it, read the worked solution, keep your streak
            alive.
          </p>
          <div className="hero-cta">
            {!ready ? (
              <span className="btn btn-primary" aria-hidden="true" style={{ visibility: "hidden" }}>
                Start
              </span>
            ) : next ? (
              <Link href={`/daily/${next.id}/`} className="btn btn-primary">
                {done === 0 ? `Start with ${next.short}` : `Next up: ${next.short}`} <Arrow />
              </Link>
            ) : (
              <span className="all-done">
                <Check /> All done for today
              </span>
            )}
            <Link href="/archive/" className="btn">
              Catch up on past days
            </Link>
          </div>
        </div>

        <aside className="scoreboard" aria-label="Today's progress">
          <div className="sb-row">
            <span className="sb-label">Today</span>
            <span className="sb-label">
              New in <Countdown />
            </span>
          </div>
          <div className="sb-tiles">
            {results.map(({ s, a }) => (
              <span
                key={s.id}
                className={`sb-tile ${a ? (a.correct ? "good" : "bad") : ""}`}
                style={{ ["--accent" as string]: s.color }}
                title={`${s.name}: ${a ? (a.correct ? "correct" : "missed") : "not answered yet"}`}
              >
                {s.glyph}
              </span>
            ))}
          </div>
          <div className="sb-stats">
            <div>
              <div className={`sb-big num ${activeToday ? "lit" : ""}`}>
                <Flame />
                {ready ? current : "–"}
              </div>
              <div className="sb-label">Day streak</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div className="sb-big num">
                {ready ? correct : "–"}
                <span className="sb-of">/{SUBJECTS.length}</span>
              </div>
              <div className="sb-label">Correct today</div>
            </div>
          </div>
          <div className="sb-foot">
            <span>Best streak: {ready ? best : "–"}</span>
            <button type="button" className="sb-share" onClick={share} disabled={done === 0}>
              {copied ? "Copied" : "Share result"}
            </button>
          </div>
        </aside>
      </section>

      <section className="board" aria-label="Subjects">
        {live.map((g) => {
          const rows = results.filter((r) => r.s.group === g.id);
          const n = rows.filter((r) => r.a).length;
          return (
            <div key={g.id} className="panel" style={{ ["--accent" as string]: g.color }}>
              <div className="panel-head">
                <h2>{g.name}</h2>
                <span className="panel-count num">
                  {n}/{rows.length} done
                </span>
              </div>
              <div className="meter" aria-hidden="true">
                <span style={{ width: `${(n / rows.length) * 100}%` }} />
              </div>
              <ul className="rows">
                {rows.map(({ s, a }) => {
                  const q = ready ? dailyQuestion(s.id, today) : undefined;
                  return (
                    <li key={s.id}>
                      <Link href={`/daily/${s.id}/`} className="row">
                        <span className="glyph" aria-hidden="true">
                          {s.glyph}
                        </span>
                        <span className="row-main">
                          <span className="row-name">{s.short}</span>
                          <span className="row-topic">{q ? q.topic : " "}</span>
                        </span>
                        <Status a={a} />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </section>

      {soon.length > 0 && (
        <section className="soon" aria-label="Coming soon">
          {soon.map((g) => (
            <div key={g.id} className="soon-panel" style={{ ["--accent" as string]: g.color }}>
              <div className="panel-head">
                <h2>{g.name}</h2>
                <span className="soon-tag">Coming soon</span>
              </div>
              <div className="soon-chips">
                {COMING_SOON.filter((c) => c.group === g.id).map((c) => (
                  <span key={c.name} className="soon-chip">
                    {c.name.startsWith(g.name + " ") ? c.name.slice(g.name.length + 1) : c.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </section>
      )}

      <section className="tools" aria-label="More from HSCLE">
        <Link href="/atar/" className="tool tool-atar">
          <span className="tool-text">
            <span className="tool-kicker">Tool</span>
            <span className="tool-title">ATAR Calculator</span>
            <span className="tool-desc">Estimate your ATAR from your HSC marks, using UAC&apos;s 2025 scaling data.</span>
            <span className="tool-link">
              Estimate my ATAR <Arrow />
            </span>
          </span>
          <svg className="gauge" viewBox="0 0 120 70" aria-hidden="true">
            <path d="M10 62a50 50 0 0 1 100 0" className="gauge-track" />
            <path d="M10 62a50 50 0 0 1 92.6-26" className="gauge-fill" />
          </svg>
        </Link>
        <Link href="/archive/" className="tool tool-archive">
          <span className="tool-text">
            <span className="tool-kicker">Catch up</span>
            <span className="tool-title">Archive</span>
            <span className="tool-desc">Every past daily question on a calendar. Answers there don&apos;t touch your streak.</span>
            <span className="tool-link">
              Open the calendar <Arrow />
            </span>
          </span>
          <span className="cal-art" aria-hidden="true">
            {CAL_ART.map((c, i) => (
              <span key={i} className={c === "g" ? "g" : c === "b" ? "b" : ""} />
            ))}
          </span>
        </Link>
      </section>
    </>
  );
}
