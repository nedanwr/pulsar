import { PrismaClient } from "@prisma/client";

declare global {
    // eslint-disable-next-line no-var
    var prisma: PrismaClient | undefined;
}

export const prisma: PrismaClient = globalThis.prisma || new PrismaClient();