-- Create Resource Dashboard
insert into
  public.resources (id, resource_name)
values
  (1, 'dashboard');

-- Permission 
insert into
  public.permissions (
    resource_id,
    resource_action,
    allow_cascade,
    permissions_description
  )
values
  (1, 'select', true, 'View Dashboard');