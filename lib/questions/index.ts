import type { Question, SubjectId } from "../types";
import { mathsAdvanced, mathsExt1, mathsStandard2 } from "./maths";
import { biology, chemistry, physics } from "./sciences";

export const QUESTIONS: Question[] = [
  ...mathsStandard2,
  ...mathsAdvanced,
  ...mathsExt1,
  ...physics,
  ...chemistry,
  ...biology,
];

const byId = new Map(QUESTIONS.map((q) => [q.id, q]));

export function getQuestion(id: string): Question | undefined {
  return byId.get(id);
}

export function questionsFor(subject: SubjectId): Question[] {
  return QUESTIONS.filter((q) => q.subject === subject);
}
