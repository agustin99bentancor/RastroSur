import { Router } from "express";
//import { authMiddleware } from "../auth/auth.middleware.js";
//import { requireAdmin } from "../auth/roles.middleware.js";
import * as controller from "./lote.controller.js";

const router = Router();

//router.use(authMiddleware);

router.post("/create", controller.create);
router.get("/", controller.findAll);
router.get("/:id", controller.findById);
router.put("/:id", controller.update);
router.delete("/:id", controller.remove);

export default router;
