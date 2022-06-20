import { Request, Response } from "express";
import Joi, { ValidationResult } from "joi";
import { PrismaClient } from "@prisma/client";
import { generateDiscriminator } from "../../lib/user";
import { hashPassword, comparePassword } from "../../lib/auth";

const prisma:PrismaClient = new PrismaClient();

export const createUser = async (req: Request, res: Response) => {
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
        .catch((error) => {
            throw error;
        })
        .finally(async () => {
            await prisma.$disconnect();
            return res.status(201).json({
                statusCode: 201,
                message: "User created successfully",
            });
        })
}

export const loginUser = async (req: Request, res:Response) => {
    // Validate the request body
    const schema = Joi.object({
        email: Joi.string()
            .email()
            .required(),

        password: Joi.string()
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

    // Check if the user exists
    const userExists = await prisma.user.findFirst({
        where: {
            email: req.body.email,
        }
    });

    // If the user doesn't exist, return a 404 error
    if (!userExists) {
        return res.status(404).json({
            statusCode: 404,
            error: "Not Found",
            message: `User with email "${req.body.email}" not found`,
        });
    }

    // Compare the password
    const isCorrectPassword = await comparePassword(req.body.password, userExists.password);

    // If the password is incorrect, return a 401 error
    if (!isCorrectPassword) {
        return res.status(401).json({
            statusCode: 401,
            error: "Unauthorized",
            message: "Invalid password",
        });
    }
}