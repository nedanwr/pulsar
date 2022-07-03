import { Request, Response } from "express";
import Joi, { ObjectSchema, ValidationResult } from "joi";

const createMessage = async (req: Request, res: Response) => {
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