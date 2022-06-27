import { sign } from "jsonwebtoken";
import { jwtSecret } from "./constants";

// Generate access token
export const generateAccessToken = async (uid: string) => {
    return sign({uid}, jwtSecret);
}

// Generate a random 4 digit number between 1000 and 9999
export const generateDiscriminator = (min: number = 1000, max: number = 9999) => {
    return Math.floor(Math.random() * (max - min + 1) + min).toString();
}