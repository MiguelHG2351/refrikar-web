import {Suministro} from "@/dtos/Suministro";

export const suministroAdapter = (responseData: any[]): Suministro[] => {
  return responseData.map((data: any) => {
    const suministro: Suministro = {
      proveedorid: data.proveedorid,
      nombre: data.nombre,
      apellido: data.apellido,
      telefono: data.telefono,
      direccion: data.direccion,
      ruc: data.ruc,
      suministro: data.suministro.map((suministro: any) => {
        return {
          suministroid: suministro.suministroid,
          proveedorid: suministro.proveedorid,
          egresoid: suministro.egresoid,
          detalle_suministro: suministro.detalle_suministro.map((detalle: any) => {
            return {
              detallesuministroid: detalle.detallesuministroid,
              suministroid: detalle.suministroid,
              productoid: detalle.productoid,
              costo: detalle.costo,
              cantidad: detalle.cantidad,
              productos: {
                productoid: detalle.productos.productoid,
                categoriaid: detalle.productos.categoriaid,
                nombre: detalle.productos.nombre
              }
            }
          })
        }
      })
    }

    return suministro
  })
}
