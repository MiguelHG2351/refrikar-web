'use client'

import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure
} from "@nextui-org/react";
import {useEditClientMutation, useGetAllTipoClientsQuery} from "@/storage/api/clientes";
import {useForm} from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import {toast} from "react-toastify";
import {Cliente} from "@/dtos";

const schema = yup.object().shape({
  nombre: yup.string().required(),
  apellido: yup.string(),
  entidad: yup.string()
})

export function EditClienteModal({ cliente }: { cliente: Cliente }) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      nombre: cliente.nombre as string,
      entidad: cliente.entidad as string,
      apellido: cliente.apellido as string
    }
  })
  const [ onEditClient ] = useEditClientMutation()

  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const { data, error } = useGetAllTipoClientsQuery("")

  const onSubmitEdit = handleSubmit((data) => {
    console.log(data)
    onEditClient({
      clienteid: cliente.clienteid,
      entidad: data.entidad,
      nombre: data.nombre,
      apellido: data.apellido
    }).unwrap()
        .then((data) => {
          // console.log('data', data)
          toast('Cliente editado', {
            type: 'success'
          })
          onOpenChange()
        })
        .catch(error => {
          toast('Error al editar el cliente', {
            type: 'error'
          })
        })
  })

  return (
      <>
        <Button variant="bordered" size="sm" onPress={() => onOpen()}>
          Editar
        </Button>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">Editar a: {cliente.nombre}</ModalHeader>
                  <ModalBody>
                    <form className="flex flex-col gap-y-4" onSubmit={onSubmitEdit}>
                      <Input type="text" label="Nombre" labelPlacement="outside" variant="flat" {...register('nombre')} />
                      <Input type="text" label="Apellido" labelPlacement="outside" variant="flat" {...register('apellido')} />
                      <Input type="text" label="Entidad" labelPlacement="outside" variant="flat" {...register('entidad')} />
                      <div className="flex flex-row gap-2 py-4 justify-end">
                        <Button color="danger" variant="light" onPress={onClose}>
                          Cancelar
                        </Button>
                        <Button type="submit" color="primary">
                          Guardar
                        </Button>
                      </div>
                    </form>
                  </ModalBody>
                </>
            )}
          </ModalContent>
        </Modal>
      </>
  )
}