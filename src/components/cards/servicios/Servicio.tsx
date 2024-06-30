import { DateInputFormat } from "@/utils/date";
import BtnViewService from "./btnAddService";
import {ServicioModel} from "@/dtos";

export default function Servicio({ data }: {data: ServicioModel}) {
  console.log(data)
  return (
    <div className="flex flex-col justify-between shadow-card-secondary pt-4 overflow-hidden rounded-md">
      <div className="py-2 px-2">
        <p className="font-bold">{`${data.clientes.nombre} ${data.clientes.apellido}`}</p>
        <p className="font-medium">{data.detalle_servicio[0].descripcion}</p>
        <div className="mt-4">
          <p className="font-medium">{data.clientes.ruc}</p>
          <p className="font-medium">{ DateInputFormat(data.detalle_servicio[0].fecha as string) }</p>
          <div className="flex flex-wrap gap-2">
            {
              data.detalle_servicio.map((detalle: any) => (
                <span key={detalle.detalleservicioid} className="p-1 bg-primary text-sm text-white rounded-md">{detalle.tipo_servicio.tipo}</span>
              ))
            }
          </div>
          <p className="font-bold">Total: C$ {data.detalle_servicio.reduce((acc: number, curr: any) => acc + (curr.costo - 0), 0)}</p>
        </div>
      </div>
      <BtnViewService serviceId={data.servicioid} />
    </div>
  )
}
