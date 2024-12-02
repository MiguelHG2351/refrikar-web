import { NextRequest } from "next/server";
import prisma from "@/config/prisma";

export async function GET(req: NextRequest) {
  
  const tipos = await prisma.tipo_equipo.findMany()
  return Response.json(tipos)
}
