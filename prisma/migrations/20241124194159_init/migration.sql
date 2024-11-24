-- CreateTable
CREATE TABLE "inventario" (
    "inventarioid" INTEGER NOT NULL,
    "productoid" VARCHAR(50),
    "stock" VARCHAR(50),

    CONSTRAINT "inventario_pkey" PRIMARY KEY ("inventarioid")
);

-- CreateTable
CREATE TABLE "recursos" (
    "recursoid" VARCHAR(50) NOT NULL,
    "productoid" VARCHAR(50),
    "detalleservicioid" VARCHAR(50),
    "costo" DECIMAL(10,2),
    "cantidad_producto" INTEGER,
    "empleadoid" VARCHAR(50),

    CONSTRAINT "recursos_pkey" PRIMARY KEY ("recursoid")
);

-- CreateTable
CREATE TABLE "suministro" (
    "suministroid" VARCHAR(50) NOT NULL,
    "proveedorid" VARCHAR(50),
    "egresoid" VARCHAR(50),

    CONSTRAINT "suministro_pkey" PRIMARY KEY ("suministroid")
);

-- CreateTable
CREATE TABLE "cargo_empleado" (
    "cargoid" VARCHAR(50) NOT NULL,
    "nombre" VARCHAR(255),

    CONSTRAINT "cargo_empleado_pkey" PRIMARY KEY ("cargoid")
);

-- CreateTable
CREATE TABLE "categoria_producto" (
    "categoriaid" VARCHAR(50) NOT NULL,
    "descripcion" VARCHAR(255),

    CONSTRAINT "categoria_producto_pkey" PRIMARY KEY ("categoriaid")
);

-- CreateTable
CREATE TABLE "clientes" (
    "clienteid" VARCHAR(50) NOT NULL,
    "tipoclienteid" VARCHAR(50),
    "nombre" VARCHAR(255),
    "apellido" VARCHAR(255),
    "telefono" INTEGER,
    "entidad" VARCHAR(255),
    "ruc" VARCHAR(50),

    CONSTRAINT "clientes_pkey" PRIMARY KEY ("clienteid")
);

-- CreateTable
CREATE TABLE "detalle_servicio" (
    "detalleservicioid" VARCHAR(50) NOT NULL,
    "tiposervicioid" VARCHAR(50),
    "equipoid" VARCHAR(50),
    "servicioid" VARCHAR(50),
    "descripcion" TEXT,
    "costo" DECIMAL(10,2),
    "fecha" DATE,
    "direccion" VARCHAR(255),

    CONSTRAINT "detalle_servicio_pkey" PRIMARY KEY ("detalleservicioid")
);

-- CreateTable
CREATE TABLE "detalle_suministro" (
    "detallesuministroid" VARCHAR(50) NOT NULL,
    "suministroid" VARCHAR(50),
    "productoid" VARCHAR(50),
    "costo" DECIMAL(10,2),
    "cantidad" INTEGER,

    CONSTRAINT "detalle_suministro_pkey" PRIMARY KEY ("detallesuministroid")
);

-- CreateTable
CREATE TABLE "egresos" (
    "egresoid" VARCHAR(50) NOT NULL,
    "monto" DECIMAL(10,2),
    "fecha" DATE,

    CONSTRAINT "egresos_pkey" PRIMARY KEY ("egresoid")
);

-- CreateTable
CREATE TABLE "empleados" (
    "empleadoid" VARCHAR(50) NOT NULL,
    "cargoid" VARCHAR(50),
    "nombre" VARCHAR(255),
    "apellido" VARCHAR(255),
    "telefono" INTEGER,
    "cedula" VARCHAR(50),

    CONSTRAINT "empleados_pkey" PRIMARY KEY ("empleadoid")
);

-- CreateTable
CREATE TABLE "equipo" (
    "equipoid" VARCHAR(50) NOT NULL,
    "tipoequipoid" VARCHAR(50),
    "capacidad" INTEGER,
    "marca" VARCHAR(50),
    "numero_serie" VARCHAR(50),

    CONSTRAINT "equipo_pkey" PRIMARY KEY ("equipoid")
);

-- CreateTable
CREATE TABLE "gastos_varios" (
    "gastoid" VARCHAR(50) NOT NULL,
    "egresoid" VARCHAR(50),
    "descripcion" VARCHAR(255),

    CONSTRAINT "gastos_varios_pkey" PRIMARY KEY ("gastoid")
);

-- CreateTable
CREATE TABLE "pago_empleado" (
    "salarioid" VARCHAR(50) NOT NULL,
    "empleadoid" VARCHAR(50),
    "egresoid" VARCHAR(50),
    "concepto" VARCHAR(255),

    CONSTRAINT "pago_empleado_pkey" PRIMARY KEY ("salarioid")
);

-- CreateTable
CREATE TABLE "pago_impuesto" (
    "impuestoid" VARCHAR(50) NOT NULL,
    "egresoid" VARCHAR(50),
    "nombre_entidad" VARCHAR(255),

    CONSTRAINT "pago_impuesto_pkey" PRIMARY KEY ("impuestoid")
);

-- CreateTable
CREATE TABLE "productos" (
    "productoid" VARCHAR(50) NOT NULL,
    "categoriaid" VARCHAR(50),
    "nombre" VARCHAR(255),
    "url" TEXT,

    CONSTRAINT "productos_pkey" PRIMARY KEY ("productoid")
);

-- CreateTable
CREATE TABLE "proveedores" (
    "proveedorid" VARCHAR(50) NOT NULL,
    "nombre" VARCHAR(255),
    "apellido" VARCHAR(255),
    "telefono" INTEGER,
    "direccion" VARCHAR(255),
    "ruc" VARCHAR(50),

    CONSTRAINT "proveedores_pkey" PRIMARY KEY ("proveedorid")
);

-- CreateTable
CREATE TABLE "servicios" (
    "servicioid" VARCHAR(50) NOT NULL,
    "clienteid" VARCHAR(50),

    CONSTRAINT "servicios_pkey" PRIMARY KEY ("servicioid")
);

-- CreateTable
CREATE TABLE "tipo_cliente" (
    "tipoclienteid" VARCHAR(50) NOT NULL,
    "tipo_cliente" VARCHAR(50),

    CONSTRAINT "tipo_cliente_pkey" PRIMARY KEY ("tipoclienteid")
);

-- CreateTable
CREATE TABLE "tipo_equipo" (
    "tipoequipoid" VARCHAR(50) NOT NULL,
    "tipo" VARCHAR(50),
    "descripcion" VARCHAR(255),

    CONSTRAINT "tipo_equipo_pkey" PRIMARY KEY ("tipoequipoid")
);

-- CreateTable
CREATE TABLE "tipo_servicio" (
    "tiposervicioid" VARCHAR(50) NOT NULL,
    "tipo" VARCHAR(50),
    "descripcion" VARCHAR(255),

    CONSTRAINT "tipo_servicio_pkey" PRIMARY KEY ("tiposervicioid")
);

-- CreateTable
CREATE TABLE "personal" (
    "pid" INTEGER NOT NULL,
    "detalleservicioid" VARCHAR(50),
    "empleadoid" VARCHAR(50),

    CONSTRAINT "personal_pkey" PRIMARY KEY ("pid")
);

-- CreateIndex
CREATE INDEX "inventario_productoid_idx" ON "inventario"("productoid");

-- CreateIndex
CREATE INDEX "recursos_detalleservicioid_idx" ON "recursos"("detalleservicioid");

-- CreateIndex
CREATE INDEX "recursos_empleadoid_idx" ON "recursos"("empleadoid");

-- CreateIndex
CREATE INDEX "recursos_productoid_idx" ON "recursos"("productoid");

-- CreateIndex
CREATE INDEX "suministro_egresoid_idx" ON "suministro"("egresoid");

-- CreateIndex
CREATE INDEX "proveedorid" ON "suministro"("proveedorid");

-- CreateIndex
CREATE UNIQUE INDEX "unique_ruc_clientes" ON "clientes"("ruc");

-- CreateIndex
CREATE INDEX "tipoclienteid" ON "clientes"("tipoclienteid");

-- CreateIndex
CREATE INDEX "equipoid" ON "detalle_servicio"("equipoid");

-- CreateIndex
CREATE INDEX "servicioid" ON "detalle_servicio"("servicioid");

-- CreateIndex
CREATE INDEX "tiposervicioid" ON "detalle_servicio"("tiposervicioid");

-- CreateIndex
CREATE INDEX "productoid" ON "detalle_suministro"("productoid");

-- CreateIndex
CREATE INDEX "suministroid" ON "detalle_suministro"("suministroid");

-- CreateIndex
CREATE UNIQUE INDEX "cedula" ON "empleados"("cedula");

-- CreateIndex
CREATE INDEX "cargoid" ON "empleados"("cargoid");

-- CreateIndex
CREATE INDEX "tipoequipoid" ON "equipo"("tipoequipoid");

-- CreateIndex
CREATE INDEX "pago_impuesto_egresoid_idx" ON "gastos_varios"("egresoid");

-- CreateIndex
CREATE INDEX "pagos_empleado_egresoid_idx" ON "pago_empleado"("egresoid");

-- CreateIndex
CREATE INDEX "pagos_empleado_empleadoid_idx" ON "pago_empleado"("empleadoid");

-- CreateIndex
CREATE INDEX "egresoid" ON "pago_impuesto"("egresoid");

-- CreateIndex
CREATE INDEX "categoriaid" ON "productos"("categoriaid");

-- CreateIndex
CREATE UNIQUE INDEX "ruc" ON "proveedores"("ruc");

-- CreateIndex
CREATE INDEX "clienteid" ON "servicios"("clienteid");

-- CreateIndex
CREATE INDEX "detalleservicioid" ON "personal"("detalleservicioid");

-- CreateIndex
CREATE INDEX "empleadoid" ON "personal"("empleadoid");

-- AddForeignKey
ALTER TABLE "inventario" ADD CONSTRAINT "inventario_ibfk_1" FOREIGN KEY ("productoid") REFERENCES "productos"("productoid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "recursos" ADD CONSTRAINT "recursos_ibfk_1" FOREIGN KEY ("productoid") REFERENCES "productos"("productoid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "recursos" ADD CONSTRAINT "recursos_ibfk_2" FOREIGN KEY ("detalleservicioid") REFERENCES "detalle_servicio"("detalleservicioid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "recursos" ADD CONSTRAINT "recursos_ibfk_3" FOREIGN KEY ("empleadoid") REFERENCES "empleados"("empleadoid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "suministro" ADD CONSTRAINT "suministro_ibfk_1" FOREIGN KEY ("proveedorid") REFERENCES "proveedores"("proveedorid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "suministro" ADD CONSTRAINT "suministro_ibfk_2" FOREIGN KEY ("egresoid") REFERENCES "egresos"("egresoid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "clientes" ADD CONSTRAINT "clientes_ibfk_1" FOREIGN KEY ("tipoclienteid") REFERENCES "tipo_cliente"("tipoclienteid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "detalle_servicio" ADD CONSTRAINT "detalle_servicio_ibfk_1" FOREIGN KEY ("tiposervicioid") REFERENCES "tipo_servicio"("tiposervicioid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "detalle_servicio" ADD CONSTRAINT "detalle_servicio_ibfk_2" FOREIGN KEY ("equipoid") REFERENCES "equipo"("equipoid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "detalle_servicio" ADD CONSTRAINT "detalle_servicio_ibfk_3" FOREIGN KEY ("servicioid") REFERENCES "servicios"("servicioid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "detalle_suministro" ADD CONSTRAINT "detalle_suministro_ibfk_1" FOREIGN KEY ("suministroid") REFERENCES "suministro"("suministroid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "detalle_suministro" ADD CONSTRAINT "detalle_suministro_ibfk_2" FOREIGN KEY ("productoid") REFERENCES "productos"("productoid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "empleados" ADD CONSTRAINT "empleados_ibfk_1" FOREIGN KEY ("cargoid") REFERENCES "cargo_empleado"("cargoid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "equipo" ADD CONSTRAINT "equipo_ibfk_1" FOREIGN KEY ("tipoequipoid") REFERENCES "tipo_equipo"("tipoequipoid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "gastos_varios" ADD CONSTRAINT "gastos_varios_ibfk_1" FOREIGN KEY ("egresoid") REFERENCES "egresos"("egresoid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "pago_empleado" ADD CONSTRAINT "pago_empleado_ibfk_1" FOREIGN KEY ("empleadoid") REFERENCES "empleados"("empleadoid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "pago_empleado" ADD CONSTRAINT "pago_empleado_ibfk_2" FOREIGN KEY ("egresoid") REFERENCES "egresos"("egresoid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "pago_impuesto" ADD CONSTRAINT "pago_impuesto_ibfk_1" FOREIGN KEY ("egresoid") REFERENCES "egresos"("egresoid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "productos" ADD CONSTRAINT "productos_ibfk_1" FOREIGN KEY ("categoriaid") REFERENCES "categoria_producto"("categoriaid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "servicios" ADD CONSTRAINT "servicios_ibfk_1" FOREIGN KEY ("clienteid") REFERENCES "clientes"("clienteid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "personal" ADD CONSTRAINT "personal_ibfk_1" FOREIGN KEY ("detalleservicioid") REFERENCES "detalle_servicio"("detalleservicioid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "personal" ADD CONSTRAINT "personal_ibfk_2" FOREIGN KEY ("empleadoid") REFERENCES "empleados"("empleadoid") ON DELETE NO ACTION ON UPDATE NO ACTION;
