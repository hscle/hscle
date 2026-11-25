import type { Metadata } from "next";
import { Suspense } from "react";
import { ArchiveClient } from "./ArchiveClient";

export const metadata: Metadata = {
  title: "Archive · HSCLE",
  description: "Every past HSCLE daily question, with worked solutions.",
};

export default function ArchivePage() {
  return (
    <Suspense>
      <ArchiveClient />
    </Suspense>
  );
}
