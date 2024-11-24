/*
  Warnings:

  - Made the column `tipoclienteid` on table `clientes` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "clientes" ALTER COLUMN "tipoclienteid" SET NOT NULL;
