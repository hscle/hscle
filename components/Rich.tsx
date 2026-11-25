import katex from "katex";
import { Fragment, type ReactNode } from "react";

/**
 * Renders question text: $inline$ and $$display$$ maths (KaTeX), **bold**, *italic*,
 * paragraphs separated by blank lines, "- " bullet lists, and \$ for a literal dollar.
 */
const TOKEN = /(\$\$[\s\S]+?\$\$|\\\$|\$[^$\n]+?\$|\*\*[^*]+\*\*|\*[^*\s][^*]*\*)/g;

function math(tex: string, display: boolean, key: number) {
  const html = katex.renderToString(tex, { displayMode: display, throwOnError: false, strict: "ignore" });
  return display ? (
    <div key={key} className="math-display" dangerouslySetInnerHTML={{ __html: html }} />
  ) : (
    <span key={key} dangerouslySetInnerHTML={{ __html: html }} />
  );
}

function inline(text: string): ReactNode[] {
  return text.split(TOKEN).map((part, i) => {
    if (!part) return null;
    if (part.startsWith("$$")) return math(part.slice(2, -2), true, i);
    if (part === "\\$") return "$";
    if (part.startsWith("$")) return math(part.slice(1, -1), false, i);
    if (part.startsWith("**")) return <strong key={i}>{inline(part.slice(2, -2))}</strong>;
    if (part.startsWith("*")) return <em key={i}>{part.slice(1, -1)}</em>;
    return <Fragment key={i}>{part}</Fragment>;
  });
}

export function RichInline({ text }: { text: string }) {
  return <>{inline(text)}</>;
}

export function Rich({ text, className }: { text: string; className?: string }) {
  const blocks = text.trim().split(/\n\s*\n/);
  return (
    <div className={`rich ${className ?? ""}`}>
      {blocks.map((block, i) => {
        const lines = block.split("\n");
        if (lines.every((l) => l.startsWith("- "))) {
          return (
            <ul key={i}>
              {lines.map((l, j) => (
                <li key={j}>{inline(l.slice(2))}</li>
              ))}
            </ul>
          );
        }
        return (
          <div key={i} className="para">
            {lines.map((l, j) => (
              <Fragment key={j}>
                {j > 0 && " "}
                {inline(l)}
              </Fragment>
            ))}
          </div>
        );
      })}
    </div>
  );
}
