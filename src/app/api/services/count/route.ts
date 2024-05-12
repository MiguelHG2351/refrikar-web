import { NextResponse, type NextRequest } from 'next/server'
import prisma from "@/config/prisma";

export const dynamic = 'force-dynamic' // defaults to auto

export async function GET(request: NextRequest) {
  const servicesCount = await prisma.servicios.count();
  
  return NextResponse.json({ total: servicesCount })
}