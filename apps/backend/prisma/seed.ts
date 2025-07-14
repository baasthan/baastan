import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

async function main() {}

main()
  .then(() => console.log("Seeding was successful"))
  .catch(() => console.log("Unable to seed"));
