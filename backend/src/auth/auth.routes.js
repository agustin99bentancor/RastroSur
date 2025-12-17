import { Router } from "express";
import { registerU, loginU, registerE, loginE } from "./auth.controller.js";

const router = Router();

router.post("/register-user", registerU);
router.post("/login-user", loginU);
router.post("/register-empresa", registerE);
router.post("/login-empresa", loginE);

export default router;
