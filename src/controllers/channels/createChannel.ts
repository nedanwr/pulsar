import { Request, Response } from "express";
import Joi, { ObjectSchema, ValidationResult } from "joi";
import { prisma } from "@prisma";
import type { Channel } from "@prisma/client";
import { serverExists } from "@utils/serverExists";

const createChannel = async (req: Request, res: Response) => {
    // Get the server id from params
    const serverId: string = req.params.server_id;

    // If server id is not provided, return error
    if (!serverId)
        return res.status(400).json({
            statusCode: 400,
            error: "Bad Request",
            message: "Server id is required in params"
        });

    // Check if server exists
    if (!await serverExists(serverId))
        // If server does not exist, return 404 status
        return res.status(404).json({
            statusCode: 404,
            error: "Not Found",
            message: `Server with id "${serverId}" not found`
        });

    // Validate the request body
    const schema: ObjectSchema = Joi.object({
       name: Joi.string()
           .min(1)
           .max(16)
           .required(),

       type: Joi.number()
           .integer()
           .required(),

       topic: Joi.string()
           .min(0)
           .max(256)
           .optional(),

       position: Joi.number()
           .integer()
           .required(),

       parent_id: Joi.string()
           .uuid()
           .optional(),
    });

    const result: ValidationResult = schema.validate(req.body);

    // If the request body is invalid, return a 400 error
    if (result.error)
        return res.status(400).json({
            statusCode: 400,
            error: "Bad Request",
            message: result.error?.details[0].message,
        });
}

export default createChannel;