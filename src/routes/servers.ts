import { Router } from "express";
import { verifyToken } from "@utils/verifyToken";
const router: Router = Router();

// Import Controllers
import { createServer, modifyServer } from "@controllers/servers";

// @desc        Create Server
// @route       POST /api/v1/server
router.route("/").post(verifyToken, createServer);

// @desc        Modify Server
// @route       PUT /api/v1/server/:id
router.route("/:id").patch(verifyToken, modifyServer);

export default router;