/*
  Warnings:

  - Made the column `nombre` on table `clientes` required. This step will fail if there are existing NULL values in that column.
  - Made the column `telefono` on table `clientes` required. This step will fail if there are existing NULL values in that column.
  - Made the column `costo` on table `detalle_servicio` required. This step will fail if there are existing NULL values in that column.
  - Made the column `direccion` on table `detalle_servicio` required. This step will fail if there are existing NULL values in that column.
  - Made the column `costo` on table `detalle_suministro` required. This step will fail if there are existing NULL values in that column.
  - Made the column `cantidad` on table `detalle_suministro` required. This step will fail if there are existing NULL values in that column.
  - Made the column `monto` on table `egresos` required. This step will fail if there are existing NULL values in that column.
  - Made the column `nombre` on table `empleados` required. This step will fail if there are existing NULL values in that column.
  - Made the column `telefono` on table `empleados` required. This step will fail if there are existing NULL values in that column.
  - Made the column `cedula` on table `empleados` required. This step will fail if there are existing NULL values in that column.
  - Made the column `capacidad` on table `equipo` required. This step will fail if there are existing NULL values in that column.
  - Made the column `marca` on table `equipo` required. This step will fail if there are existing NULL values in that column.
  - Made the column `descripcion` on table `gastos_varios` required. This step will fail if there are existing NULL values in that column.
  - Made the column `concepto` on table `pago_empleado` required. This step will fail if there are existing NULL values in that column.
  - Made the column `nombre_entidad` on table `pago_impuesto` required. This step will fail if there are existing NULL values in that column.
  - Made the column `nombre` on table `proveedores` required. This step will fail if there are existing NULL values in that column.
  - Made the column `telefono` on table `proveedores` required. This step will fail if there are existing NULL values in that column.
  - Made the column `direccion` on table `proveedores` required. This step will fail if there are existing NULL values in that column.
  - Made the column `costo` on table `recursos` required. This step will fail if there are existing NULL values in that column.
  - Made the column `tipo` on table `tipo_equipo` required. This step will fail if there are existing NULL values in that column.
  - Made the column `descripcion` on table `tipo_equipo` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "clientes" ALTER COLUMN "nombre" SET NOT NULL,
ALTER COLUMN "telefono" SET NOT NULL,
ALTER COLUMN "telefono" SET DATA TYPE VARCHAR(50);

-- AlterTable
ALTER TABLE "detalle_servicio" ALTER COLUMN "costo" SET NOT NULL,
ALTER COLUMN "direccion" SET NOT NULL;

-- AlterTable
ALTER TABLE "detalle_suministro" ALTER COLUMN "costo" SET NOT NULL,
ALTER COLUMN "cantidad" SET NOT NULL;

-- AlterTable
ALTER TABLE "egresos" ALTER COLUMN "monto" SET NOT NULL;

-- AlterTable
ALTER TABLE "empleados" ALTER COLUMN "nombre" SET NOT NULL,
ALTER COLUMN "telefono" SET NOT NULL,
ALTER COLUMN "telefono" SET DATA TYPE TEXT,
ALTER COLUMN "cedula" SET NOT NULL;

-- AlterTable
ALTER TABLE "equipo" ALTER COLUMN "capacidad" SET NOT NULL,
ALTER COLUMN "marca" SET NOT NULL;

-- AlterTable
ALTER TABLE "gastos_varios" ALTER COLUMN "descripcion" SET NOT NULL;

-- AlterTable
ALTER TABLE "pago_empleado" ALTER COLUMN "concepto" SET NOT NULL;

-- AlterTable
ALTER TABLE "pago_impuesto" ALTER COLUMN "nombre_entidad" SET NOT NULL;

-- AlterTable
ALTER TABLE "proveedores" ALTER COLUMN "nombre" SET NOT NULL,
ALTER COLUMN "telefono" SET NOT NULL,
ALTER COLUMN "telefono" SET DATA TYPE TEXT,
ALTER COLUMN "direccion" SET NOT NULL;

-- AlterTable
ALTER TABLE "recursos" ALTER COLUMN "costo" SET NOT NULL;

-- AlterTable
ALTER TABLE "tipo_equipo" ALTER COLUMN "tipo" SET NOT NULL,
ALTER COLUMN "descripcion" SET NOT NULL;
