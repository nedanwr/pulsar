import { Request, Response } from "express";
import Joi, { ValidationResult } from "joi";
import { prisma } from "@prisma";
import { decodeToken } from "../../utils/decodeToken";

const createServer = async (req: Request, res: Response) => {
    // Validate the request body
    const schema = Joi.object({
        name: Joi.string()
            .required(),

        description: Joi.string(),

        avatar_url: Joi.string(),
    });

    const result: ValidationResult<unknown> = schema.validate(req.body);

    // If the request body is invalid, return a 400 error
    if (result.error) {
        return res.status(400).json({
            statusCode: 400,
            error: "Bad Request",
            message: result.error.details[0].message,
        });
    }

    // Decode the token
    const token: any = await decodeToken(req);

    // Create a new server
    await prisma.server.create({
        data: {
            name: req.body.name,
            owner_id: token.uid,
            createdAt: new Date().getTime(),
        }
    })
        .catch((error: Error | null) => {
            throw error;
        })
        .finally(async () => {
            await prisma.$disconnect();
            return res.status(201).json({
                statusCode: 201,
                message: "Server created successfully",
            });
        });
};

export default createServer;