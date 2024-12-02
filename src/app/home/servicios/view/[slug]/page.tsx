import prisma from "@/config/prisma"
import localFont from 'next/font/local'
import Image from "next/image"
import { Prisma } from "@prisma/client"
import { DateInputFormat } from "@/utils/date"
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, getKeyValue } from "@nextui-org/react"
import DetallesServicio from "@/components/table/DetallesServicio"
import { SearchParams } from "@/utils/types";

const refrikarFont = localFont({
  src: '../../../../../fonts/JejuHallasan-Regular.ttf'
})

const servicesWithDetails = Prisma.validator<Prisma.serviciosDefaultArgs>()({
  include: {
    clientes: true,
    detalle_servicio: true
  }
})

async function getServicio(servicioid: string): Promise<any> {
  const data = await prisma.servicios.findUnique({
    where: {
      servicioid: servicioid
    },
    include: {
      clientes: true,
      detalle_servicio: true
    }
  })
  return data
}

type Params = Promise<{
  slug: string
}>

export default async function ViewService(props: {
  params: Params,
  searchParams: SearchParams
}) {

  const querySearch = await props.params;
  const servicio = await getServicio(querySearch.slug)
  
  return (
    <section className="px-6 py-4">
      <div className="flex max-w-[920px] m-auto flex-col items-start">
        <div className="relative">
          <div className="absolute inset-0 pl-6 pt-4 flex justify-between">
            <div className="">
              <h2 className="text-6xl text-white bg-refrikar-gradient bg-clip-text" style={{...refrikarFont.style, WebkitTextFillColor: 'transparent'}}>Refrikar</h2>
              <p className="text-white">Taller de refrigeración y aire acondicionado</p>
              <p className="text-white">Propietaria: Karla Yesenia Rivera Hernandez</p>
            </div>
            <div className="">
              <Image className="max-w-full" src="/images/pingu.png" alt="pinguino de refrikar" width={119} height={166} />
            </div>
          </div>
          <Image className="max-w-full" src="/images/service-bg.png" alt="fondo" width={1023} height={208} />
        </div>
        <div className="flex justify-between w-full pt-4">
          <div className="">
            <p className="font-bold">Cedula/Ruc cliente: {servicio.clientes.ruc}</p>
            <p className="font-bold">Fecha: {DateInputFormat(servicio?.detalle_servicio[0].fecha.toString())}</p>
            <p className="font-bold">Cliente: {`${servicio?.clientes.nombre} ${servicio?.clientes.apellido}`}</p>
            <p className="font-bold">Dirección: {servicio?.detalle_servicio[0].direccion}</p>
          </div>
          <div className="flex flex-col">
            <p className="font-bold">Registro No <b>{servicio.servicioid}</b></p>
            <p className="font-bold">RUC #0011408760008G</p>
          </div>
        </div>
        <div className="pt-4 w-full">
          <DetallesServicio detalles={servicio?.detalle_servicio} />
        </div>
      </div>

    </section>
  )
}
