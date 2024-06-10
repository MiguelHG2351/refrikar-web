import {Button} from "@nextui-org/react";
import prisma from "@/config/prisma";
import {getCategoriaWithProductos} from "@/services/Producto";
import {ProductoList} from "@/components/cards/productos/ProductoList";
import {Metadata} from "next";


export const metadata: Metadata = {
  title: "Productos | Refrikar"
}
export default async function ProductosPage() {
  const productos = await getCategoriaWithProductos()

  return (
      <section className="px-6 py-4">
        <ProductoList categorias={productos}/>
      </section>
  )
}