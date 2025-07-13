import { createAuthClient } from "better-auth/react";
export const authClient: ReturnType<typeof createAuthClient> = createAuthClient(
  {
    /** The base URL of the server (optional if you're using the same domain) */
    baseURL: "http://localhost:3000",
    fetchOptions: {
      credentials: "include",
      mode: "cors",
      baseURL: "http://localhost:4000/api/auth",
    },
  }
);

const signIn: typeof authClient.signIn = authClient.signIn;
const signUp: typeof authClient.signUp = authClient.signUp;
const useSession: typeof authClient.useSession = authClient.useSession;
const signOut: typeof authClient.signOut = authClient.signOut;

export { signIn, signOut, signUp, useSession };
