import "dotenv/config";
import { prisma } from "./prisma/client.js";

async function test() {
  const now = await prisma.$queryRaw`SELECT NOW()`;
  console.log("Prisma connected. Time:", now);
}

test()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
