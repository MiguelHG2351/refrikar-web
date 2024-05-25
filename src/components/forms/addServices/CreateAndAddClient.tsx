import { useAddClientMutation, useGetAllTipoClientsQuery } from "@/storage/api/clientes";
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem, useDisclosure } from "@nextui-org/react";
import { UseFormRegister } from "react-hook-form";

import { FormData } from "./Form";

type CreateAndAddClientProps = {
  register: UseFormRegister<FormData>
}

export default function CreateAndAddClient({ register }: CreateAndAddClientProps) {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const { data, isLoading } = useGetAllTipoClientsQuery("")
  console.log(data)

  function onHandlerClick() {
    onOpen()
  }
  
  return (
    <>
      <span>No existe? <button type="button" className="underline text-indigo-600" onClick={onHandlerClick}>Crea cliente</button></span>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} backdrop="blur">
        <ModalContent>
          {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  <h2>Agregar servicio</h2>
                  <p className="text-sm font-normal">Nota: Esto creará un usuario y se agregar automaticamente al servicio</p>
                </ModalHeader>
                <ModalBody>
                  <div className="flex flex-wrap gap-4">
                    <div className="flex flex-col w-full gap-y-2">
                      <label htmlFor="service_id" className="font-medium">RUC</label>
                      <input className="border border-[#667085] py-2 px-2 bg-white rounded-md" placeholder="#0099FFDADSSARF" type="text" {...register('ruc')} />
                    </div>
                    <div className="flex flex-col w-full gap-y-2">
                      <label htmlFor="service_id" className="font-medium">Nombre</label>
                      <input className="border border-[#667085] py-2 px-2 bg-white rounded-md" placeholder="John Juan" type="text" {...register('nombre')} />
                    </div>
                    <div className="flex flex-col w-full gap-y-2">
                      <label htmlFor="service_id" className="font-medium">Apellido</label>
                      <input className="border border-[#667085] py-2 px-2 bg-white rounded-md" placeholder="Doe Perez" type="text" {...register('apellido')} />
                    </div>
                    <div className="flex flex-col w-full gap-y-2">
                      <label htmlFor="service_id" className="font-medium">Telefono</label>
                      <input className="border border-[#667085] py-2 px-2 bg-white rounded-md" placeholder="78703875" type="text" {...register('telefono')} />
                    </div>
                    <div className="bg-accent-2 px-2 py-4 w-full grid grid-cols-1 md:grid-cols-2 gap-2 rounded-lg">
                      <div className="gap-y-2">
                        <Select
                          items={!isLoading ? data : []}
                          labelPlacement="outside"
                          variant="flat"
                          classNames={{
                            label: 'font-medium text-base',
                            mainWrapper: 'pt-2',
                            selectorIcon: 'w-6 h-6',
                            trigger: 'border-black h-11 border',
                          }}
                          label="Tipo de cliente"
                          placeholder={!isLoading ? data![0].tipo_cliente : "Cargando datos..."}
                          className="max-w-xs"
                          {...register('tipo_cliente')}
                        >
                          {(tipo) => <SelectItem key={tipo.tipoclienteid}>{tipo.tipo_cliente}</SelectItem>}
                        </Select>
                      </div>
                      <div className="flex flex-col gap-y-2">
                        <label htmlFor="service_id" className="font-medium">Entidad</label>
                        <input className="border border-[#667085] py-2 px-2 bg-white rounded-md" placeholder="Empresa A" type="text" {...register('entidad')} />
                      </div>
                    </div>
                    <Button type="submit" fullWidth={true} color="primary">
                      Agregar
                    </Button>
                  </div>
                </ModalBody>
              </>
            )}
        </ModalContent>

      </Modal>
    </>
  )
}
