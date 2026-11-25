export type SubjectId = "ms2" | "ma" | "me1" | "me2" | "phys" | "chem" | "bio";

export type GroupId = "maths" | "science" | "english" | "hsie";

export interface Group {
  id: GroupId;
  name: string;
  /** CSS colour shared by every subject in the group. */
  color: string;
}

export interface Subject {
  id: SubjectId;
  group: GroupId;
  name: string;
  short: string;
  /** Name students type into Google, e.g. "Maths Extension 1". */
  searchName: string;
  /** Short symbol shown inside the subject's tile, e.g. "∑". */
  glyph: string;
  /** Draw an icon instead of the text glyph (see components/SubjectGlyph.tsx). */
  icon?: "dna";
  /** Extra line on the subject's daily page, e.g. which courses it covers. */
  note?: string;
  /** CSS colour used for the subject's accent. */
  color: string;
}

export type Difficulty = 1 | 2 | 3;

export interface Question {
  /** Stable id, e.g. "ma-001". Never change once published: attempts reference it. */
  id: string;
  subject: SubjectId;
  /** Syllabus topic or module, in NESA wording. */
  topic: string;
  difficulty: Difficulty;
  /** Question text. Supports $inline$ and $$display$$ maths, **bold**, "- " lists, \$ for a literal dollar sign. */
  prompt: string;
  options: string[];
  /** Index into options of the correct answer. */
  answer: number;
  /** Step-by-step worked solution. Same formatting as prompt. */
  solution: string;
  /** The most common wrong turn, shown under the solution. */
  commonMistake?: string;
}

export type Mode = "daily" | "practice";

export interface Attempt {
  questionId: string;
  subject: SubjectId;
  mode: Mode;
  chosen: number;
  correct: boolean;
  /** Sydney calendar date, YYYY-MM-DD. */
  day: string;
  /** ISO timestamp. */
  at: string;
}
