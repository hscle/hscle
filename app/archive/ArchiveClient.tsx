"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { QuestionCard } from "@/components/QuestionCard";
import { dailyQuestion } from "@/lib/daily";
import { addDays, daysBetween } from "@/lib/dates";
import { dailyFor } from "@/lib/progress";
import { useStore } from "@/lib/store";
import { GROUPS, SUBJECTS } from "@/lib/subjects";

/** The first day of HSCLE. The archive starts here. */
export const LAUNCH_DAY = "2026-11-25";

function longDate(day: string, withYear = false) {
  return new Date(day + "T12:00:00Z").toLocaleDateString("en-AU", {
    weekday: "long",
    day: "numeric",
    month: "long",
    ...(withYear ? { year: "numeric" } : {}),
    timeZone: "UTC",
  });
}

/** Past days, newest first (today is on the Daily Questions page, not here). */
function pastDays(today: string): string[] {
  const n = daysBetween(LAUNCH_DAY, today);
  return Array.from({ length: Math.max(0, n) }, (_, i) => addDays(today, -(i + 1)));
}

export function ArchiveClient() {
  const { today, ready, attempts } = useStore();
  const day = useSearchParams().get("day");
  if (!ready) return null;
  const days = pastDays(today);
  if (day && days.includes(day)) return <ArchiveDay day={day} />;

  return (
    <div className="narrow-col">
      <div className="page-head">
        <h1>Archive</h1>
        <p className="muted">
          Every past daily question, with worked solutions. Catch up on days you missed. Answers here don&apos;t affect
          your streak.
        </p>
      </div>
      {days.length === 0 ? (
        <div className="card empty">
          <p style={{ margin: 0 }}>
            Nothing here yet. Today&apos;s questions move into the archive at midnight, so check back tomorrow.
          </p>
          <Link href="/" className="btn btn-primary btn-small" style={{ marginTop: "1rem" }}>
            Go to today&apos;s questions
          </Link>
        </div>
      ) : (
        <ul className="archive-list">
          {days.map((d) => (
            <li key={d}>
              <Link href={`/archive/?day=${d}`} className="archive-day">
                <span className="archive-date">{longDate(d, true)}</span>
                <span className="tiles" aria-hidden="true">
                  {SUBJECTS.map((s) => {
                    const a = dailyFor(attempts, s.id, d);
                    return <span key={s.id} className={`tile ${a ? (a.correct ? "good" : "bad") : ""}`} />;
                  })}
                </span>
                <span className="go">Open →</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function ArchiveDay({ day }: { day: string }) {
  const { attempts } = useStore();
  return (
    <div className="narrow-col">
      <div className="page-head">
        <div className="crumbs">
          <Link href="/archive/">Archive</Link>
          <span aria-hidden="true">/</span>
          <span>{longDate(day, true)}</span>
        </div>
        <h1>{longDate(day)}</h1>
        <p className="muted">The daily questions from this day. Answers here don&apos;t affect your streak.</p>
      </div>
      {GROUPS.map((g) => {
        const subs = SUBJECTS.filter((s) => s.group === g.id);
        if (!subs.length) return null;
        return (
          <section key={g.id} className="group" style={{ ["--accent" as string]: g.color }}>
            <div className="group-head">
              <span className="swatch" />
              <h2>{g.name}</h2>
            </div>
            {subs.map((s) => {
              const q = dailyQuestion(s.id, day);
              return (
                <QuestionCard
                  key={`${day}-${s.id}`}
                  question={q}
                  mode="practice"
                  previous={dailyFor(attempts, s.id, day)}
                />
              );
            })}
          </section>
        );
      })}
    </div>
  );
}
