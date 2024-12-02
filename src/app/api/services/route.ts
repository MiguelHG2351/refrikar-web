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
        tipo_cliente: {
          connect: {
            tipoclienteid: body.cliente.tipo_cliente.tipo_clienteid
          }
        },
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


  // detalleServicio.forEach((detalle: Prisma.detalle_servicioCreateManyInput & {
  //   equipo: {
  //     tipo_equipo: string;
  //     capacidad: number;
  //     marca: string;
  //     numero_serie: string;
  //   }
  // }) => {
  //   detalle.tiposervicioid = detalle.tiposervicioid![0]
  // })


  // let detalleServicio = body.detalle_servicio.filter((
  //   detalle: Prisma.detalle_servicioCreateManyInput & {
  //     equipo: {
  //       tipo_equipo: string;
  //       capacidad: number;
  //       marca: string;
  //       numero_serie: string;
  //     }
  //   },
  //   index: number
  // ) => {
  //   if (detalle.tiposervicioid!?.length > 1) {
  //     return true
  //   }
  // })

  // detalleServicio = detalleServicio.map((detalle: Prisma.detalle_servicioCreateManyInput & {
  //   equipo: {
  //     tipo_equipo: string;
  //     capacidad: number;
  //     marca: string;
  //     numero_serie: string;
  //   }
  // }) => {
  //   let fecha = detalle.fecha ? new Date(detalle.fecha).toISOString() : new Date().toISOString()
    
  //   return {
  //     costo: detalle.costo,
  //     fecha,
  //     descripcion: detalle.descripcion,
  //     direccion: detalle.direccion,
  //     tiposervicioid: detalle.tiposervicioid,

  //     tipoequipoid: detalle.equipoid,
  //     equipo: detalle.equipo ? {
  //       create: {
  //         tipoequipoid: detalle.equipo.tipo_equipo,
  //         capacidad: detalle.equipo.capacidad,
  //         marca: detalle.equipo.marca,
  //         numero_serie: detalle.equipo.numero_serie
  //       } 
  //     } : undefined
  //   }
  // })
  
  // console.log(detalleServicio)
  const service = await prisma.servicios.create({
    data: {
      clienteid: cliente,
      factura_number: body.numeroFactura,
      factura_date: new Date(body.fechaFactura).toISOString(),
      // detalle_servicio: {
      //   createMany: {
      //     data: []
      //   }
      // },
    }
  })
  
  body.detalle_servicio.forEach(async (detalle: any) => {
    if (!detalle?.equipo) {
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
              tiposervicioid: detalle.tiposervicioid
            }
          },
          equipo: {
            connect: {
              equipoid: detalle.equipoid
            }
          }
        }
      })
      console.log(_detalle)
    } else {
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
          equipo: {
            create: {
              tipoequipoid: detalle.equipo.tipo_equipo,
              capacidad: detalle.equipo.capacidad,
              marca: detalle.equipo.marca,
              numero_serie: detalle.equipo.numero_serie
            }
          },
          tipo_servicio: {
            connect: {
              tiposervicioid: detalle.equipo.tipo_servicio
            }
          }
        }
      })
      console.log(_detalle)
    }
  })
  
  return NextResponse.json(service)
}