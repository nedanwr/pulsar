import { Request, Response } from "express";
import Joi, { ValidationResult } from "joi";
import { prisma } from "@prisma";
import { generateAccessToken } from "@lib/user";
import { comparePassword } from "@lib/auth";

const loginUser = async (req: Request, res:Response) => {
    // Validate the request body
    const schema = Joi.object({
        email: Joi.string()
            .email()
            .required(),

        password: Joi.string()
            .required(),
    });

    const result: ValidationResult<object> = schema.validate(req.body);

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

    // If the password is correct, return a 200 response
    return res.status(200).json({
        statusCode: 200,
        message: "User logged in successfully",
        accessToken: await generateAccessToken(userExists.id),
    });
}

export default loginUser;