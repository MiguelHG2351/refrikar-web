import EmpleadosTable from "@/components/table/EmpleadosTable"
import prisma from "@/config/prisma"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Empleados",
  description: "Empleados",
}

async function getEmpleados() {
  const empleados = await prisma.empleados.findMany({
    include: {
      cargo_empleado: true
    }
  })
  return empleados
}

export default async function Empleado() {
  const empleados = await getEmpleados()
  
  return (
    <section className="py-4 px-2">
      <EmpleadosTable empleados={empleados} />
    </section>
  )
}
