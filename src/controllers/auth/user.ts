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
}