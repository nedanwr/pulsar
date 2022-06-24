import { Request, Response } from "express";
import { prisma } from "@prisma";
import { decodeToken } from "../../utils/decodeToken";

const getCurrentUser = async (req: Request, res: Response) => {
    // Decode the token
    const token: any = await decodeToken(req);

    // Find the user
    const user = await prisma.user.findFirst({
        where: {
            id: token.uid,
        },
    });

    // If user exists, return the user
    if (user)
        return res.status(200).json({
            statusCode: 200,
            user,
        });
}

export default getCurrentUser;