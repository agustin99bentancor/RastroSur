import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "../prisma/client.js";


export async function basicInfo(empresaId) {
  // Convertir empresaId a número
  empresaId = parseInt(empresaId);
  console.log("Obteniendo info para empresaId:", empresaId);
  
  // Obtener los IDs de los lotes de esta empresa
  const lotes = await prisma.lote.findMany({
    where: { empresaId },
    select: { id: true }
  });
  const loteIds = lotes.map(l => l.id);
  
  // Si no hay lotes, retornar datos vacíos
  if (loteIds.length === 0) {
    return {
      totalVivos: 0,
      pesoPromedio: 0,
      ventasMes: 0,
      mortalidadMes: 0,
      distribucionLotes: {},
      evolucionPeso: [],
      actividadReciente: []
    };
  }
  
  // Fecha actual y inicio del mes
  const ahora = new Date();
  const inicioMes = new Date(ahora.getFullYear(), ahora.getMonth(), 1);

  // Total de vacas vivas
  const totalVivos = await prisma.vaca.count({
    where: {
      estado: "VIVO",
      loteId: { in: loteIds }
    }
  });
  
  // Peso promedio de vacas vivas
  const pesoAgg = await prisma.vaca.aggregate({
    _avg: {
      pesoActual: true
    },
    where: {
      estado: "VIVO",
      loteId: { in: loteIds }
    }
  });
  const pesoPromedio = pesoAgg._avg.pesoActual || 0;

  // Ventas este mes
  const ventasMes = await prisma.eventoAnimal.count({
    where: {
      tipo: "VENTA",
      fecha: { gte: inicioMes },
      animal: {
        loteId: { in: loteIds }
      }
    }
  });

  // Mortalidad este mes - contar eventos de muerte que ocurrieron este mes
  const muertesMes = await prisma.eventoAnimal.count({
    where: {
      tipo: "MUERTE",
      fecha: { gte: inicioMes },
      animal: {
        loteId: { in: loteIds }
      }
    }
  });
  
  // Total de animales para calcular el porcentaje
  const totalAnimales = await prisma.vaca.count({
    where: {
      loteId: { in: loteIds }
    }
  });
  
  const mortalidadMes = totalAnimales > 0 ? (muertesMes / totalAnimales) * 100 : 0;

  // Distribución por lotes
  const lotesConAnimales = await prisma.lote.findMany({
    where: { id: { in: loteIds } },
    select: {
      tipo: true,
      _count: {
        select: { animales: { where: { estado: "VIVO" } } }
      }
    }
  });
  
  const distribucionLotes = lotesConAnimales.reduce((acc, lote) => {
    acc[lote.tipo] = (acc[lote.tipo] || 0) + lote._count.animales;
    return acc;
  }, {});

  // Evolución de peso (últimos 3 meses)
  const meses = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
  const evolucionPeso = [];
  
  for (let i = 2; i >= 0; i--) {
    const fecha = new Date(ahora.getFullYear(), ahora.getMonth() - i, 1);
    const finMes = new Date(ahora.getFullYear(), ahora.getMonth() - i + 1, 0);
    
    const pesoMes = await prisma.vaca.aggregate({
      _avg: { pesoActual: true },
      where: {
        estado: "VIVO",
        loteId: { in: loteIds },
        createdAt: { lte: finMes }
      }
    });
    
    evolucionPeso.push({
      mes: meses[fecha.getMonth()],
      promedio: Math.round(pesoMes._avg.pesoActual || 0)
    });
  }

  // Actividad reciente (últimos 5 eventos)
  const actividadReciente = await prisma.eventoAnimal.findMany({
    where: {
      animal: {
        loteId: { in: loteIds }
      }
    },
    include: {
      animal: {
        select: {
          caravanaId: true,
          raza: true
        }
      }
    },
    orderBy: { fecha: 'desc' },
    take: 5
  });

  return { 
    totalVivos, 
    pesoPromedio: Math.round(pesoPromedio * 10) / 10,
    ventasMes, 
    mortalidadMes: Math.round(mortalidadMes * 10) / 10,
    distribucionLotes,
    evolucionPeso,
    actividadReciente
  };
}
