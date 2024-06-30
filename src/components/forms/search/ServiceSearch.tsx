'use client'

import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
  Select, Selection, SelectItem
} from "@nextui-org/react";
import {FilterIcon } from "@/components/icons/Icons";
import { ClienteServiceWithSomeServices } from "@/services/Clientes";
import Link from "next/link";
import React, {useEffect, useState} from "react";
import {usePathname, useRouter, useSearchParams} from "next/navigation";

export default function ServiceSearch({ clientes } : { clientes: ClienteServiceWithSomeServices }) {
  const searchParams = useSearchParams()
  const { replace } = useRouter();
  const pathname = usePathname();
  const [selectedClienteIds, setSelectedClienteIds] = useState<Selection>(new Set(searchParams.get('cliente_id')?.split(',') || []))

  const onHandlerSelectionChange = (cliente: Selection) => {
    setSelectedClienteIds(cliente)
    let _ids = Array.from(cliente).join(',')
    const params = new URLSearchParams(searchParams);
    params.set("cliente_id", _ids)
    replace(`${pathname}?${params.toString()}`);
  }

  useEffect(() => {
    console.log('cambio la url')
  }, [searchParams]);

  return (
    <form className="py-4 flex items-stretch gap-x-2">
      <Select
          label="Selecciona un cliente"
          className="min-w-[10rem] max-w-[15rem]"
          size="sm"
          selectionMode="multiple"
          name="schema"
          defaultSelectedKeys={searchParams.get('cliente_id')?.split(',') || []}
          selectedKeys={selectedClienteIds}
          onSelectionChange={onHandlerSelectionChange}
      >
        {clientes.map((cliente) => (
            <SelectItem key={cliente.clienteid} value={cliente.clienteid}>
              {`${cliente.nombre} ${cliente.apellido}`}
            </SelectItem>
        ))}
      </Select>
      {/*<Input*/}
      {/*    classNames={{*/}
      {/*      // base: "max-w-full sm:max-w-[10rem] h-10",*/}
      {/*      mainWrapper: "h-full",*/}
      {/*      input: "text-small border-none py-4 outline-none focus:outline-none focus:border-none",*/}
      {/*      inputWrapper: "focus:border-0 h-full font-normal text-default-500",*/}
      {/*    }}*/}
      {/*    placeholder="Juan Pérez"*/}
      {/*    size="sm"*/}
      {/*    startContent={<SearchIcon width={18} height={18} className="fill-black"/>}*/}
      {/*    type="search"*/}
      {/*/>*/}
      <Dropdown>
        <DropdownTrigger>
          <Button
              className="px-8 py-2 bg-default-100 h-auto"
              startContent={<FilterIcon width={18} height={18} className="stroke-black shrink-0"/>}
              variant="bordered"
          >
            Filtros
          </Button>
        </DropdownTrigger>
        <DropdownMenu variant="faded" aria-label="Dropdown menu with description">
          <DropdownSection showDivider key="order_type">
            <DropdownItem
                key="new"
                description="Filtro por cliente"
                className="bg-default-100"
            >
              Por cliente
            </DropdownItem>
            <DropdownItem
                key="copy"
                description="Filtro por fecha"
            >
              Por fecha
            </DropdownItem>
          </DropdownSection>
          <DropdownSection key="order_by">
            <DropdownItem
                key="asc"
                description="Descendente"
            >
              Más recientes
            </DropdownItem>
            <DropdownItem
                key="desc"
                description="Ascendente"
            >
              Más antiguo
            </DropdownItem>
          </DropdownSection>
        </DropdownMenu>
      </Dropdown>
      <Button as={Link} href="/home/servicios/add" className="shrink-0 h-auto bg-primary text-white">
        Agregar servicio
      </Button>
    </form>
  )
}