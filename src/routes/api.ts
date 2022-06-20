import { Router } from "express";
const router:Router = Router();

// Import Routes
import registerRoute from "@routes/auth/user";
import loginRoute from "@routes/auth";

// Use Routes
router.use("/auth/user", registerRoute);
router.use("/auth", loginRoute);

export default router;