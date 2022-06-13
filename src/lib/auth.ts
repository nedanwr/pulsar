import { hash, compare } from "bcryptjs";

// Hash a password for storing in a database.
export const hashPassword = async (password: string) => {
    return await hash(password, 12);
}

// Compare a password with a hash.
export const comparePassword = async (password: string, hashedPassword: string) => {
    return await compare(password, hashedPassword);
}