import { AGGREGATE_TO_ATAR, DATA_YEAR, TABLE_A3 } from "./data";

export { DATA_YEAR };

export interface Course {
  name: string;
  units: 1 | 2;
  english: boolean;
  /** Piecewise-linear map from HSC mark (per unit, 0-50) to scaled mark (per unit, 0-50). */
  points: [number, number][];
  students: number;
}

/** Every "Extension" course is 1 unit, except Maths Extension 2, which is 2 units (taken with Extension 1). */
const isOneUnit = (name: string) => name.includes("Extension") && name !== "Mathematics Extension 2";

function parse(): Course[] {
  return TABLE_A3.trim()
    .split("\n")
    .map((line) => {
      const [name, students, hsc, scaled] = line.split("|");
      const h = hsc.split(",").map(Number);
      const s = scaled.split(",").map(Number);
      // indices: 2 = max, 3 = P99, 4 = P90, 5 = P75, 6 = P50, 7 = P25
      const raw: [number, number][] = [[0, 0]];
      for (const i of [7, 6, 5, 4, 3, 2]) raw.push([h[i], s[i]]);
      raw.push([50, s[2]]);
      // Keep x strictly increasing; on ties keep the higher scaled value.
      const points: [number, number][] = [];
      for (const [x, y] of raw) {
        const last = points[points.length - 1];
        if (last && x <= last[0]) last[1] = Math.max(last[1], y);
        else points.push([x, Math.max(y, last ? last[1] : 0)]);
      }
      const units = isOneUnit(name) ? 1 : 2;
      return { name, units, english: name.startsWith("English"), points, students: Number(students) } as Course;
    })
    .sort((a, b) => a.name.localeCompare(b.name));
}

export const COURSES: Course[] = parse();

export function getCourse(name: string): Course | undefined {
  return COURSES.find((c) => c.name === name);
}

function interp(points: [number, number][], x: number): number {
  if (x <= points[0][0]) return points[0][1];
  for (let i = 1; i < points.length; i++) {
    const [x1, y1] = points[i];
    if (x <= x1) {
      const [x0, y0] = points[i - 1];
      return y0 + ((x - x0) / (x1 - x0)) * (y1 - y0);
    }
  }
  return points[points.length - 1][1];
}

/** Highest mark for the course as students see it (out of 100 for 2 units, 50 for 1 unit). */
export const maxMark = (c: Course) => c.units * 50;

/** Estimated scaled mark for the whole course, on the same scale as the HSC mark. */
export function scaledMark(c: Course, mark: number): number {
  const perUnit = Math.min(50, Math.max(0, mark / c.units));
  return interp(c.points, perUnit) * c.units;
}

export function aggregateToAtar(agg: number): number {
  const t = AGGREGATE_TO_ATAR;
  if (agg >= t[t.length - 1][0]) return 99.95;
  if (agg < t[0][0]) {
    // Below the published points: extend the bottom slope, never below 30.
    const [[a0, r0], [a1, r1]] = t;
    return Math.max(30, r0 - ((a0 - agg) * (r1 - r0)) / (a1 - a0));
  }
  return interp(t, agg);
}

/** ATARs are reported in steps of 0.05. */
export const roundAtar = (x: number) => Math.min(99.95, Math.floor(x * 20 + 1e-9) / 20);

export interface Entry {
  course: string;
  mark: number;
}

export interface Result {
  rows: { course: Course; mark: number; scaled: number; countedUnits: number }[];
  aggregate: number;
  atar: number;
  low: number;
  high: number;
  problems: string[];
}

export function estimate(entries: Entry[]): Result {
  const rows = entries
    .map((e) => ({ course: getCourse(e.course), mark: e.mark }))
    .filter((r): r is { course: Course; mark: number } => !!r.course && Number.isFinite(r.mark))
    .map((r) => ({ ...r, scaled: scaledMark(r.course, r.mark), countedUnits: 0 }));

  // Split courses into single units so part of a course can count, as UAC allows.
  const units = rows.flatMap((r, i) =>
    Array.from({ length: r.course.units }, () => ({ i, value: r.scaled / r.course.units, english: r.course.english })),
  );
  const problems: string[] = [];
  const total = units.length;
  const englishUnits = units.filter((u) => u.english);
  const hasMainEnglish = rows.some((r) => r.course.english && r.course.units === 2);
  if (!hasMainEnglish || englishUnits.length < 2)
    problems.push("Add your English course (Standard, Advanced or EAL/D). UAC has to count 2 units of English.");
  if (total < 10) problems.push(`Add more courses. An ATAR needs at least 10 units (you have ${total}).`);

  const used = new Set<(typeof units)[number]>();
  for (const u of [...englishUnits].sort((a, b) => b.value - a.value).slice(0, 2)) used.add(u);
  for (const u of units
    .filter((u) => !used.has(u))
    .sort((a, b) => b.value - a.value)
    .slice(0, 10 - used.size))
    used.add(u);
  let aggregate = 0;
  for (const u of used) {
    aggregate += u.value;
    rows[u.i].countedUnits++;
  }

  // Table A3 gives each course's whole-cohort scaling, but individual results also depend on
  // exam/assessment moderation, so we show a band rather than pretend to be exact.
  const spread = 0.03 * aggregate;
  return {
    rows,
    aggregate,
    atar: roundAtar(aggregateToAtar(aggregate)),
    low: roundAtar(aggregateToAtar(aggregate - spread)),
    high: roundAtar(aggregateToAtar(aggregate + spread)),
    problems,
  };
}

/**
 * NESA course prerequisites: an extension course is only taken alongside these courses.
 * Any one of the listed courses satisfies the rule.
 */
const PREREQUISITES: Record<string, string[]> = {
  "Mathematics Extension 1": ["Mathematics Advanced", "Mathematics Extension 2"],
  "Mathematics Extension 2": ["Mathematics Extension 1"],
  "English Extension 1": ["English Advanced"],
  "English Extension 2": ["English Extension 1"],
  "History Extension": ["Ancient History", "Modern History"],
  "Music Extension": ["Music 2"],
  "Science Extension": ["Biology", "Chemistry", "Earth & Environmental Science", "Investigating Science", "Physics"],
  "Chinese Extension": ["Chinese Continuers"],
  "French Extension": ["French Continuers"],
  "Japanese Extension": ["Japanese Continuers"],
};

/**
 * Courses whose students always get a result in another course too. Maths Extension 2 students also sit
 * the Extension 1 exam, and English Extension 2 students also take English Extension 1, so that extra
 * unit is part of their ATAR.
 */
export const ALSO_SITS: Record<string, string> = {
  "Mathematics Extension 2": "Mathematics Extension 1",
  "English Extension 2": "English Extension 1",
};

/** Plain-English notes for courses entered without the course NESA requires them to be taken with. */
export function prerequisiteNotes(courses: string[]): string[] {
  const have = new Set(courses);
  const notes: string[] = [];
  for (const c of courses) {
    const needs = PREREQUISITES[c];
    if (!needs || needs.some((n) => have.has(n))) continue;
    if (ALSO_SITS[c]) continue; // reported separately, as it changes the unit count
    notes.push(`${c} is taken with ${needs.length === 1 ? needs[0] : `${needs.slice(0, -1).join(", ")} or ${needs[needs.length - 1]}`}. Check your courses.`);
  }
  return notes;
}
