-- CreateTable
CREATE TABLE "inventario" (
    "inventarioid" INTEGER NOT NULL,
    "productoid" TEXT,
    "stock" TEXT,

    CONSTRAINT "inventario_pkey" PRIMARY KEY ("inventarioid")
);

-- CreateTable
CREATE TABLE "recursos" (
    "recursoid" TEXT NOT NULL,
    "productoid" TEXT,
    "detalleservicioid" TEXT,
    "costo" DECIMAL(65,30),
    "cantidad_producto" INTEGER,
    "empleadoid" TEXT,

    CONSTRAINT "recursos_pkey" PRIMARY KEY ("recursoid")
);

-- CreateTable
CREATE TABLE "suministro" (
    "suministroid" TEXT NOT NULL,
    "proveedorid" TEXT,
    "egresoid" TEXT,

    CONSTRAINT "suministro_pkey" PRIMARY KEY ("suministroid")
);

-- CreateTable
CREATE TABLE "cargo_empleado" (
    "cargoid" TEXT NOT NULL,
    "nombre" TEXT,

    CONSTRAINT "cargo_empleado_pkey" PRIMARY KEY ("cargoid")
);

-- CreateTable
CREATE TABLE "categoria_producto" (
    "categoriaid" TEXT NOT NULL,
    "descripcion" TEXT,

    CONSTRAINT "categoria_producto_pkey" PRIMARY KEY ("categoriaid")
);

-- CreateTable
CREATE TABLE "clientes" (
    "clienteid" TEXT NOT NULL,
    "tipoclienteid" TEXT,
    "nombre" TEXT,
    "apellido" TEXT,
    "telefono" INTEGER,
    "entidad" TEXT,
    "ruc" TEXT,

    CONSTRAINT "clientes_pkey" PRIMARY KEY ("clienteid")
);

-- CreateTable
CREATE TABLE "detalle_servicio" (
    "detalleservicioid" TEXT NOT NULL,
    "tiposervicioid" TEXT,
    "equipoid" TEXT,
    "servicioid" TEXT,
    "descripcion" TEXT,
    "costo" DECIMAL(65,30),
    "fecha" TIMESTAMP(3),
    "direccion" TEXT,

    CONSTRAINT "detalle_servicio_pkey" PRIMARY KEY ("detalleservicioid")
);

-- CreateTable
CREATE TABLE "detalle_suministro" (
    "detallesuministroid" TEXT NOT NULL,
    "suministroid" TEXT,
    "productoid" TEXT,
    "costo" DECIMAL(65,30),
    "cantidad" INTEGER,

    CONSTRAINT "detalle_suministro_pkey" PRIMARY KEY ("detallesuministroid")
);

-- CreateTable
CREATE TABLE "egresos" (
    "egresoid" TEXT NOT NULL,
    "monto" DECIMAL(65,30),
    "fecha" TIMESTAMP(3),

    CONSTRAINT "egresos_pkey" PRIMARY KEY ("egresoid")
);

-- CreateTable
CREATE TABLE "empleados" (
    "empleadoid" TEXT NOT NULL,
    "cargoid" TEXT,
    "nombre" TEXT,
    "apellido" TEXT,
    "telefono" INTEGER,
    "cedula" TEXT,

    CONSTRAINT "empleados_pkey" PRIMARY KEY ("empleadoid")
);

-- CreateTable
CREATE TABLE "equipo" (
    "equipoid" TEXT NOT NULL,
    "tipoequipoid" TEXT,
    "capacidad" INTEGER,
    "marca" TEXT,
    "numero_serie" TEXT,

    CONSTRAINT "equipo_pkey" PRIMARY KEY ("equipoid")
);

-- CreateTable
CREATE TABLE "gastos_varios" (
    "gastoid" TEXT NOT NULL,
    "egresoid" TEXT,
    "descripcion" TEXT,

    CONSTRAINT "gastos_varios_pkey" PRIMARY KEY ("gastoid")
);

-- CreateTable
CREATE TABLE "pago_empleado" (
    "salarioid" TEXT NOT NULL,
    "empleadoid" TEXT,
    "egresoid" TEXT,
    "concepto" TEXT,

    CONSTRAINT "pago_empleado_pkey" PRIMARY KEY ("salarioid")
);

-- CreateTable
CREATE TABLE "pago_impuesto" (
    "impuestoid" TEXT NOT NULL,
    "egresoid" TEXT,
    "nombre_entidad" TEXT,

    CONSTRAINT "pago_impuesto_pkey" PRIMARY KEY ("impuestoid")
);

-- CreateTable
CREATE TABLE "productos" (
    "productoid" TEXT NOT NULL,
    "categoriaid" TEXT,
    "nombre" TEXT,

    CONSTRAINT "productos_pkey" PRIMARY KEY ("productoid")
);

-- CreateTable
CREATE TABLE "proveedores" (
    "proveedorid" TEXT NOT NULL,
    "nombre" TEXT,
    "apellido" TEXT,
    "telefono" INTEGER,
    "direccion" TEXT,
    "ruc" TEXT,

    CONSTRAINT "proveedores_pkey" PRIMARY KEY ("proveedorid")
);

-- CreateTable
CREATE TABLE "servicios" (
    "servicioid" TEXT NOT NULL,
    "clienteid" TEXT,

    CONSTRAINT "servicios_pkey" PRIMARY KEY ("servicioid")
);

-- CreateTable
CREATE TABLE "tipo_cliente" (
    "tipoclienteid" TEXT NOT NULL,
    "tipo_cliente" TEXT,

    CONSTRAINT "tipo_cliente_pkey" PRIMARY KEY ("tipoclienteid")
);

-- CreateTable
CREATE TABLE "tipo_equipo" (
    "tipoequipoid" TEXT NOT NULL,
    "tipo" TEXT,
    "descripcion" TEXT,

    CONSTRAINT "tipo_equipo_pkey" PRIMARY KEY ("tipoequipoid")
);

-- CreateTable
CREATE TABLE "tipo_servicio" (
    "tiposervicioid" TEXT NOT NULL,
    "tipo" TEXT,
    "descripcion" TEXT,

    CONSTRAINT "tipo_servicio_pkey" PRIMARY KEY ("tiposervicioid")
);

-- CreateTable
CREATE TABLE "personal" (
    "pid" INTEGER NOT NULL,
    "detalleservicioid" TEXT,
    "empleadoid" TEXT,

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
CREATE UNIQUE INDEX "clientes_ruc_key" ON "clientes"("ruc");

-- CreateIndex
CREATE INDEX "clientes_tipoclienteid_idx" ON "clientes"("tipoclienteid");

-- CreateIndex
CREATE INDEX "detalle_servicio_equipoid_idx" ON "detalle_servicio"("equipoid");

-- CreateIndex
CREATE INDEX "detalle_servicio_servicioid_idx" ON "detalle_servicio"("servicioid");

-- CreateIndex
CREATE INDEX "detalle_servicio_tiposervicioid_idx" ON "detalle_servicio"("tiposervicioid");

-- CreateIndex
CREATE INDEX "detalle_suministro_productoid_idx" ON "detalle_suministro"("productoid");

-- CreateIndex
CREATE INDEX "detalle_suministro_suministroid_idx" ON "detalle_suministro"("suministroid");

-- CreateIndex
CREATE UNIQUE INDEX "cedula" ON "empleados"("cedula");

-- CreateIndex
CREATE INDEX "cargoid" ON "empleados"("cargoid");

-- CreateIndex
CREATE INDEX "equipo_tipoequipoid_idx" ON "equipo"("tipoequipoid");

-- CreateIndex
CREATE INDEX "gastos_varios_egresoid_idx" ON "gastos_varios"("egresoid");

-- CreateIndex
CREATE INDEX "pago_empleado_egresoid_idx" ON "pago_empleado"("egresoid");

-- CreateIndex
CREATE INDEX "pago_empleado_empleadoid_idx" ON "pago_empleado"("empleadoid");

-- CreateIndex
CREATE INDEX "pago_impuesto_egresoid_idx" ON "pago_impuesto"("egresoid");

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
ALTER TABLE "inventario" ADD CONSTRAINT "inventario_productoid_fkey" FOREIGN KEY ("productoid") REFERENCES "productos"("productoid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "recursos" ADD CONSTRAINT "recursos_productoid_fkey" FOREIGN KEY ("productoid") REFERENCES "productos"("productoid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "recursos" ADD CONSTRAINT "recursos_detalleservicioid_fkey" FOREIGN KEY ("detalleservicioid") REFERENCES "detalle_servicio"("detalleservicioid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "recursos" ADD CONSTRAINT "recursos_empleadoid_fkey" FOREIGN KEY ("empleadoid") REFERENCES "empleados"("empleadoid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "suministro" ADD CONSTRAINT "suministro_proveedorid_fkey" FOREIGN KEY ("proveedorid") REFERENCES "proveedores"("proveedorid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "suministro" ADD CONSTRAINT "suministro_egresoid_fkey" FOREIGN KEY ("egresoid") REFERENCES "egresos"("egresoid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "clientes" ADD CONSTRAINT "clientes_tipoclienteid_fkey" FOREIGN KEY ("tipoclienteid") REFERENCES "tipo_cliente"("tipoclienteid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "detalle_servicio" ADD CONSTRAINT "detalle_servicio_tiposervicioid_fkey" FOREIGN KEY ("tiposervicioid") REFERENCES "tipo_servicio"("tiposervicioid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "detalle_servicio" ADD CONSTRAINT "detalle_servicio_equipoid_fkey" FOREIGN KEY ("equipoid") REFERENCES "equipo"("equipoid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "detalle_servicio" ADD CONSTRAINT "detalle_servicio_servicioid_fkey" FOREIGN KEY ("servicioid") REFERENCES "servicios"("servicioid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "detalle_suministro" ADD CONSTRAINT "detalle_suministro_suministroid_fkey" FOREIGN KEY ("suministroid") REFERENCES "suministro"("suministroid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "detalle_suministro" ADD CONSTRAINT "detalle_suministro_productoid_fkey" FOREIGN KEY ("productoid") REFERENCES "productos"("productoid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "empleados" ADD CONSTRAINT "empleados_cargoid_fkey" FOREIGN KEY ("cargoid") REFERENCES "cargo_empleado"("cargoid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "equipo" ADD CONSTRAINT "equipo_tipoequipoid_fkey" FOREIGN KEY ("tipoequipoid") REFERENCES "tipo_equipo"("tipoequipoid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "gastos_varios" ADD CONSTRAINT "gastos_varios_egresoid_fkey" FOREIGN KEY ("egresoid") REFERENCES "egresos"("egresoid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "pago_empleado" ADD CONSTRAINT "pago_empleado_empleadoid_fkey" FOREIGN KEY ("empleadoid") REFERENCES "empleados"("empleadoid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "pago_empleado" ADD CONSTRAINT "pago_empleado_egresoid_fkey" FOREIGN KEY ("egresoid") REFERENCES "egresos"("egresoid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "pago_impuesto" ADD CONSTRAINT "pago_impuesto_egresoid_fkey" FOREIGN KEY ("egresoid") REFERENCES "egresos"("egresoid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "productos" ADD CONSTRAINT "productos_categoriaid_fkey" FOREIGN KEY ("categoriaid") REFERENCES "categoria_producto"("categoriaid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "servicios" ADD CONSTRAINT "servicios_clienteid_fkey" FOREIGN KEY ("clienteid") REFERENCES "clientes"("clienteid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "personal" ADD CONSTRAINT "personal_detalleservicioid_fkey" FOREIGN KEY ("detalleservicioid") REFERENCES "detalle_servicio"("detalleservicioid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "personal" ADD CONSTRAINT "personal_empleadoid_fkey" FOREIGN KEY ("empleadoid") REFERENCES "empleados"("empleadoid") ON DELETE NO ACTION ON UPDATE NO ACTION;
