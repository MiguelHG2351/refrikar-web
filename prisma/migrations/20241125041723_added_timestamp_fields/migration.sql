/*
  Warnings:

  - Added the required column `updatedAt` to the `servicios` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "servicios" ADD COLUMN     "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(6) NOT NULL;
