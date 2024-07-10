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
        pago_empleado: {
          include: {
            empleados: true
          }
        }
        },
      where: {
        fecha: {
          gte: startDate,
          lte: endDate
        },
      }
    }),
  ])

  return sumAndData
}

export type SumOfEgresosByDate = ThenArg<ReturnType<typeof getSumAndAllEgresosByDate>>;

export type LatestEgresos = ThenArg<ReturnType<typeof getLatestEgresos>>;


