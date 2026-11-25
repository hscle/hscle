// Sanity checks for the question bank. Run: npm run check:questions
import katex from "katex";
import { QUESTIONS } from "../lib/questions";
import { SUBJECT_IDS } from "../lib/subjects";

const problems: string[] = [];
const ids = new Set<string>();
const TOKEN = /(\$\$[\s\S]+?\$\$|\\\$|\$[^$\n]+?\$)/g;

function checkMaths(where: string, text: string) {
  for (const m of text.match(TOKEN) ?? []) {
    if (m === "\\$") continue;
    const tex = m.startsWith("$$") ? m.slice(2, -2) : m.slice(1, -1);
    try {
      katex.renderToString(tex, { throwOnError: true, strict: "ignore" });
    } catch (e) {
      problems.push(`${where}: KaTeX error in ${m}: ${(e as Error).message}`);
    }
  }
  const stray = text.replace(TOKEN, "").match(/\$/g);
  if (stray) problems.push(`${where}: unmatched $ (use \\$ for a dollar sign)`);
}

for (const q of QUESTIONS) {
  if (ids.has(q.id)) problems.push(`${q.id}: duplicate id`);
  ids.add(q.id);
  if (!q.id.startsWith(q.subject + "-")) problems.push(`${q.id}: id should start with "${q.subject}-"`);
  if (!SUBJECT_IDS.includes(q.subject)) problems.push(`${q.id}: unknown subject`);
  if (q.options.length < 2 || q.options.length > 5) problems.push(`${q.id}: needs 2–5 options`);
  if (q.answer < 0 || q.answer >= q.options.length) problems.push(`${q.id}: answer index out of range`);
  if (new Set(q.options).size !== q.options.length) problems.push(`${q.id}: duplicate options`);
  if (q.solution.length < 80) problems.push(`${q.id}: worked solution looks too short`);
  checkMaths(`${q.id} prompt`, q.prompt);
  checkMaths(`${q.id} solution`, q.solution);
  if (q.commonMistake) checkMaths(`${q.id} commonMistake`, q.commonMistake);
  q.options.forEach((o, i) => checkMaths(`${q.id} option ${i}`, o));
}

for (const s of SUBJECT_IDS) {
  const qs = QUESTIONS.filter((q) => q.subject === s);
  const spread = [0, 1, 2, 3].map((i) => qs.filter((q) => q.answer === i).length);
  console.log(`${s.padEnd(5)} ${String(qs.length).padStart(3)} questions  answer spread A-D: ${spread.join(" ")}`);
}

if (problems.length) {
  console.error(`\n${problems.length} problem(s):\n` + problems.map((p) => "  - " + p).join("\n"));
  process.exit(1);
}
console.log(`\nAll ${QUESTIONS.length} questions OK.`);
