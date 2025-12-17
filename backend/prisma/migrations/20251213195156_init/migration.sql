/*
  Warnings:

  - You are about to drop the `Animal` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `password` to the `Empresa` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `tipo` on the `EventoAnimal` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `tipo` to the `Lote` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `rol` on the `Usuario` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Rol" AS ENUM ('ESPECTADOR', 'ADMIN', 'USER');

-- CreateEnum
CREATE TYPE "TipoLote" AS ENUM ('CRIA', 'ENGORDE', 'ORDENIE');

-- CreateEnum
CREATE TYPE "Sexo" AS ENUM ('MACHO', 'HEMBRA');

-- CreateEnum
CREATE TYPE "Raza" AS ENUM ('Hereford', 'Angus', 'Braford', 'Brangus');

-- CreateEnum
CREATE TYPE "Estado" AS ENUM ('MUERTO', 'VENDIDO', 'SACRIFICADO', 'VIVO');

-- CreateEnum
CREATE TYPE "TipoEvento" AS ENUM ('NACIMIENTO', 'PESO', 'VENTA', 'MUERTE', 'SACRIFICIO', 'TRASLADO', 'VACUNA', 'VETERINARIO');

-- DropForeignKey
ALTER TABLE "Animal" DROP CONSTRAINT "Animal_loteId_fkey";

-- DropForeignKey
ALTER TABLE "EventoAnimal" DROP CONSTRAINT "EventoAnimal_animalId_fkey";

-- AlterTable
ALTER TABLE "Empresa" ADD COLUMN     "password" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "EventoAnimal" ADD COLUMN     "dosis" DOUBLE PRECISION,
ADD COLUMN     "observacion" TEXT,
ADD COLUMN     "vacuna" TEXT,
ADD COLUMN     "veterinario" TEXT,
DROP COLUMN "tipo",
ADD COLUMN     "tipo" "TipoEvento" NOT NULL;

-- AlterTable
ALTER TABLE "Lote" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "tipo" "TipoLote" NOT NULL;

-- AlterTable
ALTER TABLE "Usuario" DROP COLUMN "rol",
ADD COLUMN     "rol" "Rol" NOT NULL;

-- DropTable
DROP TABLE "Animal";

-- CreateTable
CREATE TABLE "Vaca" (
    "id" SERIAL NOT NULL,
    "loteId" INTEGER NOT NULL,
    "caravanaId" TEXT NOT NULL,
    "raza" "Raza" NOT NULL,
    "fechaNacimiento" TIMESTAMP(3),
    "pesoActual" DOUBLE PRECISION,
    "estado" "Estado" NOT NULL DEFAULT 'VIVO',
    "padreId" INTEGER,
    "madreId" INTEGER,
    "sexo" "Sexo" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Vaca_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Vaca_caravanaId_key" ON "Vaca"("caravanaId");

-- AddForeignKey
ALTER TABLE "Vaca" ADD CONSTRAINT "Vaca_loteId_fkey" FOREIGN KEY ("loteId") REFERENCES "Lote"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventoAnimal" ADD CONSTRAINT "EventoAnimal_animalId_fkey" FOREIGN KEY ("animalId") REFERENCES "Vaca"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
