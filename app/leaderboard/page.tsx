"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { weekStart } from "@/lib/dates";
import { weeklyScore } from "@/lib/progress";
import { useStore } from "@/lib/store";
import { supabase } from "@/lib/supabase";

interface Row {
  username: string;
  school: string | null;
  correct: number;
  streak: number;
}

export default function LeaderboardPage() {
  const { attempts, today, user, profile, ready } = useStore();
  const [rows, setRows] = useState<Row[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!supabase) return;
    supabase.rpc("weekly_leaderboard").then(({ data, error }) => {
      if (error) setError(error.message);
      else setRows(data as Row[]);
    });
  }, [attempts.length]);

  const mine = weeklyScore(attempts, today);

  return (
    <>
      <div className="page-head">
        <h1>Weekly leaderboard</h1>
        <p className="muted">
          Ranked by correct daily answers since Monday {weekStart(today)}. Ties go to the longer streak.
        </p>
      </div>
      {ready && (
        <div className="card">
          You have <strong>{mine}</strong> correct daily {mine === 1 ? "answer" : "answers"} this week.
        </div>
      )}
      {!supabase && <div className="card muted">The leaderboard turns on once accounts are connected.</div>}
      {supabase && !user && (
        <div className="card">
          <Link href="/login/">Sign in</Link> to appear on the leaderboard.
        </div>
      )}
      {error && <div className="card bad">Couldn&apos;t load the leaderboard: {error}</div>}
      {rows && (
        <div className="card">
        <table className="board">
          <thead>
            <tr>
              <th>#</th>
              <th>Student</th>
              <th>School</th>
              <th>Correct</th>
              <th>Streak</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 && (
              <tr>
                <td colSpan={5} className="muted">
                  No one yet this week. Be first!
                </td>
              </tr>
            )}
            {rows.map((r, i) => (
              <tr key={r.username} className={r.username === profile?.username ? "me" : ""}>
                <td>{i + 1}</td>
                <td>{r.username}</td>
                <td className="muted">{r.school ?? ""}</td>
                <td>{r.correct}</td>
                <td>{r.streak}</td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      )}
    </>
  );
}
