/** All "days" in HSCLE are Sydney calendar days, so the daily quiz flips at midnight in NSW. */
export const TIME_ZONE = "Australia/Sydney";

const dayFmt = new Intl.DateTimeFormat("en-CA", {
  timeZone: TIME_ZONE,
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

/** YYYY-MM-DD in Sydney. */
export function sydneyDay(date: Date = new Date()): string {
  return dayFmt.format(date);
}

/** Whole days between two YYYY-MM-DD strings (b - a). */
export function daysBetween(a: string, b: string): number {
  const ms = Date.parse(b + "T00:00:00Z") - Date.parse(a + "T00:00:00Z");
  return Math.round(ms / 86_400_000);
}

export function addDays(day: string, n: number): string {
  const d = new Date(Date.parse(day + "T00:00:00Z") + n * 86_400_000);
  return d.toISOString().slice(0, 10);
}

/** Monday of the week containing `day`. */
export function weekStart(day: string): string {
  const dow = new Date(day + "T00:00:00Z").getUTCDay(); // 0 = Sunday
  return addDays(day, -((dow + 6) % 7));
}

/** Seconds until the next Sydney midnight. */
export function secondsUntilNextDay(now: Date = new Date()): number {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: TIME_ZONE,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  }).formatToParts(now);
  const get = (t: string) => Number(parts.find((p) => p.type === t)?.value ?? 0);
  return 86_400 - (get("hour") * 3600 + get("minute") * 60 + get("second"));
}
