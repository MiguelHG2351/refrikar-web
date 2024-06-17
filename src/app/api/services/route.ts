import { NextResponse, type NextRequest } from 'next/server'
import { Prisma } from '@prisma/client';
import prisma from "@/config/prisma";
import {getCountClienteServicioAndDetalleServicio} from "@/services/Clientes";

export const dynamic = 'force-dynamic' // defaults to auto

export async function POST(req: NextRequest) {
  console.log('here')
  const body  = await req.json()
  let cliente;
  type countList = {
    f1: number
  }
  // const countList: countList[] = await prisma.$queryRaw`CALL refrikar.sp_CountTabla()`
  const countList = await getCountClienteServicioAndDetalleServicio()


  if (body.cliente.isNew) {
    cliente = {
      create: {
        clienteid: `${countList[0] + 1}`.padStart(5, 'C0020'),
        ruc: body.cliente.ruc,
        nombre: body.cliente.nombre,
        apellido: body.cliente.apellido,
        telefono: body.cliente.telefono,
        entidad: body.cliente.entidad,
      }
    }
  } else {
    cliente = {
      connect: {
        clienteid: body.cliente.clienteid
      }
    }
  }

  console.log(body.detalle_servicio)
  let detalleServicio = body.detalle_servicio.map((detalle: Prisma.detalle_servicioCreateManyInput, index: number) => {
    let detalleServicioId = `${countList[2] + index + 1}`.padStart(8, 'DSV00004')
    return {
      costo: detalle.costo,
      // transform string to date with ISO-8601 DateTime
      fecha: new Date(detalle.fecha as string),
      detalleservicioid: detalleServicioId,
      descripcion: detalle.descripcion,
      direccion: detalle.direccion,
      tiposervicioid: detalle.tiposervicioid,
      equipoid: detalle.equipoid
    }
  })
  
  const service = await prisma.servicios.create({
    data: {
      servicioid: `${ countList[1] + 1}`.padStart(7, 'SV00000'),
      clientes: cliente,
      detalle_servicio: {
        createMany: {
          data: detalleServicio
          // data: [
          //   {
          //     "costo": "body.costo",
          //     "fecha": "body.fecha",
          //     "detalleservicioid": `${countList[2]?.f1 + 1}`.padStart(8, 'DSV00004'),
          //     "descripcion": body.descripcion,
          //     "direccion": body.direccion,
          //     "tiposervicioid": body.tiposervicioid,
          //     "equipoid": body.equipoid
          //   }
          // ]
        }
      },
    }
  })
  
  return NextResponse.json(service)
}