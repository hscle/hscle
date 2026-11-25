import type { Metadata, Viewport } from "next";
import "katex/dist/katex.min.css";
import "./globals.css";
import { Header } from "@/components/Header";
import { StoreProvider } from "@/lib/store";

export const metadata: Metadata = {
  title: "HSCLE: the daily HSC quiz",
  description:
    "A new HSC exam-style question every day for Maths, Physics, Chemistry and Biology, with worked solutions. Build a streak and compete with friends.",
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#f3f6fb" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-AU">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&family=Newsreader:ital,opsz,wght@0,6..72,400..600;1,6..72,400..600&display=swap"
        />
      </head>
      <body>
        <StoreProvider>
          <Header />
          <main className="container">{children}</main>
          <footer className="footer">
            HSCLE questions are original practice questions written in the style of the NSW HSC. They are not official
            NESA material.
          </footer>
        </StoreProvider>
      </body>
    </html>
  );
}
