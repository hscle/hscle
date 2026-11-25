import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { QuestionCard } from "@/components/QuestionCard";
import { Rich } from "@/components/Rich";
import { QUESTIONS, questionsFor } from "@/lib/questions";
import { plainText, questionPath, questionSlug, SITE_URL } from "@/lib/site";
import { getSubject, getSubjectBySlug } from "@/lib/subjects";

export function generateStaticParams() {
  return QUESTIONS.map((q) => ({ subject: getSubject(q.subject)!.slug, question: questionSlug(q) }));
}

type Props = { params: Promise<{ subject: string; question: string }> };

async function find(params: Props["params"]) {
  const { subject, question } = await params;
  const s = getSubjectBySlug(subject);
  const q = s && questionsFor(s.id).find((x) => questionSlug(x) === question);
  return s && q ? { s, q } : null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const found = await find(params);
  if (!found) return {};
  const { s, q } = found;
  const parts = q.topic.split(": ");
  const sub = parts[parts.length - 1].toLowerCase();
  const area = parts.length > 1 ? ` (${parts[0].toLowerCase()})` : "";
  return {
    title: `HSC ${s.searchName} ${sub} question with worked solution`,
    description: `HSC ${s.name} practice question on ${sub}${area}. ${plainText(q.prompt, 110)} Step-by-step worked solution included.`,
    alternates: { canonical: questionPath(q) },
  };
}

export default async function QuestionPage({ params }: Props) {
  const found = await find(params);
  if (!found) notFound();
  const { s, q } = found;
  const others = questionsFor(s.id).filter((x) => x.id !== q.id);
  const ld = {
    "@context": "https://schema.org",
    "@type": "Quiz",
    name: `HSC ${s.name}: ${q.topic}`,
    url: SITE_URL + questionPath(q),
    about: { "@type": "Thing", name: q.topic },
    educationalAlignment: {
      "@type": "AlignmentObject",
      alignmentType: "educationalSubject",
      targetName: `NSW HSC ${s.name}`,
    },
    educationalLevel: "Year 12",
    hasPart: {
      "@type": "Question",
      eduQuestionType: "Multiple choice",
      text: plainText(q.prompt),
      encodingFormat: "text/plain",
      suggestedAnswer: q.options
        .map((o, i) => ({ o, i }))
        .filter(({ i }) => i !== q.answer)
        .map(({ o, i }) => ({ "@type": "Answer", position: i, text: plainText(o), encodingFormat: "text/plain" })),
      acceptedAnswer: {
        "@type": "Answer",
        position: q.answer,
        text: plainText(q.options[q.answer]),
        encodingFormat: "text/plain",
        answerExplanation: { "@type": "Comment", text: plainText(q.solution), encodingFormat: "text/plain" },
      },
    },
  };
  return (
    <div className="narrow-col" style={{ ["--accent" as string]: s.color }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <div className="page-head">
        <div className="crumbs">
          <Link href="/questions/">Questions</Link>
          <span aria-hidden="true">/</span>
          <Link href={`/questions/${s.slug}/`}>{s.searchName}</Link>
        </div>
        <h1>
          {s.searchName}: {q.topic}
        </h1>
        <p className="muted">Pick an answer, then read the worked solution.</p>
      </div>
      <QuestionCard question={q} mode="practice" />
      <details className="card peek">
        <summary>Stuck? Show the worked solution</summary>
        <h2>Worked solution</h2>
        <Rich text={q.solution} />
        {q.commonMistake && (
          <div className="mistake">
            <span className="label">Common mistake</span>
            <Rich text={q.commonMistake} />
          </div>
        )}
      </details>
      <section style={{ marginTop: "2rem" }}>
        <h2 className="section-h">More {s.searchName} questions</h2>
        <ul className="link-list">
          {others.map((o) => (
            <li key={o.id}>
              <Link href={questionPath(o)}>{o.topic}</Link>
            </li>
          ))}
        </ul>
        <Link href={`/daily/${s.id}/`} className="btn btn-primary btn-small" style={{ marginTop: "1rem" }}>
          Try today&apos;s {s.short} question →
        </Link>
      </section>
    </div>
  );
}
