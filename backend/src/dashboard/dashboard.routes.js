import { Router } from "express";
import { authenticateToken } from "../middleware/auth.middleware.js";
import {
    basicInfo,
} from "./dashboard.controller.js";

const router = Router();
router.get("/:empresaId",authenticateToken, basicInfo);

export default router;
