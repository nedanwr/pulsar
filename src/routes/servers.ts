import { Router } from "express";
const router: Router = Router();

// Import Middleware
import { verifyToken } from "@utils/verifyToken";

// Import Controllers
import { createServer, modifyServer } from "@controllers/servers";

// Import Routes
import channelRoutes from "./channels";

// @desc        Create Server
// @route       POST /api/v1/server
router.route("/").post(verifyToken, createServer);

// @desc        Modify Server
// @route       PUT /api/v1/server/:id
router.route("/:id").patch(verifyToken, modifyServer);

// Use Channel Routes
router.use("/:server_id/channels", channelRoutes);

export default router;