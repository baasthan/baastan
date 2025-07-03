import sql from "@/lib/dbClient";
import { Permission } from "@workspace/schema/permission";
export async function getPermissionsByUserId(
  userId: string
): Promise<Permission[] | null> {
  if (!userId) {
    return null;
  }
  try {
    const permissions = await sql<Permission[]>`
      select
        p.id as "id",
        r.resource_name as "resourceName",
        p.resource_action as "resourceAction"
      from
        public.user_roles ur
        inner join public.role_permissions rp on rp.role_id = ur.role_id
        inner join public.permissions p on rp.permission_id = p.id
        inner join public.resources r on p.resource_id = r.id
      where
        ur.user_id = ${userId}
      `;

    return permissions;
  } catch (error) {
    console.error("Unable to retrive user permissions from DB");
    console.debug("getPermissionsByUserId=>", error);
    return null;
  }
}

export async function getPermissionsByRoleId(
  roleId: string | string[]
): Promise<Permission[] | null> {
  const selectedRoleIds = Array.isArray(roleId) ? roleId : [roleId];
  if (!roleId) {
    return null;
  }
  try {
    const permissions = await sql<Permission[]>`
      select distinct 
      r.id as "id",
      r.resource_name as "resourceName",
      p.resource_action as "resourceAction"
      from public.permissions p
        inner join public.resources r
          on r.id = p.resource_id
        inner join public.role_permissions rp
          on rp.permission_id = p.id
        inner join public.roles ro
          on ro.id = rp.role_id and ro.id in ${sql(selectedRoleIds)}
    `;
    return permissions;
  } catch (error) {
    console.error("Error occured while fetching permissions for roles");
    console.debug(error);
    return null;
  }
}
