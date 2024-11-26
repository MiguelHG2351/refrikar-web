import { NextPage } from "next";
import ClienteList from "@/components/cards/clientes/ClienteList";
import {Metadata} from "next";
import SearchClientes from "@/components/forms/clientes/SearchClientes";

import type { SearchParams } from "@/utils/types";
export type Params = Promise<{ search: string, tipo: string }>

export const metadata: Metadata = {
  title: "Clientes | Refrikar",
}

export default async function (props: {
  params: Params,
  searchParams: SearchParams
}) {
  const querySearch = await props.params;

  return (
      <section className="px-6 py-4 min-h-[calc(100vh_-_59px]">
        <SearchClientes querySearch={querySearch.search} queryTipo={querySearch.tipo} />
        <ClienteList />
      </section>
  )
}
