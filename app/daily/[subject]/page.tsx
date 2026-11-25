import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getSubject, SUBJECT_IDS } from "@/lib/subjects";
import { DailyClient } from "./DailyClient";

export function generateStaticParams() {
  return SUBJECT_IDS.map((subject) => ({ subject }));
}

export async function generateMetadata({ params }: { params: Promise<{ subject: string }> }): Promise<Metadata> {
  const s = getSubject((await params).subject);
  if (!s) return {};
  return {
    title: `Daily HSC ${s.searchName} question`,
    description: `A new HSC ${s.name} exam-style question every day, with a full worked solution. Free, one try, new question at midnight.`,
    alternates: { canonical: `/daily/${s.id}/` },
  };
}

export default async function DailyPage({ params }: { params: Promise<{ subject: string }> }) {
  const { subject } = await params;
  const s = getSubject(subject);
  if (!s) notFound();
  return <DailyClient subjectId={s.id} />;
}
