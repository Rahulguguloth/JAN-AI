-- Create profiles table
create table profiles (
  id uuid references auth.users on delete cascade not null primary key,
  full_name text,
  age integer,
  occupation text,
  income integer,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Trigger to automatically create a profile for new users
create function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, age, occupation, income)
  values (
    new.id,
    new.raw_user_meta_data->>'full_name',
    (new.raw_user_meta_data->>'age')::integer,
    new.raw_user_meta_data->>'occupation',
    (new.raw_user_meta_data->>'income')::integer
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Create chat_messages table
create table chat_messages (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade not null,
  role text not null check (role in ('user', 'assistant')),
  content text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create documents table
create table user_documents (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade not null,
  file_name text not null,
  storage_path text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Set up Row Level Security (RLS)
alter table profiles enable row level security;
alter table chat_messages enable row level security;
alter table user_documents enable row level security;

create policy "Users can view own profile" on profiles for select using (auth.uid() = id);
create policy "Users can update own profile" on profiles for update using (auth.uid() = id);

create policy "Users can view own chat messages" on chat_messages for select using (auth.uid() = user_id);
create policy "Users can insert own chat messages" on chat_messages for insert with check (auth.uid() = user_id);

create policy "Users can view own documents" on user_documents for select using (auth.uid() = user_id);
create policy "Users can insert own documents" on user_documents for insert with check (auth.uid() = user_id);

-- Note: To fully support file uploads you also need to create a storage bucket named "documents" in the Supabase Dashboard
