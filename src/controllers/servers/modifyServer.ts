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
}

export default modifyServer;