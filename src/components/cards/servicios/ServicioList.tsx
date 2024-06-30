'use client'

import Servicio from "@/components/cards/servicios/Servicio";
import {useEffect, useState} from "react";
import {GetServicio} from "@/services/ServiciosServices";
import {useSearchParams} from "next/navigation";
import {useGetServiciosQuery} from "@/storage/api/service";
import {ServicioModel} from "@/dtos";

export default function ServicioList({ servicios: _servicios }: { servicios: ServicioModel[] }) {
  const [ servicios, setServicios ] = useState(_servicios)
  const searchParams = useSearchParams()
  const { data } = useGetServiciosQuery({ cliente_id: searchParams.get('cliente_id') })

  useEffect(() => {
    if (searchParams.get('cliente_id')) {
      console.log(searchParams.get('cliente_id'))
    }
  }, [searchParams]);

  return (
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 py-4">
        {data?.map((servicio: any) => (
            <Servicio key={servicio.servicioid} data={servicio}/>
        ))}
      </div>
  )
}