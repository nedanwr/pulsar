import { Request } from "express";
import { verify, JwtPayload } from "jsonwebtoken";
import { jwtSecret } from "@lib/constants";

export const decodeToken = async (req: Request): Promise<string | JwtPayload | undefined> => {
    // Get auth header value
    const bearerHeader: string | undefined = req.headers["authorization"];

    // Check if bearer is undefined
    if (typeof bearerHeader !== "undefined") {
        // Split at the space
        const bearer: string[] = bearerHeader.split(" ");
        // Get token from array
        const bearerToken: string = bearer[1];
        // Return the decoded token
        return verify(bearerToken, jwtSecret as string);
    }
}