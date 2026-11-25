"use client";

import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { QuestionCard } from "@/components/QuestionCard";
import { QUESTIONS } from "@/lib/questions";
import { useStore } from "@/lib/store";
import { getSubject, GROUPS, SUBJECTS } from "@/lib/subjects";
import type { SubjectId } from "@/lib/types";

export function PracticeClient() {
  const params = useSearchParams();
  const initial = getSubject(params.get("subject") ?? "")?.id ?? SUBJECTS[0].id;
  const { attempts, ready } = useStore();
  const [subject, setSubject] = useState<SubjectId>(initial);
  const [topic, setTopic] = useState("all");
  const [difficulty, setDifficulty] = useState("all");
  const [index, setIndex] = useState(0);
  const [answered, setAnswered] = useState(false);

  const topics = useMemo(() => [...new Set(QUESTIONS.filter((q) => q.subject === subject).map((q) => q.topic))].sort(), [subject]);

  // Questions you haven't got right yet come first.
  const pool = useMemo(() => {
    const right = new Set(attempts.filter((a) => a.correct).map((a) => a.questionId));
    return QUESTIONS.filter(
      (q) =>
        q.subject === subject &&
        (topic === "all" || q.topic === topic) &&
        (difficulty === "all" || String(q.difficulty) === difficulty),
    ).sort((a, b) => Number(right.has(a.id)) - Number(right.has(b.id)) || a.id.localeCompare(b.id));
    // Only re-sort when the filters change, not after every answer.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subject, topic, difficulty, ready]);

  const q = pool.length ? pool[index % pool.length] : undefined;
  const reset = () => {
    setIndex(0);
    setAnswered(false);
  };

  return (
    <div className="narrow-col" style={{ ["--accent" as string]: getSubject(subject)?.color }}>
      <div className="page-head">
        <h1>Practice bank</h1>
        <p className="muted">Unlimited questions with worked solutions. Ones you haven&apos;t got right yet come first.</p>
      </div>
      <div className="filters">
        <select
          value={subject}
          onChange={(e) => {
            setSubject(e.target.value as SubjectId);
            setTopic("all");
            reset();
          }}
        >
          {GROUPS.filter((g) => SUBJECTS.some((s) => s.group === g.id)).map((g) => (
            <optgroup key={g.id} label={g.name}>
              {SUBJECTS.filter((s) => s.group === g.id).map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
        <select
          value={topic}
          onChange={(e) => {
            setTopic(e.target.value);
            reset();
          }}
        >
          <option value="all">All topics</option>
          {topics.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
        <select
          value={difficulty}
          onChange={(e) => {
            setDifficulty(e.target.value);
            reset();
          }}
        >
          <option value="all">Any difficulty</option>
          <option value="1">Foundation</option>
          <option value="2">Standard</option>
          <option value="3">Challenging</option>
        </select>
      </div>
      {!q && <div className="card">No questions match those filters yet.</div>}
      {q && ready && (
        <>
          <p className="label counter">
            {(index % pool.length) + 1} / {pool.length}
          </p>
          <QuestionCard key={`${q.id}-${index}`} question={q} mode="practice" onAnswered={() => setAnswered(true)} />
          <div className="after">
            <button
              type="button"
              className={`btn ${answered ? "btn-primary" : ""}`}
              onClick={() => {
                setIndex((i) => i + 1);
                setAnswered(false);
              }}
            >
              {answered ? "Next question →" : "Skip →"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
