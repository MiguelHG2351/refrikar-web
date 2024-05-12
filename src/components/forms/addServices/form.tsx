'use client'
import { useGetAllClientsQuery } from "@/storage/api/clientes";
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem, useDisclosure } from "@nextui-org/react";
import { useState } from "react";

export default function AddServiceModal() {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const { data: listOfClients } = useGetAllClientsQuery('')
  const [serviceId, setServiceId] = useState('')
  // <Button onPress={onOpen}>Open Modal</Button>
  async function handlerAddService() {
    const request = await fetch('/api/services/count')
    const response = await request.json()
    setServiceId(`${response.total}`.padStart(6, 'SV0000'))
    onOpen()
  }
  

  return (
    <>
      <Button onPress={handlerAddService}>Agregar servicio</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} backdrop="blur">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <h2>Agregar servicio</h2>
              </ModalHeader>
              <ModalBody>
                <form action="#" className="flex flex-wrap gap-4">
                  <div className="flex flex-col w-full gap-y-2">
                    <label htmlFor="service_id">ID</label>
                    <input className="border border-[#667085] py-2 px-2 bg-white rounded-md" type="text"  placeholder={serviceId} disabled id="service_id"/>
                  </div>
                  <div className="flex flex-col w-full gap-y-4">
                    <Select
                      label="Clientes"
                      className="w-full"
                      variant="flat"
                    >
                      {listOfClients.map((client: any) => (
                        <SelectItem key={client.clientid} value={client.nombre}>
                          {client.nombre}
                        </SelectItem>
                      ))}
                    </Select>
                    <p>No existe? <a href="#" className="underline">Crea cliente</a></p>
                  </div>
                </form>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Resumuen &gt;
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
