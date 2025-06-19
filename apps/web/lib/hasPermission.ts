import { Permission } from "@workspace/schema/permission";

export function hasPermission(
  resourceName: string,
  resourceAction: string,
  permissions: Permission[]
) {
  console.log(resourceName, resourceAction, permissions);
  const hasPermission =
    permissions &&
    permissions.some((p) => {
      return (
        p.resourceName === resourceName && p.resourceAction === resourceAction
      );
    });
  return hasPermission;
}
