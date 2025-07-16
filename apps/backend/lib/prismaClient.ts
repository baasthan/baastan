import { PrismaClient } from "@/generated/prisma";
import { withOptimize } from "@prisma/extension-optimize";

const getPrismaClient = () => {
  console.log("process.env.DATABASE_URL===>", process.env.DATABASE_URL);
  const prismaClient = new PrismaClient().$extends(
    withOptimize({ apiKey: process.env.OPTIMIZE_API_KEY! })
  );
  return prismaClient;
};

export { getPrismaClient };
