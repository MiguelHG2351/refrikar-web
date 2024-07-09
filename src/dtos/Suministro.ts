export interface Suministro {
  "proveedorid": string,
  "nombre": string,
  "apellido"?: string,
  "telefono": number,
  "direccion": string,
  "ruc": string,
  "suministro": {
    "suministroid": string,
    "proveedorid": string,
    "egresoid": string,
    "detalle_suministro": {
      "detallesuministroid": string,
      "suministroid": string,
      "productoid": string,
      "costo": string,
      "cantidad": number,
      "productos": {
        "productoid": string,
        "categoriaid": string,
        "nombre": string
      }
    }[]
  }[]
}