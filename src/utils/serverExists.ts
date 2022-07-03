import {prisma} from "@prisma";
import type { Server } from "@prisma/client";

export const serverExists = async (serverId: string): Promise<Server | null> => {
    return await prisma.server.findFirst({
        where: {
            id: serverId,
        }
    });
}