import { Request, Response } from "express";
import Joi, { ObjectSchema, ValidationResult } from "joi";
import { serverExists } from "@utils/serverExists";

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

    // Check if server exists
    if (!await serverExists(req.params.server_id))
        return res.status(404)
            .json({
                statusCode: 404,
                error: "Not Found",
                message: `Server with id ${req.params.server_id} does not exist`,
            });
}

export default deleteServer;