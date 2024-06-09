'use client'
import {CategoriaWithProductos} from "@/services/Producto";
import {Button} from "@nextui-org/react";
import ProductItem from "@/components/cards/productos/ProductItem";
import AddProductoModal from "@/components/modals/Producto/AddProductoModal";

type ProductoListProps = {
  categorias: CategoriaWithProductos
}

export function ProductoList({ categorias }: ProductoListProps) {
  return (
      <section className="flex flex-col gap-y-4">
        {
          categorias.map(categoria => (
              <div key={categoria.categoriaid}>
                <div className="flex justify-between">
                  <h2 className="text-2xl font-bold mb-6">{categoria.descripcion}</h2>
                  <AddProductoModal categoria={categoria.descripcion} />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 1xl:grid-cols-4 gap-6">
                  {
                    categoria.productos.map(producto => (
                        <ProductItem key={producto.productoid} producto={producto} />
                    ))
                  }
                </div>
              </div>
          ))
        }
      </section>
  )
}