import prisma from "@/config/prisma";
import { ThenArg } from './type'

async function getClientes() {
  const productos = await prisma.clientes.findMany({
    include: {
      tipo_cliente: true
    }
  })

  return productos
}

// type ThenArg<T> = T extends PromiseLike<infer U> ? U : T;
export type ClienteService = ThenArg<ReturnType<typeof getClientes>>;


export {
  getClientes
}