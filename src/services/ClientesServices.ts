import prisma from "@/config/prisma";
import {ThenArg} from './type'

async function getClientes() {
  const productos = await prisma.clientes.findMany({
    include: {
      tipo_cliente: true
    }
  })

  return productos
}

async function getClientesById(clienteId?: string) {
  if (!clienteId) {
    return null
  }

  return prisma.clientes.findUnique({
    where: {
      clienteid: clienteId
    }
  })
}

async function getClientesOnlyWithServices() {
  const clientes = await prisma.clientes.findMany({
    include: {
      servicios: true
    },
  });

  return clientes.filter((cliente) => cliente.servicios.length > 0)
}

export async function getCountClienteServicioAndDetalleServicio() {
  return prisma.$transaction([
    prisma.clientes.count(),
    prisma.servicios.count(),
    prisma.detalle_servicio.count()
  ]);
}

// type ThenArg<T> = T extends PromiseLike<infer U> ? U : T;
export type ClienteService = ThenArg<ReturnType<typeof getClientes>>;
export type ClienteServiceWithSomeServices = ThenArg<ReturnType<typeof getClientesOnlyWithServices>>;
export type ClienteServiceById = ThenArg<ReturnType<typeof getClientesById>>;

export class ClientesServices {
  async getClientes() {
    return getClientes()
  }

  async getClientesByType(tipoClienteId: string) {
    return prisma.clientes.findMany({
      where: {
        tipoclienteid: {
          equals: tipoClienteId
        }
      },
      include: {
        tipo_cliente: true
      }
    })
  }

  async getClientesOnlyWithServices() {
    return getClientesOnlyWithServices()
  }

  async getClientesById(clienteId: string) {
    return getClientesById(clienteId)
  }
}

export {
  getClientes,
  getClientesOnlyWithServices,
  getClientesById
}