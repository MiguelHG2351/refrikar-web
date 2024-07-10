import {ClienteService} from "@/services/ClientesServices";
import {User} from "@nextui-org/user";
import { Cliente } from "@/dtos"
import {Button, Link } from "@nextui-org/react";
import {Card, CardBody, CardFooter, CardHeader} from "@nextui-org/card";
import {EditClienteModal} from "@/components/modals/Cliente/EditClienteModal";
import {OpenIcon} from "@/components/icons/Icons";

export default function ClienteItem({ cliente }: { cliente: Cliente }) {

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
        <p className="text-sm text-gray-500 dark:text-gray-400">{cliente.entidad || "Sin entidad"}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400 max-w-full text-ellipsis" title={cliente.ruc as string}>{cliente.ruc}</p>
      </CardHeader>
      <CardBody>
        <div className="flex gap-2">
          <Button as={Link} href={`/home/servicios?cliente_id=${cliente.clienteid}`} target="_blank" size="sm" className="text-black" endContent={<OpenIcon width={18} height={18} className="fill-gray-400" />}>
          Servicios
          </Button>
          <EditClienteModal cliente={cliente} />
          {/*<Button variant="bordered" size="sm" color="danger">*/}
          {/*  Borrar*/}
          {/*</Button>*/}
        </div>
      </CardBody>
    </Card>
  )
}