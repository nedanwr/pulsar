import { Request, Response } from "express";
import Joi, { ObjectSchema, ValidationResult } from "joi";
import { prisma } from "@prisma";
import { Server } from "@prisma/client";
// import { randomUUID } from "crypto";
import { validateUUID } from "@utils/validateUUID";
// import { upload } from "@utils/initMulter";
// import { uploadImage } from "@firebase/uploadImage";
// import { getDownloadURL } from "firebase/storage";

const modifyServer = async (req: Request, res: Response) => {
    // Pass id param to variable
    const serverId = req.params.id;
    // Check if serverId is passed
    if (!serverId)
        return res.status(400)
            .json({
                statusCode: 400,
                error: "Bad Request",
                message: "Server id is required"
            });
    // Check if id a valid uuid
    if (!validateUUID(serverId))
        return res.status(400).json({
            statusCode: 400,
            error: "Bad Request",
            message: "Invalid server id",
        });

    // Validate request body
    const schema: ObjectSchema = Joi.object({
        name: Joi.string()
            .min(5)
            .max(16)
            .optional(),

        description: Joi.string()
            .min(8)
            .max(128)
            .optional(),
    });

    const result: ValidationResult = schema.validate(req.body);

    // If validation fails, return status 400 with error message
    if (result.error)
        return res.status(400)
            .json({
                statusCode: 400,
                error: "Bad Request",
                message: result.error.details[0].message,
            });

    // Update server name
    if (req.body.name)
        await prisma.server.update({
            where: {
                id: serverId,
            },
            data: {
                name: req.body.name,
            }
        })
            .then((server: Server | null) => {
                return res.status(200)
                    .json({
                        statusCode: 200,
                        message: "Server name updated",
                        server,
                    });
            })
            .finally(async () => {
                await prisma.$disconnect();
            });
}

export default modifyServer;