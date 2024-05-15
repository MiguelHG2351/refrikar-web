'use client'
import { useGetAllClientsQuery } from "@/storage/api/clientes";
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem, useDisclosure } from "@nextui-org/react";
import { useState } from "react";
import CreateAndAddClient from "./CreateAndAddClient";
import DetallesForm from "./DetallesForm";

export default function AddServiceModal() {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [isDisabled, setIsDisabled] = useState(false)
  const { data: listOfClients } = useGetAllClientsQuery('')
  const [serviceId, setServiceId] = useState('')

  async function handlerAddService() {
    setIsDisabled(true)
    console.log('click')
    const request = await fetch('/api/services/count')
    const response = await request.json()
    setServiceId(`${response.total + 1}`.padStart(6, 'SV0000'))
    onOpen()
    setIsDisabled(false)
  }

  // add type for submit event
  function handlerSubmit(e: React.FormEvent) {
    e.preventDefault()

    const formData = new FormData(e.target as HTMLFormElement)
    console.log(formData.get('service_id'))
  }
  

  return (
    <>
      <Button isDisabled={isDisabled} onPress={handlerAddService}>Agregar servicio</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} backdrop="blur">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <h2>Agregar servicio</h2>
              </ModalHeader>
              <ModalBody>
                <form onSubmit={handlerSubmit} className="flex flex-wrap gap-4">
                  <div className="flex flex-col w-full gap-y-2">
                    <label htmlFor="service_id" className="font-medium">ID</label>
                    <input className="border border-[#667085] py-2 px-2 bg-white rounded-md" type="text"  placeholder={serviceId} disabled id="service_id"/>
                  </div>
                  <div className="flex flex-col w-full gap-y-2">
                    <h3 className="font-medium">Detalles de servicio</h3>
                    <DetallesForm />
                  </div>
                  <div className="flex flex-col w-full gap-y-4">
                    <Select
                      label="Clientes"
                      labelPlacement="outside"
                      classNames={{
                        mainWrapper: 'w-full',
                        label: 'font-medium text-base',
                      }}
                      variant="flat"
                      name="client_id"
                      placeholder="Seleccione un cliente"
                    >
                      {listOfClients.map((client: any) => (
                        <SelectItem key={client.clientid} value={client.nombre}>
                          {client.nombre}
                        </SelectItem>
                      ))}
                    </Select>
                    <CreateAndAddClient />
                  </div>
                </form>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" fullWidth={true} onPress={onClose}>
                  Ver resumen del servicio
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
