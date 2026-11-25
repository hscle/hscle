import type { Metadata, Viewport } from "next";
import "katex/dist/katex.min.css";
import "./globals.css";
import Link from "next/link";
import { Header } from "@/components/Header";
import { GOOGLE_SITE_VERIFICATION, SITE_URL } from "@/lib/site";
import { SUBJECTS } from "@/lib/subjects";
import { themeScript } from "@/lib/theme";
import { StoreProvider } from "@/lib/store";

const DESCRIPTION =
  "Free daily HSC questions for Maths Standard, Advanced, Extension 1, Extension 2, Physics, Chemistry and Biology, with worked solutions. Plus an ATAR calculator built on UAC scaling data.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "HSCLE: free daily HSC questions and ATAR calculator", template: "%s · HSCLE" },
  description: DESCRIPTION,
  applicationName: "HSCLE",
  alternates: { canonical: "/" },
  openGraph: { type: "website", siteName: "HSCLE", locale: "en_AU", description: DESCRIPTION },
  twitter: { card: "summary" },
  ...(GOOGLE_SITE_VERIFICATION ? { verification: { google: GOOGLE_SITE_VERIFICATION } } : {}),
};

const SITE_LD = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "HSCLE",
  url: SITE_URL + "/",
  description: DESCRIPTION,
  inLanguage: "en-AU",
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f7f4" },
    { media: "(prefers-color-scheme: dark)", color: "#0f1012" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-AU" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SITE_LD) }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@400;500;600;700&display=swap"
        />
      </head>
      <body>
        <StoreProvider>
          <Header />
          <main className="container">{children}</main>
          <footer className="footer">
            <nav className="footer-links" aria-label="Daily questions">
              {SUBJECTS.map((s) => (
                <Link key={s.id} href={`/daily/${s.id}/`}>
                  Daily {s.searchName} question
                </Link>
              ))}
              <Link href="/atar/">ATAR calculator</Link>
            </nav>
            HSCLE questions are original practice questions written in the style of the NSW HSC. They are not official
            NESA material.
          </footer>
        </StoreProvider>
      </body>
    </html>
  );
}
