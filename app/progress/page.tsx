"use client";

import { achievements, streaks, subjectStats } from "@/lib/progress";
import { topicOf, useStore } from "@/lib/store";
import { getSubject } from "@/lib/subjects";

export default function ProgressPage() {
  const { attempts, today, ready, user } = useStore();
  if (!ready) return null;
  const { current, best } = streaks(attempts, today);
  const stats = subjectStats(attempts, topicOf);
  const badges = achievements(attempts, today);
  const total = attempts.length;
  const correct = attempts.filter((a) => a.correct).length;

  return (
    <>
      <div className="page-head">
        <h1>Your progress</h1>
        {!user && <p className="muted">You&apos;re playing as a guest, so progress is saved on this device only.</p>}
      </div>
      <div className="stats-row">
        <div className="stat">
          <div className="stat-num">🔥 {current}</div>
          <div className="stat-label">current streak</div>
        </div>
        <div className="stat">
          <div className="stat-num">{best}</div>
          <div className="stat-label">best streak</div>
        </div>
        <div className="stat">
          <div className="stat-num">{total ? Math.round((correct / total) * 100) : 0}%</div>
          <div className="stat-label">
            accuracy ({correct}/{total})
          </div>
        </div>
      </div>

      <h2>By subject</h2>
      <div className="grid">
        {stats.map((s) => {
          const sub = getSubject(s.subject)!;
          const weakest = s.topics.find((t) => t.correct < t.attempted);
          return (
            <div key={s.subject} className="card" style={{ ["--accent" as string]: sub.color }}>
              <div className="subject-name">
                {sub.emoji} {sub.short}
              </div>
              {s.accuracy === null ? (
                <p className="muted small">Not started yet</p>
              ) : (
                <>
                  <div className="bar">
                    <div style={{ width: `${Math.round(s.accuracy * 100)}%` }} />
                  </div>
                  <p className="small">
                    {Math.round(s.accuracy * 100)}% correct · {s.attempted} answered
                  </p>
                  {weakest && <p className="muted small">Work on: {weakest.topic}</p>}
                </>
              )}
            </div>
          );
        })}
      </div>

      <h2>Achievements</h2>
      <div className="badges">
        {badges.map((b) => (
          <div key={b.id} className={`badge ${b.earned ? "earned" : ""}`} title={b.description}>
            <div className="badge-emoji">{b.emoji}</div>
            <div className="badge-name">{b.name}</div>
            <div className="muted small">{b.description}</div>
          </div>
        ))}
      </div>
    </>
  );
}
