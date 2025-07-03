import { getPermissionsByRoleId } from "@/repository/permissions";
import { getRolesByUserId } from "@/repository/roles";

export async function getUserPermissions(userId: string) {
  const userRoles = await getRolesByUserId(userId);
  if (userRoles) {
    console.log("userRoles===>", userRoles);
    const userRoleIds = userRoles.map((v) => v.id);
    const userPermisstions = await getPermissionsByRoleId(userRoleIds);
    return userPermisstions;
  }
  return null;
}

export async function hasPermission(
  userId: string,
  resourceName: string,
  resourceAction: string
) {
  const permissions = await getUserPermissions(userId);
  console.log("Permissions==>", permissions, resourceName, resourceAction);
  const hasPermission =
    permissions &&
    permissions.some((p) => {
      return (
        p.resourceName === resourceName && p.resourceAction === resourceAction
      );
    });
  console.log("HasPermission===>", hasPermission);
  return hasPermission;
}
