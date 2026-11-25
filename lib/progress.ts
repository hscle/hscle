import { addDays } from "./dates";
import type { Attempt, SubjectId } from "./types";

/** A day counts towards the streak if at least one daily question was answered. */
export function streaks(attempts: Attempt[], today: string): { current: number; best: number; activeToday: boolean } {
  const days = new Set(attempts.filter((a) => a.mode === "daily").map((a) => a.day));
  const activeToday = days.has(today);
  let current = 0;
  let d = activeToday ? today : addDays(today, -1);
  while (days.has(d)) {
    current++;
    d = addDays(d, -1);
  }
  let best = 0;
  let run = 0;
  let prev: string | null = null;
  for (const day of [...days].sort()) {
    run = prev && addDays(prev, 1) === day ? run + 1 : 1;
    best = Math.max(best, run);
    prev = day;
  }
  return { current, best, activeToday };
}

export function dailyFor(attempts: Attempt[], subject: SubjectId, day: string): Attempt | undefined {
  return attempts.find((a) => a.mode === "daily" && a.subject === subject && a.day === day);
}
