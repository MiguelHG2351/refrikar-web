import { TipoServicio } from "@/dtos"

export const servicioAdapter = (responseData: any[]): any[] => {
    const mappedData = responseData.map((data: any) => {
        const servicio = {
            servicioid: data.servicioid,
            fecha: data.fecha,
            clientes: {
                clienteid: data.clientes.clienteid,
                nombre: data.clientes.nombre,
                apellido: data.clientes.apellido,
                tipo_cliente: {
                    tipoclienteid: data.clientes.tipo_cliente.tipoclienteid,
                    tipo: data.clientes.tipo_cliente.tipo_cliente
                }
            },
            detalle_servicio: data.detalle_servicio.map((detalle: any) => {
                return {
                    detalleservicioid: detalle.detalleservicioid,
                    descripcion: detalle.descripcion,
                    costo: detalle.costo,
                    fecha: detalle.fecha,
                    direccion: detalle.direccion,
                }
            })
        }

        return servicio
    })

    return mappedData
}
export const tipoServicioAdapter = (responseData: any[]): TipoServicio[] => {
    const mappedData = responseData.map((data: any) => {
        const tipoServicio: TipoServicio = {
            tiposervicioid: data.tiposervicioid,
            tipo: data.tipo,
            descripcion: data.descripcion
        }

        return tipoServicio
    })

    return mappedData
}