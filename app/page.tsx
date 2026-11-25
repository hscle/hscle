"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { dailyQuestion } from "@/lib/daily";
import { secondsUntilNextDay } from "@/lib/dates";
import { dailyFor, streaks } from "@/lib/progress";
import { useStore } from "@/lib/store";
import { COMING_SOON, GROUPS, SUBJECTS } from "@/lib/subjects";
import type { Attempt } from "@/lib/types";
import { SubjectGlyph } from "@/components/SubjectGlyph";
import { CalendarIcon, GaugeIcon } from "@/components/Band";

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
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
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
        <span className="st-txt">Start</span> <Arrow />
      </span>
    );
  return a.correct ? (
    <span className="status good">
      <Check /> <span className="st-txt">Correct</span>
    </span>
  ) : (
    <span className="status bad">
      <Cross /> <span className="st-txt">Incorrect</span>
    </span>
  );
}

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
      <section className="intro">
        <div>
          <p className="eyebrow">{ready ? longDate(today) : "\u00a0"}</p>
          <h1>
            Daily <em>questions</em>
          </h1>
          <p className="lede">
            One HSC exam-style question per subject, every day. Answer it, read the worked solution, keep your streak
            alive.
          </p>
          <div className="cta">
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
            <Link href="/archive/" className="btn btn-ghost">
              Catch up on past days
            </Link>
          </div>
        </div>

        <aside className="card today" aria-label="Today's progress">
          <div className="today-top">
            <span className="label">Today</span>
            <span className="label">
              New in <Countdown />
            </span>
          </div>
          <div className={`today-streak ${activeToday ? "lit" : ""}`}>
            <span className="today-num num">{ready ? current : "–"}</span>
            <span className="muted small">
              <Flame /> day streak
            </span>
          </div>
          <ul className="dots" aria-label="Today's subjects">
            {results.map(({ s, a }) => (
              <li
                key={s.id}
                className={a ? (a.correct ? "good" : "bad") : ""}
                title={`${s.name}: ${a ? (a.correct ? "correct" : "incorrect") : "not answered yet"}`}
              >
                <span className="sr-only">
                  {s.name}: {a ? (a.correct ? "correct" : "incorrect") : "not answered yet"}
                </span>
              </li>
            ))}
          </ul>
          <div className="today-foot">
            <span>Best streak {ready ? best : "–"}</span>
            <button type="button" className="btn btn-small" onClick={share} disabled={done === 0}>
              {copied ? "Copied" : "Share result"}
            </button>
          </div>
        </aside>
      </section>

      <section className="groups" aria-label="Subjects">
        {live.map((g) => {
          const rows = results.filter((r) => r.s.group === g.id);
          const n = rows.filter((r) => r.a).length;
          return (
            <div key={g.id} style={{ ["--accent" as string]: g.color }}>
              <div className="section-head">
                <h2>{g.name}</h2>
                <span className="muted small num">
                  {n} of {rows.length} done
                </span>
              </div>
              <ul className="list">
                {rows.map(({ s, a }) => {
                  const q = ready ? dailyQuestion(s.id, today) : undefined;
                  return (
                    <li key={s.id}>
                      <Link href={`/daily/${s.id}/`} className="item">
                        <span className="glyph" aria-hidden="true">
                          <SubjectGlyph subject={s} />
                        </span>
                        <span className="item-main">
                          <span className="item-name">{s.short}</span>
                          <span className="item-topic">{q ? q.topic : "\u00a0"}</span>
                        </span>
                        <Status a={a} />
                      </Link>
                    </li>
                  );
                })}
                {COMING_SOON.filter((c) => c.group === g.id).map((c) => (
                  <li key={c.name} className="item" aria-disabled="true">
                    <span className="glyph" aria-hidden="true">
                      {c.glyph ?? c.name[0]}
                    </span>
                    <span className="item-main">
                      <span className="item-name muted">{c.short ?? c.name}</span>
                    </span>
                    <span className="status">Coming soon</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </section>

      {soon.length > 0 && (
        <section className="soon" aria-labelledby="soon-h">
          <div className="section-head">
            <h2 id="soon-h">Coming soon</h2>
          </div>
          <div className="soon-grid">
            {soon.map((g) => (
              <div key={g.id} className="soon-group" style={{ ["--accent" as string]: g.color }}>
                <h3>{g.name}</h3>
                <div className="chips">
                  {COMING_SOON.filter((c) => c.group === g.id).map((c) => (
                    <span key={c.name} className="soon-chip">
                      {c.name.startsWith(g.name + " ") ? c.name.slice(g.name.length + 1) : c.name}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="tools" aria-label="More from HSCLE">
        <Link href="/atar/" className="card tool" style={{ ["--accent" as string]: "var(--flame)" }}>
          <span className="glyph" aria-hidden="true">
            <GaugeIcon />
          </span>
          <span className="tool-text">
            <span className="tool-title">ATAR Calculator</span>
            <span className="tool-desc">Estimate your ATAR from your HSC marks, using UAC&apos;s 2025 scaling data.</span>
          </span>
          <span className="tool-arrow">
            <Arrow />
          </span>
        </Link>
        <Link href="/archive/" className="card tool" style={{ ["--accent" as string]: "var(--brand)" }}>
          <span className="glyph" aria-hidden="true">
            <CalendarIcon />
          </span>
          <span className="tool-text">
            <span className="tool-title">Archive</span>
            <span className="tool-desc">Every past daily question on a calendar. Answers there don&apos;t touch your streak.</span>
          </span>
          <span className="tool-arrow">
            <Arrow />
          </span>
        </Link>
      </section>
    </>
  );
}
