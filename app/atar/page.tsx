import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";
import { AtarClient } from "./AtarClient";

export const metadata: Metadata = {
  title: "ATAR Calculator NSW: estimate your ATAR from HSC marks",
  description:
    "Free NSW ATAR calculator. Enter your HSC marks to estimate your scaled marks, aggregate and ATAR, using UAC's official 2025 scaling report. Best 2 units of English plus best 8 other units.",
  alternates: { canonical: "/atar/" },
};

const LD = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "HSCLE ATAR Calculator",
  url: "/atar/",
  applicationCategory: "EducationalApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "AUD" },
  description: "Estimate your NSW ATAR from your HSC marks using UAC's published scaling data.",
};

export default function AtarPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({ ...LD, url: SITE_URL + "/atar/" }) }}
      />
      <AtarClient />
    </>
  );
}
