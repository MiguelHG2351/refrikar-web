import ServiceSearch from "@/components/forms/search/ServiceSearch";
import {getClientesById, getClientesOnlyWithServices} from "@/services/Clientes";
import {Metadata} from "next";
import ServicioList from "@/components/cards/servicios/ServicioList";

export const metadata: Metadata = {
  title: "Servicios"
}


export default async function Servicios({ searchParams }: { searchParams?: { [key: string]: string | undefined }; }) {

  const clientes = await getClientesOnlyWithServices()
  const currentClient = await getClientesById(searchParams?.cliente_id)

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
