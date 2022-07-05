import { Router } from "express";
const router: Router = Router({ mergeParams: true });

// Import Middleware
import { verifyToken } from "@utils/verifyToken";

// Import Controllers
import { createMessage } from "@controllers/messages";

// @desc        Send a message to specific channel
// @route       POST /api/v1/channels/:channel_id/messages
router.route("/").post(verifyToken, createMessage);

export default router;