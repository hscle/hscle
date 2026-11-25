"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useStore } from "@/lib/store";

export default function AccountPage() {
  const { user, profile, signOut, ready } = useStore();
  const router = useRouter();
  if (!ready) return null;
  if (!user) {
    return (
      <div className="card narrow">
        <p>You&apos;re not signed in.</p>
        <Link href="/login/" className="btn btn-primary">
          Sign in
        </Link>
      </div>
    );
  }
  return (
    <div className="card narrow">
      <h1>{profile?.username ?? "Your account"}</h1>
      <p className="muted">{user.email}</p>
      {profile?.school && <p>School: {profile.school}</p>}
      <button
        type="button"
        className="btn"
        onClick={async () => {
          await signOut();
          router.push("/");
        }}
      >
        Sign out
      </button>
    </div>
  );
}
