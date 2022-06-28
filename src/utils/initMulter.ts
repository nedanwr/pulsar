import { Request } from "express";
import multer, { FileFilterCallback } from "multer";
import { convertBytes } from "@lib/convertBytes";
import { checkFileType } from "@lib/checkFileType";

export const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: convertBytes(), // 5 MB
    },
    fileFilter: async (_req: Request, file: Express.Multer.File, callback: FileFilterCallback) => {
        await checkFileType(file, callback);
    }
});