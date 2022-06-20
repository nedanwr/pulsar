import { Router } from "express";
const router:Router = Router();

// Import Controllers
import { createUser } from "@controllers/auth/user";

// @desc        Create User
// @route       POST /api/v1/user
router.route("/").post(createUser);

export default router;