import { Request } from "express";
import multer, { FileFilterCallback } from "multer";
import { checkFileType } from "@lib/checkFileType";

export const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 10000000 // 5 MB
    },
    fileFilter(_req: Request, file: Express.Multer.File, callback: FileFilterCallback) {
        checkFileType(file, callback);
    }
});