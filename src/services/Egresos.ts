import {ThenArg} from './type'
import prisma from "@/config/prisma";

export async function getLatestEgresos() {
  const productos = await prisma.egresos.findMany({
    orderBy: {
      fecha: 'desc'
    },
    include: {
      gastos_varios: true,
      pago_empleado: true,
      suministro: true,
      pago_impuesto: true
    },
    take: 28
  })

  return productos
}

export async function getSumAndAllEgresosByDate(startDate: Date, endDate: Date) {

  const sumAndData = await prisma.$transaction([
      prisma.egresos.aggregate({
        _sum: {
          monto: true
        },
        where: {
          fecha: {
            gte: startDate,
            lte: endDate
          },
        },
      }),
    prisma.egresos.findMany({
      include: {
        gastos_varios: true,
        pago_impuesto: true,
        suministro: true,
        pago_empleado: true
        },
      where: {
        fecha: {
          gte: startDate,
          lte: endDate
        },
      }
    }),
  ])

  const categories = {
    gastos_varios: [] as any,
    pago_empleado: [] as any,
    suministro: [] as any,
    pago_impuesto: [] as any
  }

  sumAndData[1].forEach((egreso) => {
    const tipo = Object.keys(categories).find((key) => egreso[key as keyof typeof categories].length > 0)
    categories[tipo as keyof typeof categories].push({
      date: egreso.fecha,
      monto: egreso.monto?.toNumber() as number
    })
  })

  return [sumAndData[0], categories]
}

export type SumOfEgresosByDate = ThenArg<ReturnType<typeof getSumAndAllEgresosByDate>>;

export type LatestEgresos = ThenArg<ReturnType<typeof getLatestEgresos>>;


