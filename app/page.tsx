"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { dailyQuestion } from "@/lib/daily";
import { secondsUntilNextDay } from "@/lib/dates";
import { dailyFor, streaks } from "@/lib/progress";
import { useStore } from "@/lib/store";
import { COMING_SOON, GROUPS, SUBJECTS } from "@/lib/subjects";

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

export default function Home() {
  const { attempts, today, ready } = useStore();
  const [copied, setCopied] = useState(false);
  const { current, best } = streaks(attempts, today);
  const results = SUBJECTS.map((s) => ({ s, a: ready ? dailyFor(attempts, s.id, today) : undefined }));
  const done = results.filter((r) => r.a).length;
  const correct = results.filter((r) => r.a?.correct).length;

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

  return (
    <>
      <section className="home-top">
        <div>
          <p className="date">{ready ? longDate(today) : " "}</p>
          <h1>
            Today&apos;s <em>questions</em>
          </h1>
          <p className="sub">
            One HSC exam-style question per subject, every day. Get it right, read the worked solution, keep your streak
            alive.
          </p>
        </div>
        <div className="card today">
          <div className="today-row">
            <span className="label">Today</span>
            <span className="label">
              New in <Countdown />
            </span>
          </div>
          <div className="tiles" aria-label={`${correct} correct out of ${done} answered`}>
            {results.map(({ s, a }) => (
              <span key={s.id} className={`tile ${a ? (a.correct ? "good" : "bad") : ""}`} title={s.name} />
            ))}
          </div>
          <div className="today-row">
            <div>
              <div className="big num">{ready ? current : "–"}</div>
              <div className="label">Day streak</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div className="big num">
                {ready ? correct : "–"}
                <span className="muted" style={{ fontSize: "1.1rem" }}>
                  /{SUBJECTS.length}
                </span>
              </div>
              <div className="label">Correct today</div>
            </div>
          </div>
          <div className="today-foot" style={{ marginTop: "1rem" }}>
            <span className="small muted">Best streak: {ready ? best : "–"}</span>
            <button type="button" className="btn btn-small" onClick={share} disabled={done === 0}>
              {copied ? "Copied" : "Share result"}
            </button>
          </div>
        </div>
      </section>

      {GROUPS.map((g) => {
        const subs = results.filter((r) => r.s.group === g.id);
        const soon = COMING_SOON.filter((c) => c.group === g.id);
        return (
          <section key={g.id} className="group" style={{ ["--accent" as string]: g.color }}>
            <div className="group-head">
              <span className="swatch" />
              <h2>{g.name}</h2>
              <span className="label count">
                {subs.length ? `${subs.filter((r) => r.a).length}/${subs.length} done` : "Coming soon"}
              </span>
            </div>
            <div className="subjects">
              {subs.map(({ s, a }) => (
                <Link key={s.id} href={`/daily/${s.id}/`} className="subject">
                  <span className="name">{s.short}</span>
                  <span className="topic">{ready ? dailyQuestion(s.id, today).topic : " "}</span>
                  <span className="foot">
                    {a ? (
                      <span className={a.correct ? "good" : "bad"}>{a.correct ? "Correct" : "Missed"}</span>
                    ) : (
                      <span className="go">Answer →</span>
                    )}
                    <span className={`tile ${a ? (a.correct ? "good" : "bad") : ""}`} aria-hidden="true" />
                  </span>
                </Link>
              ))}
              {soon.map((c) => (
                <div key={c.name} className="subject soon">
                  <span className="name">{c.name}</span>
                  <span className="topic">Coming soon</span>
                </div>
              ))}
            </div>
          </section>
        );
      })}
    </>
  );
}
