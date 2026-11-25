import type { Subject, SubjectId } from "./types";

export const SUBJECTS: Subject[] = [
  { id: "ms2", name: "Mathematics Standard 2", short: "Maths Std 2", emoji: "📐", color: "#0ea5e9" },
  { id: "ma", name: "Mathematics Advanced", short: "Maths Adv", emoji: "📈", color: "#6366f1" },
  { id: "me1", name: "Mathematics Extension 1", short: "Maths Ext 1", emoji: "∑", color: "#a855f7" },
  { id: "phys", name: "Physics", short: "Physics", emoji: "⚛️", color: "#f97316" },
  { id: "chem", name: "Chemistry", short: "Chemistry", emoji: "🧪", color: "#10b981" },
  { id: "bio", name: "Biology", short: "Biology", emoji: "🧬", color: "#ec4899" },
];

export const SUBJECT_IDS = SUBJECTS.map((s) => s.id);

export function getSubject(id: string): Subject | undefined {
  return SUBJECTS.find((s) => s.id === id);
}

export function subjectOrThrow(id: SubjectId): Subject {
  const s = getSubject(id);
  if (!s) throw new Error(`Unknown subject ${id}`);
  return s;
}
