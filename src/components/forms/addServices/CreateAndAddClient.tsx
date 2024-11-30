import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Tab,
  Tabs,
  useDisclosure
} from "@nextui-org/react";
import SelectClientForm from "@/components/forms/addServices/SelectClientForm";
import CreateClientForm from "@/components/forms/addServices/CreateClienteForm";
import {useAppDispatch, useAppSelector} from "@/hooks/redux";
import {clearCliente, setNombre} from "@/storage/serviceSlice";
import {useEffect, useState} from "react";
import Image from "next/image";
import localFont from "next/font/local";
import { useForm, Controller } from "react-hook-form";

const refrikarFont = localFont({
  src: '../../../fonts/JejuHallasan-Regular.ttf'
})

export type FormData = {
  nombre: string
  apellido: string
  ruc: string
  telefono: string
  tipoCliente: string
  entidad: string
  numeroFactura: string
  fechaFactura: string
  fechaRegistro: string
}


export default function CreateAndAddClient() {
  const {isOpen, onClose, onOpen, onOpenChange} = useDisclosure();
  const currentUser = useAppSelector(state => state.addService.cliente)
  const dispatch = useAppDispatch()
  const [isLoadedCurrentClient, setIsLoadedCurrentClient] = useState(false)
  const { register, getValues, setValue, formState, control } = useForm<FormData>({
    defaultValues: {
      nombre: '',
      apellido: '',
      ruc: '',
      telefono: '',
      tipoCliente: '',
      entidad: '',
      numeroFactura: '',
      fechaFactura: '',
      fechaRegistro: ''
    },
    // shouldUnregister: false,
    // reValidateMode: 'onBlur'
  })

  useEffect(() => {
    // validte if we have data in the currentUser
    if (currentUser.nombre && !isLoadedCurrentClient) {
      console.log(currentUser.nombre)
      setValue('nombre', currentUser.nombre)
      setValue('apellido', currentUser.apellido!)
      setValue('ruc', currentUser.ruc)
      setValue('telefono', currentUser.telefono)
      setValue('tipoCliente', currentUser.tipo_cliente.tipo_cliente)
      setValue('entidad', currentUser.entidad)
      isLoadedCurrentClient && setIsLoadedCurrentClient(true)
    }
  }, [currentUser])

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
      { currentUser.isNew && (
        <div className="bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3" role="alert">
          <p className="font-bold">Cliente nuevo</p>
          <p className="text-sm">Este cliente no existe en la base de datos, se registrara al crear el servicio</p>
        </div>
      )}
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
        <Controller
          name="nombre"
          control={control}
          rules={{required: true}}
          render={({field: {onChange, value}}) => (
            <Input 
              type="text"
              label="Nombre"
              labelPlacement="outside"
              placeholder="Nombre del cliente"
              variant="flat" 
              onChange={onChange}
              // {...register('nombre')}
              // value={currentUser.nombre || 'Vacío'}
              disabled={!currentUser.isNew}
              value={value}
            />
          )}
        />
        {/* <Input 
          type="text"
          label="Nombre"
          labelPlacement="outside"
          placeholder="Nombre del cliente"
          variant="flat" 
          {...register('nombre')}
          // value={currentUser.nombre || 'Vacío'}
          disabled={!currentUser.isNew} /> */}
        <Input 
          type="text"
          label="Apellido"
          labelPlacement="outside"
          variant="flat" 
          {...register('apellido')}
          disabled={!currentUser.isNew} />
        <Input 
          type="text"
          label="Entidad"
          labelPlacement="outside"
          variant="flat" 
          value={currentUser.tipo_cliente.tipo_cliente || 'Vacío'} disabled={!currentUser.isNew} />
        <Input 
          type="text"
          label="RUC"
          labelPlacement="outside"
          variant="flat" title={currentUser.ruc || 'Vacío'} 
          value={currentUser.ruc || 'Vacío'} disabled={!currentUser.isNew} />
        <Input 
          type="text"
          label="N° de Factura"
          labelPlacement="outside"
          {...register('numeroFactura')}
          variant="flat" title="" />
        <Input 
          type="text"
          label="Fecha de factura"
          labelPlacement="outside"
          {...register('fechaFactura')}
          variant="flat" />
        <Input 
          type="text"
          label="Fecha de registro"
          labelPlacement="outside"
          {...register('fechaRegistro')}
          variant="flat" />
        
        <div className="flex items-end justify-end h-full">
          <Button>
            Ver direcciones
          </Button>
        </div>
      </div>
    </>
  )
}
