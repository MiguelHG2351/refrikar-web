import prisma from "@/config/prisma";
import {NextRequest, NextResponse} from "next/server";

export async function GET(req: NextRequest, props: { params: Promise<{ cliente_id: string }> }) {
  const params = await props.params;
  const user_id = params.cliente_id;
  const cliente = await prisma.clientes.findUnique({
    where: {
      clienteid: user_id
    },
  });

  return NextResponse.json(cliente)
}