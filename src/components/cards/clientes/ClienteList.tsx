'use client'
import {ClienteService} from "@/services/ClientesServices";
import ClienteItem from "@/components/cards/clientes/ClienteItem";
import {useGetAllClientsQuery} from "@/storage/api/clientes";
import {useEffect, useState} from "react";
import {Cliente} from "@/dtos";
import ClientItemSkeleton from "@/components/cards/clientes/ClientItemSkeleton";
import { useSearchParams } from "next/navigation";

export default function ClienteList() {
  const searchParams = useSearchParams()
  const { data: _clientes,
    isLoading,
    isFetching
  } = useGetAllClientsQuery({ search: searchParams.get('search'), tipo: searchParams.get('tipo')})
  const [clientes, setClientes] = useState<Cliente[]>([])

  useEffect(() => {
    if(_clientes) {
      setClientes(_clientes)
    }
  }, [_clientes, isLoading])

  if (!isLoading && clientes.length === 0) {
    return (
        <div className="flex justify-center items-center h-96">
          <h1 className="text-2xl font-bold">No hay clientes</h1>
        </div>
    )
  }

  return (
      <section className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        { ((clientes.length === 0 && isLoading) || isFetching) && Array(100).fill(' ').map((_, key) => (
            <ClientItemSkeleton key={key} />
        ))}
        {clientes.map((cliente) => (
            <ClienteItem cliente={cliente} key={cliente.clienteid}/>
        ))}
      </section>
  )
}