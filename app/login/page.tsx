"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { siteUrl, supabase } from "@/lib/supabase";

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<"signin" | "signup">("signup");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [school, setSchool] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

  if (!supabase) {
    return (
      <div className="card narrow">
        <h1>Accounts coming soon</h1>
        <p className="muted">For now your progress is saved on this device.</p>
        <Link href="/">Back to today&apos;s questions</Link>
      </div>
    );
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!supabase) return;
    setBusy(true);
    setMsg(null);
    if (mode === "signup") {
      if (!/^[a-zA-Z0-9_]{3,20}$/.test(username)) {
        setMsg({ ok: false, text: "Usernames are 3–20 letters, numbers or underscores." });
        setBusy(false);
        return;
      }
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { username, school: school || null }, emailRedirectTo: `${siteUrl}/` },
      });
      setMsg(
        error
          ? { ok: false, text: error.message }
          : { ok: true, text: "Check your inbox for a link to verify your email, then sign in." },
      );
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) setMsg({ ok: false, text: error.message });
      else router.push("/");
    }
    setBusy(false);
  }

  return (
    <div className="card narrow">
      <h1>{mode === "signup" ? "Create your account" : "Welcome back"}</h1>
      <p className="muted small">
        {mode === "signup"
          ? "Save your streak across devices and join the leaderboard. Anything you've done as a guest on this device comes with you."
          : "Sign in to keep your streak going."}
      </p>
      <form onSubmit={submit} className="form">
        {mode === "signup" && (
          <>
            <label>
              Username <span className="muted small">(shown on the leaderboard, so don&apos;t use your full name)</span>
              <input value={username} onChange={(e) => setUsername(e.target.value)} required autoComplete="username" />
            </label>
            <label>
              School <span className="muted small">(optional)</span>
              <input value={school} onChange={(e) => setSchool(e.target.value)} />
            </label>
          </>
        )}
        <label>
          Email
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="email" />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={8}
            autoComplete={mode === "signup" ? "new-password" : "current-password"}
          />
        </label>
        <button className="btn btn-primary" disabled={busy}>
          {busy ? "…" : mode === "signup" ? "Sign up" : "Sign in"}
        </button>
      </form>
      {msg && <p className={msg.ok ? "good" : "bad"}>{msg.text}</p>}
      <p className="small">
        {mode === "signup" ? "Already have an account? " : "New to HSCLE? "}
        <button type="button" className="link" onClick={() => setMode(mode === "signup" ? "signin" : "signup")}>
          {mode === "signup" ? "Sign in" : "Create an account"}
        </button>
      </p>
    </div>
  );
}
