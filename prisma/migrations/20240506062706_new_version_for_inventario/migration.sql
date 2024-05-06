/*
  Warnings:

  - You are about to drop the column `nombre` on the `cargo_empleado` table. All the data in the column will be lost.
  - You are about to drop the column `descripcion` on the `categoria_producto` table. All the data in the column will be lost.
  - You are about to drop the column `entidad` on the `clientes` table. All the data in the column will be lost.
  - You are about to drop the column `ruc` on the `clientes` table. All the data in the column will be lost.
  - You are about to alter the column `Costo` on the `detalle_servicio` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Decimal(10,2)`.
  - You are about to alter the column `costo` on the `detalle_suministro` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Decimal(10,2)`.
  - You are about to drop the column `descripcion` on the `direcciones` table. All the data in the column will be lost.
  - You are about to drop the column `cantidad` on the `egresos` table. All the data in the column will be lost.
  - You are about to drop the column `capacidad` on the `equipo` table. All the data in the column will be lost.
  - The primary key for the `inventario` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `disponibilidad` on the `inventario` table. All the data in the column will be lost.
  - You are about to alter the column `InventarioID` on the `inventario` table. The data in that column could be lost. The data in that column will be cast from `VarChar(50)` to `Int`.
  - You are about to drop the column `concepto` on the `pago_empleado` table. All the data in the column will be lost.
  - You are about to drop the column `nombre` on the `productos` table. All the data in the column will be lost.
  - You are about to drop the column `costo` on the `recursos` table. All the data in the column will be lost.
  - You are about to drop the column `tipoCliente` on the `tipo_cliente` table. All the data in the column will be lost.
  - You are about to drop the column `descripcion` on the `tipo_equipo` table. All the data in the column will be lost.
  - You are about to drop the column `tipo` on the `tipo_equipo` table. All the data in the column will be lost.
  - You are about to drop the column `descripcion` on the `tipo_servicio` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[RUC]` on the table `clientes` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[cedula]` on the table `empleados` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[ruc]` on the table `proveedores` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `cargo_empleado` DROP COLUMN `nombre`,
    ADD COLUMN `Nombre` VARCHAR(255) NULL;

-- AlterTable
ALTER TABLE `categoria_producto` DROP COLUMN `descripcion`,
    ADD COLUMN `Descripcion` VARCHAR(255) NULL;

-- AlterTable
ALTER TABLE `clientes` DROP COLUMN `entidad`,
    DROP COLUMN `ruc`,
    ADD COLUMN `Entidad` VARCHAR(255) NULL,
    ADD COLUMN `RUC` VARCHAR(50) NULL;

-- AlterTable
ALTER TABLE `detalle_servicio` MODIFY `Costo` DECIMAL(10, 2) NULL;

-- AlterTable
ALTER TABLE `detalle_suministro` ADD COLUMN `cantidad` INTEGER NULL,
    MODIFY `costo` DECIMAL(10, 2) NULL;

-- AlterTable
ALTER TABLE `direcciones` DROP COLUMN `descripcion`,
    ADD COLUMN `Descripcion` VARCHAR(255) NULL;

-- AlterTable
ALTER TABLE `egresos` DROP COLUMN `cantidad`,
    ADD COLUMN `Monto` DECIMAL(10, 2) NULL;

-- AlterTable
ALTER TABLE `empleados` ADD COLUMN `cedula` VARCHAR(50) NULL;

-- AlterTable
ALTER TABLE `equipo` DROP COLUMN `capacidad`,
    ADD COLUMN `Capacidad` INTEGER NULL;

-- AlterTable
ALTER TABLE `inventario` DROP PRIMARY KEY,
    DROP COLUMN `disponibilidad`,
    ADD COLUMN `Stock` VARCHAR(50) NULL,
    MODIFY `InventarioID` INTEGER NOT NULL,
    ADD PRIMARY KEY (`InventarioID`);

-- AlterTable
ALTER TABLE `pago_empleado` DROP COLUMN `concepto`,
    ADD COLUMN `Concepto` VARCHAR(255) NULL;

-- AlterTable
ALTER TABLE `productos` DROP COLUMN `nombre`,
    ADD COLUMN `Nombre` VARCHAR(255) NULL;

-- AlterTable
ALTER TABLE `recursos` DROP COLUMN `costo`,
    ADD COLUMN `Costo` DECIMAL(10, 2) NULL;

-- AlterTable
ALTER TABLE `suministro` ADD COLUMN `fecha` DATE NULL;

-- AlterTable
ALTER TABLE `tipo_cliente` DROP COLUMN `tipoCliente`,
    ADD COLUMN `TipoCliente` VARCHAR(50) NULL;

-- AlterTable
ALTER TABLE `tipo_equipo` DROP COLUMN `descripcion`,
    DROP COLUMN `tipo`,
    ADD COLUMN `Descripcion` VARCHAR(255) NULL,
    ADD COLUMN `Tipo` VARCHAR(50) NULL;

-- AlterTable
ALTER TABLE `tipo_servicio` DROP COLUMN `descripcion`,
    ADD COLUMN `Descripcion` VARCHAR(255) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `RUC` ON `clientes`(`RUC`);

-- CreateIndex
CREATE UNIQUE INDEX `cedula` ON `empleados`(`cedula`);

-- CreateIndex
CREATE UNIQUE INDEX `ruc` ON `proveedores`(`ruc`);
