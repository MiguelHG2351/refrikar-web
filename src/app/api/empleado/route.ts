import { NextResponse, type NextRequest } from 'next/server'
import prisma from "@/config/prisma";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)

  if (searchParams.get('cargo')) {
    const empleados = await prisma.empleados.findMany({
      where: {
        cargo_empleado: {
          nombre: {
            equals: searchParams.get('cargo')
          }
        }
      }
    })
    return NextResponse.json(empleados)
  } else {
    const empleados = await prisma.empleados.findMany()
    return NextResponse.json(empleados)
  }
  

}
