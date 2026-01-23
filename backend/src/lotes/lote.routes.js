import { Router } from "express";
import { authenticateToken } from "../middleware/auth.middleware.js";
import * as controller from "./lote.controller.js";

const router = Router();


router.use(authenticateToken);
router.post("/create", controller.create);
router.get("/", controller.findAll);
router.get("/:id", controller.findById);
router.put("/:id", controller.update);
router.delete("/:id", controller.remove);

export default router;
