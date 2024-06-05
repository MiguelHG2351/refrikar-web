import { Proveedores } from "@/dtos"

export const proveedoresAdapter = (responseData: any[]): Proveedores[] => {
    const mappedData = responseData.map((data: any) => {
        const proveedoresData: Proveedores = {
          ruc: data.ruc,
          proveedorid: data.proveedorid,
          nombre: data.nombre,
          apellido: data.apellido,
          telefono: data.telefono,
          direccion: data.direccion
        }

        return proveedoresData
    })

    return mappedData
}