import ServiceSearch from "@/components/forms/search/ServiceSearch";
import {getClientesById, getClientesOnlyWithServices} from "@/services/ClientesServices";
import {Metadata} from "next";
import ServicioList from "@/components/cards/servicios/ServicioList";
import { currentUser } from '@clerk/nextjs/server';

export const metadata: Metadata = {
  title: "Servicios"
}


export default async function Servicios({ searchParams }: { searchParams?: { [key: string]: string | undefined }; }) {

  const clientes = await getClientesOnlyWithServices()
  const currentClient = await getClientesById(searchParams?.cliente_id)
  const user = await currentUser()

  if (user?.privateMetadata?.role === 'user') {
    return (
        <div className="px-6 flex items-center justify-center h-[calc(100vh_-_59px)]">
          <h2 className="font-bold text-2xl">No tienes permisos para acceder a esta sección</h2>
        </div>
    )
  }

  return (
    <section className="px-6 py-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Servicios</h1>
        <div className="filters">
          <ServiceSearch clientes={clientes} />
        </div>
      </div>
      <ServicioList cliente={currentClient} />
    </section>
  )
}
