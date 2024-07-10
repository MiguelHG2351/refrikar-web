'use client'

import { LineChart } from '@tremor/react';
import {SumOfEgresosByDate} from "@/services/Egresos";
import {useMemo} from "react";
import {DateInputFormat} from "@/utils/date";

const chartdata = [
  {
    date: 'Jan 22',
    'PagoEmpleado': 2890,
    'Suministros': 2338,
  },
  {
    date: 'Feb 2244',
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

function formatearFecha(fecha: Date) {
  // Array con los nombres de los meses abreviados
  const mesesAbreviados = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  // Obtener el mes y el día en UTC
  const mes = mesesAbreviados[fecha.getUTCMonth()];
  const dia = fecha.getUTCDate().toString().padStart(2, '0');

  // Formatear la fecha
  return `${mes} ${dia}`;
}

export default function LineChartUsageExample({ egresos }: { egresos: SumOfEgresosByDate[1] }) {
  const egresosList = useMemo(() => {
    const expenseTypes = ['gastos_varios', 'pago_empleado', 'suministro', 'pago_impuesto'];
    const categories = {
      gastos_varios: [] as any,
      pago_empleado: [] as any,
      suministro: [] as any,
      pago_impuesto: [] as any
    };

    egresos.forEach((egreso) => {
      const tipo = Object.keys(categories).find((key) => egreso[key as keyof typeof categories].length > 0)
      categories[tipo as keyof typeof categories].push({
        date: egreso.fecha,
        monto: egreso.monto as unknown as number,
        type: tipo
      })
    })

    const groupedData = {};
    for (const [key, values] of Object.entries(categories)) {
      // set types to item variable (please dont use any type)
      values.forEach((item: any) => {
        const { date, type, monto } = item;
        const formattedDate = formatearFecha(date);

        // @ts-ignore
        if (!groupedData[date]) {
          // @ts-ignore
          groupedData[date] = { date: formattedDate };

          // Inicializar todos los tipos de gasto con 0
          expenseTypes.forEach(expenseType => {
            // @ts-ignore
            groupedData[date][expenseType] = 0;
          });
        }

        // @ts-ignore
        groupedData[date][type] += +monto;
      });
    }

    return Object.values(groupedData);
  }, [egresos]);
  console.log(egresos, egresosList)

  return (
      <>
        <LineChart
            className="mt-4 h-72"
            data={egresosList}
            index="date"
            yAxisWidth={82}
            categories={['gastos_varios', 'pago_empleado', 'suministro', 'pago_impuesto']}
            colors={['indigo', 'cyan', 'green', 'red']}
            valueFormatter={valueFormatter}
        />
      </>
  );
}