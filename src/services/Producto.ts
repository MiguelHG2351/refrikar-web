import prisma from "@/config/prisma";
import { ThenArg } from './type'

async function getCategoriaWithProductos() {
  const productos = await prisma.categoria_producto.findMany({
    include: {
      productos: {
        include: {
          inventario: true
        }
      },
    }
  })

  return productos
}

// type ThenArg<T> = T extends PromiseLike<infer U> ? U : T;
export type CategoriaWithProductos = ThenArg<ReturnType<typeof getCategoriaWithProductos>>;


export {
  getCategoriaWithProductos
}