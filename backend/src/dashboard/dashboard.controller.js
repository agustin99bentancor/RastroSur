import * as dashboardService from "./dashboard.service.js";

export async function basicInfo(req, res) {
  try {
    const user = await dashboardService.basicInfo(req.params.empresaId);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}