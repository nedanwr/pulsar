import { Router } from "express";
import { verifyToken } from "@utils/verifyToken";
const router: Router = Router({ mergeParams: true });

// Import Controllers
import { createChannel } from "@controllers/channels";

// @desc        Create Channel
// @route       POST /api/v1/servers/:server_id/channels
router.route("/").post(verifyToken, createChannel);

export default router;