import {ClienteService} from "@/services/Clientes";
import {User} from "@nextui-org/user";
import {Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure} from "@nextui-org/react";
import {Card, CardBody, CardFooter, CardHeader} from "@nextui-org/card";
import {EditClienteModal} from "@/components/modals/Cliente/EditClienteModal";

export default function ClienteItem({ cliente }: { cliente: ClienteService[0] }) {

  return (
    <Card>
      <CardHeader className="flex flex-col gap-2 items-start">
        <User
            name={`${cliente.nombre} ${cliente.apellido}`}
            description={cliente.tipo_cliente?.tipo_cliente}
            classNames={{
              name: "font-medium",
              description: "text-sm text-gray-500 dark:text-gray-400"
            }}
        />
        <div className="text-sm text-gray-500 dark:text-gray-400">{cliente.entidad || "Sin entidad"}</div>
      </CardHeader>
      <CardBody>
        <div className="flex gap-2">
          <Button variant="bordered" size="sm">
            Servcios
          </Button>
          <EditClienteModal />
          {/*<Button variant="bordered" size="sm" color="danger">*/}
          {/*  Borrar*/}
          {/*</Button>*/}
        </div>
      </CardBody>
    </Card>
  )
}