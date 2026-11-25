import type { Subject, SubjectId } from "./types";

export const SUBJECTS: Subject[] = [
  { id: "ms2", name: "Mathematics Standard 2", short: "Standard 2", glyph: "%", color: "#3b9fd9" },
  { id: "ma", name: "Mathematics Advanced", short: "Advanced", glyph: "f′", color: "#5b7cfa" },
  { id: "me1", name: "Mathematics Extension 1", short: "Extension 1", glyph: "∑", color: "#9b6cf0" },
  { id: "phys", name: "Physics", short: "Physics", glyph: "λ", color: "#ec8a4b" },
  { id: "chem", name: "Chemistry", short: "Chemistry", glyph: "pH", color: "#2fb58c" },
  { id: "bio", name: "Biology", short: "Biology", glyph: "2n", color: "#e0679a" },
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
