import { PrismaClient } from "@/app/generated/prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

const connectionString = process.env["DATABASE_URL"] || "file:./dev.db";
const adapter = new PrismaBetterSqlite3({ url: connectionString });

const globalPrismaClient = globalThis as { prisma?: PrismaClient };

if (!globalPrismaClient.prisma) {
  globalPrismaClient.prisma = new PrismaClient({
    adapter,
  });
}

export const prismaClient = globalPrismaClient.prisma ?? new PrismaClient({
  adapter,
});