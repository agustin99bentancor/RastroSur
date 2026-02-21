import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "../prisma/client.js";

export async function registerUser(data) {
  const hashedPassword = await bcrypt.hash(data.password, 10);

  return prisma.usuario.create({
    data: {
      empresaId: data.empresaId,
      email: data.email,
      nombre: data.nombre,
      password: hashedPassword,
      rol: data.rol,
    },
  });
}

export async function loginUser(email, password) {
  const user = await prisma.usuario.findUnique({ where: { email } });
  if (!user) throw new Error("Usuario no existe");

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw new Error("Password incorrecta");

  const token = jwt.sign(
    { userId: user.id, empresaId: user.empresaId, rol: user.rol },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  return { token, user };
}

export async function registerEmpresa(data) {
  const hashedPassword = await bcrypt.hash(data.password, 10);
  const empresa = await prisma.empresa.findUnique({ where: { email: data.email } });
  if (empresa) throw new Error("Empresa ya existe");

  return prisma.empresa.create({
    data: {
      nombre: data.nombre,
      direccion: data.direccion,
      password: hashedPassword,
      email: data.email,
    },
  });
}

export async function loginEmpresa(email, password) {
  const empresa = await prisma.empresa.findUnique({ where: { email } });
  if (!empresa) throw new Error("Empresa no existe");

  const valid = await bcrypt.compare(password, empresa.password);
  if (!valid) throw new Error("Password incorrecta");

  const token = jwt.sign(
    { empresaId: empresa.id },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  return { token, user: empresa };
}

export async function userId(id) {
  return prisma.usuario.findUnique({ where: { id } });
}