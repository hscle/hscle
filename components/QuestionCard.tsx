"use client";

import { useState } from "react";
import { getSubject } from "@/lib/subjects";
import type { Attempt, Mode, Question } from "@/lib/types";
import { useStore } from "@/lib/store";
import { Rich, RichInline } from "./Rich";

const LETTERS = ["A", "B", "C", "D", "E"];
const DIFFICULTY = ["", "Foundation", "Standard", "Challenging"];

export function QuestionCard({
  question,
  mode,
  previous,
  onAnswered,
}: {
  question: Question;
  mode: Mode;
  /** An earlier attempt to show (e.g. today's daily question already answered). */
  previous?: Attempt;
  onAnswered?: (a: Attempt) => void;
}) {
  const { record } = useStore();
  const [result, setResult] = useState<Attempt | undefined>(previous);
  const [picked, setPicked] = useState<number | null>(previous?.chosen ?? null);
  const subject = getSubject(question.subject);
  const done = result !== undefined;

  function submit() {
    if (picked === null || done) return;
    const a = record(question, picked, mode);
    setResult(a);
    onAnswered?.(a);
  }

  return (
    <article className="card question" style={{ ["--accent" as string]: subject?.color }}>
      <div className="q-meta">
        <span className="micro">
          <span className="dot" />
          {subject?.short}
        </span>
        <span className="micro">{question.topic}</span>
        <span className="micro">{DIFFICULTY[question.difficulty]}</span>
      </div>
      <Rich text={question.prompt} className="q-prompt" />
      <div className="options" role="radiogroup">
        {question.options.map((opt, i) => {
          let cls = "option";
          if (done) {
            if (i === question.answer) cls += " correct";
            else if (i === result.chosen) cls += " wrong";
            else cls += " dim";
          } else if (picked === i) cls += " picked";
          return (
            <button
              key={i}
              type="button"
              role="radio"
              aria-checked={picked === i}
              className={cls}
              disabled={done}
              onClick={() => setPicked(i)}
            >
              <span className="letter">{LETTERS[i]}</span>
              <span className="opt-text">
                <RichInline text={opt} />
              </span>
            </button>
          );
        })}
      </div>
      {!done && (
        <div className="actions">
          <button type="button" className="btn btn-primary" disabled={picked === null} onClick={submit}>
            Check answer
          </button>
        </div>
      )}
      {done && (
        <p className="verdict">
          {result.correct ? "Correct." : "Not quite."}
          <span className={`micro ${result.correct ? "good" : "bad"}`}>
            {result.correct ? "Nicely done" : `The answer is ${LETTERS[question.answer]}`}
          </span>
        </p>
      )}
      {done && (
        <section className="solution">
          <div className="micro">Worked solution</div>
          <Rich text={question.solution} />
          {question.commonMistake && (
            <div className="mistake">
              <div className="micro">Common mistake</div>
              <Rich text={question.commonMistake} />
            </div>
          )}
        </section>
      )}
    </article>
  );
}
