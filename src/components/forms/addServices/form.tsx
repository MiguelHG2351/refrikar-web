'use client'
import { useGetAllClientsQuery } from "@/storage/api/clientes";
import { Select, SelectItem, useDisclosure, Selection, Button } from "@nextui-org/react";
import { useForm } from 'react-hook-form'
import { useState } from "react";
import CreateAndAddClient from "./CreateAndAddClient";
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import DetallesForm from "./DetallesForm";

import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell
} from "@nextui-org/table";

type FormData = {
  client_id: string

}

export default function AddServiceForm() {
  const [isDisabled, setIsDisabled] = useState(false)
  const { data: listOfClients } = useGetAllClientsQuery('')
  const [currentUser, setCurrentUser] = useState<any | null>(null)
  const service = useAppSelector(state => state.addService)

  const { register, setValue, handleSubmit, formState } = useForm<FormData>()

  // add type for submit event
  const onSubmit = handleSubmit((data: FormData) => {
    console.log(data)
  })

  function handlerClientSelect(e: React.ChangeEvent<HTMLSelectElement>) {
    console.log(e.target.value)
    setCurrentUser(listOfClients.find((client: any) => client.clienteid === e.target.value))
  }
  return (
    <>
      <form onSubmit={onSubmit} className="flex flex-wrap gap-4">
        <div className="mt-12 flex flex-col w-full gap-y-4">
          <Select
            label="Cliente"
            labelPlacement="outside"
            classNames={{
              mainWrapper: 'w-auto max-w-[300px]',
              label: 'font-medium text-base',
            }}
            variant="flat"
            {...register('client_id')}
            placeholder="Seleccione un cliente"
            onChange={handlerClientSelect}
          >
            {listOfClients!?.map((client: any) => (
              <SelectItem key={client.clienteid} value={client.clienteid}>
                {client.nombre}
              </SelectItem>
            ))}
          </Select>
          <CreateAndAddClient />
          {
            currentUser && (
              <Table aria-label="Example static collection table">
                <TableHeader>
                  <TableColumn>Nombre</TableColumn>
                  <TableColumn>Apellido</TableColumn>
                  <TableColumn>Tipo de cliente</TableColumn>
                  <TableColumn>Entidad</TableColumn>
                </TableHeader>
                <TableBody>
                  <TableRow key="1">
                    <TableCell>{currentUser.nombre}</TableCell>
                    <TableCell>{currentUser.nombre}</TableCell>
                    <TableCell>{currentUser.nombre}</TableCell>
                    <TableCell>{currentUser.nombre}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            )
          }
        </div>
        
        <div className="flex flex-col w-full gap-y-2">
          <h3 className="font-medium">Detalles de servicio</h3>
          <DetallesForm />
        </div>
        <footer className="flex gap-x-2 justify-end">
          <Button type="button" variant="shadow" color="primary">Volver a servicios</Button>
          <Button type="submit" disabled={isDisabled} variant="shadow" color="primary">Agregar servicio</Button>
        </footer>
      </form>
    </>
  )
}
