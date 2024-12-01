'use client'

import ServicioItem from "@/components/cards/servicios/ServicioItem";
import {useSearchParams} from "next/navigation";
import {useGetServiciosQuery} from "@/storage/api/service";
import {ServicioModel} from "@/dtos";
import {useEffect, useState} from "react";
import ClientItemSkeleton from "@/components/cards/clientes/ClientItemSkeleton";
import {ClienteServiceById} from "@/services/ClientesServices";
import { useDisclosure } from "@nextui-org/react";
import { ServicioModal } from "./servicioModal";

export default function ServicioList(cliente: { cliente: ClienteServiceById }) {
  const searchParams = useSearchParams()
  const {isOpen, onOpen, onClose} = useDisclosure();
  const { data, isLoading } = useGetServiciosQuery({ cliente_id: searchParams.get('cliente_id') })
  const [servicios, setServicios] = useState<ServicioModel[]>([])
  const [serviceId, setServiceId] = useState<string>('');

  useEffect(() => {
    if (data) {
      setServicios(data)
    }
  }, [isLoading, data])

  if (!isLoading && data!?.length === 0) {
    return (
        <div className="flex justify-center items-center h-96">
          <h1 className="text-2xl font-bold">{`No hay servicios para el cliente: ${cliente.cliente?.nombre} ${cliente.cliente?.apellido}`}</h1>
        </div>
    )
  }

  const handleOpen = (serviceId: string) => {
    setServiceId(serviceId);
    onOpen();
  }
  console.log('render')

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 py-4">
        { servicios.length === 0 && Array(100).fill(' ').map((_, key) => (
            <ClientItemSkeleton key={key} />
        ))}
        {servicios?.map((servicio: any) => (
            <ServicioItem key={servicio.servicioid} data={servicio} openModal={handleOpen}/>
        ))}
      </div>
      <ServicioModal serviceId={serviceId} isOpen={isOpen} onClose={onClose} />
    </>
  )
}