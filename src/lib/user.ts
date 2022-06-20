import { sign } from "jsonwebtoken";
import { jwtSecret } from "./constants";

// Generate access token
export const generateAccessToken = async (uid: string): Promise<void> => {
    sign({ uid }, jwtSecret, (err: Error | null, token: string | undefined) => {
        if (err) {
            throw err;
        }
        return token;
    });
}

// Generate a random 4 digit number between 1000 and 9999
export const generateDiscriminator = (min: number = 1000, max: number = 9999) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
}