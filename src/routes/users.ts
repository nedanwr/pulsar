import { Router } from "express";
import { verifyToken } from "../utils/verifyToken";
const router: Router = Router()

// Import Controllers
import { getCurrentUser, getUser, modifyCurrentUser } from "@controllers/users";

// @desc        Get Current User
// @route       /api/v1/users/@me
router.route("/@me").get(verifyToken, getCurrentUser);

// @desc        Get Specific User
// @route       /api/v1/users/:uid
router.route("/:uid").get(verifyToken, getUser);

// @desc        Modify Current User
// @route       PATCH /api/v1/users/@me
router.route("/@me").patch(verifyToken, modifyCurrentUser);

export default router;