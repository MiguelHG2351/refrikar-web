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
import {useForm} from "react-hook-form";

export default function AddProductoModal({ categoria }: { categoria: string | null }) {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const { register, handleSubmit, formState: { errors } } = useForm()

  return (
      <>
        <Button color="primary" onPress={onOpen}>Agregar producto</Button>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">
                    <h2 className="font-bold text-2xl">Agregar producto:</h2>
                    <p className="font-medium text-sm">Categoria: {categoria}</p>
                  </ModalHeader>
                  <ModalBody>
                    <form action="#" className="flex flex-col gap-y-2">
                      <Input label="Nombre" type="text" labelPlacement="outside" variant="flat"
                             placeholder="Filtro de evaporador split..." {...register('nombre')} />
                      <Input label="Stock" type="number" labelPlacement="outside" variant="flat" placeholder="120" />
                    </form>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="light" onPress={onClose}>
                      Close
                    </Button>
                    <Button color="primary" onPress={onClose}>
                      Editar
                    </Button>
                  </ModalFooter>
                </>
            )}
          </ModalContent>
        </Modal>
      </>
  );
}
