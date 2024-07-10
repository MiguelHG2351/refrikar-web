'use client'
import {DateRangePicker } from "@tremor/react";
import { useRouter } from "next/navigation";
import {getLatestEgresos, getSumAndAllEgresosByDate, SumOfEgresosByDate} from "@/services/Egresos";
import LineChart from "@/components/charts/Line";

const datahero = [
  {
    name: 'Noche Holding AG',
    value: 9800,
  },
  {
    name: 'Rain Drop AG',
    value: 4567,
  },
  {
    name: 'Push Rail AG',
    value: 3908,
  },
  {
    name: 'Flow Steal AG',
    value: 2400,
  },
  {
    name: 'Tiny Loop Inc.',
    value: 2174,
  },
  {
    name: 'Anton Resorts Holding',
    value: 1398,
  },
];

const dataFormatter = (number: number) =>
    `$ ${Intl.NumberFormat('us').format(number).toString()}`;
export default function EgresosList({ sumAndAllEgresos }: { sumAndAllEgresos: SumOfEgresosByDate }) {
  const { replace } = useRouter()
  const handleChange = (e) => {
    const from = e.from;
    const to = e.to;

    if (from && to) {
      replace(`/home/egresos?start_date=${from}&end_date=${to}`)
    }

  }

  return (
      <div className="overflow-hidden pb-8">
        <div className="px-4">
          <div className="flex justify-between">
            <div>
              <div className="flex items-center gap-x-2 mt-4">
                <h2 className="font-bold">Ganancias</h2>
                <span className="bg-green-400 px-2 rounded-xl">+21%</span>
              </div>
              <h3 className="font-bold text-4xl mt-2">C$ {`${new Intl.NumberFormat('us').format(sumAndAllEgresos[0]._sum?.monto as number).toString()}`}</h3>
            </div>
            <div>
              <DateRangePicker className="mx-auto max-w-md" onValueChange={handleChange}/>
            </div>
          </div>
          <LineChart egresos={sumAndAllEgresos[1]}/>
        </div>
      </div>
  )
}