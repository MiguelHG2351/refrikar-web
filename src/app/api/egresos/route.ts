import { NextResponse, type NextRequest } from 'next/server'
import prisma from "@/config/prisma";
import { Console } from 'console';
import { connect } from 'http2';



export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)

  let datos;
  let tipo = searchParams.get("tipo");

  switch (tipo) {
    case 'pago_impuesto':
      datos = await prisma.pago_impuesto.findMany({
        orderBy: {
          egresos: {
            fecha: {
              sort: 'desc'
            }
          }
        }, include: { egresos: true }
      });
      break;
    case 'pago_empleado':
      datos = await prisma.pago_empleado.findMany({
        orderBy: {
          egresos: {
            fecha: {
              sort: 'desc'
            }
          }
        }, include: { egresos: true }
      });
      break;
    case 'suministro':
      datos = await prisma.suministro.findMany({
        orderBy: {
          egresos: {
            fecha: {
              sort: 'desc'
            }
          }
        }, include: { egresos: true }
      });
      break;
    case 'gastos_varios':
      datos = await prisma.gastos_varios.findMany({
        orderBy: {
          egresos: {
            fecha: {
              sort: 'desc'
            }
          }
        }, include: { egresos: true }
      });
      break;
    default:
      const [pagoImpuesto, pagoEmpleado, suministro, gastosVarios] = await Promise.all([
        prisma.pago_impuesto.findMany({ include: { egresos: true } }),
        prisma.pago_empleado.findMany({ include: { egresos: true } }),
        prisma.suministro.findMany({ include: { egresos: true } }),
        prisma.gastos_varios.findMany({ include: { egresos: true } })
      ]);
      datos = [pagoImpuesto, pagoEmpleado, suministro, gastosVarios];
      break;
  }

  return NextResponse.json(datos);
}

export async function POST(req: NextRequest) {
  const body = await req.json()

  
if(body.monto&&body.fecha){


  const egresocount = await prisma.egresos.count()
  const egresoid = `${egresocount + 1}`.padStart(7, 'EG00000');
  const egreso = await prisma.egresos.create({
    data: {
      egresoid: egresoid,
      monto: body.monto,
      fecha: body.fecha
    }
  }
  );

  switch (body.tipo) {
    case 'impuesto':
      if ((body.monto && body.entidad) != null) {
       
        const impuestocount = await prisma.pago_impuesto.count()
        await prisma.pago_impuesto.create({
          data: {
            egresoid: egreso.egresoid,
            impuestoid: `${impuestocount + 1}`.padStart(7, 'PI00000'),
            nombre_entidad: body.entidad
          }
        });
      } else { NextResponse.json({ error: 'No se permiten campos vacios' }) }
      break;

    case 'gastosvarios':
      if ((body.monto && body.descripcion) != null) {
      
        const gastosvarioscount = await prisma.gastos_varios.count()
        await prisma.gastos_varios.create({
          data: {
            egresoid: egreso.egresoid,
            gastoid: `${gastosvarioscount + 1}`.padStart(8, 'GV000000'),
            descripcion: body.descripcion
          }
        });
      } else { NextResponse.json({ error: 'No se permiten campos vacios' }) }
      break;
    case 'pagoempleado':
        const salariocount = await prisma.pago_empleado.count()

        await prisma.pago_empleado.create({
          data: { 
            egresoid: egreso.egresoid,
            salarioid: `${salariocount + 1}`.padStart(7, 'SE00000'),
            empleadoid: body.empleado,
          }
        });
      break;
    case 'suministro':
      break;
    default:
      NextResponse.json({ error: 'No se especifico un tipo de egreso (impuesto, gastosvarios, pagoempleado, suministro)' })
      break;
  }
  return NextResponse.json(egreso)
}else{NextResponse.json({ error: 'No se especifico los datos de egreso' })}
 
 
}
