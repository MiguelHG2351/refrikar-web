import {Button, Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger, Input} from '@nextui-org/react'
import prisma from "@/config/prisma";
import Link from "next/link";
import {SearchIcon} from "@/components/icons/Icons";
import ServiceSearch from "@/components/forms/search/ServiceSearch";
import {getClientes, getClientesOnlyWithServices} from "@/services/Clientes";
import {Metadata} from "next";
import {getServicios, ServiciosServices} from "@/services/ServiciosServices";
import ServicioList from "@/components/cards/servicios/ServicioList";

export const metadata: Metadata = {
  title: "Servicios"
}

const serviciosServices = new ServiciosServices();

export default async function Servicios({ searchParams }: { searchParams?: { [key: string]: string | undefined }; }) {

  const _servicios = await getServicios({ searchParams: searchParams })
  // transform costo in number, because is Decimal type
  const servicios = await serviciosServices.getAllServicesByIds({ clientIds: searchParams?.cliente_id ? searchParams.cliente_id!.split(',') : []})

  const clientes = await getClientesOnlyWithServices()
  console.log(searchParams)
  console.log(servicios)
  return (
    <section className="px-6 py-4">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">Servicios</h1>
        <div className="filters">
          <ServiceSearch clientes={clientes} />
        </div>
      </div>
      <ServicioList servicios={servicios} />
    </section>
  )
}
