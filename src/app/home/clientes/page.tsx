import ClienteList from "@/components/cards/clientes/ClienteList";
import {Metadata} from "next";
import {getClientes} from "@/services/Clientes";

export const metadata: Metadata = {
  title: "Clientes | Refrikar",
}

export default async function ClientesPage() {

  return (
      <section className="px-6 py-4 min-h-[calc(100vh_-_59px]">
        <ClienteList />
      </section>
  )
}