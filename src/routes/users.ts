import { Router } from "express";
import { verifyToken } from "../utils/verifyToken";
const router: Router = Router()

// Import Controllers
import { getCurrentUser } from "@controllers/users";

// @desc        Get Current User
// @route       /api/v1/users/@me
router.route("/@me").get(verifyToken, getCurrentUser);

export default router;