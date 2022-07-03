import { Request, Response } from "express";
import Joi, { ObjectSchema, ValidationResult } from "joi";
import { prisma } from "@prisma";
import type { Channel } from "@prisma/client";
import { serverExists } from "@utils/serverExists";

const createChannel = async (req: Request, res: Response) => {
    // Get the server id from params
    const serverId: string = req.params.server_id;

    // If server id is not provided, return error
    if (!serverId)
        return res.status(400).json({
            statusCode: 400,
            error: "Bad Request",
            message: "Server id is required in params"
        });

    // Check if server exists
    if (!await serverExists(serverId))
        // If server does not exist, return 404 status
        return res.status(404).json({
            statusCode: 404,
            error: "Not Found",
            message: `Server with id "${serverId}" not found`
        });

    // Validate the request body
    const schema: ObjectSchema = Joi.object({
       name: Joi.string()
           .min(1)
           .max(16)
           .required(),

       type: Joi.number()
           .integer()
           .required(),

       topic: Joi.string()
           .min(0)
           .max(256)
           .optional(),

       position: Joi.number()
           .integer()
           .required(),

       parent_id: Joi.string()
           .uuid()
           .optional(),
    });

    const result: ValidationResult = schema.validate(req.body);

    // If the request body is invalid, return a 400 error
    if (result.error)
        return res.status(400).json({
            statusCode: 400,
            error: "Bad Request",
            message: result.error?.details[0].message,
        });

    // Check if type is either 0 or 1
    if (parseInt(req.body.type) !== 0 && parseInt(req.body.type) !== 1)
        return res.status(400).json({
            statusCode: 400,
            error: "Bad Request",
            message: "Channel type must be either 0 or 1",
        });

    // If channel type is 0, check if parent_id is provided & exists
    if (parseInt(req.body.type) === 0 && req.body.parent_id) {
        // Check if parent id exists in the database
        const parentExists: Channel | null = await prisma.channel.findFirst({
            where: {
                id: req.body.parent_id,
            }
        });

        // If the parent id does not exist, return a 400 error
        if (!parentExists)
            return res.status(400).json({
                statusCode: 400,
                error: "Bad Request",
                message: `Parent channel with id "${req.body.parent_id}" does not exist`,
            });
    }

    await prisma.channel.create({
        data: {
            name: req.body.name,
            type: parseInt(req.body.type),
            topic: req.body.topic,
            position: parseInt(req.body.position),
            parent_id: req.body.parent_id,
            server_id: serverId,
            createdAt: new Date().getTime(),
        }
    })
        .then((channel: Channel) => {
            return res.status(201).json({
                statusCode: 201,
                message: "Channel created successfully",
                channel,
            })
        })
        .finally(async () => {
            await prisma.$disconnect();
        });
}

export default createChannel;