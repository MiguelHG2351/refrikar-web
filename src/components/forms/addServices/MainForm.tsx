'use client'
import {Button} from "@nextui-org/react";
import CreateAndAddClient from "./CreateAndAddClient";
import {useAppDispatch, useAppSelector} from '@/hooks/redux'
import DetallesForm from "./DetallesForm";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell
} from "@nextui-org/table";
import {useCreateServiceMutation, useGetTipoServiciosQuery} from "@/storage/api/service";
import { toast } from "react-toastify";
import {clearCliente, clearDetalleServicio} from "@/storage/serviceSlice";
import {Link} from "@nextui-org/link";

export default function AddServiceForm() {
  const service = useAppSelector(state => state.addService)
  const dispatch = useAppDispatch()
  const { data: tipoServicios, isLoading: isLoadingTipoServicios } = useGetTipoServiciosQuery('')
  const [onService, { isLoading, isError, error }] = useCreateServiceMutation()

  const handlerAddService = () => {
    if (service.detalle_servicio.length === 0) {
      toast('Debe haber al menos un detalle de servicio', {
        type: 'error'
      })
      return
    }
    onService(service).unwrap()
        .then((data) => {
          toast('Servicio creado', {
            type: 'success'
          })
          dispatch(clearCliente());
          dispatch(clearDetalleServicio());
        })
        .catch((error) => {
          toast('Error al crear el servicio', {
            type: 'error'
          })
        })
    // debe haber al menos un detalle para poder crear la factura
  }

  return (
    <>
      <div className="flex flex-wrap gap-4">
        <div className="mt-12 flex flex-col w-full gap-y-4">
          <CreateAndAddClient />
        </div>
        <div className="flex flex-col w-full gap-y-2">
          <div className="flex items-center justify-between">
            <h3 className="font-medium">Detalles de servicio</h3>
            <DetallesForm/>
          </div>
          <Table aria-label="Example static collection table">
            <TableHeader>
              <TableColumn>Tipo de servicio</TableColumn>
              <TableColumn>Costo</TableColumn>
              <TableColumn>Descripción</TableColumn>
              <TableColumn>Dirección</TableColumn>
              <TableColumn>Equipo</TableColumn>
              <TableColumn>Recursos</TableColumn>
            </TableHeader>
            <TableBody>
              {service.detalle_servicio.length == 0 ?
                <TableRow key="1">
                  <TableCell>Vacío</TableCell>
                  <TableCell>Vacío</TableCell>
                  <TableCell>Vacío</TableCell>
                  <TableCell>Vacío</TableCell>
                  <TableCell>Vacío</TableCell>
                  <TableCell>Vacío</TableCell>
                </TableRow>
               :
                service.detalle_servicio.map((detalle) => (
                  <TableRow key={detalle.tiposervicioid}>
                    <TableCell>{tipoServicios?.find(tipo => tipo.tiposervicioid === detalle.tiposervicioid)?.tipo}</TableCell>
                    <TableCell>{detalle.costo}</TableCell>
                    <TableCell>{detalle.descripcion}</TableCell>
                    <TableCell>{detalle.direccion}</TableCell>
                    <TableCell>{detalle.equipoid}</TableCell>
                    <TableCell>
                      <Button type="button" variant="shadow">Ver recursos</Button>
                    </TableCell>
                  </TableRow>
                ))
               }
            </TableBody>
          </Table>

        </div>
        <footer className="flex gap-x-2 justify-end">
          <Button as={Link} href="/home/servicios" type="button" variant="shadow" color="primary">Volver a servicios</Button>
          <Button type="button" variant="shadow" color="primary" onClick={handlerAddService}>Agregar servicio</Button>
        </footer>
      </div>
    </>
  )
}
