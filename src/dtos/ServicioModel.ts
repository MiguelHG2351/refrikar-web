export interface ServicioModel {
  servicioid: string;
  clienteid: string | null;
  createdAt: Date;
  factura_date: Date | null;
  clientes: {
    "clienteid": string | undefined,
    "tipoclienteid": string,
    "nombre": string,
    "apellido": string,
    "telefono": string | undefined,
    "entidad": string,
    "ruc": string,
    "tipo_cliente": {
      "tipoclienteid": string,
      "tipo_cliente": string
    }
  }
  detalle_servicio: {
    "detalleservicioid": string,
    "tiposervicioid": string,
    "tipo_servicio": {
      "tiposervicioid": string,
      "tipo": string
    },
    "equipoid": string,
    "servicioid": string,
    "descripcion": string,
    "costo": string,
    "fecha": string,
    "direccion": string
  }[]
}
