import { Request, Response } from "express";
import Joi, { ObjectSchema, ValidationResult } from "joi";
import { channelExists } from "@utils/channelExists";

const createMessage = async (req: Request, res: Response) => {
    // Get channel id from params
    const channelId: string = req.params.channel_id;

    // If channel id is not provided, return 400 error
    if (!channelId)
        return res.status(400)
            .json({
                statusCode: 400,
                error: "Bad Request",
                message: "Channel id is required in params"
            });

    // Check if channel exists
    if (!await channelExists(channelId))
        // If channel does not exist, return 404 status
        return res.status(404)
            .json({
                statusCode: 404,
                error: "Not Found",
                message: `Channel with id "${channelId}" not found`
            });

    // Validate the request body
    const schema: ObjectSchema = Joi.object({
        content: Joi.string()
            .min(1)
            .max(512)
            .required(),
    });

    const result: ValidationResult<object> = schema.validate(req.body);

    // If the request body is invalid, return a 400 error
    if (result.error)
        return res.status(400).json({
            statusCode: 400,
            error: "Bad Request",
            message: result.error.details[0].message,
        });
}

export default createMessage;