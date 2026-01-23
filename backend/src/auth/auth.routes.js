import { Router } from "express";
import { authenticateToken } from "../middleware/auth.middleware.js";
import { registerU, loginU, registerE, loginE, logout, validCookie } from "./auth.controller.js";

const router = Router();

router.post("/register-user", registerU);
router.post("/login-user", loginU);
router.post("/register-empresa", registerE);
router.post("/login-empresa", loginE);
router.post("/logout", logout);
router.get("/valid-cookie",authenticateToken, validCookie);


export default router;
