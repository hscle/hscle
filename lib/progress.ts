import { addDays, weekStart } from "./dates";
import { SUBJECTS } from "./subjects";
import type { Attempt, SubjectId } from "./types";

/**
 * Leaderboard score: correct daily answers in the current week (Monday to Sunday,
 * Sydney time). Everyone gets the same daily questions, so this is a fair race.
 * Keep in sync with weekly_leaderboard() in supabase/schema.sql.
 */
export function weeklyScore(attempts: Attempt[], today: string): number {
  const start = weekStart(today);
  return attempts.filter((a) => a.mode === "daily" && a.correct && a.day >= start).length;
}

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

export interface SubjectStats {
  subject: SubjectId;
  attempted: number;
  correct: number;
  accuracy: number | null;
  /** Accuracy by topic, weakest first. */
  topics: { topic: string; attempted: number; correct: number }[];
}

export function subjectStats(attempts: Attempt[], topicOf: (qid: string) => string | undefined): SubjectStats[] {
  return SUBJECTS.map((s) => {
    const mine = attempts.filter((a) => a.subject === s.id);
    const correct = mine.filter((a) => a.correct).length;
    const topicMap = new Map<string, { attempted: number; correct: number }>();
    for (const a of mine) {
      const t = topicOf(a.questionId) ?? "Other";
      const cur = topicMap.get(t) ?? { attempted: 0, correct: 0 };
      cur.attempted++;
      if (a.correct) cur.correct++;
      topicMap.set(t, cur);
    }
    const topics = [...topicMap.entries()]
      .map(([topic, v]) => ({ topic, ...v }))
      .sort((a, b) => a.correct / a.attempted - b.correct / b.attempted);
    return {
      subject: s.id,
      attempted: mine.length,
      correct,
      accuracy: mine.length ? correct / mine.length : null,
      topics,
    };
  });
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  emoji: string;
  earned: boolean;
}

export function achievements(attempts: Attempt[], today: string): Achievement[] {
  const { best } = streaks(attempts, today);
  const correct = attempts.filter((a) => a.correct).length;
  const practiceCorrect = new Set(attempts.filter((a) => a.mode === "practice" && a.correct).map((a) => a.questionId)).size;
  const dailyByDay = new Map<string, Set<SubjectId>>();
  for (const a of attempts.filter((a) => a.mode === "daily")) {
    const set = dailyByDay.get(a.day) ?? new Set();
    set.add(a.subject);
    dailyByDay.set(a.day, set);
  }
  const fullHouse = [...dailyByDay.values()].some((s) => s.size === SUBJECTS.length);
  const perfectDay = [...dailyByDay.keys()].some((day) => {
    const ds = attempts.filter((a) => a.mode === "daily" && a.day === day);
    return ds.length >= 3 && ds.every((a) => a.correct);
  });
  return [
    { id: "first", name: "First blood", description: "Answer your first question correctly", emoji: "🎯", earned: correct >= 1 },
    { id: "streak3", name: "On a roll", description: "Reach a 3-day streak", emoji: "🔥", earned: best >= 3 },
    { id: "streak7", name: "Week warrior", description: "Reach a 7-day streak", emoji: "📅", earned: best >= 7 },
    { id: "streak30", name: "Unstoppable", description: "Reach a 30-day streak", emoji: "🏆", earned: best >= 30 },
    { id: "correct25", name: "Quarter century", description: "Answer 25 questions correctly", emoji: "⚡", earned: correct >= 25 },
    { id: "correct100", name: "Century", description: "Answer 100 questions correctly", emoji: "💯", earned: correct >= 100 },
    { id: "practice10", name: "Practice makes perfect", description: "Get 10 different practice questions right", emoji: "📚", earned: practiceCorrect >= 10 },
    { id: "fullhouse", name: "Full house", description: "Do every subject's daily question in one day", emoji: "🌈", earned: fullHouse },
    { id: "perfect", name: "Flawless", description: "Get 3 or more daily questions right in one day with no misses", emoji: "✨", earned: perfectDay },
  ];
}
