import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "../prisma/client.js";

export async function create(data) {
    const lote = await prisma.lote.findUnique({ where: { id: data.loteId } });
    if (!lote) throw new Error("vaca no existe");
    
    const date = new Date(data.fechaNacimiento);

    return prisma.vaca.create({
        data: {
            loteId: data.loteId,
            caravanaId: data.caravanaId,
            raza: data.raza,
            fechaNacimiento: date,
            pesoActual: data.pesoActual,
            estado: data.estado,
            sexo: data.sexo,
            padreId: data.padreId,
            madreId: data.madreId,
        },
    });
    /* 
    */
}

export async function findAll() {
    return prisma.vaca.findMany();
}

export async function findById(id) {
    const vaca = await prisma.vaca.findUnique({ where: { id } });
    if (!vaca) throw new Error("vaca no encontrado");
    return vaca;
}

export async function update(id, data) {
    const vaca = await prisma.vaca.findUnique({ where: { id } });
    if (!vaca) throw new Error("vaca no encontrado");

    const datosActualizados = { ...vaca, ...data };
    return prisma.vaca.update({
        where: { id },
        data: datosActualizados,
    });
}

export async function remove(id) {
    const vaca = await prisma.vaca.findUnique({ where: { id } });
    if (!vaca) throw new Error("vaca no encontrado");
    return prisma.vaca.delete({ where: { id } });
}

export async function findByCaravana(caravanaId) {
    const vaca = await prisma.vaca.findUnique({ where: { caravanaId } });
    if (!vaca) throw new Error("vaca no encontrado");
    return vaca;
}

export async function move(id, data) {
    
    const lote = await prisma.lote.findUnique({ where: { id: data.loteId } });
    if (!lote) throw new Error("lote no encontrado");

    const vacaExistente = await prisma.vaca.findUnique({ where: { id } });
    if (!vacaExistente) throw new Error("vaca no encontrado");

    return prisma.vaca.update({
        where: { id },
        data: {
            loteId: data.loteId,
        },
    });
}

export async function events(id) {
    const vaca = await prisma.vaca.findUnique({ 
        where: { id },
        include: {
            eventos: true
        }
    });
    if (!vaca) throw new Error("vaca no encontrado");
    return vaca;
}