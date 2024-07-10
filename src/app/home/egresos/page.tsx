import LineChart from "@/components/charts/Line";
import {Metadata} from "next";
import { List, ListItem } from '@tremor/react';
import {getLatestEgresos, getSumAndAllEgresosByDate} from "@/services/Egresos";
import {DateInputFormat} from "@/utils/date";
import { DateRangePicker } from '@tremor/react';
import EgresosList from "@/components/charts/EgresosList";
import Link from "next/link";
import {Button} from "@nextui-org/react";
import DetalleEgresoModal from "@/components/modals/egresos/DetalleEgresoModal";

export const metadata: Metadata ={
  title: "Egresos",
  description: "En esta sección podrá ver los egresos realizados y un promedio de cada uno",
}


export default  async function Egresos({ searchParams }: { searchParams?: { [key: string]: string | undefined }; }) {
  const egresosList = await getLatestEgresos()
  const startData = searchParams?.start_date ? new Date(searchParams.start_date) : new Date('2024-07-01')
  const endData = searchParams?.end_date ? new Date(searchParams.end_date) : new Date('2024-07-22')
  const sumAndAllEgresos = await getSumAndAllEgresosByDate(new Date(startData), new Date(endData))

  return (
      <section className="px-6 py-4 h-[calc(100vh - 59px)]">
        <h1 className="text-2xl font-bold">Egresos</h1>
        <EgresosList sumAndAllEgresos={sumAndAllEgresos} />
        <Button href="/home/egresos?start_date=2024-06-01&end_date=2024-06-30" as={Link}>test</Button>
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