import { NextResponse, NextRequest } from "next/server";
import prisma from "@/config/prisma";

export async function GET(req: NextRequest) {
  // const { cliente_id } = await req.json()

  let suministros = await prisma.proveedores.findMany({
    include: {
      suministro: {
        include: {
          detalle_suministro: {
            include: {
              productos: true
            }
          }
        }
      }
    }
  })

  return NextResponse.json(suministros)
}