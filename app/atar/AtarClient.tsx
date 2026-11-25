"use client";

import { useEffect, useMemo, useState } from "react";
import { Band, GaugeIcon } from "@/components/Band";
import { ALSO_SITS, COURSES, DATA_YEAR, estimate, getCourse, maxMark, prerequisiteNotes, type Entry } from "@/lib/atar";

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

  // A mark is only used when it is a real number within the course's range. Anything else is flagged on its row
  // instead of being silently cut short or clamped to full marks.
  const markError = (r: Row): string | null => {
    const c = getCourse(r.course);
    const v = r.mark.trim();
    if (!c || v === "") return null;
    const n = Number(v);
    if (!Number.isFinite(n)) return "Enter a number";
    if (n > maxMark(c)) return `Max is ${maxMark(c)}`;
    return null;
  };
  const badRows = rows.filter((r) => markError(r));
  const entries: Entry[] = rows
    .filter((r) => r.course && r.mark.trim() !== "" && !markError(r))
    .map((r) => ({ course: r.course, mark: Number(r.mark) }));
  const result = useMemo(() => estimate(entries), [JSON.stringify(entries)]); // eslint-disable-line react-hooks/exhaustive-deps
  const units = result.units;
  const chosen = rows.map((r) => r.course).filter(Boolean);
  const missingAlso = chosen
    .filter((c) => ALSO_SITS[c])
    .filter((c) => !entries.some((e) => e.course === ALSO_SITS[c]))
    .map((c) => `Add your ${ALSO_SITS[c]} mark. ${c} students also get a result in ${ALSO_SITS[c]}, and it counts as ${c.startsWith("Mathematics") ? "2 more units" : "1 more unit"}.`);
  const notes = prerequisiteNotes(chosen);
  const markProblems = badRows.map((r) => `${r.course} is marked out of ${maxMark(getCourse(r.course)!)}. Check that mark.`);
  const warnings = [...missingAlso, ...result.problems, ...notes];
  // The result only appears once the student presses the button, then follows their edits live.
  const [shown, setShown] = useState(false);
  const canShow = shown && entries.length > 0 && badRows.length === 0;
  const calculate = () => {
    setShown(true);
    requestAnimationFrame(() => document.getElementById("atar-result")?.scrollIntoView({ behavior: "smooth", block: "center" }));
  };

  const update = (id: number, patch: Partial<Row>) =>
    setRows((rs) => {
      let next = rs.map((r) => (r.id === id ? { ...r, ...patch } : r));
      // Picking Maths Extension 2 (or English Extension 2) adds the Extension 1 row it always comes with.
      const also = patch.course ? ALSO_SITS[patch.course] : undefined;
      if (also && !next.some((r) => r.course === also)) {
        // Insert it straight below, so the blank rows the student is about to fill stay blank.
        const at = next.findIndex((r) => r.id === id) + 1;
        const newId = Math.max(0, ...next.map((r) => r.id)) + 1;
        next = [...next.slice(0, at), { id: newId, course: also, mark: "" }, ...next.slice(at)];
      }
      return next;
    });
  const add = () => setRows((rs) => [...rs, { id: Math.max(0, ...rs.map((r) => r.id)) + 1, course: "", mark: "" }]);
  const remove = (id: number) => setRows((rs) => rs.filter((r) => r.id !== id));
  const taken = new Set(rows.map((r) => r.course));

  return (
    <div className="narrow-col">
      <Band accent="var(--flame)" icon={<GaugeIcon />} title="ATAR Calculator">
        Enter your HSC marks to estimate your ATAR. It uses UAC&apos;s official {DATA_YEAR} scaling data and the same rule
        UAC uses: your best 2 units of English plus your best 8 other units.
      </Band>

      <div className="card atar-form">
        <div className="atar-row atar-head label">
          <span>Course</span>
          <span>HSC mark</span>
          <span>Scaled</span>
          <span />
        </div>
        {rows.map((r) => {
          const c = getCourse(r.course);
          const err = markError(r);
          const res = err ? undefined : result.rows.find((x) => x.course.name === r.course && r.mark.trim() !== "");
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
                    {o.name === "Mathematics Extension 1" ? " (1 unit, 2 with Ext 2)" : o.units === 1 ? " (1 unit)" : ""}
                  </option>
                ))}
              </select>
              <label className="mark">
                <input
                  aria-label={c ? `HSC mark out of ${maxMark(c)}` : "HSC mark"}
                  inputMode="decimal"
                  placeholder="Mark"
                  aria-invalid={err ? true : undefined}
                  className={err ? "invalid" : undefined}
                  value={r.mark}
                  onChange={(e) => update(r.id, { mark: e.target.value.replace(/[^0-9.]/g, "").slice(0, 5) })}
                />
                <span className="muted small">/{c ? maxMark(c) : 100}</span>
              </label>
              <span className={`num scaled ${res && res.countedUnits === 0 ? "muted" : ""}`}>
                {err ? <span className="small atar-err">{err}</span> : res ? fmt(res.scaled) : "–"}
                {res && res.countedUnits === 0 && <span className="small"> {res.excluded ?? "not counted"}</span>}
                {res && !res.excluded && res.units > res.course.units && <span className="small muted"> counts as 2 units</span>}
                {res && res.countedUnits > 0 && res.countedUnits < res.units && (
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
          <span className="small muted num">{units} units counting</span>
        </div>
      </div>

      <button type="button" className="btn btn-primary atar-calc" onClick={calculate} disabled={entries.length === 0}>
        Calculate my ATAR
      </button>

      {shown && (
        <div id="atar-result" className="card atar-result" aria-live="polite">
          <span className="label">Estimated ATAR</span>
          {canShow ? (
            <>
              <div className="atar-big num">{fmtAtar(result.atar)}</div>
              <p className="muted" style={{ margin: 0 }}>
                Likely range <strong className="num">{fmtAtar(result.low)}</strong> to{" "}
                <strong className="num">{fmtAtar(result.high)}</strong>. Aggregate{" "}
                <strong className="num">{fmt(result.aggregate)}</strong> out of 500.
              </p>
              {warnings.map((n) => (
                <p key={n} className="small atar-warn" style={{ margin: "0.5rem 0 0" }}>
                  {n}
                </p>
              ))}
            </>
          ) : (
            <>
              <div className="atar-big num muted">–</div>
              {(markProblems.length ? markProblems : ["Enter at least one HSC mark."]).map((p) => (
                <p key={p} className="small atar-warn" style={{ margin: "0.25rem 0 0" }}>
                  {p}
                </p>
              ))}
            </>
          )}
        </div>
      )}

      <section className="atar-notes small muted">
        <h2>How this works</h2>
        <ol>
          <li>
            Each HSC mark is turned into a scaled mark by matching where it sits in that course&apos;s {DATA_YEAR} results.
            We use the percentiles UAC publishes for every course (top mark, 99th, 90th, 75th, 50th and 25th) and draw a
            straight line between them. Below the 25th percentile, where UAC publishes no points, marks keep falling at
            the rate set by how spread out the course&apos;s HSC and scaled marks are.
          </li>
          <li>
            UAC adds your best 2 units of English and your best 8 other units of scaled marks. That&apos;s your aggregate,
            out of 500. Part of a 2-unit course can count, just like the real thing. Maths Extension 2 students also get a Maths Extension 1 result, so enter both: with Extension 2, UAC counts Extension 1 as 2 units (its mark doubled) and leaves out Mathematics Advanced. An extension course only counts if you also did its main course.
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
