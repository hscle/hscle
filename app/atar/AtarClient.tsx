"use client";

import { useEffect, useMemo, useState } from "react";
import { COURSES, DATA_YEAR, estimate, getCourse, maxMark, type Entry } from "@/lib/atar";

const KEY = "hscle:atar";
const REPORT =
  "https://www.uac.edu.au/media-centre/publications/report-on-the-scaling-of-the-2025-nsw-higher-school-certificate";

interface Row {
  id: number;
  course: string;
  mark: string;
}

const START: Row[] = [
  { id: 1, course: "English Advanced", mark: "" },
  { id: 2, course: "Mathematics Advanced", mark: "" },
  { id: 3, course: "", mark: "" },
  { id: 4, course: "", mark: "" },
  { id: 5, course: "", mark: "" },
];

const fmt = (n: number) => n.toFixed(1);
const fmtAtar = (n: number) => n.toFixed(2);

export function AtarClient() {
  const [rows, setRows] = useState<Row[]>(START);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(KEY);
      if (saved) setRows(JSON.parse(saved) as Row[]);
    } catch {
      /* ignore */
    }
    setLoaded(true);
  }, []);
  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(KEY, JSON.stringify(rows));
    } catch {
      /* ignore */
    }
  }, [rows, loaded]);

  const entries: Entry[] = rows
    .filter((r) => r.course && r.mark.trim() !== "")
    .map((r) => ({ course: r.course, mark: Number(r.mark) }));
  const result = useMemo(() => estimate(entries), [JSON.stringify(entries)]); // eslint-disable-line react-hooks/exhaustive-deps
  const units = entries.reduce((n, e) => n + (getCourse(e.course)?.units ?? 0), 0);
  const ready = result.problems.length === 0;

  const update = (id: number, patch: Partial<Row>) => setRows((rs) => rs.map((r) => (r.id === id ? { ...r, ...patch } : r)));
  const add = () => setRows((rs) => [...rs, { id: Math.max(0, ...rs.map((r) => r.id)) + 1, course: "", mark: "" }]);
  const remove = (id: number) => setRows((rs) => rs.filter((r) => r.id !== id));
  const taken = new Set(rows.map((r) => r.course));

  return (
    <div className="narrow-col">
      <div className="page-head">
        <h1>ATAR Calculator</h1>
        <p className="muted">
          Enter your HSC marks to estimate your ATAR. It uses UAC&apos;s official {DATA_YEAR} scaling data and the same
          rule UAC uses: your best 2 units of English plus your best 8 other units.
        </p>
      </div>

      <div className="card atar-form">
        <div className="atar-row atar-head label">
          <span>Course</span>
          <span>HSC mark</span>
          <span>Scaled</span>
          <span />
        </div>
        {rows.map((r) => {
          const c = getCourse(r.course);
          const res = result.rows.find((x) => x.course.name === r.course && r.mark.trim() !== "");
          return (
            <div key={r.id} className="atar-row">
              <select
                aria-label="Course"
                value={r.course}
                onChange={(e) => update(r.id, { course: e.target.value })}
              >
                <option value="">Choose a course</option>
                {COURSES.map((o) => (
                  <option key={o.name} value={o.name} disabled={taken.has(o.name) && o.name !== r.course}>
                    {o.name}
                    {o.units === 1 ? " (1 unit)" : ""}
                  </option>
                ))}
              </select>
              <label className="mark">
                <input
                  aria-label={c ? `HSC mark out of ${maxMark(c)}` : "HSC mark"}
                  inputMode="decimal"
                  placeholder="–"
                  value={r.mark}
                  onChange={(e) => {
                    const v = e.target.value.replace(/[^0-9.]/g, "");
                    if (c && Number(v) > maxMark(c)) return;
                    update(r.id, { mark: v });
                  }}
                />
                <span className="muted small">/{c ? maxMark(c) : 100}</span>
              </label>
              <span className={`num scaled ${res && res.countedUnits === 0 ? "muted" : ""}`}>
                {res ? fmt(res.scaled) : "–"}
                {res && res.countedUnits === 0 && <span className="small"> not counted</span>}
                {res && res.countedUnits > 0 && res.countedUnits < res.course.units && (
                  <span className="small muted"> half counted</span>
                )}
              </span>
              <button type="button" className="icon-btn" aria-label="Remove course" onClick={() => remove(r.id)}>
                ×
              </button>
            </div>
          );
        })}
        <div className="atar-foot">
          <button type="button" className="btn btn-small" onClick={add}>
            + Add course
          </button>
          <span className="small muted num">{units} units entered</span>
        </div>
      </div>

      <div className="card atar-result" aria-live="polite">
        {ready ? (
          <>
            <span className="label">Estimated ATAR</span>
            <div className="atar-big num">{fmtAtar(result.atar)}</div>
            <p className="muted" style={{ margin: 0 }}>
              Likely range <strong className="num">{fmtAtar(result.low)}</strong> to{" "}
              <strong className="num">{fmtAtar(result.high)}</strong>. Aggregate{" "}
              <strong className="num">{fmt(result.aggregate)}</strong> out of 500.
            </p>
          </>
        ) : (
          <>
            <span className="label">Estimated ATAR</span>
            <div className="atar-big num muted">–</div>
            {result.problems.map((p) => (
              <p key={p} className="muted small" style={{ margin: "0.25rem 0 0" }}>
                {p}
              </p>
            ))}
          </>
        )}
      </div>

      <section className="atar-notes small muted">
        <h2>How this works</h2>
        <ol>
          <li>
            Each HSC mark is turned into a scaled mark by matching where it sits in that course&apos;s {DATA_YEAR} results.
            We use the percentiles UAC publishes for every course (top mark, 99th, 90th, 75th, 50th and 25th) and draw a
            straight line between them.
          </li>
          <li>
            UAC adds your best 2 units of English and your best 8 other units of scaled marks. That&apos;s your aggregate,
            out of 500. Part of a 2-unit course can count, just like the real thing.
          </li>
          <li>The aggregate becomes an ATAR using UAC&apos;s published table of aggregates for each ATAR.</li>
        </ol>
        <h2>Why it&apos;s an estimate</h2>
        <p>
          UAC scales the raw marks behind your HSC result, not your HSC mark itself, and scaling changes every year with
          the cohort. UAC says its tables shouldn&apos;t be used as a straight conversion, so treat this as a guide and
          read the range as well as the single number. Only UAC can give you your actual ATAR. Marks must be HSC marks
          (the ones on your HSC results), not school assessment ranks or trial exam scores.
        </p>
        <p>
          Not every course is listed yet (VET exams and some languages are missing). Category B courses, of which only 2
          units can count, aren&apos;t included.
        </p>
        <h2>Sources</h2>
        <p>
          UAC,{" "}
          <a href={REPORT} target="_blank" rel="noreferrer">
            Report on the Scaling of the {DATA_YEAR} NSW HSC
          </a>
          : Table A3 (HSC and scaled mark percentiles by course), Table A9 and Table 3.2 (aggregates for each ATAR). Our
          aggregate-to-ATAR step matches UAC&apos;s Table 3.2 to within 0.1. Course units follow NESA&apos;s HSC rules.
        </p>
      </section>
    </div>
  );
}
