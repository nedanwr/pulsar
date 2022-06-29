import { Request, Response } from "express";
import Joi, { ObjectSchema, ValidationResult } from "joi";
import { prisma } from "@prisma";
import { User } from "@prisma/client";
import { decodeToken } from "@utils/decodeToken";
// import { upload } from "@utils/initMulter";
// import { uploadImage } from "../../firebase/uploadImage";

// Here we will not be adding a check to see if the current user exists in the database as verifyToken will do that for us.
const modifyCurrentUser = async (req: Request, res:Response) => {
    // Validate the request body
    const schema: ObjectSchema<any> = Joi.object({
        username: Joi.string()
            .min(4)
            .max(16),

        email: Joi.string()
            .email(),

        confirmEmail: Joi.string()
            .email()
            .valid(Joi.ref("email")),

        avatar: Joi.optional(),
    });

    const result: ValidationResult<any> = schema.validate(req.body);

    // If the request body is invalid, return a 400 error
    if (result.error)
        return res.status(400).json({
            statusCode: 400,
            error: "Bad Request",
            message: result.error.details[0].message,
        });

    // Decode the token
    const token: any = await decodeToken(req);

    // Update the user
    if (req.body.username)
        await prisma.user.update({
            where: {
                id: token.uid,
            },
            data: {
                username: req.body.username,
            }
        })
            .then((user: User) => {
                return res.status(200).json({
                    statusCode: 200,
                    message: "Username updated successfully",
                    user,
                });
            })
            .catch((error: Error | null) => {
                throw error;
            })
            .finally(async () => {
                await prisma.$disconnect();
            });
    else if (req.body.email)
        await prisma.user.update({
            where: {
                id: token.uid,
            },
            data: {
                email: req.body.email,
            }
        })
            .then((user: User) => {
                return res.status(200).json({
                    statusCode: 200,
                    message: "Email updated successfully",
                    user,
                });
            })
            .catch((error: Error | null) => {
                throw error;
            })
            .finally(async () => {
                await prisma.$disconnect();
            });
}

export default modifyCurrentUser;