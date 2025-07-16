import { PrismaClient } from "@/generated/prisma";
import { withOptimize } from "@prisma/extension-optimize";

const getPrismaClient = () => {
  const prismaClient = new PrismaClient().$extends(
    withOptimize({ apiKey: process.env.OPTIMIZE_API_KEY! })
  );
  return prismaClient;
};

export { getPrismaClient };
