'use client'
import { useGetAllClientsQuery } from "@/storage/api/clientes";
import { Select, SelectItem, useDisclosure, Selection } from "@nextui-org/react";
import { useState } from "react";
import CreateAndAddClient from "./CreateAndAddClient";
import DetallesForm from "./DetallesForm";

import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell
} from "@nextui-org/table";

const columns = [
  {name: "Nombre", uid: "name"},
  {name: "Apellido", uid: "role"},
  {name: "Tipo cliente", uid: "status"},
  {name: "Entidad", uid: "entity"},
]

export default function AddServiceForm() {
  const [isDisabled, setIsDisabled] = useState(false)
  const { data: listOfClients } = useGetAllClientsQuery('')
  const [currentUser, setCurrentUser] = useState('');
  const [serviceId, setServiceId] = useState('')

  console.log(listOfClients)
  async function handlerAddService() {
    setIsDisabled(true)
    console.log('click')
    const request = await fetch('/api/services/count')
    const response = await request.json()
    setServiceId(`${response.total + 1}`.padStart(6, 'SV0000'))
    setIsDisabled(false)
  }

  // add type for submit event
  function handlerSubmit(e: React.FormEvent) {
    e.preventDefault()

    const formData = new FormData(e.target as HTMLFormElement)
    console.log(formData.get('service_id'))
  }

  function handlerClientSelect(e: React.ChangeEvent<HTMLSelectElement>) {
    console.log(e.target.value)
    setCurrentUser(e.target.value)
    console.log(currentUser)
  }
  return (
    <>
      <form onSubmit={handlerSubmit} className="flex flex-wrap gap-4">
      <div className="mt-12 flex flex-col w-full gap-y-4">
          <Select
            label="Clientes"
            labelPlacement="outside"
            classNames={{
              mainWrapper: 'w-auto max-w-[300px]',
              label: 'font-medium text-base',
            }}
            variant="flat"
            name="client_id"
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
            currentUser.length > 0 && (
              <Table aria-label="Example static collection table">
                <TableHeader>
                  <TableColumn>Nombre</TableColumn>
                  <TableColumn>Apellido</TableColumn>
                  <TableColumn>Tipo de cliente</TableColumn>
                  <TableColumn>Entidad</TableColumn>
                </TableHeader>
                <TableBody>
                  <TableRow key="1">
                          <TableCell>ASD ``{listOfClients[0].nombre}</TableCell>
                          <TableCell>ASD {listOfClients[0].apellido}</TableCell>
                          <TableCell>ASD {listOfClients[0].apellido}</TableCell>
                          <TableCell>ASD {listOfClients[0].apellido}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            )
          }
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3">
          <div className="flex flex-col w-full gap-y-2">
            <label htmlFor="service_id" className="font-medium">ID</label>
            <input className="border border-[#667085] py-2 px-2 bg-white rounded-md" type="text"  placeholder={'SV00002'} disabled id="service_id"/>
          </div>
          <div className="flex flex-col w-full gap-y-2">
            <label htmlFor="service_id" className="font-medium">Nombre</label>
            <h2>Miguel</h2>
          </div>
        </div>
        <div className="flex flex-col w-full gap-y-2">
          <h3 className="font-medium">Detalles de servicio</h3>
          <DetallesForm />
        </div>
        
      </form>
    </>
  )
}
