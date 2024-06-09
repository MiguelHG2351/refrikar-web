'use client'
import {ClienteService} from "@/services/Clientes";
import ClienteItem from "@/components/cards/clientes/ClienteItem";
import {useGetAllClientsQuery} from "@/storage/api/clientes";
import {useEffect, useRef, useState} from "react";
import {Cliente} from "@/dtos";
import ClientItemSkeleton from "@/components/cards/clientes/ClientItemSkeleton";

export default function ClienteList() {
  const { data: _clientes, error, isLoading } = useGetAllClientsQuery("")
  const [clientes, setClientes] = useState<Cliente[]>([])

  useEffect(() => {
    if(_clientes) {
      setClientes(_clientes)
    }
  }, [_clientes, isLoading])

  return (
      <section className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        { clientes.length === 0 && Array(100).fill(' ').map((_, key) => (
            <ClientItemSkeleton key={key} />
        ))}
        {clientes.map((cliente) => (
            <ClienteItem cliente={cliente} key={cliente.clienteid}/>
        ))}
      </section>
  )
}