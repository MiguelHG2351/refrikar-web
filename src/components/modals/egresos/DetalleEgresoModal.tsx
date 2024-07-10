'use client'
import {Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure} from "@nextui-org/react";
import {SumOfEgresosByDate} from "@/services/Egresos";

export default function DetalleEgresoModal({ egreso }: { egreso: SumOfEgresosByDate[1][0] }) {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const tipoEgreso = egreso.gastos_varios ? 'Gastos varios' : egreso.pago_empleado ? 'Pago empleado' : egreso.suministro ? 'Suministro' : 'Pago impuesto'

  return (
      <>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" onClick={onOpen}>
          <path
              d="M13.47 8.52985C13.3375 8.38767 13.2654 8.19963 13.2688 8.00532C13.2723 7.81102 13.351 7.62564 13.4884 7.48822C13.6258 7.35081 13.8112 7.2721 14.0055 7.26867C14.1998 7.26524 14.3878 7.33737 14.53 7.46985L18.53 11.4698C18.6705 11.6105 18.7493 11.8011 18.7493 11.9998C18.7493 12.1986 18.6705 12.3892 18.53 12.5298L14.53 16.5298C14.4613 16.6035 14.3785 16.6626 14.2865 16.7036C14.1945 16.7446 14.0952 16.7667 13.9945 16.7684C13.8938 16.7702 13.7938 16.7517 13.7004 16.714C13.607 16.6762 13.5222 16.6201 13.451 16.5489C13.3797 16.4777 13.3236 16.3928 13.2859 16.2994C13.2482 16.2061 13.2296 16.106 13.2314 16.0053C13.2332 15.9046 13.2552 15.8053 13.2962 15.7133C13.3372 15.6213 13.3963 15.5385 13.47 15.4698L16.19 12.7498H6.5C6.30109 12.7498 6.11032 12.6708 5.96967 12.5302C5.82902 12.3895 5.75 12.1988 5.75 11.9998C5.75 11.8009 5.82902 11.6102 5.96967 11.4695C6.11032 11.3289 6.30109 11.2498 6.5 11.2498H16.19L13.47 8.52985Z"
              fill="black"/>
        </svg>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">{ tipoEgreso }</ModalHeader>
                  <ModalBody>
                    <p>
                      {/* @ts-ignore */}
                      Costo: C$ { +egreso.monto }
                    </p>
                    <p>
                      {/* @ts-ignore */}
                      { egreso.pago_empleado.length > 0 && `Empleado: ${egreso.pago_empleado[0].empleados.nombre} ${egreso.pago_empleado[0].empleados.apellido}` }
                    </p>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="primary" onPress={onClose}>
                      Cerrar
                    </Button>
                  </ModalFooter>
                </>
            )}
          </ModalContent>
        </Modal>
      </>
  )
}