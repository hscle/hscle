import { notFound } from "next/navigation";
import { getSubject, SUBJECT_IDS } from "@/lib/subjects";
import { DailyClient } from "./DailyClient";

export function generateStaticParams() {
  return SUBJECT_IDS.map((subject) => ({ subject }));
}

export default async function DailyPage({ params }: { params: Promise<{ subject: string }> }) {
  const { subject } = await params;
  const s = getSubject(subject);
  if (!s) notFound();
  return <DailyClient subjectId={s.id} />;
}
