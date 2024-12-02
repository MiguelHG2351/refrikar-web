'use client'
import {Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure} from "@nextui-org/react";
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
import {AddServiceState, clearCliente, clearDetalleServicio} from "@/storage/serviceSlice";
import {Link} from "@nextui-org/link";
import { useState } from "react";

export default function AddServiceForm() {
  const service = useAppSelector(state => state.addService)
  const dispatch = useAppDispatch()
  const { data: tipoServicios, isLoading: isLoadingTipoServicios } = useGetTipoServiciosQuery('')
  const [onService, { isLoading, isError, error }] = useCreateServiceMutation()
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [ equipo, setEquipo ] = useState<AddServiceState["detalle_servicio"][0]['equipo']>()
  

  const handlerAddService = () => {
    if (service.cliente.tipo_cliente.tipo_clienteid === '' && service.detalle_servicio.length === 0) {
      toast('Debe haber al menos un detalle de servicio y un tipo de cliente', {
        type: 'error'
      })
      return
    }
    
    if (service.detalle_servicio.length === 0) {
      toast('Debe haber al menos un detalle de servicio', {
        type: 'error'
      })
      return
    }
    if (service.cliente.tipo_cliente.tipo_clienteid === '') {
      toast('Debe seleccionar un tipo de cliente', {
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
      <div className="flex max-w-[920px] m-auto flex-col items-start gap-y-6">
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
                service.detalle_servicio.map((detalle, key) => {
                  let tipoDeServicio = tipoServicios?.find(tipo => {
                    if (detalle.tiposervicioid === tipo.tiposervicioid) {
                      return tipo
                    }
                    if (detalle.equipo?.tipo_equipo === tipo.tiposervicioid) {
                      return tipo
                    }
                  })

                  return (
                    <TableRow key={`detalle-${detalle.tiposervicioid}`}>
                      <TableCell>{tipoDeServicio?.tipo || ''}</TableCell>
                      <TableCell>{detalle.costo}</TableCell>
                      <TableCell>{detalle.descripcion}</TableCell>
                      <TableCell>{detalle.direccion}</TableCell>
                      <TableCell>
                        {
                          detalle.equipoid ? (
                            <p>
                              {detalle.equipoid}
                            </p>
                          ) : (
                            <Button onPress={() => {
                              onOpen()
                              if (detalle.equipo)
                                return setEquipo(detalle.equipo)
    
                              // setEquipo({
                              //   capacidad: detalle.equipoid?.capacidad as number,
                              //   marca: detalle.equipo?.marca as string,
                              //   tipo_equipo: detalle.equipo?.tipo_equipo as string,
                              //   numero_serie: detalle.equipo?.numero_serie as string
                              // })
                            }}>Ver equipo</Button>
                          )
                        }
                      </TableCell>
                      <TableCell>
                        <Button type="button" variant="shadow">Ver recursos</Button>
                      </TableCell>
                    </TableRow>
                  )
                })
               }
            </TableBody>
          </Table>
          <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
              {(onClose) => {
                let tipoDeServicio = tipoServicios?.find(tipo => {
                  if (equipo?.tipo_equipo === tipo.tiposervicioid) {
                    return tipo
                  }
                })
                
                return (
                  <>
                    <ModalHeader className="flex flex-col gap-1">Datos del equipo</ModalHeader>
                    <ModalBody>
                      <div>
                        <p>Tipo de servicio: { tipoDeServicio?.tipo }</p>
                        <p>Nombre del equipo: {equipo?.capacidad}</p>
                        <p>Marca: {equipo?.marca}</p>
                      </div>
                    </ModalBody>
                    <ModalFooter>
                      <Button color="danger" variant="light" onPress={onClose}>
                        Close
                      </Button>
                      <Button color="primary" onPress={onClose}>
                        Action
                      </Button>
                    </ModalFooter>
                  </>
                )
              }}
            </ModalContent>
          </Modal>
        </div>
        <footer className="flex gap-x-2 justify-end">
          <Button as={Link} href="/home/servicios" type="button" variant="shadow" color="primary">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M20 11H7.83L13.42 5.41L12 4L4 12L12 20L13.41 18.59L7.83 13H20V11Z" fill="#fff"/>
            </svg>
            Volver a servicios
          </Button>
          <Button type="button" variant="shadow" color="primary" onClick={handlerAddService}>Crear servicio</Button>
        </footer>
      </div>
    </>
  )
}
