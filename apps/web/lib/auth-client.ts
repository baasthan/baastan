import { appAC } from "@workspace/constants/appRoles";
import {
  ownerRole,
  propertiesAcc,
  tenantRole,
} from "@workspace/constants/propertiesRoles";
import { adminClient } from "better-auth/client/plugins";
import { organization } from "better-auth/plugins/organization";
import { createAuthClient } from "better-auth/react";
export const authClient = createAuthClient({
  /** The base URL of the server (optional if you're using the same domain) */
  baseURL: "http://localhost:3000",
  fetchOptions: {
    credentials: "include",
    mode: "cors",
    baseURL: "http://localhost:4000/api/auth",
  },
  plugins: [
    adminClient({
      ac: appAC,
      // defaultRole: "endUserRole",
      // roles: {
      //   superAdminRole,
      //   hostUserRole,
      //   endUserRole,
      // },
    }),
    organization({
      ac: propertiesAcc,
      roles: {
        tenantRole,
        ownerRole,
      },

      organizationCreation: { disabled: false },
      organizationDeletion: { disabled: true },
    }),
  ],
});

const signIn: typeof authClient.signIn = authClient.signIn;
const signUp: typeof authClient.signUp = authClient.signUp;
const useSession: typeof authClient.useSession = authClient.useSession;

const signOut: typeof authClient.signOut = authClient.signOut;

export { signIn, signOut, signUp, useSession };
