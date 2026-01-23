import jwt from "jsonwebtoken";

export function authenticateToken(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ error: "No autorizado" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { userId, empresaId, rol }
    next();
  } catch (err) {
    console.error("Token error:", err.message);
    return res.status(403).json({ error: "Token inválido o expirado" });
  }
}

export function authorizeRol(...roles) {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.rol)) {
      return res.status(403).json({ error: "Permisos insuficientes" });
    }
    next();
  };
}