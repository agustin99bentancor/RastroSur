import { Router } from "express";
//import { authMiddleware } from "../auth/auth.middleware.js";
//import { requireAdmin } from "../auth/roles.middleware.js";
import { authenticateToken } from "../middleware/auth.middleware.js";
import * as controller from "./events.controller.js";

const router = Router();

router.use(authenticateToken);
router.post("/", controller.create);
router.get("/", controller.findAll);
router.get("/:id", controller.findById);
router.put("/:id", controller.update);
router.delete("/:id", controller.remove);

export default router;
