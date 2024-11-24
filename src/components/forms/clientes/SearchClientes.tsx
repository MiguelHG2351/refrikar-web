'use client'

import {Button, Input, Select, SelectItem} from "@nextui-org/react";
import {useRef, useState} from "react";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {useGetAllTipoClientsQuery} from "@/storage/api/clientes";


export default function SearchClientes({ querySearch, queryTipo }: { querySearch: string | undefined, queryTipo: string | undefined }) {
  const [search, setSearch] = useState<string | undefined>(querySearch)
  const { replace } = useRouter();
  const pathname = usePathname();
  const [tipoClientList, setTipoClientList] = useState<string>("");
  const { data: tipoCliente } = useGetAllTipoClientsQuery(queryTipo || "")
  const searchParams = useSearchParams()

  const formRef = useRef<HTMLFormElement | null>(null);
  const debounceTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  function debounce(func: (...args: any[]) => any, delay: number) {
    return function (...args: []) {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
      debounceTimeout.current = setTimeout(() => {
        func(...args);
        debounceTimeout.current = null;
      }, delay);
    };
  }
  const performSearch = (query: string, variable: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set(variable, query)
    replace(`${pathname}?${params.toString()}`)
  }
    const debouncedSearch = debounce(performSearch, 1000);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setSearch(e.target.value)
    // @ts-ignore
    debouncedSearch(e.target.value, 'search')
  }

  const handleClear = () => {
    setSearch('')
    setTipoClientList('')
    replace(pathname)
  }

  const handleSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTipoClientList(e.target.value);
    // @ts-ignore
    debouncedSearch(e.target.value, 'tipo')
  };

  return (
      <section>
        <form ref={formRef} onSubmit={handleSubmit} className="mb-4 flex items-center gap-x-4">
          <Input placeholder="Buscar cliente" className="rounded-md max-w-72" value={search} onChange={handleSearch} />
          <Select label="Tipo de cliente" classNames={{ mainWrapper: "max-w-72" }} size="sm" selectedKeys={[tipoClientList]} onChange={handleSelectionChange}>
            {
              tipoCliente!?.map((tipo) => (
                  <SelectItem key={tipo.tipoclienteid} value={tipo.tipoclienteid}>{tipo.tipo_cliente}</SelectItem>
              ))
            }
          </Select>
          <Button type="button" onPress={handleClear} className="shrink-0">Limpiar filtros</Button>
        </form>
      </section>
  )
}