import {
  Button,
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
    console.log('currentUser', currentUser, Boolean(currentUser.nombre))
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
      <div className="flex justify-between items-center">
        <h1>Cliente:</h1>
        <Button onPress={() => onOpen()}>Crea cliente</Button>
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
                  <Tabs arial-label="Options">
                    <Tab key="select" title="Select clientes">
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
      <Table aria-label="Example static collection table">
        <TableHeader>
          <TableColumn>Nombre</TableColumn>
          <TableColumn>Apellido</TableColumn>
          <TableColumn>Tipo de cliente</TableColumn>
          <TableColumn>Entidad</TableColumn>
          <TableColumn>Acciones</TableColumn>
        </TableHeader>
        <TableBody>
          <TableRow key="1">
            <TableCell>{currentUser.nombre || 'Sin data'}</TableCell>
            <TableCell>{currentUser.apellido || 'Sin data'}</TableCell>
            <TableCell>{currentUser.tipo_cliente?.tipo_cliente || 'Sin data'}</TableCell>
            <TableCell>{currentUser.entidad || 'Sin data'}</TableCell>
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
