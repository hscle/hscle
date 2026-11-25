"use client";

import Link from "next/link";
import { QuestionCard } from "@/components/QuestionCard";
import { dailyQuestion } from "@/lib/daily";
import { dailyFor } from "@/lib/progress";
import { useStore } from "@/lib/store";
import { getSubject, SUBJECTS } from "@/lib/subjects";
import type { SubjectId } from "@/lib/types";

export function DailyClient({ subjectId }: { subjectId: SubjectId }) {
  const { attempts, today, ready } = useStore();
  const subject = getSubject(subjectId)!;
  const question = dailyQuestion(subjectId, today);
  const previous = dailyFor(attempts, subjectId, today);
  const next = SUBJECTS.find((s) => s.id !== subjectId && !dailyFor(attempts, s.id, today));

  return (
    <>
      <div className="page-head">
        <Link href="/" className="muted">
          ← Today
        </Link>
        <h1>
          {subject.emoji} {subject.name}
        </h1>
        <p className="muted">Daily question · one try only</p>
      </div>
      {ready && <QuestionCard key={`${question.id}-${today}`} question={question} mode="daily" previous={previous} />}
      {ready && previous && (
        <div className="after">
          {next ? (
            <Link href={`/daily/${next.id}/`} className="btn btn-primary">
              Next: {next.short} →
            </Link>
          ) : (
            <Link href="/" className="btn btn-primary">
              All done for today 🎉
            </Link>
          )}
          <Link href={`/practice/?subject=${subjectId}`} className="btn">
            Practise more {subject.short}
          </Link>
        </div>
      )}
    </>
  );
}
