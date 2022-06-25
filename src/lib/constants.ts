// Express
export const port: number = parseInt(process.env.PORT!) || 3000;
export const __prod__: boolean = process.env.NODE_ENV === "production";
export const env = process.env.NODE_ENV || "development";
export const rateLimit: number = parseInt(process.env.RATE_LIMIT!);
export const rateLimitDuration: number = parseInt(process.env.RATE_LIMIT_DURATION!);

// JWT
export const jwtSecret: string = process.env.JWT_SECRET || "";

// S3
export const s3Endpoint: string = process.env.S3_ENDPOINT || "";
export const s3AccessKeyId: string = process.env.S3_ACCESS_KEY_ID || "";
export const s3SecretAccessKey: string = process.env.S3_SECRET_ACCESS_KEY || "";