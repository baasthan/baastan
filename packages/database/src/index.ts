require("dotenv").config();
import {
  getPermissionsByRoleId,
  getPermissionsByUserId,
} from "./repository/permissions";
import { getRolesByUserId } from "./repository/roles";

const testFunction = async () => {
  const start = Date.now();

  const permissions = await getPermissionsByUserId(
    "user_2yacFZlCmCOCaCdqfCle4rtz9ir"
  );

  const roles = await getRolesByUserId("user_2yacFZlCmCOCaCdqfCle4rtz9ir");

  const rolePermissions = await getPermissionsByRoleId([
    "6f1ae60c-4798-42a4-9192-dbe2eabfc4d1",
    "94f95667-86be-4b09-91e6-e7a4b2e7c2a4",
  ]);
  const end = Date.now();
  console.log("Execution Time=>", end - start);
  return { permissions, roles, rolePermissions };
};
testFunction()
  .then((data) => console.log(data))
  .finally(() => process.exit(0));
