import { NextResponse, type NextRequest } from 'next/server'
import prisma from "@/config/prisma";

export async function GET() {

  const equipos = await prisma.equipo.findMany()

  return NextResponse.json(equipos)
}
