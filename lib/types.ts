export type SubjectId = "ms2" | "ma" | "me1" | "phys" | "chem" | "bio";

export interface Subject {
  id: SubjectId;
  name: string;
  short: string;
  /** Short symbol shown inside the subject's circle, e.g. "∑". */
  glyph: string;
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
