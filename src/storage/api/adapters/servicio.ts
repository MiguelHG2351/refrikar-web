import { TipoServicio } from "@/dtos"

export const servicioAdapter = (responseData: any[]): any[] => {
    console.log(responseData)
    const mappedData = responseData.map((data: any) => {
        const servicio = {
            servicioid: data.servicioid,
            fecha: data.createdAt,
            factura_date: data.factura_date,
            clientes: {
                clienteid: data.clientes.clienteid,
                nombre: data.clientes.nombre,
                apellido: data.clientes.apellido,
                ruc: data.clientes.ruc,
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
                    tipo_servicio: {
                        tiposervicioid: detalle.tipo_servicio.tiposervicioid,
                        tipo: detalle.tipo_servicio.tipo
                    }
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