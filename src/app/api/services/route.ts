'use server';
import { NextResponse, type NextRequest } from 'next/server'
import { Prisma } from '@prisma/client';
import prisma from "@/config/prisma";
import {getCountClienteServicioAndDetalleServicio} from "@/services/ClientesServices";
import {ServiciosServices} from "@/services/ServiciosServices";

// export const dynamic = 'force-dynamic' // defaults to auto

type Where = {
  clienteid?: {
    in: string[] | null
  }
}

const servicios = new ServiciosServices()
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  let clienteid = searchParams.get('cliente_id')?.split(',') || []

  let servicios_ = await servicios.getAllServicesByIds({ clientIds: clienteid })
  console.log(servicios_)

  return NextResponse.json(servicios_)
}

export async function POST(req: NextRequest) {
  const body  = await req.json()
  let cliente;



  if (body.cliente.isNew) {
    let _cliente = await prisma.clientes.create({
      data: {
        ruc: body.cliente.ruc,
        nombre: body.cliente.nombre,
        apellido: body.cliente.apellido,
        telefono: body.cliente.telefono,
        entidad: body.cliente.entidad,
      }
    });
    cliente = _cliente.clienteid
  } else {
    cliente = body.cliente.clienteid
  }

  let detalleServicio = body.detalle_servicio.filter((
    detalle: Prisma.detalle_servicioCreateManyInput & {
      equipo: {
        tipo_equipo: string;
        capacidad: number;
        marca: string;
        numero_serie: string;
      }
    },
    index: number
  ) => {
    if (detalle.tiposervicioid!?.length > 1) {
      return true
      // return {
      //   costo: detalle.costo,
      //   fecha: new Date(detalle.fecha as string),
      //   descripcion: detalle.descripcion,
      //   direccion: detalle.direccion,
      //   tiposervicioid: detalle.tiposervicioid,
      //   equipoid: detalle.equipoid,
      // }
    }
    // const equipo = await prisma.equipo.create({
    //   data: {
    //     tipoequipoid: detalle.equipo.tipo_equipo,
    //     capacidad: detalle.equipo.capacidad,
    //     marca: detalle.equipo.marca,
    //     numero_serie: detalle.equipo.numero_serie
    //   }
    // })

    // return {
    //   costo: detalle.costo,
    //   fecha: new Date(detalle.fecha as string),
    //   descripcion: detalle.descripcion,
    //   direccion: detalle.direccion,
    //   tiposervicioid: detalle.tiposervicioid,
    //   equipoid: equipo.equipoid,
    // }
  })
  
  console.log(detalleServicio)
  const service = await prisma.servicios.create({
    data: {
      clienteid: cliente,
      factura_number: body.numeroFactura,
      factura_date: new Date(body.fechaFactura),
      detalle_servicio: {
        createMany: {
          data: detalleServicio
        }
      },
    }
  })
  body.detalle_servicio.forEach(async (detalle: any) => {
    if (detalle.equipo.tipo_equipo) {
      const _detalle = await prisma.detalle_servicio.create({
        data: {
          
          servicios: {
            connect: {
              servicioid: service.servicioid
            }
          },
          costo: detalle.costo,
          fecha: new Date(detalle.fecha),
          descripcion: detalle.descripcion,
          direccion: detalle.direccion,
          tipo_servicio: {
            connect: {
              tiposervicioid: detalle.equipo.tipo_servicio
            }
          },
          equipo: {
            create: {
              tipoequipoid: detalle.equipo.tipo_equipo,
              capacidad: detalle.equipo.capacidad,
              marca: detalle.equipo.marca,
              numero_serie: detalle.equipo.numero_serie
            }
          }
        }
      })
      console.log(_detalle)
    }
  })
  
  return NextResponse.json(service)
}