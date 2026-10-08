-- Run this in the Supabase SQL editor.

create table if not exists public.wishes (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 1 and 80),
  message text not null check (char_length(message) between 1 and 500),
  created_at timestamptz not null default now()
);

create index if not exists wishes_created_at_idx on public.wishes (created_at desc);

alter table public.wishes enable row level security;

drop policy if exists "Public can read wishes" on public.wishes;
create policy "Public can read wishes"
  on public.wishes
  for select
  to anon, authenticated
  using (true);

drop policy if exists "Public can insert wishes" on public.wishes;
create policy "Public can insert wishes"
  on public.wishes
  for insert
  to anon, authenticated
  with check (
    char_length(trim(name)) between 1 and 80
    and char_length(trim(message)) between 1 and 500
  );

-- No update/delete policies: guests cannot change or remove wishes.

do $$
begin
  alter publication supabase_realtime add table public.wishes;
exception
  when duplicate_object then null;
end $$;
