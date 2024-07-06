import LineChart from "@/components/charts/Line";
import {Metadata} from "next";
import { List, ListItem } from '@tremor/react';
import {getLatestEgresos, getSumAndAllEgresosByDate} from "@/services/Egresos";
import {DateInputFormat} from "@/utils/date";
import { DateRangePicker } from '@tremor/react';

export const metadata: Metadata ={
  title: "Egresos",
  description: "En esta sección podrá ver los egresos realizados y un promedio de cada uno",
}



export default  async function Egresos() {
  const egresosList = await getLatestEgresos()
  const sumAndAllEgresos = await getSumAndAllEgresosByDate(new Date('2024-06-01'), new Date('2024-07-31'))
  return (
      <section className="px-6 py-4 h-[calc(100vh - 59px)]">
        <h1 className="text-2xl font-bold">Egresos</h1>
        <div className="grid grid-cols-[70%_30%] grid-rows-[calc(100vh_-_123px)] overflow-hidden">
          <div className="px-4">
            <div className="flex justify-between">
              <div>
                <div className="flex items-center gap-x-2 mt-4">
                  <h2 className="font-bold">Ganancias</h2>
                  <span className="bg-green-400 px-2 rounded-xl">+21%</span>
                </div>
                <h3 className="font-bold text-4xl mt-2">C$ {`${new Intl.NumberFormat('us').format(sumAndAllEgresos[0]._sum?.monto?.toNumber() as number).toString()}`}</h3>
              </div>
              <div>
                <DateRangePicker className="mx-auto max-w-md" />
              </div>
            </div>
            <LineChart egresos={sumAndAllEgresos[1]} />
          </div>
          <div className="border-l-2 border-gray-400 px-4 overflow-y-auto relative">
            <div className="sticky top-0 bg-accent-1 py-2">
              <h2 className="font-bold text-3xl mb-4">Últimos egresos</h2>
            </div>
            <List>
              {
                egresosList.map((egreso) => {
                  const egresoTypes = {
                    gastos_varios: 'Gastos varios',
                    pago_empleado: 'Pago empleado',
                    suministro: 'Suministro',
                    pago_impuesto: 'Pago impuesto'
                  };
                  const tipo = Object.keys(egresoTypes).find((key) => egreso[key as keyof typeof egresoTypes].length > 0)
                  return (
                      <ListItem key={egreso.egresoid}>
                        <p>{`${egresoTypes[tipo as keyof typeof egresoTypes]}: C$${egreso.monto?.toString()}`}</p>
                        <p>{DateInputFormat(egreso.fecha?.toString())}</p>
                      </ListItem>
                  )
                })
              }
            </List>
          </div>
        </div>

      </section>
  )
}