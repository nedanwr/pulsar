import rateLimit from "express-rate-limit";

export const createUserLimiter = rateLimit({
    windowMs: Math.floor(1.577e+10),
    max: 5,
    message: "Too many accounts created from this IP, please try again after 6 months",
    standardHeaders: true,
    legacyHeaders: false,
});