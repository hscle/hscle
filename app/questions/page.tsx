import type { Metadata } from "next";
import Link from "next/link";
import { questionsFor } from "@/lib/questions";
import { GROUPS, SUBJECTS } from "@/lib/subjects";

export const metadata: Metadata = {
  title: "Free HSC Practice Questions with Worked Solutions",
  description:
    "Free NSW HSC exam-style practice questions for Maths Standard 2, Maths Advanced, Maths Extension 1, Physics, Chemistry and Biology, each with a step-by-step worked solution.",
  alternates: { canonical: "/questions/" },
};

export default function QuestionsIndex() {
  return (
    <div className="narrow-col">
      <div className="page-head">
        <h1>HSC practice questions</h1>
        <p className="muted">
          Every HSCLE question, free, with a step-by-step worked solution and the most common mistake to avoid. Written
          in the style of the NSW HSC exams.
        </p>
      </div>
      {GROUPS.map((g) => {
        const subs = SUBJECTS.filter((s) => s.group === g.id);
        if (!subs.length) return null;
        return (
          <section key={g.id} className="group" style={{ ["--accent" as string]: g.color }}>
            <div className="group-head">
              <span className="swatch" />
              <h2>{g.name}</h2>
            </div>
            <ul className="archive-list">
              {subs.map((s) => (
                <li key={s.id}>
                  <Link href={`/questions/${s.slug}/`} className="archive-day">
                    <span className="archive-date">HSC {s.searchName} questions</span>
                    <span className="muted small">{questionsFor(s.id).length} questions</span>
                    <span className="go">Open →</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </div>
  );
}
