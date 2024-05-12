import { NextResponse, type NextRequest } from 'next/server'
import prisma from "@/config/prisma";


export async function GET() {
  const servicesCount = await prisma.clientes.findMany();
  
  return NextResponse.json(servicesCount)
}