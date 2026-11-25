import type { Group, GroupId, Subject, SubjectId } from "./types";

export const GROUPS: Group[] = [
  { id: "maths", name: "Mathematics", color: "#2f6bed" },
  { id: "science", name: "Science", color: "#0f9d74" },
  { id: "english", name: "English", color: "#8a4ff0" },
  { id: "hsie", name: "HSIE", color: "#d9822b" },
];

const groupColor = (g: GroupId) => GROUPS.find((x) => x.id === g)!.color;

export const SUBJECTS: Subject[] = [
  { id: "ms2", searchName: "Maths Standard 2", group: "maths", name: "Mathematics Standard 2", short: "Standard 2", glyph: "%", color: groupColor("maths") },
  { id: "ma", searchName: "Maths Advanced", group: "maths", name: "Mathematics Advanced", short: "Advanced", glyph: "f′", color: groupColor("maths") },
  { id: "me1", searchName: "Maths Extension 1", group: "maths", name: "Mathematics Extension 1", short: "Extension 1", glyph: "∑", color: groupColor("maths") },
  { id: "phys", searchName: "Physics", group: "science", name: "Physics", short: "Physics", glyph: "λ", color: groupColor("science") },
  { id: "chem", searchName: "Chemistry", group: "science", name: "Chemistry", short: "Chemistry", glyph: "pH", color: groupColor("science") },
  { id: "bio", searchName: "Biology", group: "science", name: "Biology", short: "Biology", glyph: "2n", color: groupColor("science") },
];

/** Shown on the home page so students can see what's coming. No questions yet. */
export const COMING_SOON: { name: string; group: GroupId }[] = [
  { name: "English Standard", group: "english" },
  { name: "English Advanced", group: "english" },
  { name: "English Extension 1", group: "english" },
  { name: "Economics", group: "hsie" },
  { name: "Business Studies", group: "hsie" },
  { name: "Legal Studies", group: "hsie" },
  { name: "Modern History", group: "hsie" },
];

export function getGroup(id: GroupId): Group {
  return GROUPS.find((g) => g.id === id)!;
}

export const SUBJECT_IDS = SUBJECTS.map((s) => s.id);

export function getSubject(id: string): Subject | undefined {
  return SUBJECTS.find((s) => s.id === id);
}

export function subjectOrThrow(id: SubjectId): Subject {
  const s = getSubject(id);
  if (!s) throw new Error(`Unknown subject ${id}`);
  return s;
}

