import { PrismaClient } from "@prisma/client";

const prisma: PrismaClient = new PrismaClient({
  log:
    process.env.NEXT_PUBLIC_NODE_ENV === "development" ? ["error"] : undefined,
});

export default prisma;
