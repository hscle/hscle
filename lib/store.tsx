"use client";

import type { User } from "@supabase/supabase-js";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { sydneyDay } from "./dates";
import { getQuestion } from "./questions";
import { supabase } from "./supabase";
import type { Attempt, Mode, Question } from "./types";

const GUEST_KEY = "hscle:attempts:guest";
const userKey = (id: string) => `hscle:attempts:${id}`;

interface Profile {
  username: string;
  school: string | null;
}

interface Store {
  ready: boolean;
  user: User | null;
  profile: Profile | null;
  attempts: Attempt[];
  today: string;
  record: (q: Question, chosen: number, mode: Mode) => Attempt;
  signOut: () => Promise<void>;
}

const Ctx = createContext<Store | null>(null);

function load(key: string): Attempt[] {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as Attempt[]) : [];
  } catch {
    return [];
  }
}

function save(key: string, attempts: Attempt[]) {
  try {
    localStorage.setItem(key, JSON.stringify(attempts));
  } catch {
    /* storage full or blocked: progress just won't persist on this device */
  }
}

interface AttemptRow {
  question_id: string;
  subject: Attempt["subject"];
  mode: Mode;
  chosen: number;
  correct: boolean;
  day: string;
  created_at: string;
}

async function fetchRemote(): Promise<Attempt[]> {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("attempts")
    .select("question_id, subject, mode, chosen, correct, day, created_at")
    .order("created_at", { ascending: true });
  if (error) throw error;
  return (data as AttemptRow[]).map((r) => ({
    questionId: r.question_id,
    subject: r.subject,
    mode: r.mode,
    chosen: r.chosen,
    correct: r.correct,
    day: r.day,
    at: r.created_at,
  }));
}

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [attempts, setAttempts] = useState<Attempt[]>([]);
  const [today, setToday] = useState(() => sydneyDay());

  // Roll over to the new day without a reload.
  useEffect(() => {
    const t = setInterval(() => setToday(sydneyDay()), 30_000);
    return () => clearInterval(t);
  }, []);

  const loadFor = useCallback(async (u: User | null) => {
    if (!u || !supabase) {
      setUser(null);
      setProfile(null);
      setAttempts(load(GUEST_KEY));
      setReady(true);
      return;
    }
    setUser(u);
    setAttempts(load(userKey(u.id))); // show cached copy straight away
    setReady(true);
    try {
      let remote = await fetchRemote();
      const guest = load(GUEST_KEY);
      if (remote.length === 0 && guest.length > 0) {
        // First sign-in after playing as a guest: carry that progress over.
        await supabase.rpc("import_guest_attempts", {
          p_attempts: guest.map((a) => ({
            question_id: a.questionId,
            mode: a.mode,
            chosen: a.chosen,
            day: a.day,
            created_at: a.at,
          })),
        });
        localStorage.removeItem(GUEST_KEY);
        remote = await fetchRemote();
      }
      setAttempts(remote);
      save(userKey(u.id), remote);
    } catch (e) {
      console.warn("Could not sync progress", e);
    }
    const { data } = await supabase.from("profiles").select("username, school").eq("id", u.id).maybeSingle();
    setProfile((data as Profile | null) ?? null);
  }, []);

  useEffect(() => {
    if (!supabase) {
      loadFor(null);
      return;
    }
    supabase.auth.getSession().then(({ data }) => loadFor(data.session?.user ?? null));
    const { data: sub } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" || event === "SIGNED_OUT" || event === "USER_UPDATED") {
        loadFor(session?.user ?? null);
      }
    });
    return () => sub.subscription.unsubscribe();
  }, [loadFor]);

  const record = useCallback(
    (q: Question, chosen: number, mode: Mode): Attempt => {
      const day = sydneyDay();
      const existing =
        mode === "daily" ? attempts.find((a) => a.mode === "daily" && a.subject === q.subject && a.day === day) : undefined;
      if (existing) return existing;
      const attempt: Attempt = {
        questionId: q.id,
        subject: q.subject,
        mode,
        chosen,
        correct: chosen === q.answer,
        day,
        at: new Date().toISOString(),
      };
      const next = [...attempts, attempt];
      setAttempts(next);
      save(user ? userKey(user.id) : GUEST_KEY, next);
      if (user && supabase) {
        supabase
          .rpc("record_attempt", { p_question_id: q.id, p_chosen: chosen, p_mode: mode })
          .then(({ error }) => error && console.warn("Could not save attempt", error));
      }
      return attempt;
    },
    [attempts, user],
  );

  const signOut = useCallback(async () => {
    await supabase?.auth.signOut();
  }, []);

  const value = useMemo(
    () => ({ ready, user, profile, attempts, today, record, signOut }),
    [ready, user, profile, attempts, today, record, signOut],
  );
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useStore(): Store {
  const s = useContext(Ctx);
  if (!s) throw new Error("useStore must be used inside StoreProvider");
  return s;
}

export function topicOf(qid: string) {
  return getQuestion(qid)?.topic;
}
