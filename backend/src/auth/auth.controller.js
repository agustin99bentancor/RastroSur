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
    res.cookie("token", result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 1000,
    });

    res.status(201).json(result.user);
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
    res.cookie("token", result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 1000,
    });

    res.status(201).json(result.user);
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
}

export async function logout(req, res) {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
  res.status(200).json({ ok: true });
}

export async function validCookie(req, res) {
  res.status(200).json({ 
    valid: true, 
    user: req.user 
  });
}