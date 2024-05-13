import { TipoCliente } from "@/dtos/tipoCliente"

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