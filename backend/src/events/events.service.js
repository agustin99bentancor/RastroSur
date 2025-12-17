import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "../prisma/client.js";



function filtrarDatosValidos(datos){
  const datosFiltrados = {};
  for (const [clave, valor] of Object.entries(datos)) {
    if (valor !== undefined) {
        if(clave === 'fecha'){

            continue;
        }
      datosFiltrados[clave] = valor;
    }
  }
  return datosFiltrados;
}

export async function create(data) {

    const vaca = await prisma.vaca.findUnique({ where: { id: parseInt(data.animalId) } });
    if (!vaca) throw new Error("vaca no existe",data);
    
    const date = new Date(data.fecha);
    const datosValidos = filtrarDatosValidos(data);

    return prisma.eventoAnimal.create({
        data: {
            fecha: date,
            ...datosValidos,
        },
    });
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