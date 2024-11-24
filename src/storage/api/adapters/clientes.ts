import { Cliente, TipoCliente } from "@/dtos"

export const clienteAdapter = (responseData: any[]): Cliente[] => {
  console.log(responseData)
  const mappedData = responseData.map((data: any) => {
    const cliente: Cliente = {
      ruc: data.ruc,
      entidad: data.entidad || 'Sin entidad',
      clienteid: data.clienteid,
      nombre: data.nombre,
      apellido: data.apellido,
      telefono: data.telefono,
      tipo_cliente: {
        tipoclienteid: data.tipo_cliente?.tipoclienteid,
        tipo_cliente: data.tipo_cliente?.tipo_cliente
      },
    }
    
    return cliente
  })

  return mappedData
}

export const tipoClienteAdapter = (responseData: any[]): TipoCliente[] => {
  const mappedData = responseData.map((data: any) => {
    const tipo_cliente: TipoCliente = {
      tipoclienteid: data.tipoclienteid,
      tipo_cliente: data.tipo_cliente
    }
    
    return tipo_cliente
  })

  return mappedData
}