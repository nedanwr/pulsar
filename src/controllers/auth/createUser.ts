import { Request, Response } from "express";
import Joi, { ValidationResult } from "joi";
import { prisma } from "@prisma";
import { generateDiscriminator } from "@lib/user";
import { hashPassword } from "@lib/auth";

const createUser = async (req: Request, res: Response) => {
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

    const result: ValidationResult<unknown> = schema.validate(req.body);

    // If the request body is invalid, return a 400 error
    if (result.error) {
        return res.status(400).json({
            statusCode: 400,
            error: "Bad Request",
            message: result.error.details[0].message,
        });
    }

    // Create a new user
    await prisma.user.create({
        data: {
            email: req.body.email,
            username: req.body.username,
            discriminator: generateDiscriminator(),
            password: await hashPassword(req.body.password),
            createdAt: new Date().getTime(),
        }
    })
        .catch((error: Error | null) => {
            throw error;
        })
        .finally(async () => {
            await prisma.$disconnect();
            return res.status(201).json({
                statusCode: 201,
                message: "User created successfully",
            });
        });
}

export default createUser;