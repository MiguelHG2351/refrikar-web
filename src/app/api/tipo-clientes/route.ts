import { NextResponse, type NextRequest } from 'next/server'
import prisma from "@/config/prisma";


export async function GET() {
  const servicesCount = await prisma.tipo_cliente.findMany();
  
  return NextResponse.json(servicesCount)
}