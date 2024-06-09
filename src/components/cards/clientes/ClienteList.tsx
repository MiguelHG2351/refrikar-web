import {getClientes} from "@/services/Clientes";
import ClienteItem from "@/components/cards/clientes/ClienteItem";

export default async function ClienteList() {
  const clientes = await getClientes()

  return (
      <section className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {clientes.map((cliente) => (
            <ClienteItem cliente={cliente} key={cliente.clienteid}/>
        ))}
      </section>
  )
}