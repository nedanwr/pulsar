import { Request, Response } from "express";
import Joi, { ObjectSchema, ValidationResult } from "joi";
import { prisma } from "@prisma";
import { Server } from "@prisma/client";
import { randomUUID } from "crypto";
import { validateUUID } from "@utils/validateUUID";
import { upload } from "@utils/initMulter";
import { uploadImage } from "@firebase/uploadImage";
import { getDownloadURL } from "firebase/storage";

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
    // Update server description
    else if (req.body.description)
        await prisma.server.update({
            where: {
                id: serverId,
            },
            data: {
                description: req.body.description,
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
    // Update/Upload server icon
    else if (req.is("multipart/form-data"))
        // Upload image to memory
        upload.single("icon")(req, res, (error) => {
            // If error, throw error
            if (error) throw error;
            // Upload image to firebase storage
            uploadImage("server_icons", randomUUID(), req.file!)
                .then(async (url) => {
                    setTimeout(async () => {
                        await prisma.server.update({
                            where: {
                                id: serverId,
                            },
                            data: {
                                icon_url: String(await getDownloadURL(url)).split("?")[0],
                            }
                        })
                            .then((server: Server | null) => {
                                return res.status(200)
                                    .json({
                                        statusCode: 200,
                                        message: "Update server icon",
                                        server,
                                    })
                            })
                            .finally(async () => {
                                await prisma.$disconnect();
                            })
                    }, 15000)
                });
        })

}

export default modifyServer;