import { NextResponse, type NextRequest } from 'next/server'
import prisma from "@/config/prisma";

export async function GET() {
    const tipoServicios = await prisma.tipo_servicio.findMany()

    return NextResponse.json(tipoServicios)
}