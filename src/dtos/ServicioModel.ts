export interface ServicioModel {
  servicioid: String;
  clienteid: String | null;
  clientes: {
    "clienteid": String | undefined,
    "tipoclienteid": String,
    "nombre": String,
    "apellido": String,
    "telefono": number,
    "entidad": String,
    "ruc": String,
    "tipo_cliente": {
      "tipoclienteid": String,
      "tipo_cliente": String
    }
  }
  detalle_servicio: {
    "detalleservicioid": String,
    "tiposervicioid": String,
    "equipoid": String,
    "servicioid": String,
    "descripcion": String,
    "costo": String,
    "fecha": String,
    "direccion": String
  }[]
}
