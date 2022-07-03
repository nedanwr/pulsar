import { Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { prisma } from "@prisma";
import { jwtSecret } from "@lib/constants";
import type { User } from "@prisma/client";

export const verifyToken = async (req: any, res: Response, next: NextFunction): Promise<object> => {
    // Get auth header value
    const bearerHeader: string | undefined = req.headers["authorization"];

    // Check if bearer is undefined
    if (typeof bearerHeader !== "undefined") {
        // Split at the space
        const bearer: string[] = bearerHeader.split(" ");
        // Get token from array
        const bearerToken: string = bearer[1];
        // Check if token is valid
        await verify(bearerToken, jwtSecret as string, async (error: Error | null, decoded: any) => {
            if (error) {
                return res.status(403).json({
                    statusCode: 403,
                    error: "Forbidden",
                    message: "You are not authorized to access this resource."
                });
            }

            // Check if user with id in token exists
            const userExists: User | null = await prisma.user.findUnique({
                where: {
                    id: decoded!.uid,
                }
            });

            // If user does not exist, return 403
            if (!userExists) {
                return res.status(403).json({
                    statusCode: 403,
                    error: "Forbidden",
                    message: "You are not authorized to access this resource."
                });
            }

            next();
        });
    }

    // If bearer is undefined, return 403
    return res.status(403).json({
        statusCode: 403,
        error: "Forbidden",
        message: "You are not authorized to access this resource."
    })
}