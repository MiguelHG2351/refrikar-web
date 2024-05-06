-- CreateTable
CREATE TABLE `inventario` (
    `InventarioID` VARCHAR(50) NOT NULL,
    `ProductoID` VARCHAR(50) NULL,
    `disponibilidad` VARCHAR(50) NULL,

    INDEX `ProductoID`(`ProductoID`),
    PRIMARY KEY (`InventarioID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `recursos` (
    `RecursoID` VARCHAR(50) NOT NULL,
    `ProductoID` VARCHAR(50) NULL,
    `EmpleadoID` VARCHAR(50) NULL,
    `costo` INTEGER NULL,

    INDEX `EmpleadoID`(`EmpleadoID`),
    INDEX `ProductoID`(`ProductoID`),
    PRIMARY KEY (`RecursoID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `suministro` (
    `suministroID` VARCHAR(50) NOT NULL,
    `ProveedorID` VARCHAR(50) NULL,
    `EgresoID` VARCHAR(50) NULL,
    `fecha` DATE NULL,

    INDEX `EgresoID`(`EgresoID`),
    INDEX `ProveedorID`(`ProveedorID`),
    PRIMARY KEY (`suministroID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cargo_empleado` (
    `CargoID` VARCHAR(50) NOT NULL,
    `nombre` VARCHAR(255) NULL,

    PRIMARY KEY (`CargoID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `categoria_producto` (
    `CategoriaID` VARCHAR(50) NOT NULL,
    `descripcion` VARCHAR(255) NULL,

    PRIMARY KEY (`CategoriaID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `clientes` (
    `ClienteID` VARCHAR(50) NOT NULL,
    `TipoClienteID` VARCHAR(50) NULL,
    `nombre` VARCHAR(255) NULL,
    `apellido` VARCHAR(255) NULL,
    `telefono` INTEGER NULL,
    `entidad` VARCHAR(255) NULL,
    `ruc` VARCHAR(50) NULL,

    INDEX `TipoClienteID`(`TipoClienteID`),
    PRIMARY KEY (`ClienteID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `detalle_servicio` (
    `DetalleServicioID` VARCHAR(50) NOT NULL,
    `TipoServicioID` VARCHAR(50) NULL,
    `equipoID` VARCHAR(50) NULL,
    `servicioID` VARCHAR(50) NULL,
    `Costo` INTEGER NULL,
    `fecha` DATE NULL,
    `notas` VARCHAR(255) NULL,

    INDEX `TipoServicioID`(`TipoServicioID`),
    INDEX `equipoID`(`equipoID`),
    INDEX `servicioID`(`servicioID`),
    PRIMARY KEY (`DetalleServicioID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `detalle_suministro` (
    `DetalleSuministroID` VARCHAR(50) NOT NULL,
    `SuministroID` VARCHAR(50) NULL,
    `ProductoID` VARCHAR(50) NULL,
    `costo` INTEGER NULL,

    INDEX `ProductoID`(`ProductoID`),
    INDEX `SuministroID`(`SuministroID`),
    PRIMARY KEY (`DetalleSuministroID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `direcciones` (
    `DireccionID` VARCHAR(50) NOT NULL,
    `descripcion` VARCHAR(255) NULL,

    PRIMARY KEY (`DireccionID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `egresos` (
    `EgresoID` VARCHAR(50) NOT NULL,
    `cantidad` INTEGER NULL,
    `fecha` DATE NULL,

    PRIMARY KEY (`EgresoID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `empleados` (
    `EmpleadoID` VARCHAR(50) NOT NULL,
    `CargoID` VARCHAR(50) NULL,
    `nombre` VARCHAR(255) NULL,
    `apellido` VARCHAR(255) NULL,
    `telefono` INTEGER NULL,

    INDEX `CargoID`(`CargoID`),
    PRIMARY KEY (`EmpleadoID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `equipo` (
    `EquipoID` VARCHAR(50) NOT NULL,
    `TipoEquipoID` VARCHAR(50) NULL,
    `DireccionID` VARCHAR(50) NULL,
    `ClienteID` VARCHAR(50) NULL,
    `capacidad` INTEGER NULL,
    `marca` VARCHAR(50) NULL,
    `numeroSerie` VARCHAR(50) NULL,

    INDEX `ClienteID`(`ClienteID`),
    INDEX `DireccionID`(`DireccionID`),
    INDEX `TipoEquipoID`(`TipoEquipoID`),
    PRIMARY KEY (`EquipoID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `gastos_varios` (
    `GastoID` VARCHAR(50) NOT NULL,
    `EgresoID` VARCHAR(50) NULL,
    `descripcion` VARCHAR(255) NULL,

    INDEX `EgresoID`(`EgresoID`),
    PRIMARY KEY (`GastoID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pago_empleado` (
    `SalarioID` VARCHAR(50) NOT NULL,
    `EmpleadoID` VARCHAR(50) NULL,
    `EgresoID` VARCHAR(50) NULL,
    `concepto` VARCHAR(255) NULL,

    INDEX `EgresoID`(`EgresoID`),
    INDEX `EmpleadoID`(`EmpleadoID`),
    PRIMARY KEY (`SalarioID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pago_impuesto` (
    `ImpuestoID` VARCHAR(50) NOT NULL,
    `EgresoID` VARCHAR(50) NULL,
    `nombreEntidad` VARCHAR(255) NULL,

    INDEX `EgresoID`(`EgresoID`),
    PRIMARY KEY (`ImpuestoID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `productos` (
    `ProductoID` VARCHAR(50) NOT NULL,
    `CategoriaID` VARCHAR(50) NULL,
    `nombre` VARCHAR(255) NULL,

    INDEX `CategoriaID`(`CategoriaID`),
    PRIMARY KEY (`ProductoID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `proveedores` (
    `ProveedorID` VARCHAR(50) NOT NULL,
    `nombre` VARCHAR(255) NULL,
    `apellido` VARCHAR(255) NULL,
    `telefono` INTEGER NULL,
    `direccion` VARCHAR(255) NULL,
    `ruc` VARCHAR(50) NULL,

    PRIMARY KEY (`ProveedorID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `servicios` (
    `ServicioID` VARCHAR(50) NOT NULL,
    `RecursosID` VARCHAR(50) NULL,
    `ClienteID` VARCHAR(50) NULL,

    INDEX `ClienteID`(`ClienteID`),
    INDEX `RecursosID`(`RecursosID`),
    PRIMARY KEY (`ServicioID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tipo_cliente` (
    `TipoClienteID` VARCHAR(50) NOT NULL,
    `tipoCliente` VARCHAR(50) NULL,

    PRIMARY KEY (`TipoClienteID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tipo_equipo` (
    `TipoEquipoID` VARCHAR(50) NOT NULL,
    `tipo` VARCHAR(50) NULL,
    `descripcion` VARCHAR(255) NULL,

    PRIMARY KEY (`TipoEquipoID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tipo_servicio` (
    `TipoServicioID` VARCHAR(50) NOT NULL,
    `Tipo` VARCHAR(50) NULL,
    `descripcion` VARCHAR(255) NULL,

    PRIMARY KEY (`TipoServicioID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `inventario` ADD CONSTRAINT `inventario_ibfk_1` FOREIGN KEY (`ProductoID`) REFERENCES `productos`(`ProductoID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `recursos` ADD CONSTRAINT `recursos_ibfk_1` FOREIGN KEY (`ProductoID`) REFERENCES `productos`(`ProductoID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `recursos` ADD CONSTRAINT `recursos_ibfk_2` FOREIGN KEY (`EmpleadoID`) REFERENCES `empleados`(`EmpleadoID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `suministro` ADD CONSTRAINT `suministro_ibfk_1` FOREIGN KEY (`ProveedorID`) REFERENCES `proveedores`(`ProveedorID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `suministro` ADD CONSTRAINT `suministro_ibfk_2` FOREIGN KEY (`EgresoID`) REFERENCES `egresos`(`EgresoID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `clientes` ADD CONSTRAINT `clientes_ibfk_1` FOREIGN KEY (`TipoClienteID`) REFERENCES `tipo_cliente`(`TipoClienteID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `detalle_servicio` ADD CONSTRAINT `detalle_servicio_ibfk_1` FOREIGN KEY (`TipoServicioID`) REFERENCES `tipo_servicio`(`TipoServicioID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `detalle_servicio` ADD CONSTRAINT `detalle_servicio_ibfk_2` FOREIGN KEY (`equipoID`) REFERENCES `equipo`(`EquipoID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `detalle_servicio` ADD CONSTRAINT `detalle_servicio_ibfk_3` FOREIGN KEY (`servicioID`) REFERENCES `servicios`(`ServicioID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `detalle_suministro` ADD CONSTRAINT `detalle_suministro_ibfk_1` FOREIGN KEY (`SuministroID`) REFERENCES `suministro`(`suministroID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `detalle_suministro` ADD CONSTRAINT `detalle_suministro_ibfk_2` FOREIGN KEY (`ProductoID`) REFERENCES `productos`(`ProductoID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `empleados` ADD CONSTRAINT `empleados_ibfk_1` FOREIGN KEY (`CargoID`) REFERENCES `cargo_empleado`(`CargoID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `equipo` ADD CONSTRAINT `equipo_ibfk_1` FOREIGN KEY (`TipoEquipoID`) REFERENCES `tipo_equipo`(`TipoEquipoID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `equipo` ADD CONSTRAINT `equipo_ibfk_2` FOREIGN KEY (`DireccionID`) REFERENCES `direcciones`(`DireccionID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `equipo` ADD CONSTRAINT `equipo_ibfk_3` FOREIGN KEY (`ClienteID`) REFERENCES `clientes`(`ClienteID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `gastos_varios` ADD CONSTRAINT `gastos_varios_ibfk_1` FOREIGN KEY (`EgresoID`) REFERENCES `egresos`(`EgresoID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `pago_empleado` ADD CONSTRAINT `pago_empleado_ibfk_1` FOREIGN KEY (`EmpleadoID`) REFERENCES `empleados`(`EmpleadoID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `pago_empleado` ADD CONSTRAINT `pago_empleado_ibfk_2` FOREIGN KEY (`EgresoID`) REFERENCES `egresos`(`EgresoID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `pago_impuesto` ADD CONSTRAINT `pago_impuesto_ibfk_1` FOREIGN KEY (`EgresoID`) REFERENCES `egresos`(`EgresoID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `productos` ADD CONSTRAINT `productos_ibfk_1` FOREIGN KEY (`CategoriaID`) REFERENCES `categoria_producto`(`CategoriaID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `servicios` ADD CONSTRAINT `servicios_ibfk_1` FOREIGN KEY (`RecursosID`) REFERENCES `recursos`(`RecursoID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `servicios` ADD CONSTRAINT `servicios_ibfk_2` FOREIGN KEY (`ClienteID`) REFERENCES `clientes`(`ClienteID`) ON DELETE NO ACTION ON UPDATE NO ACTION;
