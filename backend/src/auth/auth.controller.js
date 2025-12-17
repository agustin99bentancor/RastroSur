import * as authService from "./auth.service.js";

export async function registerU(req, res) {
  try {
    const user = await authService.registerUser(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function loginU(req, res) {
  try {
    const result = await authService.loginUser(
      req.body.email,
      req.body.password
    );
    res.json(result);
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
}
export async function registerE(req, res) {
  try {
    const user = await authService.registerEmpresa(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function loginE(req, res) {
  try {
    const result = await authService.loginEmpresa(
      req.body.email,
      req.body.password
    );
    res.json(result);
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
}