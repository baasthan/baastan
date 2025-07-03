import sql from "@/lib/dbClient";

export interface Roles {
  id: string;
  roleName: string;
}

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
      on r.id = ur.role_id and ur.user_id = ${userId}

  `;
    if (roles.count === 0) {
      return null;
    }
    return roles;
  } catch (error) {
    console.error("Unable to access roles using userId");
    console.debug(error);
    return null;
  }
}
