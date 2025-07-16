import { APP_CONFIG, AUTH_CONFIG } from "@/config";
import { PrismaClient } from "@/generated/prisma";
import {
  appAC,
  contentAdminRole,
  contentCreatorRole,
  endUserRole,
  hostUserRole,
  superAdminRole,
} from "@workspace/constants/appRoles";
import {
  ownerRole,
  propertiesAcc,
  tenantRole,
} from "@workspace/constants/propertiesRoles";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import { admin, haveIBeenPwned, jwt, organization } from "better-auth/plugins";

console.log("DATABASE_URL======>", process.env.DATABASE_URL);

import { withOptimize } from "@prisma/extension-optimize";

const prisma = new PrismaClient().$extends(
  withOptimize({ apiKey: process.env.OPTIMIZE_API_KEY! })
);

const auth = betterAuth({
  appName: APP_CONFIG.APP_NAME,
  baseURL: "http://localhost:4000",
  trustedOrigins: ["http://localhost:3000"],
  advanced: {
    useSecureCookies: true,
  },
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  plugins: [
    nextCookies(),
    haveIBeenPwned({
      customPasswordCompromisedMessage:
        "This password has been found in some data breaches. Please try any other password",
    }),
    admin({
      ac: appAC,
      impersonationSessionDuration: 0,
      permitImpersonation: false,
      defaultRole: "endUserRole",
      roles: {
        superAdminRole,
        hostUserRole,
        contentAdminRole,
        contentCreatorRole,
        endUserRole,
      },
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

    jwt({
      jwt: {
        definePayload({ user, session }) {
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            orgRole: session.activeOrganizationRole,
          };
        },
      },
    }),
  ],
  emailAndPassword: {
    enabled: AUTH_CONFIG.EMAIL_PASSWORD.enabled,
    autoSignIn: false,
    minPasswordLength: AUTH_CONFIG.EMAIL_PASSWORD.minLength,
    maxPasswordLength: AUTH_CONFIG.EMAIL_PASSWORD.maxLength,
    requireEmailVerification:
      AUTH_CONFIG.EMAIL_PASSWORD.requireEmailVerification,
  },
  socialProviders: {
    google: {
      enabled: AUTH_CONFIG.GOOGLE.enabled,
      clientId: AUTH_CONFIG.GOOGLE.clientId,
      clientSecret: AUTH_CONFIG.GOOGLE.clientSecret,
    },
  },
});

export { auth };
