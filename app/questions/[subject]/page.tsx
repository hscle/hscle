import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Rich } from "@/components/Rich";
import { questionsFor } from "@/lib/questions";
import { questionPath, SITE_URL } from "@/lib/site";
import { getGroup, getSubjectBySlug, SUBJECTS } from "@/lib/subjects";

const DIFFICULTY = ["", "Foundation", "Standard", "Challenging"];

export function generateStaticParams() {
  return SUBJECTS.map((s) => ({ subject: s.slug }));
}

type Props = { params: Promise<{ subject: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const s = getSubjectBySlug((await params).subject);
  if (!s) return {};
  const topics = [...new Set(questionsFor(s.id).map((q) => q.topic))].slice(0, 4).join(", ");
  return {
    title: `HSC ${s.searchName} Questions with Worked Solutions`,
    description: `Free HSC ${s.name} practice questions with step-by-step worked solutions. Topics include ${topics}. Plus a new ${s.searchName} question every day.`,
    alternates: { canonical: `/questions/${s.slug}/` },
  };
}

export default async function SubjectQuestions({ params }: Props) {
  const s = getSubjectBySlug((await params).subject);
  if (!s) notFound();
  const qs = questionsFor(s.id);
  const topics = [...new Set(qs.map((q) => q.topic))];
  const ld = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `HSC ${s.name} practice questions`,
    itemListElement: qs.map((q, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: SITE_URL + questionPath(q),
      name: `${s.searchName}: ${q.topic}`,
    })),
  };
  return (
    <div className="narrow-col" style={{ ["--accent" as string]: s.color }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <div className="page-head">
        <div className="crumbs">
          <Link href="/questions/">Questions</Link>
          <span aria-hidden="true">/</span>
          <span>{getGroup(s.group).name}</span>
        </div>
        <h1>HSC {s.searchName} questions</h1>
        <p className="muted">
          Free {s.name} practice questions in the style of the NSW HSC, each with a full worked solution. Topics:{" "}
          {topics.join(", ")}.
        </p>
        <Link href={`/daily/${s.id}/`} className="btn btn-primary btn-small" style={{ marginTop: "0.5rem" }}>
          Try today&apos;s {s.short} question →
        </Link>
      </div>
      <ul className="bank-list">
        {qs.map((q) => (
          <li key={q.id}>
            <Link href={questionPath(q)} className="bank-item">
              <span className="q-meta">
                <span className="chip accent">{q.topic}</span>
                <span className="chip">{DIFFICULTY[q.difficulty]}</span>
              </span>
              <Rich text={q.prompt} className="bank-prompt" />
              <span className="go">See the worked solution →</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
