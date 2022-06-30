import { Request, Response } from "express";
import Joi, { ObjectSchema, ValidationResult } from "joi";
import { prisma } from "@prisma";
import type { Server } from "@prisma/client";
import { decodeToken } from "@utils/decodeToken";

const createServer = async (req: Request, res: Response) => {
    // Validate the request body
    const schema: ObjectSchema<any> = Joi.object({
        name: Joi.string()
            .min(5)
            .max(16)
            .required(),

        description: Joi.string()
            .min(8)
            .max(128)
            .optional(),
    });

    const result: ValidationResult<unknown> = schema.validate(req.body);

    // If the request body is invalid, return a 400 error
    if (result.error)
        return res.status(400).json({
            statusCode: 400,
            error: "Bad Request",
            message: result.error?.details[0].message,
        });

    // Decode token
    const token: any = await decodeToken(req);

    // Create a new server
    await prisma.server.create({
        data: {
            name: req.body.name,
            description: req.body.description,
            owner_id: token.uid,
            createdAt: new Date().getTime(),
        }
    })
        .then((server: Server) => {
            return res.status(201).json({
                statusCode: 201,
                message: "Server created successfully",
                server: {
                    id: server.id,
                    name: server.name,
                    description: server.description,
                    owner_id: server.owner_id,
                    icon_url: server.icon_url,
                    createdAt: server.createdAt,
                }
            });
        })
        .catch((error: Error | null) => {
            throw error;
        })
        .finally(async () => {
            await prisma.$disconnect();
        });
};

export default createServer;