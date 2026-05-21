
-- Roles enum and table
create type public.app_role as enum ('admin', 'client');

create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  role app_role not null default 'client',
  created_at timestamptz not null default now(),
  unique (user_id, role)
);
alter table public.user_roles enable row level security;

create or replace function public.has_role(_user_id uuid, _role app_role)
returns boolean
language sql stable security definer set search_path = public
as $$
  select exists (select 1 from public.user_roles where user_id = _user_id and role = _role)
$$;

create policy "Users view own roles" on public.user_roles
  for select to authenticated using (auth.uid() = user_id);
create policy "Admins view all roles" on public.user_roles
  for select to authenticated using (public.has_role(auth.uid(), 'admin'));

-- Profiles
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  name text,
  email text,
  created_at timestamptz not null default now()
);
alter table public.profiles enable row level security;
create policy "Users view own profile" on public.profiles
  for select to authenticated using (auth.uid() = id);
create policy "Users update own profile" on public.profiles
  for update to authenticated using (auth.uid() = id);
create policy "Admins view all profiles" on public.profiles
  for select to authenticated using (public.has_role(auth.uid(), 'admin'));

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public
as $$
begin
  insert into public.profiles (id, name, email)
  values (new.id, coalesce(new.raw_user_meta_data->>'name', new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)), new.email);
  insert into public.user_roles (user_id, role) values (new.id, 'client');
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Leads
create type public.lead_status as enum ('NEW', 'CONTACTED', 'CLOSED');
create table public.leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  message text not null,
  status lead_status not null default 'NEW',
  created_at timestamptz not null default now()
);
alter table public.leads enable row level security;
create policy "Anyone can submit a lead" on public.leads
  for insert to anon, authenticated with check (true);
create policy "Admins view leads" on public.leads
  for select to authenticated using (public.has_role(auth.uid(), 'admin'));
create policy "Admins update leads" on public.leads
  for update to authenticated using (public.has_role(auth.uid(), 'admin'));
create policy "Admins delete leads" on public.leads
  for delete to authenticated using (public.has_role(auth.uid(), 'admin'));

-- Campaign Requests
create type public.campaign_status as enum ('PENDING', 'APPROVED', 'REJECTED');
create table public.campaign_requests (
  id uuid primary key default gen_random_uuid(),
  business_name text not null,
  contact_email text not null,
  budget numeric not null,
  goal text not null,
  status campaign_status not null default 'PENDING',
  created_at timestamptz not null default now()
);
alter table public.campaign_requests enable row level security;
create policy "Anyone can submit a campaign request" on public.campaign_requests
  for insert to anon, authenticated with check (true);
create policy "Admins view campaign requests" on public.campaign_requests
  for select to authenticated using (public.has_role(auth.uid(), 'admin'));
create policy "Admins update campaign requests" on public.campaign_requests
  for update to authenticated using (public.has_role(auth.uid(), 'admin'));
