import {Metadata} from "next";
import { List, ListItem } from '@tremor/react';
import {getLatestEgresos, getSumAndAllEgresosByDate} from "@/services/Egresos";
import {DateInputFormat} from "@/utils/date";
import EgresosList from "@/components/charts/EgresosList";
import DetalleEgresoModal from "@/components/modals/egresos/DetalleEgresoModal";
import {currentUser} from "@clerk/nextjs/server";
import { SearchParams } from "@/utils/types";

export const metadata: Metadata ={
  title: "Egresos",
  description: "En esta sección podrá ver los egresos realizados y un promedio de cada uno",
}

type Params = Promise<{
  start_date: string;
  end_date: string;
}>

export default  async function (props: {
  params: Params,
  searchParams: SearchParams
}) {
  const querySearch = await props.params;
  // const egresosList = await getLatestEgresos()
  const startData = querySearch?.start_date ? new Date(querySearch.start_date) : new Date('2024-07-01')
  const endData = querySearch?.end_date ? new Date(querySearch.end_date) : new Date('2024-07-22')
  const sumAndAllEgresos = await getSumAndAllEgresosByDate(new Date(startData), new Date(endData))

  const user = await currentUser()

  if (user?.privateMetadata?.role === 'user') {
    return (
        <div className="px-6 flex items-center justify-center h-[calc(100vh_-_59px)]">
          <h2 className="font-bold text-2xl">No tienes permisos para acceder a esta sección</h2>
        </div>
    )
  }

  return (
      <section className="px-6 py-4 h-[calc(100vh - 59px)]">
        <h1 className="text-2xl font-bold">Egresos</h1>
        <EgresosList sumAndAllEgresos={sumAndAllEgresos} />
        <List>
          {
            sumAndAllEgresos[1].map((egreso) => {
              const egresoTypes = {
                gastos_varios: 'Gastos varios',
                pago_empleado: 'Pago empleado',
                suministro: 'Suministro',
                pago_impuesto: 'Pago impuesto'
              };
              const tipo = Object.keys(egresoTypes).find((key) => egreso[key as keyof typeof egresoTypes].length > 0)
              return (
                  <ListItem key={egreso.egresoid} className="cursor-pointer">
                    <div className="flex flex-col">
                      <p>{`${egresoTypes[tipo as keyof typeof egresoTypes]}: C$${egreso.monto?.toString()}`}</p>
                      <p>{DateInputFormat(egreso.fecha?.toString())}</p>
                    </div>

                    <DetalleEgresoModal egreso={egreso} />
                  </ListItem>
              )
            })
          }
        </List>

      </section>
  )
}