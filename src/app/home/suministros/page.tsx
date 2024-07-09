import {Metadata} from "next";
import {Button} from "@nextui-org/react";
import SuministroAccordion from "@/components/accordion/SuministroAccordion";

export const metadata: Metadata = {
  title: 'Suministros | Refrikar'
}
export default function SuministroPage() {

  return (
      <section className="py-4 h-[calc(100vh - 59px)]">
        <div className="px-6">
          <h2 className="text-2xl font-semibold">Suministro de proveedores</h2>
          <p>Una lista de suministros ordenados por proveedores con una lista de cada uno de los productos suministrados</p>
        </div>
        <div className="flex px-6 border-t border-b justify-between mt-4 py-2">
          <div className="flex gap-x-2">
            <p className="bg-gray-300 p-2 rounded-xl">Nombre: Miguel Angel Hernández Gaitan</p>
            <p className="bg-gray-300 p-2 rounded-xl">Productos: 12</p>
          </div>
          <Button className="flex-shrink-0">Editar</Button>
        </div>
        <SuministroAccordion />
      </section>
  )
}