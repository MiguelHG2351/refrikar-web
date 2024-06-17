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

export async function getCountClienteServicioAndDetalleServicio() {
  return prisma.$transaction([
    prisma.clientes.count(),
    prisma.servicios.count(),
    prisma.detalle_servicio.count()
  ]);
}

// type ThenArg<T> = T extends PromiseLike<infer U> ? U : T;
export type ClienteService = ThenArg<ReturnType<typeof getClientes>>;
export type CountClienteServicioAndDetalleServicio = ThenArg<ReturnType<typeof getCountClienteServicioAndDetalleServicio>>;

export {
  getClientes
}