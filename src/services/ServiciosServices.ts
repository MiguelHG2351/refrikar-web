import prismaClient from "@/config/prisma";
import { Prisma } from "@prisma/client";
import { ThenArg } from './type'
import {ServicioModel} from "@/dtos";

// export type ServicioWithClienteAndDetalles = Prisma.val
export async function getServicios({ searchParams }: { searchParams?: { [key: string]: string | undefined }; }) {
  const users_id = searchParams?.cliente_id ? searchParams.cliente_id!.split(',') : []
  let where = {}

  if (users_id.length) {
    where = {
      clienteid: {
        in: users_id
      }
    }
  }

  return prismaClient.servicios.findMany({
    include: {
      clientes: {
        include: {
          tipo_cliente: true
        }
      },
      detalle_servicio: true
    },
    where,
  })
}

type ServiciosWithClientAndDetalles = Prisma.serviciosGetPayload<{
  include: {
    clientes: {
      include: {
        tipo_cliente: true
      }
    },
    detalle_servicio: {
      include: {
        tipo_servicio: true
      }
    }
  },
}>



export class ServiciosServices {
  
  async getAllServices({ limit, offset, query }: { limit?: number, offset?: number, query?: Prisma.serviciosWhereInput }) {
    const data = await prismaClient.servicios.findMany({
      skip: offset,
      take: limit,
      where: query,
      include: {
        clientes: {
          include: {
            tipo_cliente: true
          }
        },
        detalle_servicio: {
          include: {
            tipo_servicio: true
          }
        }
      }
    })

    return ServiciosServices.mapServicio(data)
  }

  async getAllServicesByIds({ clientIds }: { clientIds: string[] }) {

    if (!clientIds.length) {
      return this.getAllServices({})
    }

    const data = await prismaClient.servicios.findMany({
      where: {
        clienteid: {
          in: clientIds
        }
      },
      include: {
        clientes: {
          include: {
            tipo_cliente: true
          }
        },
        detalle_servicio: {
          include: {
            tipo_servicio: true
          }
        }
      }
    })

    return ServiciosServices.mapServicio(data)
  }

//   add static mapper
  static mapServicio(servicios: ServiciosWithClientAndDetalles[]): ServicioModel[] {
    return servicios.map(servicio => ({
      servicioid: servicio.servicioid,
      clienteid: servicio.clienteid,
      createdAt: servicio.createdAt,
      clientes: {
        clienteid: servicio.clientes?.clienteid,
        tipoclienteid: servicio.clientes?.tipoclienteid as string,
        nombre: servicio.clientes?.nombre as string,
        apellido: servicio.clientes?.apellido as string,
        telefono: servicio.clientes?.telefono as number,
        entidad: servicio.clientes?.entidad as string,
        ruc: servicio.clientes?.ruc as string,
        tipo_cliente: {
          tipoclienteid: servicio.clientes?.tipo_cliente?.tipoclienteid as string,
          tipo_cliente: servicio.clientes?.tipo_cliente?.tipo_cliente as string
        }
      },
      detalle_servicio: servicio.detalle_servicio.map((detalle: any) => {
        return {
          ...detalle,
          costo: Number(detalle.costo),
          tipo_servicio: {
            tipo: detalle.tipo_servicio.tipo,
            tiposervicioid: detalle.tipo_servicio.tiposervicioid
          }
        }
      })
    }))
  }

}

export type GetServicio = ThenArg<ReturnType<typeof getServicios>>;