import {Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure} from "@nextui-org/react";

// temp
type Producto = {
  productoid: string;
  categoriaid: string | null;
  nombre: string | null;
  inventario: {
    inventarioid: number;
    productoid: string | null;
    stock: string | null;
  }[];
};
type ProductoDetailsProps = {
  producto: Producto | null;
}

export function ProductoDetailsModal({ producto } : ProductoDetailsProps) {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  return (
      <>
        <Button size="sm" className="bg-secondary text-white shrink-0" onClick={() => {
          onOpenChange()
        }}>
          Más información
        </Button>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">
                    <h2 className="font-bold text-2xl">Detalles del producto:</h2>
                  </ModalHeader>
                  <ModalBody>
                    <p className="font-bold">ID: <span className="font-medium">{producto?.productoid}</span></p>
                    <p className="font-bold">Nombre: <span className="font-medium">{producto?.nombre}</span></p>
                    <p className="font-bold">Stock: <span className="font-medium">{producto?.inventario[0]?.stock}</span></p>
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