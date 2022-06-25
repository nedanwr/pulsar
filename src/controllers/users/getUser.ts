import { Request, Response } from "express";
import { prisma } from "@prisma";

const getUser = async (req: Request, res: Response): Promise<Response> => {
    // Get the user id from the url
    const userId: string = req.params.uid;

    // Find the user
    const user = await prisma.user.findFirst({
        where: {
            id: userId,
        },
    });

    // If user doesn't exist, return 404
    if (!user)
        return res.status(404).json({
            statusCode: 404,
            error: "User not found",
            message: "The user with "
        });

    // If user exists, return the user
    return res.status(200).json({
        statusCode: 200,
        user: {
            id: user.id,
            username: user.username,
            discriminator: user.discriminator,
            email: user.email,
            avatar: user.avatar_url,
            createdAt: user.createdAt,
        },
    });
};

export default getUser;