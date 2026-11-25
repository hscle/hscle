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
    <div style={{ ["--accent" as string]: subject.color }}>
      <div className="page-head">
        <Link href="/" className="micro back">
          ← All subjects
        </Link>
        <p className="kicker">The daily</p>
        <h1>{subject.name}</h1>
        <p className="micro">One try · resets at midnight</p>
      </div>
      {ready && <QuestionCard key={`${question.id}-${today}`} question={question} mode="daily" previous={previous} />}
      {ready && previous && (
        <div className="after">
          {next ? (
            <Link href={`/daily/${next.id}/`} className="btn btn-primary">
              Next · {next.short} →
            </Link>
          ) : (
            <Link href="/" className="btn btn-primary">
              All done for today
            </Link>
          )}
          <Link href={`/practice/?subject=${subjectId}`} className="btn">
            Practise {subject.short}
          </Link>
        </div>
      )}
    </div>
  );
}
