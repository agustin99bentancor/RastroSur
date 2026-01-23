import { Router } from "express";
import { authenticateToken } from "../middleware/auth.middleware.js";
import * as controller from "./ganado.controller.js";

const router = Router();

router.use(authenticateToken);
router.post("/", controller.create);
router.get("/", controller.findAll);
router.get("/caravana/:caravanaId", controller.findByCaravana);
router.get("/:id", controller.findById);
router.put("/:id", controller.update);
router.delete("/:id", controller.remove);
router.post("/:id/move", controller.move);
router.get("/:id/events", controller.events);

export default router;
