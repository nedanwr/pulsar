import { Router } from "express";
const router: Router = Router();

// Import Controller
import { loginUser } from "@controllers/auth/user";

// @desc        Login User
// @route       POST /api/v1/auth
router.route("/").post(loginUser);

export default router;