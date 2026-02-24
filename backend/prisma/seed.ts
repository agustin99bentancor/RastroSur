import 'dotenv/config'
import { PrismaClient, Rol, TipoLote, Estado, Sexo, Raza, TipoEvento } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'
import { faker } from '@faker-js/faker'
import bcrypt from 'bcryptjs'

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})

const adapter = new PrismaPg(pool)

const prisma = new PrismaClient({
  adapter,
})

const EMPRESA_ID = 1 

async function main() {

  console.log("🗑️  Limpiando base de datos...")
  
  // Eliminar en orden correcto (por las relaciones)
  await prisma.eventoAnimal.deleteMany({})
  console.log("  ✓ Eventos eliminados")
  
  await prisma.vaca.deleteMany({})
  console.log("  ✓ Vacas eliminadas")
  
  await prisma.lote.deleteMany({})
  console.log("  ✓ Lotes eliminados")
  
  await prisma.usuario.deleteMany({})
  console.log("  ✓ Usuarios eliminados")
  
  await prisma.empresa.deleteMany({})
  console.log("  ✓ Empresas eliminadas")

  console.log("\n🏢 Creando empresa...")
  const empresa = await prisma.empresa.create({
    data: {
      nombre: "RastroSur Ganadera",
      email: "contacto@rastrosur.com",
      direccion: "Campo Los Aromos, Ruta 5 Km 234",
      password: await bcrypt.hash("empresa123", 10),
    }
  })
  console.log(`  ✓ Empresa creada: ${empresa.nombre}`)

  console.log("\n👥 Creando usuarios...")
  
  const hashedPassword = await bcrypt.hash("123456", 10)
  
  const usuarioAdmin = await prisma.usuario.create({
    data: {
      nombre: "Admin Campo",
      email: "admin@campo.com",
      password: hashedPassword,
      rol: Rol.ADMIN,
      empresaId: empresa.id,
    }
  })
  console.log(`  ✓ Usuario admin: ${usuarioAdmin.email}`)
  
  const usuarioUser = await prisma.usuario.create({
    data: {
      nombre: "Usuario Campo",
      email: "user@campo.com",
      password: hashedPassword,
      rol: Rol.USER,
      empresaId: empresa.id,
    }
  })
  console.log(`  ✓ Usuario normal: ${usuarioUser.email}`)

  console.log("\n🏞️  Creando lotes...")

  const lotes = await Promise.all([
    prisma.lote.create({
      data: {
        nombre: "Lote Cría Norte",
        tipo: TipoLote.CRIA,
        empresaId: empresa.id,
      },
    }),
    prisma.lote.create({
      data: {
        nombre: "Lote Engorde Sur",
        tipo: TipoLote.ENGORDE,
        empresaId: empresa.id,
      },
    }),
    prisma.lote.create({
      data: {
        nombre: "Lote Ordeñe Central",
        tipo: TipoLote.ORDENIE,
        empresaId: empresa.id,
      },
    }),
  ])
  console.log(`  ✓ ${lotes.length} lotes creados`)

  console.log("\n🐄 Creando 200 vacas...")

  const vacasData = Array.from({ length: 200 }).map((_, i) => ({
    caravanaId: `CAR-${empresa.id}-${String(i + 1).padStart(4, '0')}`,
    raza: faker.helpers.arrayElement([Raza.Angus, Raza.Hereford, Raza.Braford, Raza.Brangus]),
    sexo: faker.helpers.arrayElement([Sexo.MACHO, Sexo.HEMBRA]),
    estado: Estado.VIVO,
    pesoActual: faker.number.float({ min: 150, max: 600 }),
    fechaNacimiento: faker.date.past({ years: 5 }),
    loteId: faker.helpers.arrayElement(lotes).id,
  }))

  await prisma.vaca.createMany({
    data: vacasData,
  })
  console.log("  ✓ 200 vacas creadas")

  const vacas = await prisma.vaca.findMany({
    where: { lote: { empresaId: empresa.id } },
  })

  console.log("\n📅 Creando eventos...")

  const eventos = []

  for (const vaca of vacas) {

    // Evento peso (todos)
    eventos.push({
      animalId: vaca.id,
      tipo: TipoEvento.PESO,
      fecha: faker.date.recent({ days: 60 }),
      descripcion: "Control de peso",
      datosExtra: { peso: vaca.pesoActual },
    })

    // 30% vacuna
    if (Math.random() < 0.3) {
      eventos.push({
        animalId: vaca.id,
        tipo: TipoEvento.VACUNA,
        fecha: faker.date.recent({ days: 90 }),
        vacuna: "Aftosa",
        dosis: 2,
        veterinario: "Dr. Pérez",
      })
    }

    // 10% venta
    if (Math.random() < 0.1) {
      eventos.push({
        animalId: vaca.id,
        tipo: TipoEvento.VENTA,
        fecha: faker.date.recent({ days: 30 }),
        descripcion: "Venta en feria local",
      })
    }

    // 5% muerte
    if (Math.random() < 0.05) {
      eventos.push({
        animalId: vaca.id,
        tipo: TipoEvento.MUERTE,
        fecha: faker.date.recent({ days: 20 }),
        descripcion: "Muerte natural",
      })
    }
  }

  await prisma.eventoAnimal.createMany({
    data: eventos,
  })
  console.log(`  ✓ ${eventos.length} eventos creados`)

  console.log("\n✅ Seed completado con éxito!")
  console.log("\n📊 Resumen:")
  console.log(`   • 1 empresa`)
  console.log(`   • 2 usuarios (admin@campo.com / user@campo.com) - Password: 123456`)
  console.log(`   • ${lotes.length} lotes`)
  console.log(`   • ${vacas.length} vacas`)
  console.log(`   • ${eventos.length} eventos`)
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
    await pool.end()
  })