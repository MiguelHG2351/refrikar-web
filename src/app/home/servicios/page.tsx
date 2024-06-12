import { Input } from '@nextui-org/react'
import { Link } from '@nextui-org/link'
import prisma from "@/config/prisma";
import Servicio from "@/components/cards/servicios/Servicio";

async function getServicios() {
  const data = await prisma.servicios.findMany({
    include: {
      clientes: {
        include: {
          tipo_cliente: true
        }
      },
      detalle_servicio: true
    }
  })

  return data
}

export default async function Servicios() {
  const servicios = await getServicios()

  return (
    <section className="px-6 py-4">
      <h1 className="text-2xl font-bold">Servicios</h1>
      <form action="#" className="py-4">
        <Input type="text" label="Buscar" placeholder="Buscar algo..." />
      </form>
      <Link href="/home/servicios/add" className="underline">
        Agregar servicio
      </Link>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 py-4">
          {servicios.map((servicio: any) => (
            <Servicio key={servicio.servicioid} data={servicio} />
          ))}
      </div>
    </section>
  )
}
