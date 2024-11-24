import { NextPage } from "next";
import ClienteList from "@/components/cards/clientes/ClienteList";
import {Metadata} from "next";
import SearchClientes from "@/components/forms/clientes/SearchClientes";

export const metadata: Metadata = {
  title: "Clientes | Refrikar",
}

type Params = Promise<{ search: string }>
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

export default async function (props: {
  params: Params,
  searchParams: SearchParams
}) {
  const querySearch = await props.params;

  return (
      <section className="px-6 py-4 min-h-[calc(100vh_-_59px]">
        <SearchClientes querySearch={undefined} queryTipo={undefined} />
        <ClienteList />
      </section>
  )
}
