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
import usersRoute from "@routes/users";
import serverRoute from "@routes/server";

// Use Routes
router.use("/docs", swagger.serve);
router.use("/docs", swagger.setup(JSON.parse(swaggerDocument), swaggerOptions));
router.use("/auth/user", createUserLimiter, registerRoute);
router.use("/auth", loginRoute);
router.use("/users", usersRoute);
router.use("/server", serverRoute);

export default router;