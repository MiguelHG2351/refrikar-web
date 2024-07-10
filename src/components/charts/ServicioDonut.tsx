'use client'
import {DonutChart, Legend} from "@tremor/react";

const sales = [
  {
    name: 'Mantenimiento preventivo',
    venta: 1999,
  },
  {
    name: 'General',
    venta: 4900,
  },
  {
    name: 'Desintalación A/C',
    venta: 985,
  },
  {
    name: 'San Francisco',
    venta: 240,
  },
  {
    name: 'Singapore',
    venta: 190,
  },
];

const valueFormatter = (number: number) =>
    `$ ${Intl.NumberFormat('us').format(number).toString()}`;

export default function ServicioDonut() {
  return (
      <section className="flex items-center gap-x-8">
        <DonutChart
            data={sales}
            category="venta"
            index="name"
            valueFormatter={valueFormatter}
            colors={['blue', 'cyan', 'indigo', 'violet', 'fuchsia']}
            className="w-40"
        />
        <Legend
            categories={['Mantenimiento preventivo', 'General', 'Desintalación A/C', 'San Francisco', 'Singapore']}
            colors={['blue', 'cyan', 'indigo', 'violet', 'fuchsia']}
            className="max-w-xs"
        />
      </section>
  )
}