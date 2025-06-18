import { Roles } from "@workspace/shared-types/roles";
import sql from "../client";

export async function getRolesByUserId(
  userId: string
): Promise<Roles[] | null> {
  if (!userId) {
    return null;
  }
  try {
    const roles = await sql<Roles[]>`
      select r.role_name as "roleName",r.id as "id" from public.user_roles ur
        inner join public.roles r
      on r.id = ur.role_id;
  `;
    return roles;
  } catch (error) {
    console.error("Unable to access roles using userId");
    console.debug(error);
    return null;
  }
}
