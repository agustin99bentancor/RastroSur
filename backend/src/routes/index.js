import { Router } from "express";
//import { register, login } from "../auth/auth.controller.js";
import authRoutes from "../auth/auth.routes.js";
import loteRoutes from "../lotes/lote.routes.js";
import vacaRoutes from "../ganado/ganado.routes.js";
import eventsRoutes from "../events/events.routes.js";
import dashboardRoutes from "../dashboard/dashboard.routes.js";

const router = Router();

//router.post("/register", register);
//router.post("/login", login);
router.use("/auth", authRoutes);
router.use("/lote", loteRoutes);
router.use("/ganado", vacaRoutes);
router.use("/events", eventsRoutes);
router.use("/dashboard", dashboardRoutes);

router.get("/test", (req, res) => {
  res.json({ ok: true });
});

export default router;
