import { Request, Response } from "express";
import Joi, { ObjectSchema, ValidationResult } from "joi";
import { prisma } from "@prisma";
import { compare } from "bcryptjs";

// Import Utils
import { decodeToken } from "@utils/decodeToken";

const deleteCurrentUser = async (req: Request, res: Response) => {
    // Validate request body
    const schema: ObjectSchema = Joi.object({
        password: Joi.string()
            .required(),
    });

    const result: ValidationResult<object> = schema.validate(req.body);

    // If validation fails, return 400 error
    if (result.error)
        return res.status(400)
            .json({
                statusCode: 400,
                error: "Bad Request",
                message: result.error.details[0].message,
            });

    // Decode the token
    const token: any = await decodeToken(req);

    // Find the user
    const user = await prisma.user.findFirst({
        where: {
            id: token.uid,
        }
    });

    // If user doesn't exist, return 500 error
    if (!user)
        return res.status(500)
            .json({
                statusCode: 500,
                error: "Internal Server Error",
                message: "User not found",
            });

    // If password is incorrect, return 401 error
    compare(req.body.password, user.password, (error: Error, isMatch: boolean) => {
        if (error) throw error;

        // If the password doesn't match, return 401 error
        if (!isMatch)
            return res.status(401)
                .json({
                    statusCode: 401,
                    error: "Unauthorized",
                    message: "Incorrect password",
                });
    });
}

export default deleteCurrentUser;