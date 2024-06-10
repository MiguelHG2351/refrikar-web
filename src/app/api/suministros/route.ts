import prisma from "@/config/prisma";
import {NextResponse} from "next/server";

export async function GET() {

  const productos = await prisma.equipo.findMany()

  return NextResponse.json(productos)
}
