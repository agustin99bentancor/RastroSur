/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Empresa` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Empresa" ADD COLUMN     "email" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Empresa_email_key" ON "Empresa"("email");
