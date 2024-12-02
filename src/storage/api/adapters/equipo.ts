import { Equipo, TipoEquipo } from "@/dtos"

export const equipoAdapter = (responseData: any[]): Equipo[] => {
  const mappedData = responseData.map((data: any) => {
    const equipo: Equipo = {
      equipoid: data.equipoid,
      tipoequipoid: data.tipoequipoid,
      capacidad: data.capacidad,
      marca: data.marca,
      numero_serie: data.numero_serie,
    }
    
    return equipo
  })

  return mappedData
}

export const tipoEquipoAdapter = (responseData: any[]): TipoEquipo[] => {
  const mappedData = responseData.map((data: any) => {
    const tipoEquipo: TipoEquipo = {
      tipoequipoid: data.tipoequipoid,
      tipo: data.tipo,
      descripcion: data.descripcion
    }

    return tipoEquipo
  })

  return mappedData
}

