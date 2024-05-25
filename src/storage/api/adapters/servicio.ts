import { TipoServicio } from "@/dtos"

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