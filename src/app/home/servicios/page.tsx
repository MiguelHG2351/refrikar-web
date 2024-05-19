import { Input, Link } from '@nextui-org/react'
// import prisma from "@/config/prisma";
// import Servicio from "@/components/cards/servicios/Servicio";
import AddServiceModal from "@/components/forms/addServices/Form";

// async function getServicios() {
//   const data = await prisma.servicios.findMany({
//     include: {
//       clientes: true,
//       detalle_servicio: true
//     }
//   })

//   return data
// }

export default async function Servicios() {
  
  return (
    <section className="px-6 py-4">
      <h1 className="text-2xl font-bold">Servicios</h1>
      <form action="#" className="py-4">
        <Input type="text" label="Busca" placeholder="Buscar algo..." />
        {/* <AddServiceModal /> */}
      </form>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <Link href="/home/servicios/add">Agregar servicio</Link>
      </div>
    </section>
  )
}
