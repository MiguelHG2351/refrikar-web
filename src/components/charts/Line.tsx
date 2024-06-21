'use client'

import { LineChart } from '@tremor/react';
import {SumOfEgresosByDate} from "@/services/Egresos";

const chartdata = [
  {
    date: 'Jan 22',
    'PagoEmpleado': 2890,
    'Suministros': 2338,
  },
  {
    date: 'Feb 22',
    'PagoEmpleado': 2756,
    'Suministros': 2103,
  },
  {
    date: 'Mar 22',
    'PagoEmpleado': 3322,
    'Suministros': 2194,
  },
  {
    date: 'Mar 22',
    'PagoEmpleado': 3322,
    'Suministros': 0  ,
  },
  {
    date: 'Apr 22',
    'PagoEmpleado': 3470,
    'Suministros': 2108,
  },
  {
    date: 'May 22',
    'PagoEmpleado': 3475,
    'Suministros': 1812,
  },
  {
    date: 'Jun 22',
    'PagoEmpleado': 3129,
    'Suministros': 1726,
  },
  {
    date: 'Jul 22',
    'PagoEmpleado': 3490,
    'Suministros': 1982,
  },
  {
    date: 'Aug 22',
    'PagoEmpleado': 2903,
    'Suministros': 2012,
  },
  {
    date: 'Sep 22',
    'PagoEmpleado': 2643,
    'Suministros': 2342,
  },
  {
    date: 'Oct 22',
    'PagoEmpleado': 2837,
    'Suministros': 2473,
  },
  {
    date: 'Nov 22',
    'PagoEmpleado': 2954,
    'Suministros': 3848,
  },
  {
    date: 'Dec 22',
    'PagoEmpleado': 3239,
    'Suministros': 3736,
  },
];

const valueFormatter = function (number: number) {
  return 'C$ ' + new Intl.NumberFormat('us').format(number).toString();
};

export default function LineChartUsageExample({ egresos }: { egresos: SumOfEgresosByDate[1] }) {
  console.log(egresos)

  return (
      <>
        <LineChart
            className="mt-4 h-72"
            data={chartdata}
            index="date"
            yAxisWidth={82}
            categories={['PagoEmpleado', 'Suministros']}
            colors={['indigo', 'cyan']}
            valueFormatter={valueFormatter}
        />
      </>
  );
}