import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Tab,
  Tabs, Tooltip,
  useDisclosure
} from "@nextui-org/react";
import SelectClientForm from "@/components/forms/addServices/SelectClientForm";
import CreateClientForm from "@/components/forms/addServices/CreateClienteForm";
import {Table, TableBody, TableCell, TableColumn, TableHeader, TableRow} from "@nextui-org/table";
import {DeleteIcon, EditIcon} from "@/components/icons/Icons";
import {useAppDispatch, useAppSelector} from "@/hooks/redux";
import {clearCliente} from "@/storage/serviceSlice";
import {useEffect, useState} from "react";
import { toast } from "react-toastify";
import Image from "next/image";
import localFont from "next/font/local";

const refrikarFont = localFont({
  src: '../../../fonts/JejuHallasan-Regular.ttf'
})

export default function CreateAndAddClient() {
  const [isDeleteConfirmed, setIsDeleteConfirmed] = useState(false)
  const {isOpen, onClose, onOpen, onOpenChange} = useDisclosure();
  const {isOpen:isOpenConfirmation, onClose: onCloseConfirmation, onOpen: onOpenConfirmation, onOpenChange: onOpenChangeConfirmation} = useDisclosure();
  const currentUser = useAppSelector(state => state.addService.cliente)
  const dispatch = useAppDispatch()

  useEffect(() => {
    // validate if currentUser has data
    if (currentUser.nombre) {
      setIsDeleteConfirmed(true)
    }
  }, [currentUser])

  const onHandlerConfirmation = () => {
    if (!currentUser.nombre) {
      toast("No has seleccionado un cliente", {
        type: "error"
      })
      return ;
    }
    onOpenChangeConfirmation()
  }

  const onHandlerDeleteCliente = () => {
    if (!isDeleteConfirmed) {
      return
    }
    dispatch(clearCliente())
    onCloseConfirmation()
  }

  return (
    <>
      <div className="relative">
        <div className="absolute inset-0 pl-6 pt-4 flex justify-between">
          <div className="">
            <h2 className="text-6xl text-white bg-refrikar-gradient bg-clip-text" style={{...refrikarFont.style, WebkitTextFillColor: 'transparent'}}>Refrikar</h2>
            <p className="text-white">Taller de refrigeración y aire acondicionado</p>
            <p className="text-white">Propietaria: Karla Yesenia Rivera Hernandez</p>
          </div>
          <div className="">
            <Image className="max-w-full" src="/images/pingu.png" alt="pinguino de refrikar" width={119} height={166} />
          </div>
        </div>
        <Image className="max-w-full" src="/images/service-bg.png" alt="fondo" width={1023} height={208} />
      </div>
      <div className="flex justify-between items-center">
        <h1>Cliente:</h1>
        <Button onPress={() => onOpen()}>Crear cliente</Button>
      </div>
      <Modal isOpen={isOpen} onClose={onClose} onOpenChange={onOpenChange} isDismissable={false} backdrop="blur">
        <ModalContent>
          {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  <h2>Agregar cliente</h2>
                  <p className="text-sm font-normal">Nota: Selecciona un cliente o crea uno rellenando los campos del formulario</p>
                </ModalHeader>
                <ModalBody>
                  <Tabs arial-label="Opciones">
                    <Tab key="select" title="Seleccionar clientes">
                      <div>
                        <SelectClientForm onClose={onClose} />
                      </div>
                    </Tab>
                    <Tab key="create" title="Crear clientes">
                      <CreateClientForm onClose={onClose} />
                    </Tab>
                  </Tabs>
                </ModalBody>
              </>
          )}
        </ModalContent>
      </Modal>
      <div className="grid lg:grid-cols-4 md:grid-cols-3 gap-x-4 gap-y-4 w-full">
        <Input type="text" label="Nombre" labelPlacement="outside" variant="flat" value={currentUser.nombre || 'Vacío'} disabled />
        <Input type="text" label="Apellido" labelPlacement="outside" variant="flat" value={currentUser.apellido || 'Vacío'} disabled />
        <Input type="text" label="Entidad" labelPlacement="outside" variant="flat" value={currentUser.tipo_cliente.tipo_cliente || 'Vacío'} disabled />
        <Input type="text" label="RUC" labelPlacement="outside" variant="flat" value={currentUser.ruc || 'Vacío'} disabled />
        <Input type="text" label="No de Factura" labelPlacement="outside" variant="flat" value="RF124234324 fdassssssssssssssssssssssssssssssssssssss" title="hola" disabled />
        <Input type="text" label="Fecha de factura" labelPlacement="outside" variant="flat" value="12/11/2024 10:30AM" disabled />
        <Input type="text" label="Fecha de registro" labelPlacement="outside" variant="flat" value="12/11/2024 10:30AM" disabled />
        <div className="flex items-end justify-end h-full">
          <Button>
            Ver direcciones
          </Button>
        </div>
      </div>
      <Table aria-label="Example static collection table" className="hidden">
        <TableHeader>
          <TableColumn>Nombre</TableColumn>
          <TableColumn>Apellido</TableColumn>
          <TableColumn>Tipo de cliente</TableColumn>
          <TableColumn>Entidad</TableColumn>
          <TableColumn>Acciones</TableColumn>
        </TableHeader>
        <TableBody>
          <TableRow key="1">
            <TableCell>{currentUser.nombre || 'Vacío'}</TableCell>
            <TableCell>{currentUser.apellido || 'Vacío'}</TableCell>
            <TableCell>{currentUser.tipo_cliente?.tipo_cliente || 'Vacío'}</TableCell>
            <TableCell>{currentUser.entidad || 'Vacío'}</TableCell>
            <TableCell>
              <div className="relative flex items-center gap-2">
                <Tooltip content="Editar">
                        <span className="text-lg text-default-400 cursor-pointer active:opacity-50" onClick={onOpen}>
                          <EditIcon width={22} height={22} className="stroke-slate-600" />
                        </span>
                </Tooltip>
                <Tooltip content="Eliminar">
                  <span className="text-lg text-default-400 cursor-pointer active:opacity-50" onClick={onHandlerConfirmation}>
                    <DeleteIcon width={22} height={22} className="stroke-red-500" />
                  </span>
                </Tooltip>
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Modal isOpen={isOpenConfirmation} onClose={onCloseConfirmation} onOpenChange={onOpenChangeConfirmation} isDismissable={false} backdrop="blur">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>
                <h2>Eliminar cliente</h2>
              </ModalHeader>
              <ModalBody>
                <p>¿Estás seguro de eliminar este cliente?</p>
                <div className="flex gap-4 mt-4">
                  <Button onPress={onHandlerDeleteCliente} color="danger">Si</Button>
                  <Button onPress={onCloseConfirmation} color="secondary">No</Button>
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
