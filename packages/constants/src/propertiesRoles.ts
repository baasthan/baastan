import { createAccessControl } from "better-auth/plugins/access";

const rooms = ["view", "view_all", "add_tenant", "remove_tenant"] as const;

const propertiesAcc = createAccessControl({ rooms });

const tenantRole = propertiesAcc.newRole({ rooms: ["view", "view_all"] });
const ownerRole = propertiesAcc.newRole({
  rooms: ["view", "add_tenant", "remove_tenant", "view_all"],
});

export { ownerRole, propertiesAcc, tenantRole };
