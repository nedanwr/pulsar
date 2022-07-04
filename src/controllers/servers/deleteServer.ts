import { Request, Response } from "express";
import Joi, { ObjectSchema, ValidationResult } from "joi";

const deleteServer = async (req: Request, res: Response) => {
    // Validate request params
    const schema: ObjectSchema = Joi.object({
        server_id: Joi.string()
            .uuid()
            .required(),
    });

    const result: ValidationResult<object> = schema.validate(req.params);

    // If validation fails, return 400 error
    if (result.error)
        return res.status(400)
            .json({
                statusCode: 400,
                error: "Bad Request",
                message: result.error?.details[0].message,
            });
}

export default deleteServer;