"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Band, CalendarIcon } from "@/components/Band";
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

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function monthLabel(month: string) {
  return new Date(month + "-15T12:00:00Z").toLocaleDateString("en-AU", { month: "long", year: "numeric", timeZone: "UTC" });
}

function shiftMonth(month: string, n: number): string {
  const [y, m] = month.split("-").map(Number);
  const d = new Date(Date.UTC(y, m - 1 + n, 1));
  return d.toISOString().slice(0, 7);
}

/** Calendar cells for a month, Monday first; null = padding. */
function monthCells(month: string): (string | null)[] {
  const first = month + "-01";
  const lead = (new Date(first + "T00:00:00Z").getUTCDay() + 6) % 7;
  const cells: (string | null)[] = Array(lead).fill(null);
  for (let d = first; d.startsWith(month); d = addDays(d, 1)) cells.push(d);
  while (cells.length % 7) cells.push(null);
  return cells;
}

export function ArchiveClient() {
  const { today, ready, attempts } = useStore();
  const params = useSearchParams();
  const day = params.get("day");
  const launchMonth = LAUNCH_DAY.slice(0, 7);
  const thisMonth = today.slice(0, 7);
  const asked = params.get("month");
  const month = asked && asked >= launchMonth && asked <= thisMonth ? asked : thisMonth;
  if (!ready) return null;
  if (day && day >= LAUNCH_DAY && day < today) return <ArchiveDay day={day} />;
  const pastCount = Math.max(0, daysBetween(LAUNCH_DAY, today));

  return (
    <div className="narrow-col">
      <Band accent="var(--brand)" icon={<CalendarIcon />} title="Archive">
        Every past daily question, with worked solutions. Pick a day to catch up. Answers here don&apos;t affect your
        streak.
      </Band>
      <div className="card cal">
        <div className="cal-head">
          {month > launchMonth ? (
            <Link href={`/archive/?month=${shiftMonth(month, -1)}`} className="icon-btn" aria-label="Previous month">
              ‹
            </Link>
          ) : (
            <span className="icon-btn disabled" aria-hidden="true">‹</span>
          )}
          <h2>{monthLabel(month)}</h2>
          {month < thisMonth ? (
            <Link href={`/archive/?month=${shiftMonth(month, 1)}`} className="icon-btn" aria-label="Next month">
              ›
            </Link>
          ) : (
            <span className="icon-btn disabled" aria-hidden="true">›</span>
          )}
        </div>
        <div className="cal-grid" role="grid">
          {WEEKDAYS.map((w) => (
            <span key={w} className="cal-wd label">
              {w}
            </span>
          ))}
          {monthCells(month).map((d, i) => {
            if (!d) return <span key={i} className="cal-cell pad" />;
            const n = Number(d.slice(8));
            const results = SUBJECTS.map((s) => dailyFor(attempts, s.id, d));
            const dots = (
              <span className="cal-dots" aria-hidden="true">
                {results.map((a, j) => (
                  <span key={j} className={a ? (a.correct ? "good" : "bad") : ""} />
                ))}
              </span>
            );
            if (d === today)
              return (
                <Link key={d} href="/" className="cal-cell today-cell" title="Today: answer on Daily Questions">
                  <span className="cal-n">{n}</span>
                  {dots}
                </Link>
              );
            if (d < LAUNCH_DAY || d > today)
              return (
                <span key={d} className="cal-cell off">
                  <span className="cal-n">{n}</span>
                </span>
              );
            const done = results.filter(Boolean).length;
            return (
              <Link key={d} href={`/archive/?day=${d}`} className="cal-cell" aria-label={`${longDate(d, true)}, ${done} of ${SUBJECTS.length} answered`}>
                <span className="cal-n">{n}</span>
                {dots}
              </Link>
            );
          })}
        </div>
        <div className="cal-key small muted">
          <span><i className="good" /> Correct</span>
          <span><i className="bad" /> Incorrect</span>
          <span><i /> Not answered</span>
        </div>
      </div>
      {pastCount === 0 && (
        <p className="muted small">
          HSCLE launched today, so there are no past days yet. Today&apos;s questions join the archive at midnight.
        </p>
      )}
    </div>
  );
}

function ArchiveDay({ day }: { day: string }) {
  const { attempts } = useStore();
  return (
    <div className="narrow-col">
      <Band
        accent="var(--brand)"
        icon={<CalendarIcon />}
        title={longDate(day)}
        crumbs={
          <>
            <Link href="/archive/">Archive</Link>
            <span aria-hidden="true">/</span>
            <span>{longDate(day, true)}</span>
          </>
        }
      >
        The daily questions from this day. Answers here don&apos;t affect your streak.
      </Band>
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
