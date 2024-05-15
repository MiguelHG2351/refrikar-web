-- CreateTable
CREATE TABLE `inventario` (
    `inventarioid` INTEGER NOT NULL,
    `productoid` VARCHAR(50) NULL,
    `stock` VARCHAR(50) NULL,

    INDEX `productoid`(`productoid`),
    PRIMARY KEY (`inventarioid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `recursos` (
    `recursoid` VARCHAR(50) NOT NULL,
    `productoid` VARCHAR(50) NULL,
    `detalleservicioid` VARCHAR(50) NULL,
    `costo` DECIMAL(10, 2) NULL,
    `cantidad_producto` INTEGER NULL,
    `empleadoid` VARCHAR(50) NULL,

    INDEX `detalleservicioid`(`detalleservicioid`),
    INDEX `empleadoid`(`empleadoid`),
    INDEX `productoid`(`productoid`),
    PRIMARY KEY (`recursoid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `suministro` (
    `suministroid` VARCHAR(50) NOT NULL,
    `proveedorid` VARCHAR(50) NULL,
    `egresoid` VARCHAR(50) NULL,

    INDEX `egresoid`(`egresoid`),
    INDEX `proveedorid`(`proveedorid`),
    PRIMARY KEY (`suministroid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cargo_empleado` (
    `cargoid` VARCHAR(50) NOT NULL,
    `nombre` VARCHAR(255) NULL,

    PRIMARY KEY (`cargoid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `categoria_producto` (
    `categoriaid` VARCHAR(50) NOT NULL,
    `descripcion` VARCHAR(255) NULL,

    PRIMARY KEY (`categoriaid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `clientes` (
    `clienteid` VARCHAR(50) NOT NULL,
    `tipoclienteid` VARCHAR(50) NULL,
    `nombre` VARCHAR(255) NULL,
    `apellido` VARCHAR(255) NULL,
    `telefono` INTEGER NULL,
    `entidad` VARCHAR(255) NULL,
    `ruc` VARCHAR(50) NULL,

    UNIQUE INDEX `ruc`(`ruc`),
    INDEX `tipoclienteid`(`tipoclienteid`),
    PRIMARY KEY (`clienteid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `detalle_servicio` (
    `detalleservicioid` VARCHAR(50) NOT NULL,
    `tiposervicioid` VARCHAR(50) NULL,
    `equipoid` VARCHAR(50) NULL,
    `servicioid` VARCHAR(50) NULL,
    `descripcion` TEXT NULL,
    `costo` DECIMAL(10, 2) NULL,
    `fecha` DATE NULL,
    `direccion` VARCHAR(255) NULL,

    INDEX `equipoid`(`equipoid`),
    INDEX `servicioid`(`servicioid`),
    INDEX `tiposervicioid`(`tiposervicioid`),
    PRIMARY KEY (`detalleservicioid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `detalle_suministro` (
    `detallesuministroid` VARCHAR(50) NOT NULL,
    `suministroid` VARCHAR(50) NULL,
    `productoid` VARCHAR(50) NULL,
    `costo` DECIMAL(10, 2) NULL,
    `cantidad` INTEGER NULL,

    INDEX `productoid`(`productoid`),
    INDEX `suministroid`(`suministroid`),
    PRIMARY KEY (`detallesuministroid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `egresos` (
    `egresoid` VARCHAR(50) NOT NULL,
    `monto` DECIMAL(10, 2) NULL,
    `fecha` DATE NULL,

    PRIMARY KEY (`egresoid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `empleados` (
    `empleadoid` VARCHAR(50) NOT NULL,
    `cargoid` VARCHAR(50) NULL,
    `nombre` VARCHAR(255) NULL,
    `apellido` VARCHAR(255) NULL,
    `telefono` INTEGER NULL,
    `cedula` VARCHAR(50) NULL,

    UNIQUE INDEX `cedula`(`cedula`),
    INDEX `cargoid`(`cargoid`),
    PRIMARY KEY (`empleadoid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `equipo` (
    `equipoid` VARCHAR(50) NOT NULL,
    `tipoequipoid` VARCHAR(50) NULL,
    `capacidad` INTEGER NULL,
    `marca` VARCHAR(50) NULL,
    `numero_serie` VARCHAR(50) NULL,

    INDEX `tipoequipoid`(`tipoequipoid`),
    PRIMARY KEY (`equipoid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `gastos_varios` (
    `gastoid` VARCHAR(50) NOT NULL,
    `egresoid` VARCHAR(50) NULL,
    `descripcion` VARCHAR(255) NULL,

    INDEX `egresoid`(`egresoid`),
    PRIMARY KEY (`gastoid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pago_empleado` (
    `salarioid` VARCHAR(50) NOT NULL,
    `empleadoid` VARCHAR(50) NULL,
    `egresoid` VARCHAR(50) NULL,
    `concepto` VARCHAR(255) NULL,

    INDEX `egresoid`(`egresoid`),
    INDEX `empleadoid`(`empleadoid`),
    PRIMARY KEY (`salarioid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pago_impuesto` (
    `impuestoid` VARCHAR(50) NOT NULL,
    `egresoid` VARCHAR(50) NULL,
    `nombre_entidad` VARCHAR(255) NULL,

    INDEX `egresoid`(`egresoid`),
    PRIMARY KEY (`impuestoid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `productos` (
    `productoid` VARCHAR(50) NOT NULL,
    `categoriaid` VARCHAR(50) NULL,
    `nombre` VARCHAR(255) NULL,

    INDEX `categoriaid`(`categoriaid`),
    PRIMARY KEY (`productoid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `proveedores` (
    `proveedorid` VARCHAR(50) NOT NULL,
    `nombre` VARCHAR(255) NULL,
    `apellido` VARCHAR(255) NULL,
    `telefono` INTEGER NULL,
    `direccion` VARCHAR(255) NULL,
    `ruc` VARCHAR(50) NULL,

    UNIQUE INDEX `ruc`(`ruc`),
    PRIMARY KEY (`proveedorid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `servicios` (
    `servicioid` VARCHAR(50) NOT NULL,
    `clienteid` VARCHAR(50) NULL,

    INDEX `clienteid`(`clienteid`),
    PRIMARY KEY (`servicioid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tipo_cliente` (
    `tipoclienteid` VARCHAR(50) NOT NULL,
    `tipo_cliente` VARCHAR(50) NULL,

    PRIMARY KEY (`tipoclienteid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tipo_equipo` (
    `tipoequipoid` VARCHAR(50) NOT NULL,
    `tipo` VARCHAR(50) NULL,
    `descripcion` VARCHAR(255) NULL,

    PRIMARY KEY (`tipoequipoid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tipo_servicio` (
    `tiposervicioid` VARCHAR(50) NOT NULL,
    `tipo` VARCHAR(50) NULL,
    `descripcion` VARCHAR(255) NULL,

    PRIMARY KEY (`tiposervicioid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `personal` (
    `pid` INTEGER NOT NULL,
    `detalleservicioid` VARCHAR(50) NULL,
    `empleadoid` VARCHAR(50) NULL,

    INDEX `detalleservicioid`(`detalleservicioid`),
    INDEX `empleadoid`(`empleadoid`),
    PRIMARY KEY (`pid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `inventario` ADD CONSTRAINT `inventario_ibfk_1` FOREIGN KEY (`productoid`) REFERENCES `productos`(`productoid`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `recursos` ADD CONSTRAINT `recursos_ibfk_1` FOREIGN KEY (`productoid`) REFERENCES `productos`(`productoid`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `recursos` ADD CONSTRAINT `recursos_ibfk_2` FOREIGN KEY (`detalleservicioid`) REFERENCES `detalle_servicio`(`detalleservicioid`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `recursos` ADD CONSTRAINT `recursos_ibfk_3` FOREIGN KEY (`empleadoid`) REFERENCES `empleados`(`empleadoid`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `suministro` ADD CONSTRAINT `suministro_ibfk_1` FOREIGN KEY (`proveedorid`) REFERENCES `proveedores`(`proveedorid`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `suministro` ADD CONSTRAINT `suministro_ibfk_2` FOREIGN KEY (`egresoid`) REFERENCES `egresos`(`egresoid`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `clientes` ADD CONSTRAINT `clientes_ibfk_1` FOREIGN KEY (`tipoclienteid`) REFERENCES `tipo_cliente`(`tipoclienteid`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `detalle_servicio` ADD CONSTRAINT `detalle_servicio_ibfk_1` FOREIGN KEY (`tiposervicioid`) REFERENCES `tipo_servicio`(`tiposervicioid`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `detalle_servicio` ADD CONSTRAINT `detalle_servicio_ibfk_2` FOREIGN KEY (`equipoid`) REFERENCES `equipo`(`equipoid`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `detalle_servicio` ADD CONSTRAINT `detalle_servicio_ibfk_3` FOREIGN KEY (`servicioid`) REFERENCES `servicios`(`servicioid`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `detalle_suministro` ADD CONSTRAINT `detalle_suministro_ibfk_1` FOREIGN KEY (`suministroid`) REFERENCES `suministro`(`suministroid`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `detalle_suministro` ADD CONSTRAINT `detalle_suministro_ibfk_2` FOREIGN KEY (`productoid`) REFERENCES `productos`(`productoid`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `empleados` ADD CONSTRAINT `empleados_ibfk_1` FOREIGN KEY (`cargoid`) REFERENCES `cargo_empleado`(`cargoid`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `equipo` ADD CONSTRAINT `equipo_ibfk_1` FOREIGN KEY (`tipoequipoid`) REFERENCES `tipo_equipo`(`tipoequipoid`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `gastos_varios` ADD CONSTRAINT `gastos_varios_ibfk_1` FOREIGN KEY (`egresoid`) REFERENCES `egresos`(`egresoid`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `pago_empleado` ADD CONSTRAINT `pago_empleado_ibfk_1` FOREIGN KEY (`empleadoid`) REFERENCES `empleados`(`empleadoid`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `pago_empleado` ADD CONSTRAINT `pago_empleado_ibfk_2` FOREIGN KEY (`egresoid`) REFERENCES `egresos`(`egresoid`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `pago_impuesto` ADD CONSTRAINT `pago_impuesto_ibfk_1` FOREIGN KEY (`egresoid`) REFERENCES `egresos`(`egresoid`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `productos` ADD CONSTRAINT `productos_ibfk_1` FOREIGN KEY (`categoriaid`) REFERENCES `categoria_producto`(`categoriaid`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `servicios` ADD CONSTRAINT `servicios_ibfk_1` FOREIGN KEY (`clienteid`) REFERENCES `clientes`(`clienteid`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `personal` ADD CONSTRAINT `personal_ibfk_1` FOREIGN KEY (`detalleservicioid`) REFERENCES `detalle_servicio`(`detalleservicioid`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `personal` ADD CONSTRAINT `personal_ibfk_2` FOREIGN KEY (`empleadoid`) REFERENCES `empleados`(`empleadoid`) ON DELETE NO ACTION ON UPDATE NO ACTION;
