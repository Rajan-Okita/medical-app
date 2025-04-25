import { PrismaClient } from '../generated/prisma';

let prisma;

try {
  const globalForPrisma = globalThis;
  prisma = globalForPrisma.prisma || new PrismaClient();

  if (process.env.NODE_ENV !== 'production') {
    globalForPrisma.prisma = prisma;
  }
} catch (error) {
  console.error("Failed to initialize PrismaClient:", error);
}

export default prisma;
