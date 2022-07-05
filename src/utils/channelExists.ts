import { prisma } from "@prisma";
import type { Channel } from "@prisma/client";

export const channelExists = async (channelId: string): Promise<Channel | null> => {
    return await prisma.channel.findFirst({
        where: {
            id: channelId,
        }
    });
};