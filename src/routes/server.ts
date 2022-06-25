import { Router } from "express";
import { verifyToken } from "../utils/verifyToken";
const router: Router = Router();

// Import Controllers
import { createServer } from "@controllers/servers";

// @desc        Create a server
// @route       POST /api/v1/server
router.route("/").post(verifyToken, createServer);

export default router;