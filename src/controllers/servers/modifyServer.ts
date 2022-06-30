import { Request, Response } from "express";
import Joi, { ObjectSchema, ValidationResult } from "joi";
import { prisma } from "@prisma";
import { validateUUID } from "@utils/validateUUID";
import { upload } from "@utils/initMulter";
import { uploadImage } from "@firebase/uploadImage";

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

    // Upload the icon to memory storage
    upload.single("icon")(req, res, async (error: any) => {
        if (error) throw error;

        // Validate request body
        const schema: ObjectSchema<any> = Joi.object({
            username: Joi.string()
                .min(5)
                .max(16)
                .optional(),

            description: Joi.string()
                .min(5)
                .max(128)
                .optional(),

            icon: Joi.optional(),
        });

        const result: ValidationResult<object> = schema.validate(req.body);

        // If the request body is invalid, return a 400 error
        if (result.error)
            return res.status(400)
                .json({
                    statusCode: 400,
                    error: "Bad Request",
                    message: result.error?.details[0].message,
                });
    });
}

export default modifyServer;