// Express
export const port: number = parseInt(process.env.PORT!) || 3000;
export const __prod__: boolean = process.env.NODE_ENV === "production";
export const env = process.env.NODE_ENV || "development";
export const rateLimit: number = parseInt(process.env.RATE_LIMIT!);
export const rateLimitDuration: number = parseInt(process.env.RATE_LIMIT_DURATION!);

// JWT
export const jwtSecret: string = process.env.JWT_SECRET || "";

// Firebase
export const firebaseAPIKey: string = process.env.FIREBASE_API_KEY!;
export const firebaseAuthDomain: string = process.env.FIREBASE_AUTH_DOMAIN!;
export const firebaseProjectID: string = process.env.FIREBASE_PROJECT_ID!;
export const firebaseStorageBucket: string = process.env.FIREBASE_STORAGE_BUCKET!;
export const firebaseMessagingSenderID: string = process.env.FIREBASE_MESSAGING_SENDER_ID!;
export const firebaseAppID: string = process.env.FIREBASE_APP_ID!;