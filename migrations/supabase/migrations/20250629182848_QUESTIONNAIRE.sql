create type public.question_type_enum as enum (
  'SINGLE_SELECT',
  'MULTI_SELECT',
  'MULTI_SELECT_WITH_OTHER',
  'SHORT_TEXT',
  'PARAGRAPH'
);

create table
  questionnaires (
    id uuid primary key default gen_random_uuid (),
    created_at timestamp not null default now (),
    updated_at timestamp not null default now (),
    survey_text text not null,
    survey_description text not null,
    is_live boolean not null default false,
    live_at timestamp default null,
    closed_at timestamp default null
  );

create table
  questions (
    id bigint generated always as identity primary key,
    questionnaire_id uuid not null references public.questionnaires (id) on delete cascade,
    question_type question_type_enum not null,
    question_text text not null
  );

create table
  question_options (
    id bigint generated always as identity primary key,
    question_id bigint not null references public.questions (id) on delete cascade,
    option_text text
  );

create table
  answers (
    id uuid primary key default gen_random_uuid (),
    questionnaire_id uuid not null references public.questionnaires (id) on delete cascade,
    question_id bigint not null references public.questions (id) on delete cascade,
    additional_option_text text,
    short_answer varchar(50),
    paragraph text
  );

create table
  answer_options (
    answer_id uuid not null references public.answers (id) on delete cascade,
    option_id bigint not null references public.question_options (id) on delete cascade,
    primary key (answer_id, option_id)
  );

--- dashboard.questionnaire ---
-- Create Resource dashboard.questionnaire
insert into
  public.resources (id, resource_name, parent_id)
values
  (3, 'dashboard.survey', 1);

-- permissions
insert into
  public.permissions (
    resource_id,
    resource_action,
    permissions_description
  )
values
  (3, 'select', 'View Dashboard questionnaires'),
  (3, 'insert', 'Create Dashboard questionnaires'),
  (3, 'update', 'Update Dashboard questionnaires'),
  (3, 'delete', 'Delete Dashboard questionnaires');

--- end_user_view.questionnaire ---
-- Create Resource end_user_view.questionnaire
insert into
  public.resources (id, resource_name, parent_id)
values
  (4, 'end_user_view.questionnaire', 2);

-- permissions
insert into
  public.permissions (
    resource_id,
    resource_action,
    permissions_description
  )
values
  (4, 'select', 'View Live Questions'),
  (4, 'insert', 'Answer Live Questions');