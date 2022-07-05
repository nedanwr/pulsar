import { Router } from "express";
import { readFileSync } from "fs";
import swagger from "swagger-ui-express";
import { createUserLimiter } from "@utils/createUserLimiter";
const router:Router = Router();

const swaggerDocument: any = readFileSync("./docs/swagger.json", "utf-8");
const swaggerOptions: object = {
    customSiteTitle: "Pulsar API Docs",
    customCss: ".swagger-ui .topbar { display: none }",
}

// Import Routes
import registerRoute from "@routes/auth/user";
import loginRoute from "@routes/auth";
import userRoutes from "@routes/users";
import serverRoutes from "@routes/servers";
import messageRoutes from "@routes/messages";

// Use Routes
router.use("/docs", swagger.serve);
router.use("/docs", swagger.setup(JSON.parse(swaggerDocument), swaggerOptions));
router.use("/auth/user", createUserLimiter, registerRoute);
router.use("/auth", loginRoute);
router.use("/users", userRoutes);
router.use("/servers", serverRoutes);
router.use("/channels/:channel_id/messages", messageRoutes);

export default router;