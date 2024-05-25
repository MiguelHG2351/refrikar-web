'use client'
import { useGetAllClientsQuery } from "@/storage/api/clientes";
import { Select, SelectItem, useDisclosure, Selection, Button } from "@nextui-org/react";
import { useForm } from 'react-hook-form'
import { useState } from "react";
import CreateAndAddClient from "./CreateAndAddClient";
import { yupResolver } from "@hookform/resolvers/yup"
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import DetallesForm from "./DetallesForm";
import * as yup from "yup"


import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell
} from "@nextui-org/table";

export type FormData = {
  client_id: string
  ruc: string, // <-- clients
  nombre: string,
  apellido: string,
  telefono: string,
  tipo_cliente: string
  entidad: string
}

const schema = yup.object().shape({
  client_id: yup.string().required(),
  ruc: yup.string().required(),
  nombre: yup.string().required(),
  apellido: yup.string().required(),
  telefono: yup.string().required(),
  tipo_cliente: yup.string().required(),
  entidad: yup.string().required()
})

export default function AddServiceForm() {
  const { data: listOfClients } = useGetAllClientsQuery('')
  const [currentUser, setCurrentUser] = useState<any | null>(null)
  const service = useAppSelector(state => state.addService)
  const {isOpen, onOpen, onOpenChange} = useDisclosure();


  const { register, handleSubmit } = useForm<FormData>({
    resolver: yupResolver(schema)
  })

  const onSubmit = handleSubmit((data: FormData) => {
    console.log(data)
  })

  function handlerClientSelect(e: React.ChangeEvent<HTMLSelectElement>) {
    console.log(e.target.value)
    setCurrentUser(listOfClients.find((client: any) => client.clienteid === e.target.value))
  }
  return (
    <>
      <DetallesForm isOpen={isOpen} onOpen={onOpen} onOpenChange={onOpenChange} />
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
          <CreateAndAddClient register={register} />
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
          <div className="flex items-center justify-between">
            <h3 className="font-medium">Detalles de servicio</h3>
            <Button onPress={() => onOpen()}> Agregar detalles</Button>
          </div>
          <Table aria-label="Example static collection table">
            <TableHeader>
              <TableColumn>Tipo de servicio</TableColumn>
              <TableColumn>Costo</TableColumn>
              <TableColumn>Descripción</TableColumn>
              <TableColumn>dirección</TableColumn>
              <TableColumn>Equipo</TableColumn>
              <TableColumn>Recursos</TableColumn>
            </TableHeader>
            <TableBody>
              <TableRow key="1">
                <TableCell>Reparación</TableCell>
                <TableCell>$180</TableCell>
                <TableCell>Había una rata muerta en el aire</TableCell>
                <TableCell>Residencial Bolonia, Casa #5</TableCell>
                <TableCell>Xiaomi, 1T SN00004</TableCell>
                <TableCell>
                  <Button color="primary">Ver recursos</Button>
                </TableCell>
              </TableRow>
              <TableRow key="2">
                <TableCell>Instalación</TableCell>
                <TableCell>$180</TableCell>
                <TableCell>Se instalo en un cuarto de 20x20 metros</TableCell>
                <TableCell>Residencial montecielo, Casa #5</TableCell>
                <TableCell>Xiaomi, 1T SN00004</TableCell>
                <TableCell>
                  <Button color="primary">Ver recursos</Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>

        </div>
        <footer className="flex gap-x-2 justify-end">
          <Button type="button" variant="shadow" color="primary">Volver a servicios</Button>
          <Button type="submit" variant="shadow" color="primary">Agregar servicio</Button>
        </footer>
      </form>
    </>
  )
}
