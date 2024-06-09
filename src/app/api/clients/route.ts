import { NextResponse, type NextRequest } from 'next/server'
import prisma from "@/config/prisma";
import { ClienteCreateRequest } from '@/dtos/Cliente';


export async function GET() {
  const servicesCount = await prisma.clientes.findMany({
    include: {
      tipo_cliente: true
    }
  });
  
  return NextResponse.json(servicesCount)
}

export async function POST(req: NextRequest) {
  const body: ClienteCreateRequest  = await req.json()

  const clienteObj: ClienteCreateRequest = {
    ruc: body.ruc,
    nombre: body.nombre,
    apellido: body.apellido,
    telefono: body.telefono,
    entidad: body.entidad,
    tipoclienteid: body.tipoclienteid
  }

  const clientCount = await prisma.clientes.count()

  const client = await prisma.clientes.create({
    data: {
      clienteid: `${clientCount + 1}`.padStart(5, 'C0020'),
      ruc: clienteObj.ruc,
      nombre: clienteObj.nombre,
      apellido: clienteObj.apellido,
      telefono: clienteObj.telefono,
      entidad: clienteObj.entidad,
      tipo_cliente: {
        connect: {
          tipoclienteid: clienteObj.tipoclienteid
        }
      }
    }
  })

  return NextResponse.json(client)
}

export async function PUT(req: NextRequest) {
  const body = await req.json()
  const availableFields = ['nombre', 'apellido', 'entidad', 'clienteid']

  console.log()
  if (Object.keys(body).some(key => !availableFields.includes(key))) {
    return NextResponse.json({
      error: 'Invalid fields'
    }, {
      status: 400
    })
  }

  const cliente = await prisma.clientes.update({
    where: {
      clienteid: body.clienteid
    },
    data: body
  });

  return NextResponse.json(cliente)
}
