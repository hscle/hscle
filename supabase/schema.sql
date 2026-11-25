-- HSCLE database schema. Run once in Supabase > SQL Editor, then run seed.sql.
-- Safe to re-run: everything is "create or replace" / "if not exists".

-- ---------------------------------------------------------------------------
-- Questions (source of truth for marking; the site bundles a copy for display)
-- ---------------------------------------------------------------------------
create table if not exists public.questions (
  id              text primary key,
  subject         text not null,
  topic           text not null,
  difficulty      smallint not null check (difficulty between 1 and 3),
  prompt          text not null,
  options         jsonb not null,
  answer          smallint not null,
  solution        text not null,
  common_mistake  text,
  created_at      timestamptz not null default now()
);
alter table public.questions enable row level security;
-- No policies: students never read this table directly, so answers aren't exposed
-- through the API. Only the security-definer functions below read it.

-- ---------------------------------------------------------------------------
-- Profiles
-- ---------------------------------------------------------------------------
create table if not exists public.profiles (
  id          uuid primary key references auth.users (id) on delete cascade,
  username    text not null unique check (username ~ '^[A-Za-z0-9_]{3,24}$'),
  school      text check (char_length(school) <= 80),
  created_at  timestamptz not null default now()
);
alter table public.profiles enable row level security;

drop policy if exists "read own profile" on public.profiles;
create policy "read own profile" on public.profiles for select using (auth.uid() = id);
drop policy if exists "update own profile" on public.profiles;
create policy "update own profile" on public.profiles for update using (auth.uid() = id);

-- Create a profile when someone signs up. Username comes from sign-up metadata;
-- if it's taken or invalid, fall back to a generated one so sign-up never fails.
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
declare
  wanted text := coalesce(new.raw_user_meta_data ->> 'username', '');
  final  text;
begin
  if wanted ~ '^[A-Za-z0-9_]{3,20}$' and not exists (select 1 from profiles where lower(username) = lower(wanted)) then
    final := wanted;
  else
    final := 'student_' || substr(replace(new.id::text, '-', ''), 1, 8);
  end if;
  insert into profiles (id, username, school)
  values (new.id, final, nullif(left(new.raw_user_meta_data ->> 'school', 80), ''));
  return new;
end $$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users
  for each row execute function public.handle_new_user();

-- ---------------------------------------------------------------------------
-- Attempts
-- ---------------------------------------------------------------------------
create table if not exists public.attempts (
  id           bigint generated always as identity primary key,
  user_id      uuid not null references auth.users (id) on delete cascade,
  question_id  text not null references public.questions (id),
  subject      text not null,
  mode         text not null check (mode in ('daily', 'practice')),
  chosen       smallint not null,
  correct      boolean not null,
  day          date not null,
  created_at   timestamptz not null default now()
);
create index if not exists attempts_user_idx on public.attempts (user_id, created_at);
create index if not exists attempts_day_idx on public.attempts (day) where mode = 'daily';
-- One daily attempt per subject per day.
create unique index if not exists attempts_one_daily on public.attempts (user_id, subject, day) where mode = 'daily';

alter table public.attempts enable row level security;
drop policy if exists "read own attempts" on public.attempts;
create policy "read own attempts" on public.attempts for select using (auth.uid() = user_id);
-- No insert policy: attempts are written only through record_attempt(), which marks them server-side.

create or replace function public.sydney_today()
returns date language sql stable as $$ select (now() at time zone 'Australia/Sydney')::date $$;

create or replace function public.record_attempt(p_question_id text, p_chosen int, p_mode text)
returns jsonb language plpgsql security definer set search_path = public as $$
declare
  q questions;
  is_correct boolean;
begin
  if auth.uid() is null then raise exception 'not signed in'; end if;
  if p_mode not in ('daily', 'practice') then raise exception 'bad mode'; end if;
  select * into q from questions where id = p_question_id;
  if not found then raise exception 'unknown question %', p_question_id; end if;
  is_correct := (p_chosen = q.answer);
  insert into attempts (user_id, question_id, subject, mode, chosen, correct, day)
  values (auth.uid(), q.id, q.subject, p_mode, p_chosen, is_correct, sydney_today())
  on conflict do nothing;
  return jsonb_build_object('correct', is_correct, 'answer', q.answer);
end $$;

-- Carry over progress made as a guest, the first time someone signs in.
-- Only works on an account with no attempts yet, and only for the last 60 days.
create or replace function public.import_guest_attempts(p_attempts jsonb)
returns int language plpgsql security definer set search_path = public as $$
declare
  n int;
begin
  if auth.uid() is null then raise exception 'not signed in'; end if;
  if exists (select 1 from attempts where user_id = auth.uid()) then return 0; end if;
  insert into attempts (user_id, question_id, subject, mode, chosen, correct, day, created_at)
  select auth.uid(), q.id, q.subject, a.mode, a.chosen, a.chosen = q.answer, a.day,
         least(coalesce(a.created_at, now()), now())
  from jsonb_to_recordset(p_attempts) as a(question_id text, mode text, chosen int, day date, created_at timestamptz)
  join questions q on q.id = a.question_id
  where a.mode in ('daily', 'practice')
    and a.day between sydney_today() - 60 and sydney_today()
  on conflict do nothing;
  get diagnostics n = row_count;
  return n;
end $$;

-- ---------------------------------------------------------------------------
-- Weekly leaderboard: correct daily answers since Monday (Sydney time),
-- ties broken by current streak. Mirrors weeklyScore() in lib/progress.ts.
-- ---------------------------------------------------------------------------
create or replace function public.weekly_leaderboard(p_limit int default 50)
returns table (username text, school text, correct bigint, streak bigint)
language sql stable security definer set search_path = public as $$
  with today as (select sydney_today() as d),
  week as (select d - ((extract(isodow from d)::int) - 1) as start from today),
  scores as (
    select a.user_id, count(*) filter (where a.correct) as correct
    from attempts a, week
    where a.mode = 'daily' and a.day >= week.start
    group by a.user_id
  ),
  days as (
    select distinct user_id, day from attempts where mode = 'daily'
  ),
  islands as (
    select user_id, day, day - (row_number() over (partition by user_id order by day))::int as grp
    from days
  ),
  streaks as (
    select i.user_id, count(*) as streak
    from islands i
    join (select user_id, max(day) as last_day from days group by user_id) l using (user_id)
    , today
    where l.last_day >= today.d - 1
      and i.grp = (select grp from islands x where x.user_id = i.user_id and x.day = l.last_day)
    group by i.user_id
  )
  select p.username, p.school, s.correct, coalesce(st.streak, 0) as streak
  from scores s
  join profiles p on p.id = s.user_id
  left join streaks st on st.user_id = s.user_id
  where s.correct > 0
  order by s.correct desc, streak desc, p.username
  limit greatest(1, least(p_limit, 200));
$$;

grant execute on function public.record_attempt(text, int, text) to authenticated;
grant execute on function public.import_guest_attempts(jsonb) to authenticated;
grant execute on function public.weekly_leaderboard(int) to anon, authenticated;
