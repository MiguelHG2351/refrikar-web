'use client'

import Servicio from "@/components/cards/servicios/Servicio";
import {useSearchParams} from "next/navigation";
import {useGetServiciosQuery} from "@/storage/api/service";
import {ServicioModel} from "@/dtos";
import {useEffect, useState} from "react";
import ClientItemSkeleton from "@/components/cards/clientes/ClientItemSkeleton";
import {ClienteServiceById} from "@/services/Clientes";

export default function ServicioList(cliente: { cliente: ClienteServiceById }) {
  const searchParams = useSearchParams()
  const { data, isLoading } = useGetServiciosQuery({ cliente_id: searchParams.get('cliente_id') })
  const [servicios, setServicios] = useState<ServicioModel[]>([])

  useEffect(() => {
    if (data) {
      setServicios(data)
    }
  }, [isLoading, data])

  console.log(isLoading)

  if (!isLoading && data!?.length === 0) {
    return (
        <div className="flex justify-center items-center h-96">
          <h1 className="text-2xl font-bold">{`No hay servicios para el cliente: ${cliente.cliente?.nombre} ${cliente.cliente?.apellido}`}</h1>
        </div>
    )
  }

  return (
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 py-4">
        { servicios.length === 0 && Array(100).fill(' ').map((_, key) => (
            <ClientItemSkeleton key={key} />
        ))}
        {servicios?.map((servicio: any) => (
            <Servicio key={servicio.servicioid} data={servicio}/>
        ))}
      </div>
  )
}