# HSCLE

The daily HSC quiz for NSW students: one exam-style question per subject every day with worked solutions, an archive of past days, streaks and an ATAR calculator.

Built with Next.js (static export) + TypeScript, Supabase for accounts and data, hosted on Cloudflare Pages.

## What's in the MVP

| Feature | Where |
| --- | --- |
| Daily question per subject (same for everyone, flips at midnight Sydney time, one try) | `app/daily/[subject]`, `lib/daily.ts` |
| Archive of every past daily question since launch (answers there don't affect the streak) | `app/archive` |
| Worked solution and "common mistake" for every question | `lib/questions/*.ts` |
| Daily streaks | `lib/progress.ts` |
| ATAR calculator using UAC's 2025 scaling report (Tables A3, A9, 3.2). Update `lib/atar/data.ts` each February when UAC publishes the new report | `app/atar`, `lib/atar` |
| Accounts with email verification, username and optional school | `app/login`, Supabase Auth |
| Guest mode: works with no account, progress saved in the browser and carried over on first sign-in | `lib/store.tsx` |
| Shareable daily result (🟩🟥⬜ grid) for socials and group chats | `app/page.tsx` |

The site works with **no Supabase at all** (guest mode only), so you can deploy it straight away and add accounts later.

## Run it locally

```bash
npm install
npm run dev          # http://localhost:3000
```

## Adding and editing questions

Questions live in `lib/questions/maths.ts`, `lib/questions/ext2.ts` (Maths Extension 2) and `lib/questions/sciences.ts`. Each has a prompt, 4 options, the correct answer index (0 = A), a worked solution, and a common mistake. Maths uses `$...$` (inline) and `$$...$$` (display) in LaTeX; write `\$` for a dollar sign.

After editing:

```bash
npm run check:questions   # checks LaTeX renders, answer indexes, duplicates, and A–D balance
npm run gen:seed-sql      # regenerates supabase/seed.sql
```

Then run `supabase/seed.sql` in the Supabase SQL editor so marking on the server matches.

Never change a published question's `id`: past attempts point at it. Keep the correct answers spread evenly across A–D (the check script prints the spread).

## Turning on accounts (Supabase)

1. Create a free project at supabase.com.
2. In **SQL Editor**, run `supabase/schema.sql`, then `supabase/seed.sql`.
3. In **Authentication > URL Configuration**, set the Site URL to your site (e.g. `https://hscle.pages.dev`) and add it to Redirect URLs.
4. Copy `.env.example` to `.env.local` and fill in the URL and anon key from **Project Settings > API**.
5. Optional but recommended: in **Authentication > SMTP Settings**, plug in Resend's SMTP details so verification emails come from your own domain and aren't rate limited.

How marking works: the browser shows the result straight away, and the server re-marks every attempt in `record_attempt()` against its own copy of the answers. Students can't write attempts directly, and there's one daily attempt per subject per day.

## Deploying to Cloudflare Pages

1. Push this folder to a GitHub repo.
2. In Cloudflare: **Workers & Pages > Create > Pages > Connect to Git**, pick the repo.
3. Build command `npm run build`, output directory `out`.
4. Add the three `NEXT_PUBLIC_*` environment variables from `.env.example`.

## Not in this first cut (planned)

- **Admin dashboard** for subjects, questions and daily overrides. For now, edit the question files (or the `questions` table in Supabase).
- **ATAR estimator.** Needs a properly validated method before it ships.
- **Ads, premium, sponsorships, affiliates.**
- **Weekly competitions, school vs school, referrals.** The `school` field is already collected to make school leaderboards easy.
- **Hiding answers from the page source.** Answers are in the site's JavaScript, so a determined student could find them. The server still marks honestly, but to stop leaderboard cheating properly, serve questions from Supabase without the answer and reveal it after submitting.
- **Report a problem with this question** button.
- **Privacy policy and terms.** Most users will be under 18, so this is needed before a public launch.
