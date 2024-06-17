insert into cargo_empleado (cargoid, nombre)
values  ('CE001', 'Gerente'),
        ('CE002', 'Tecnico'),
        ('CE003', 'Asistente');

insert into categoria_producto (categoriaid, descripcion)
values  ('CP01', 'Repuestos'),
        ('CP02', 'Materiales'),
        ('CP03', 'Herramientas'),
        ('CP04', 'Equipo');

insert into tipo_cliente (tipoclienteid, tipo_cliente)
values  ('TC01', 'Natural'),
        ('TC02', 'Juridico');


insert into clientes (clienteid, tipoclienteid, nombre, apellido, telefono, entidad, ruc)
values  ('C0001', 'TC01', 'Juan', 'Perez', 12345678, 'Empresa A', '00100000000001'),
        ('C0002', 'TC02', 'Maria', 'Gomez', 87654321, '', '00100100000001'),
        ('C0003', 'TC01', 'Carlos', 'Martinez', 23456789, 'Empresa B', '00100000000002'),
        ('C0004', 'TC02', 'Laura', 'Lopez', 98765432, null, '00100100000002'),
        ('C0005', 'TC01', 'Pedro', 'Sanchez', 34567890, 'Empresa Z', '00100000000003'),
        ('C0006', 'TC02', 'Ana', 'Rodriguez', 76543210, null, '00100100000003'),
        ('C0007', 'TC01', 'Santiago', 'Garcia', 45678901, 'Empresa D', '00100000000004'),
        ('C0008', 'TC02', 'Luisa', 'Hernandez', 65432109, null, '00100100000004'),
        ('C0009', 'TC01', 'Diego', 'Alvarez', 56789012, 'Empresa E', '00100000000005'),
        ('C0010', 'TC02', 'Carmen', 'Diaz', 54321098, null, '00100100000005'),
        ('C0011', 'TC01', 'Pablo', 'Gonzalez', 67890123, 'Empresa F', '00100000000006'),
        ('C0012', 'TC02', 'Julia', 'Martinez', 43210987, null, '00100100000006'),
        ('C0013', 'TC01', 'Alejandro', 'Perez', 78901234, 'Empresa G', '00100000000007'),
        ('C0014', 'TC02', 'Elena', 'Sanchez', 32109876, null, '00100100000007'),
        ('C0015', 'TC01', 'Laura', 'Gomez', 89012345, 'Empresa H', '00100000000008'),
        ('C0016', 'TC02', 'Jorge', 'Lopez', 21098765, null, '00100100000008'),
        ('C0017', 'TC01', 'Marina', 'Rodriguez', 90123456, 'Empresa I', '00100000000009'),
        ('C0018', 'TC02', 'Lucas', 'Hernandez', 10987654, null, '00100100000009'),
        ('C0019', 'TC01', 'Camila', 'Alvarez', 1234567, 'Empresa J', '00100000000010'),
        ('C0020', 'TC02', 'Gabriela', 'Diaz', 98765432, null, '00100100000010'),
        ('C0021', 'TC02', 'Miguel', 'Hernandez', null, 'Empresa A', '00100100022011'),
        ('C0022', 'TC01', 'Bryan', 'Gaitan', 78703875, 'body.cliente.entidad', '00100100642011'),
        ('C0023', 'TC01', 'Gabriel', 'Acevedo', 78703874, 'body.cliente.entidad', '00123100022011'),
        ('C0024', 'TC02', 'Russell', 'Perez', 78703875, 'body.cliente.entidad', '00100176422011');

insert into tipo_equipo (tipoequipoid, tipo, descripcion)
values  ('        (''TE007''', ' ''Central estandar''', ' '''');'),
        ('insert into refrikar.tipo_equipo (tipoequipoid', ' tipo', ' descripcion)'),
        ('TE001', 'Split inverter', ''),
        ('TE002', 'Split estandar', ''),
        ('TE003', 'casette', ''),
        ('TE004', 'Central inverter', ''),
        ('TE005', 'Ventana', ''),
        ('TE006', 'Portatil', ''),
        ('TE007', 'Central estandar', '');

insert into tipo_servicio (tiposervicioid, tipo, descripcion)
values  ('TS01', 'Mantenimiento Preventivo', 'Limpieza del equipo, revision y correccion de funcionalidad'),
        ('TS02', 'Mantenimiento General', 'Limpieza profunda del equipo desmontado'),
        ('TS03', 'Instalacion A/C', 'Instalacion de equipo'),
        ('TS04', 'Desinstalacion A/C', 'Remover equipo, tuberias y conexiones electricas'),
        ('TS05', 'Reparacion', 'Reconstruccion, cambio de repuesto o reparacion de fuga y recargado'),
        ('TS06', 'Instalacion accesorio', 'instalacion y conexion de protector de voltaje, bomba de agua o similares');


insert into egresos (egresoid, monto, fecha)
values  ('EG00001', 100.00, '2022-01-05'),
        ('EG00002', 150.00, '2022-02-10'),
        ('EG00003', 200.00, '2022-03-15'),
        ('EG00004', 120.00, '2022-04-20'),
        ('EG00005', 180.00, '2022-05-25'),
        ('EG00006', 90.00, '2022-06-30'),
        ('EG00007', 110.00, '2022-07-05'),
        ('EG00008', 130.00, '2022-08-10'),
        ('EG00009', 160.00, '2022-09-15'),
        ('EG00010', 170.00, '2022-10-20'),
        ('EG00011', 140.00, '2022-11-25'),
        ('EG00012', 190.00, '2022-12-30'),
        ('EG00013', 105.00, '2023-01-05'),
        ('EG00014', 155.00, '2023-02-10'),
        ('EG00015', 205.00, '2023-03-15'),
        ('EG00016', 125.00, '2023-04-20'),
        ('EG00017', 185.00, '2023-05-25'),
        ('EG00018', 95.00, '2023-06-30'),
        ('EG00019', 115.00, '2023-07-05'),
        ('EG00020', 165.00, '2023-08-10'),
        ('EG00021', 95.00, '2023-09-15'),
        ('EG00022', 145.00, '2023-10-10'),
        ('EG00023', 195.00, '2023-11-15'),
        ('EG00024', 115.00, '2023-12-20'),
        ('EG00025', 165.00, '2024-01-15'),
        ('EG00026', 85.00, '2024-02-15'),
        ('EG00027', 105.00, '2024-03-05'),
        ('EG00028', 155.00, '2024-04-10'),
        ('EG00029', 205.00, '2024-05-15'),
        ('EG00030', 125.00, '2024-06-20'),
        ('EG00031', 600.00, '2024-07-25'),
        ('EG00032', 5000.00, '2024-08-30'),
        ('EG00033', 600.00, '2024-09-04'),
        ('EG00034', 185.00, '2024-10-09'),
        ('EG00035', 195.00, '2024-11-14'),
        ('EG00036', 1000.00, '2024-12-25'),
        ('EG00037', 1500.00, '2025-01-30'),
        ('EG00038', 2000.00, '2025-02-04'),
        ('EG00039', 2000.00, '2025-03-11'),
        ('EG00040', 1600.00, '2025-04-16'),
        ('EG00041', 12131.00, '2022-02-10');

insert into productos (productoid, categoriaid, nombre)
values  ('P0001', 'CP01', 'Filtro de evaporador split'),
        ('P0002', 'CP01', 'Compresor inverter 12k'),
        ('P0003', 'CP02', 'Tubería de cobre 3/8 6m'),
        ('P0004', 'CP02', 'Bolsa de cemento 42kg'),
        ('P0005', 'CP03', 'Destornillador de estrella'),
        ('P0006', 'CP03', 'Multimetro y amperimetro'),
        ('P0007', 'CP04', 'Aire acondicionado split inverter 12k'),
        ('P0008', 'CP04', 'Aire acondicionado de ventana 8k'),
        ('P0009', 'CP01', 'Control remoto samsung inverter'),
        ('P0010', 'CP01', 'Motor de evaporador'),
        ('P0011', 'CP03', 'Kit llave allen'),
        ('P0012', 'CP04', 'evaporador unidad central estandar 36k'),
        ('P0013', 'CP01', 'Sensor de ambiente 10ohm'),
        ('P0014', 'CP02', 'angular 1/2 3m'),
        ('P0015', 'CP03', 'dobladora de tubos'),
        ('P0016', 'CP03', 'Unidad exterior estandar comfortStar 12k'),
        ('P0017', 'CP01', 'Válvula de expansión'),
        ('P0018', 'CP01', 'Serpentin para split 12k cobre'),
        ('P0019', 'CP02', 'Refrigerante r410 25lb'),
        ('P0020', 'CP01', 'protector de voltaje 220');


insert into inventario (inventarioid, productoid, stock)
values  (1, 'P0001', '3'),
        (2, 'P0002', '2'),
        (3, 'P0003', '0'),
        (4, 'P0004', '5'),
        (5, 'P0005', '1'),
        (6, 'P0006', '3'),
        (7, 'P0007', '2'),
        (8, 'P0008', '0'),
        (9, 'P0009', '5'),
        (10, 'P0010', '0'),
        (11, 'P0011', '3'),
        (12, 'P0012', '2'),
        (13, 'P0013', '4'),
        (14, 'P0014', '5'),
        (15, 'P0015', '1'),
        (16, 'P0016', '3'),
        (17, 'P0017', '2'),
        (18, 'P0018', '4'),
        (19, 'P0019', '5'),
        (20, 'P0020', '1');

insert into gastos_varios (gastoid, egresoid, descripcion)
values  ('GV000001', 'EG00031', 'Combustible'),
        ('GV000002', 'EG00032', 'bateria de camioneta'),
        ('GV000003', 'EG00033', 'Comida de empleados'),
        ('GV000004', 'EG00034', 'Lavanderia'),
        ('GV000005', 'EG00035', 'Material de limpieza');

insert into empleados (empleadoid, cargoid, nombre, apellido, telefono, cedula)
values  ('E01', 'CE001', 'Karla', 'Rivera', 12345678, '000000000000001A'),
        ('E02', 'CE002', 'Rafael', 'Hernandez', 23456789, '000000000000001B'),
        ('E03', 'CE002', 'Rene', 'Urbina', 34567890, '000000000000001C'),
        ('E04', 'CE003', 'Alex', 'Mesa', 45678901, '000000000000001D'),
        ('E05', 'CE003', 'Fernando', 'Rodriguez', 56789012, '000000000000001E');

insert into equipo (equipoid, tipoequipoid, capacidad, marca, numero_serie)
values  ('EQ000001', 'TE001', 12000, 'Samsung', 'SN000001'),
        ('EQ000002', 'TE002', 18000, 'LG', 'SN000002'),
        ('EQ000003', 'TE003', 24000, 'Daikin', 'SN000003'),
        ('EQ000004', 'TE004', 15000, 'Mitsubishi', 'SN000004'),
        ('EQ000005', 'TE005', 20000, 'Panasonic', 'SN000005'),
        ('EQ000006', 'TE006', 18000, 'Carrier', 'SN000006'),
        ('EQ000007', 'TE007', 12000, 'Hisense', 'SN000007'),
        ('EQ000008', 'TE001', 24000, 'Samsung', 'SN000008'),
        ('EQ000009', 'TE002', 18000, 'LG', 'SN000009'),
        ('EQ000010', 'TE003', 15000, 'Daikin', 'SN000010'),
        ('EQ000011', 'TE004', 20000, 'Mitsubishi', 'SN000011'),
        ('EQ000012', 'TE005', 12000, 'Panasonic', 'SN000012'),
        ('EQ000013', 'TE006', 24000, 'Carrier', 'SN000013'),
        ('EQ000014', 'TE007', 18000, 'Hisense', 'SN000014'),
        ('EQ000015', 'TE001', 20000, 'Samsung', 'SN000015'),
        ('EQ000016', 'TE002', 24000, 'LG', 'SN000016'),
        ('EQ000017', 'TE003', 12000, 'Daikin', 'SN000017'),
        ('EQ000018', 'TE004', 18000, 'Mitsubishi', 'SN000018'),
        ('EQ000019', 'TE005', 15000, 'Panasonic', 'SN000019'),
        ('EQ000020', 'TE006', 24000, 'Carrier', 'SN000020');

insert into servicios (servicioid, clienteid)
values  ('SV00001', 'C0001'),
        ('SV00002', 'C0002'),
        ('SV00003', 'C0003'),
        ('SV00004', 'C0004'),
        ('SV00005', 'C0005'),
        ('SV00006', 'C0022'),
        ('SV00007', 'C0023'),
        ('SV00008', 'C0024');

insert into detalle_servicio (detalleservicioid, tiposervicioid, equipoid, servicioid, descripcion, costo, fecha, direccion)
values  ('DSV00001', 'TS01', 'EQ000001', 'SV00001', 'Sooomething', 3700.00, '2024-12-25', 'Barrio San Judas, casa #15'),
        ('DSV00002', 'TS02', 'EQ000002', 'SV00002', null, 2404.00, '2024-12-25', 'Residencial Los Robles, Casa #10'),
        ('DSV00003', 'TS01', 'EQ000003', 'SV00003', null, 3599.00, '2024-12-25', 'Colonia Centroam�rica, Casa #25'),
        ('DSV00004', 'TS02', 'EQ000004', 'SV00004', null, 3900.00, '2024-12-25', 'Barrio Jorge Dimitrov, Casa #8'),
        ('DSV00005', 'TS01', 'EQ000005', 'SV00005', null, 4700.00, '2024-12-25', 'Residencial Bolonia, Casa #5'),
        ('DSV00006', 'TS02', 'EQ000006', 'SV00006', 'Esta es una descripción temporal', 250.00, '2024-12-25', 'su casa'),
        ('DSV00007', 'TS02', 'EQ000006', 'SV00007', 'descripcion', 250.00, '2024-12-25', 'su casa'),
        ('DSV00008', 'TS02', 'EQ000006', 'SV00008', 'otra descr', 250.00, '2024-12-25', 'su casa'),
        ('DSV00009', 'TS02', 'EQ000006', 'SV00008', 'thrid descrip', 250.00, '2024-12-25', 'su casa');

insert into pago_empleado (salarioid, empleadoid, egresoid, concepto)
values  ('S00006', 'E01', 'EG00036', 'Pago de SANLASA'),
        ('S00007', 'E02', 'EG00037', 'Pago de ECOQUIMICA'),
        ('S00008', 'E03', 'EG00038', 'Pago de medio d�a de trabajo'),
        ('S00009', 'E04', 'EG00039', 'Pago de horas extras'),
        ('S00010', 'E01', 'EG00040', 'Pago de bono de productividad'),
        ('SE00006', 'E01', 'EG00041', null);

insert into pago_impuesto (impuestoid, egresoid, nombre_entidad)
values  ('PI00001', 'EG00021', 'Alcaldia'),
        ('PI00002', 'EG00022', 'DGI'),
        ('PI00003', 'EG00023', 'Alcaldia'),
        ('PI00004', 'EG00024', 'DGI'),
        ('PI00005', 'EG00025', 'Alcaldia'),
        ('PI00006', 'EG00026', 'DGI'),
        ('PI00007', 'EG00027', 'Alcaldia'),
        ('PI00008', 'EG00028', 'DGI'),
        ('PI00009', 'EG00029', 'Alcaldia'),
        ('PI00010', 'EG00030', 'DGI');

insert into proveedores (proveedorid, nombre, apellido, telefono, direccion, ruc)
values  ('PV00001', 'Ferretería San José', null, 12345678, 'Calle 123, Ciudad', '00100000000001'),
        ('PV00002', 'Tienda de Electrónica Luna', null, 87654321, 'Av. Principal, Pueblo', '00100100000001'),
        ('PV00003', 'Repuestos Martínez', null, 23456789, 'Carrera 45, Villa', '00100000000002'),
        ('PV00004', 'Materiales y Más', null, 98765432, 'Plaza Central, Ciudad', '00100100000002'),
        ('PV00005', 'Herramientas del Este', null, 34567890, 'Avenida 12, Pueblo', '00100000000003'),
        ('PV00006', 'Electrónica González', null, 76543210, 'Calle 78, Ciudad', '00100100000003'),
        ('PV00007', 'Ferretería Central', null, 45678901, 'Plaza Mayor, Villa', '00100000000004'),
        ('PV00008', 'Electroventas', null, 65432109, 'Carrera 67, Pueblo', '00100100000004'),
        ('PV00009', 'Repuestos y Herramientas', null, 56789012, 'Avenida 56, Ciudad', '00100000000005'),
        ('PV00010', 'Tienda de Componentes Electrónicos', null, 54321098, 'Calle 34, Pueblo', '00100100000005'),
        ('PV00011', 'Ferretería García', null, 67890123, 'Carrera 89, Ciudad', '00100000000006'),
        ('PV00012', 'Electrónica Martínez', null, 43210987, 'Avenida 23, Pueblo', '00100100000006'),
        ('PV00013', 'Repuestos Sánchez', null, 78901234, 'Plaza Libertad, Ciudad', '00100000000007'),
        ('PV00014', 'Materiales de Construcción', null, 32109876, 'Calle Libertad, Pueblo', '00100100000007'),
        ('PV00015', 'Herramientas de Calidad', null, 89012345, 'Avenida Principal, Ciudad', '00100000000008'),
        ('PV00016', 'Electrodomésticos López', null, 21098765, 'Carrera 12, Pueblo', '00100100000008'),
        ('PV00017', 'Ferretería y Repuestos', null, 90123456, 'Plaza Bol�var, Ciudad', '00100000000009'),
        ('PV00018', 'Tienda de Electrónica Inteligente', null, 10987654, 'Avenida Bol�var, Pueblo', '00100100000009'),
        ('PV00019', 'Repuestos de Calidad', null, 1234567, 'Calle 67, Ciudad', '00100000000010'),
        ('PV00020', 'Materiales para Aires Acondicionados', null, 98765432, 'Carrera 56, Pueblo', '00100100000010'),
        ('PV00021', 'Juan', 'Pérez', 12345678, 'Calle 45, Pueblo', '00100200000001'),
        ('PV00022', 'María', 'Gómez', 87654321, 'Avenida 67, Ciudad', '00100200000002'),
        ('PV00023', 'Carlos', 'Martínez', 23456789, 'Plaza Central, Pueblo', '00100200000003'),
        ('PV00024', 'Laura', 'López', 98765432, 'Carrera 12, Ciudad', '00100200000004'),
        ('PV00025', 'Pedro', 'Sanchez', 34567890, 'Avenida 34, Ciudad', '00100200000005'),
        ('PV00026', 'Ana', 'Rodríguez', 76543210, 'Calle 89, Pueblo', '00100200000006'),
        ('PV00027', 'Santiago', 'García', 45678901, 'Avenida 56, Ciudad', '00100200000007'),
        ('PV00028', 'Luisa', 'Hernández', 65432109, 'Plaza Principal, Ciudad', '00100200000008'),
        ('PV00029', 'Diego', 'Alvarez', 56789012, 'Calle 23, Pueblo', '00100200000009'),
        ('PV00030', 'Carmen', 'Díaz', 54321098, 'Carrera 45, Ciudad', '00100200000010');

insert into suministro (suministroid, proveedorid, egresoid)
values  ('SM00001', 'PV00001', 'EG00001'),
        ('SM00002', 'PV00002', 'EG00002'),
        ('SM00003', 'PV00003', 'EG00003'),
        ('SM00004', 'PV00004', 'EG00004'),
        ('SM00005', 'PV00005', 'EG00005'),
        ('SM00006', 'PV00006', 'EG00006'),
        ('SM00007', 'PV00007', 'EG00007'),
        ('SM00008', 'PV00008', 'EG00008'),
        ('SM00009', 'PV00009', 'EG00009'),
        ('SM00010', 'PV00010', 'EG00010'),
        ('SM00011', 'PV00011', 'EG00011'),
        ('SM00012', 'PV00012', 'EG00012'),
        ('SM00013', 'PV00013', 'EG00013'),
        ('SM00014', 'PV00014', 'EG00014'),
        ('SM00015', 'PV00015', 'EG00015'),
        ('SM00016', 'PV00016', 'EG00016'),
        ('SM00017', 'PV00017', 'EG00017'),
        ('SM00018', 'PV00018', 'EG00018'),
        ('SM00019', 'PV00019', 'EG00019'),
        ('SM00020', 'PV00020', 'EG00020');

insert into detalle_suministro (detallesuministroid, suministroid, productoid, costo, cantidad)
values  ('DS00001', 'SM00001', 'P0001', 50.00, 2),
        ('DS00002', 'SM00002', 'P0002', 60.00, 3),
        ('DS00003', 'SM00003', 'P0003', 70.00, 1),
        ('DS00004', 'SM00004', 'P0004', 80.00, 1),
        ('DS00005', 'SM00005', 'P0005', 90.00, 2),
        ('DS00006', 'SM00006', 'P0006', 100.00, 3),
        ('DS00007', 'SM00007', 'P0007', 110.00, 2),
        ('DS00008', 'SM00008', 'P0008', 120.00, 4),
        ('DS00009', 'SM00009', 'P0009', 130.00, 2),
        ('DS00010', 'SM00010', 'P0010', 140.00, 3),
        ('DS00011', 'SM00011', 'P0011', 150.00, 3),
        ('DS00012', 'SM00012', 'P0012', 160.00, 2),
        ('DS00013', 'SM00013', 'P0013', 170.00, 1),
        ('DS00014', 'SM00014', 'P0014', 180.00, 1),
        ('DS00015', 'SM00015', 'P0015', 190.00, 1),
        ('DS00016', 'SM00016', 'P0016', 200.00, 1),
        ('DS00017', 'SM00017', 'P0017', 210.00, 1),
        ('DS00018', 'SM00018', 'P0018', 220.00, 1),
        ('DS00019', 'SM00019', 'P0019', 230.00, 1),
        ('DS00020', 'SM00020', 'P0020', 240.00, 1);

insert into recursos (recursoid, productoid, detalleservicioid, costo, cantidad_producto, empleadoid)
values  ('1', 'P0001', 'DSV00001', 250.00, 1, 'E02'),
        ('2', 'P0002', 'DSV00002', 7200.00, 1, 'E02'),
        ('3', 'P0010', 'DSV00003', 250.00, 1, 'E02'),
        ('4', 'P0013', 'DSV00004', 2500.00, 1, 'E03'),
        ('5', 'P0011', 'DSV00005', 2300.00, 1, 'E03');