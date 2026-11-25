import type { Question } from "./types";
import { getSubject } from "./subjects";

/** Public address of the site. Change NEXT_PUBLIC_SITE_URL in Cloudflare when hscle.com is set up. */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://hscle.pages.dev").replace(/\/$/, "");

/** Google Search Console "HTML tag" verification code (the content="..." value). Public by design. */
export const GOOGLE_SITE_VERIFICATION = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "WwpXJTovfP8IGk9KERExgNBq_QBCpOZrsUTKdo4ddZI";

const topicSlug = (t: string) =>
  t
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

/** e.g. "me1-003-proof-by-induction". Starts with the stable id so it can always be resolved. */
export function questionSlug(q: Question): string {
  return `${q.id}-${topicSlug(q.topic)}`;
}

export function questionPath(q: Question): string {
  return `/questions/${getSubject(q.subject)!.slug}/${questionSlug(q)}/`;
}

/** Plain text from question markup, for meta descriptions and structured data. */
export function plainText(text: string, max = 0): string {
  let t = text
    .replace(/\\\$/g, "$")
    .replace(/\$\$?([^$]+)\$\$?/g, (_, tex: string) =>
      tex
        .replace(/\\(?:d|t)?frac\{([^}]*)\}\{([^}]*)\}/g, "($1)/($2)")
        .replace(/\\(?:text|mathrm|operatorname)\{([^}]*)\}/g, "$1")
        .replace(/\\(?:left|right|displaystyle|,|;|!|quad)/g, " ")
        .replace(/\\times/g, "×")
        .replace(/\\cdot/g, "·")
        .replace(/\\pi/g, "π")
        .replace(/\\theta/g, "θ")
        .replace(/\\int/g, "∫")
        .replace(/\\sqrt/g, "√")
        .replace(/\\([a-zA-Z]+)/g, "$1")
        .replace(/[{}]/g, ""),
    )
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/^- /gm, "")
    .replace(/\s+/g, " ")
    .trim();
  if (max && t.length > max) t = t.slice(0, max - 1).replace(/\s+\S*$/, "") + "…";
  return t;
}
