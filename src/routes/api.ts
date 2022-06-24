import { Router } from "express";
const router:Router = Router();

// Import Routes
import registerRoute from "@routes/auth/user";
import loginRoute from "@routes/auth";
import usersRoute from "@routes/users";

// Use Routes
router.use("/auth/user", registerRoute);
router.use("/auth", loginRoute);
router.use("/users", usersRoute);

export default router;