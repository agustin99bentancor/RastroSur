import { Router } from "express";
//import { authMiddleware } from "../auth/auth.middleware.js";
//import { requireAdmin } from "../auth/roles.middleware.js";
import * as controller from "./ganado.controller.js";

const router = Router();

//router.use(authMiddleware);

router.post("/", controller.create);
router.get("/", controller.findAll);
router.get("/caravana/:caravanaId", controller.findByCaravana);
router.get("/:id", controller.findById);
router.put("/:id", controller.update);
router.delete("/:id", controller.remove);
router.post("/:id/move", controller.move);
router.get("/:id/events", controller.events);

export default router;
