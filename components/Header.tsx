"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { streaks } from "@/lib/progress";
import { useStore } from "@/lib/store";
import { supabaseEnabled } from "@/lib/supabase";

const NAV = [
  { href: "/", label: "Today" },
  { href: "/practice/", label: "Practice" },
  { href: "/progress/", label: "Progress" },
  { href: "/leaderboard/", label: "Leaderboard" },
];

export function Header() {
  const { attempts, today, user, profile, ready } = useStore();
  const path = usePathname();
  const { current, activeToday } = streaks(attempts, today);
  return (
    <header className="header">
      <div className="header-inner">
        <Link href="/" className="logo">
          HSC<span>LE</span>
        </Link>
        <nav className="nav">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} className={path === n.href || (n.href !== "/" && path.startsWith(n.href)) ? "active" : ""}>
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="header-right">
          <span className={`chip streak ${activeToday ? "lit" : ""}`} title={activeToday ? "Streak kept today" : "Answer a daily question to keep your streak"}>
            🔥 {ready ? current : "–"}
          </span>
          {supabaseEnabled &&
            (user ? (
              <Link href="/account/" className="chip">
                {profile?.username ?? "Account"}
              </Link>
            ) : (
              <Link href="/login/" className="btn btn-small">
                Sign in
              </Link>
            ))}
        </div>
      </div>
    </header>
  );
}
