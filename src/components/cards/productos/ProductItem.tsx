import {Button, useDisclosure} from "@nextui-org/react";
import {ProductoDetailsModal} from "@/components/modals/Producto/ProductoDetailsModal";

// temp
type Producto = {
  productoid: string;
  categoriaid: string | null;
  nombre: string | null;
  url: string | null;
  inventario: {
    inventarioid: number;
    productoid: string | null;
    stock: string | null;
  }[];
};

export default function ProductItem({ producto }: {producto: Producto}) {

  return (
      <div key={producto.productoid} className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col justify-between">
        <img
            src={producto.url || 'https://via.placeholder.com/400x300'}
            alt={producto.nombre || 'The producto image'}
            width={400}
            height={300}
            className="w-full h-48 object-contain"
        />
        <div className="p-4">
          <h3 className="text-lg font-bold mb-2 select-none">{producto.nombre}</h3>
          <p className="text-gray-500 mb-4 select-none">{producto.nombre}</p>
          <div className="flex items-center justify-between flex-wrap">
            {
              // @ts-ignore
              +producto.inventario[0]!?.stock > 0 ? (
                  <p className="text-xl font-bold select-none shrink-0">Stock: {producto.inventario[0]?.stock}</p>
              ) : (
                  <p className="text-xl text-danger font-bold select-none line-through">Agotado</p>
              )
            }
            <ProductoDetailsModal producto={producto}/>
          </div>
        </div>
      </div>
  )
}