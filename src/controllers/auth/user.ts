import { Request, Response } from "express";
import Joi, { ValidationResult } from "joi";

export const createUser = async (req:Request, res:Response) => {
    // Validate the request body
    const schema = Joi.object({
       email: Joi.string()
           .email()
           .required(),

       username: Joi.string()
           .min(3)
           .max(16)
           .required(),

       password: Joi.string()
           .min(8)
           .max(256)
           .required(),
    });

    const result:ValidationResult<unknown> = schema.validate(req.body);

    // If the request body is invalid, return a 400 error
    if (result.error) {
        return res.status(400).json({
            statusCode: 400,
            error: "Bad Request",
            message: result.error.details[0].message,
        });
    }
}