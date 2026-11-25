"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { streaks } from "@/lib/progress";
import { useStore } from "@/lib/store";
import { GROUPS } from "@/lib/subjects";
import { supabaseEnabled } from "@/lib/supabase";
import { ThemeToggle } from "./ThemeToggle";

const NAV = [
  { href: "/", label: "Daily Questions" },
  { href: "/archive/", label: "Archive" },
  { href: "/atar/", label: "ATAR Calculator" },
];

export function Header() {
  const { attempts, today, user, profile, ready } = useStore();
  const path = usePathname();
  const { current, activeToday } = streaks(attempts, today);
  return (
    <header className="header">
      <div className="header-inner">
        <Link href="/" className="logo" aria-label="HSCLE home">
          <span className="logo-mark" aria-hidden="true">
            {GROUPS.map((g) => (
              <span key={g.id} style={{ background: g.color }} />
            ))}
          </span>
          HSCLE
        </Link>
        <nav className="nav">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className={path === n.href || (n.href !== "/" && path.startsWith(n.href)) ? "active" : ""}
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="header-right">
          <span
            className={`streak-chip ${activeToday ? "lit" : ""}`}
            title={activeToday ? "Streak kept today" : "Answer a daily question to keep your streak"}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 2c1 3.5 5 6 5 11a5 5 0 0 1-10 0c0-2.2 1-3.8 2.2-5 .2 1.6 1 2.6 2 3C11 8.5 11.3 5 12 2Z" />
            </svg>
            <span className="num">{ready ? current : "–"}</span>
            <span className="sr-only"> day streak</span>
          </span>
          <ThemeToggle />
          {supabaseEnabled &&
            (user ? (
              <Link href="/account/" className="btn btn-small">
                {profile?.username ?? "Account"}
              </Link>
            ) : (
              <Link href="/login/" className="btn btn-small btn-primary">
                Sign in
              </Link>
            ))}
        </div>
      </div>
    </header>
  );
}
