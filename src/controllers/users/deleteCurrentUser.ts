import { Request, Response } from "express";
import Joi, { ObjectSchema, ValidationResult } from "joi";

const deleteCurrentUser = async (req: Request, res: Response) => {
    // Validate request body
    const schema: ObjectSchema = Joi.object({
        password: Joi.string()
            .required(),
    });

    const result: ValidationResult<object> = schema.validate(req.body);

    // If validation fails, return 400 error
    if (result.error)
        return res.status(400)
            .json({
                statusCode: 400,
                error: "Bad Request",
                message: result.error.details[0].message,
            });
}

export default deleteCurrentUser;