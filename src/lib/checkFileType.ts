import { extname } from "path";

export const checkFileType = (file: Express.Multer.File, callback: any): Promise<boolean> => {
    // Allowed ext
    const fileTypes: RegExp = /jpeg|jpg|png|gif/;
    // Check ext
    const extName: boolean = fileTypes.test(extname(file.originalname).toLowerCase());

    // Check mime
    const mimeType: boolean = fileTypes.test(file.mimetype);

    if (extName && mimeType)
        return callback(null, true);
    else
        return callback("Error: Images Only!");
}