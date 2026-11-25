import type { Subject } from "@/lib/types";

/** A DNA double helix: two crossing strands with base-pair rungs. */
export const DnaIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
    <path d="M7 2c0 5 10 5 10 10s-10 5-10 10" />
    <path d="M17 2c0 5-10 5-10 10s10 5 10 10" />
    <path d="M8.8 4.6h6.4M8.6 9.4h6.8M8.6 14.6h6.8M8.8 19.4h6.4" strokeWidth="1.6" />
  </svg>
);

/** The symbol inside a subject's tile: an icon if it has one, otherwise its text glyph. */
export function SubjectGlyph({ subject }: { subject: Pick<Subject, "glyph" | "icon"> }) {
  if (subject.icon === "dna") return <DnaIcon />;
  return <>{subject.glyph}</>;
}
