import { Button, Input, Modal, ModalBody, ModalContent, ModalHeader, Textarea, useDisclosure } from "@nextui-org/react";

export default function DetallesForm() {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  
  return (
    <>
      <Button onPress={() => onOpen()}>
        Ver detalles servicios (4)
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} backdrop="blur">
        <ModalContent>
          <ModalHeader>
            <h2>Lista de detalles</h2>
          </ModalHeader>
          <ModalBody>
            <div className="grid grid-cols-1 md:grid-cols-2">
              <Input label="Cantidad" labelPlacement="outside" variant="flat" placeholder="1" />
              <Textarea label="Descripción" className="col-span-2" labelPlacement="outside" variant="flat" placeholder="Detalles" />
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
