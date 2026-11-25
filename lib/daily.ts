import { daysBetween } from "./dates";
import { questionsFor } from "./questions";
import type { Question, SubjectId } from "./types";

/** Day 0 of the daily rotation. */
const EPOCH = "2026-01-01";

function hash(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function seededShuffle<T>(items: T[], seed: number): T[] {
  const a = [...items];
  let x = seed || 1;
  for (let i = a.length - 1; i > 0; i--) {
    x ^= x << 13;
    x ^= x >>> 17;
    x ^= x << 5;
    const j = (x >>> 0) % (i + 1);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * Today's question for a subject. Deterministic, so every student gets the
 * same question on the same Sydney day (which is what makes it shareable).
 * Each full pass through a subject's bank uses a fresh shuffle.
 */
export function dailyQuestion(subject: SubjectId, day: string): Question {
  const pool = [...questionsFor(subject)].sort((a, b) => a.id.localeCompare(b.id));
  const n = Math.max(0, daysBetween(EPOCH, day));
  const cycle = Math.floor(n / pool.length);
  const order = seededShuffle(pool, hash(`${subject}:${cycle}`));
  return order[n % pool.length];
}
