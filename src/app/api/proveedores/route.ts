import { NextResponse, type NextRequest } from "next/server";
import prisma from "@/config/prisma";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  let datos;

  if (searchParams.get("search")!?.length > 0) {
    datos = await prisma.proveedores.findMany({
      where: {
        nombre: {
          contains: searchParams.get("search") as string,
        },
      },
    });
  } else {
    datos = await prisma.proveedores.findMany();
  }
  return NextResponse.json(datos);
}

export async function POST(req: NextRequest) {
  const body = await req.json();

  const proveedoresObj = {
    nombre: body.nombre,
    apellido: body.apellido,
    telefono: body.telefono,
    direccion: body.direccion,
    ruc: body.ruc,
  };
  const proveedorcount = await prisma.proveedores.count();

  const proveedores = await prisma.proveedores.create({
    data: {
      proveedorid: `${proveedorcount + 1}`.padStart(7, "PV00000"),
      nombre: proveedoresObj.nombre,
      apellido: proveedoresObj.apellido,
      telefono: proveedoresObj.telefono,
      direccion: proveedoresObj.direccion,
      ruc: proveedoresObj.ruc,
    },
  });

  return NextResponse.json(proveedores);
}

export async function PUT(req: NextRequest){
  const body = await req.json();
  try {
    await prisma.proveedores.update({
      where: {
        proveedorid:body.proveedorid
      }, 
      data: {
        nombre:body.nombre,
        apellido:body.apellido,
        telefono: body.telefono,
        direccion: body.direccion,
        ruc: body.ruc,
      }
    })
    return NextResponse.json({message:'El proveedor se actualizo'})
  } catch {
    return NextResponse.json({error:'Error al actualizar proveedor'})
  }
  

}
