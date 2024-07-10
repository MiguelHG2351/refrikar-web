import ClienteList from "@/components/cards/clientes/ClienteList";
import {Metadata} from "next";
import {getClientes} from "@/services/ClientesServices";
import SearchClientes from "@/components/forms/clientes/SearchClientes";

export const metadata: Metadata = {
  title: "Clientes | Refrikar",
}

export default async function ClientesPage({ searchParams }: { searchParams?: { [key: string]: string | undefined }; }) {

  return (
      <section className="px-6 py-4 min-h-[calc(100vh_-_59px]">
        <SearchClientes querySearch={searchParams?.search} queryTipo={searchParams?.tipo} />
        <ClienteList />
      </section>
  )
}