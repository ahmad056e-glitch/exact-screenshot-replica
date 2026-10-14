create type public.app_role as enum ('admin');
create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  role public.app_role not null,
  unique (user_id, role)
);
grant select on public.user_roles to authenticated;
grant all on public.user_roles to service_role;
alter table public.user_roles enable row level security;

create or replace function public.is_admin() returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.user_roles where user_id = auth.uid() and role = 'admin')
$$;
grant execute on function public.is_admin() to authenticated, anon;

create policy "own roles" on public.user_roles for select to authenticated using (user_id = auth.uid());

create table public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  full_name text not null check (char_length(full_name) between 1 and 120),
  email text not null check (char_length(email) between 3 and 255),
  phone text not null check (char_length(phone) between 3 and 40),
  service text not null check (char_length(service) <= 120),
  message text not null check (char_length(message) between 1 and 5000),
  status text not null default 'new' check (status in ('new','read')),
  created_at timestamptz not null default now()
);
grant insert on public.contact_messages to anon, authenticated;
grant select, update, delete on public.contact_messages to authenticated;
grant all on public.contact_messages to service_role;
alter table public.contact_messages enable row level security;
create policy "anyone can submit" on public.contact_messages for insert to anon, authenticated with check (status = 'new');
create policy "admins read" on public.contact_messages for select to authenticated using (public.is_admin());
create policy "admins update" on public.contact_messages for update to authenticated using (public.is_admin());
create policy "admins delete" on public.contact_messages for delete to authenticated using (public.is_admin());

create table public.message_files (
  id uuid primary key default gen_random_uuid(),
  message_id uuid not null references public.contact_messages(id) on delete cascade,
  file_path text not null,
  file_name text not null,
  mime_type text,
  size_bytes bigint,
  created_at timestamptz not null default now()
);
grant insert on public.message_files to anon, authenticated;
grant select, delete on public.message_files to authenticated;
grant all on public.message_files to service_role;
alter table public.message_files enable row level security;
create policy "anyone attach" on public.message_files for insert to anon, authenticated with check (size_bytes <= 10485760);
create policy "admins read files" on public.message_files for select to authenticated using (public.is_admin());
create policy "admins delete files" on public.message_files for delete to authenticated using (public.is_admin());

create policy "public upload" on storage.objects for insert to anon, authenticated with check (bucket_id = 'client-uploads');
create policy "admin read uploads" on storage.objects for select to authenticated using (bucket_id = 'client-uploads' and public.is_admin());
create policy "admin delete uploads" on storage.objects for delete to authenticated using (bucket_id = 'client-uploads' and public.is_admin());

alter publication supabase_realtime add table public.contact_messages;