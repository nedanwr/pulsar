import { Router } from "express";
const router:Router = Router();

// Import Routes
import registerRoute from "./auth/user";

// Use Routes
router.use("/auth/user", registerRoute);

export default router;