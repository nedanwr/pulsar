import rateLimit from "express-rate-limit";

export const createUserLimiter = rateLimit({
    windowMs: Math.round(1.296e+9),
    max: 5,
    message: "Too many accounts created from this IP, please try again after 15 days",
    standardHeaders: true,
    legacyHeaders: false,
});