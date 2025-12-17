import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "../prisma/client.js";

export async function create(data) {
    const empresa = await prisma.empresa.findUnique({ where: { id: data.empresaId } });
    if (!empresa) throw new Error("Empresa no existe");
    
    return prisma.lote.create({
        data: {
            empresaId: data.empresaId,
            nombre: data.nombre,
            descripcion: data.descripcion,
            ubicacion: data.ubicacion,
            tipo: data.tipo,
        },
    });
  /* 
  */
}

export async function findAll() {
    return prisma.lote.findMany();
}

export async function findById(id) {
    const lote = await prisma.lote.findUnique({ 
        where: { id },
        include: {
            animales:{
                select: {
                    id: true,
                    caravanaId: true,
                    estado: true,
                    pesoActual: true
                }
            }
        }
    });

    if (!lote) throw new Error("Lote no encontrado");
    return lote;
}

export async function update(id, data) {
    const lote = await prisma.lote.findUnique({ where: { id } });
    if (!lote) throw new Error("Lote no encontrado");

    const datosActualizados = { ...lote, ...data };
    return prisma.lote.update({
        where: { id },
        data: datosActualizados,
    });
}

export async function remove(id) {
    const lote = await prisma.lote.findUnique({ where: { id } });
    if (!lote) throw new Error("Lote no encontrado");
    return prisma.lote.delete({ where: { id } });
} 