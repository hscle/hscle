import type { Metadata } from "next";
import { Suspense } from "react";
import { ArchiveClient } from "./ArchiveClient";

export const metadata: Metadata = {
  title: "Archive of past daily HSC questions",
  description: "Every past HSCLE daily question, with worked solutions.",
  alternates: { canonical: "/archive/" },
};

export default function ArchivePage() {
  return (
    <Suspense>
      <ArchiveClient />
    </Suspense>
  );
}
