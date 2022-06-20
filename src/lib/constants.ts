// Express
export const port: number = parseInt(process.env.PORT!) || 3000;
export const __prod__: boolean = process.env.NODE_ENV === "production";
export const env = process.env.NODE_ENV || "development";
export const rateLimit: number = parseInt(process.env.RATE_LIMIT!);
export const rateLimitDuration: number = parseInt(process.env.RATE_LIMIT_DURATION!);

// JWT
export const jwtSecret: string = process.env.JWT_SECRET || "";