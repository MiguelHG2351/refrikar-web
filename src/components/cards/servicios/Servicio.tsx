import { DateInputFormat } from "@/utils/date";
import BtnViewService from "./btnAddService";

export default function Servicio({ data }: {data: any}) {
  return (
    <div className="flex flex-col shadow-card-secondary pt-4 overflow-hidden rounded-md">
      <span className="flex justify-between px-2">
        <p className="font-bold">{data.clientes.clienteid}</p>
        <p className="font-bold">{data.clientes.tipo_cliente.tipo_cliente}</p>
      </span>
      <div className="py-2 px-2">
        <p className="">Cliente {`${data.clientes.nombre} ${data.clientes.apellido}`}</p>
        <p>RUC: {data.clientes.ruc}</p>
        <p>Fecha: { DateInputFormat(data.detalle_servicio[0].fecha) }</p>
        <p className="font-bold">Total: C$ {data.detalle_servicio.reduce((acc: number, curr: any) => acc + (curr.costo - 0), 0)}</p>
      </div>
      <BtnViewService serviceId={data.servicioid} />
    </div>
  )
}
