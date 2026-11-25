import type { MetadataRoute } from "next";
import { QUESTIONS } from "@/lib/questions";
import { questionPath, SITE_URL } from "@/lib/site";
import { SUBJECTS } from "@/lib/subjects";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const url = (p: string) => SITE_URL + p;
  return [
    { url: url("/"), changeFrequency: "daily", priority: 1 },
    { url: url("/atar/"), changeFrequency: "monthly", priority: 0.9 },
    { url: url("/questions/"), changeFrequency: "weekly", priority: 0.8 },
    ...SUBJECTS.map((s) => ({ url: url(`/questions/${s.slug}/`), changeFrequency: "weekly" as const, priority: 0.8 })),
    ...SUBJECTS.map((s) => ({ url: url(`/daily/${s.id}/`), changeFrequency: "daily" as const, priority: 0.6 })),
    ...QUESTIONS.map((q) => ({ url: url(questionPath(q)), changeFrequency: "monthly" as const, priority: 0.7 })),
    { url: url("/archive/"), changeFrequency: "daily", priority: 0.4 },
  ];
}
