import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Select,
  SelectItem,
  Tab,
  Tabs,
  useDisclosure,
   Selection
} from "@nextui-org/react";
import SelectClientForm from "@/components/forms/addServices/SelectClientForm";
import CreateClientForm from "@/components/forms/addServices/CreateClienteForm";
import {useAppDispatch, useAppSelector} from "@/hooks/redux";
import {clearCliente, setAddedFromModal, setApellido, setEntidad, setFechaFactura, setFechaRegistro, setNombre, setNumeroFactura, setRuc, setTelefono, setTipoCliente} from "@/storage/serviceSlice";
import React, { useEffect } from "react";
import Image from "next/image";
import localFont from "next/font/local";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useGetAllTipoClientsQuery } from "@/storage/api/clientes";

const refrikarFont = localFont({
  src: '../../../fonts/JejuHallasan-Regular.ttf'
})

export type FormData = {
  nombre: string
  apellido?: string
  ruc: string
  telefono: string
  tipoCliente: string
  entidad?: string
  numeroFactura: string
  fechaFactura: string
  fechaRegistro: string
}

const schema = yup.object().shape({
  nombre: yup.string().required('Ingrese el nombre, porfavor'),
  apellido: yup.string().optional(),
  ruc: yup.string().required('Ingrese el RUC, porfavor'),
  telefono: yup.string().matches(/^[8752]\d{7}$/, 'El número debe tener 8 dígitos y comenzar con 8, 7, 5 o 2').required('Ingrese el telefono, porfavor'),
  tipoCliente: yup.string().required('Seleccione el tipo de cliente'),
  entidad: yup.string().optional(),
  numeroFactura: yup.string().required('Ingrese el número de factura, porfavor'),
  fechaFactura: yup.string().required('Ingrese la fecha de factura, porfavor'),
  fechaRegistro: yup.string().required('Ingrese la fecha de registro, porfavor')
})

export default function CreateAndAddClient() {
  const {isOpen, onClose, onOpen, onOpenChange} = useDisclosure();
  const currentUser = useAppSelector(state => state.addService.cliente)
  const dispatch = useAppDispatch()
  const { data, isLoading } = useGetAllTipoClientsQuery("")
  const [isJuridico, setIsJuridico] = React.useState(false)
  const [ selectedKeys, setSelectedKeys ] = React.useState<Selection>(new Set([]))
  const { register, setValue, formState: { errors }, control } = useForm<FormData>({
    resolver: yupResolver(schema),
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
    // if (currentUser.nombre && !isLoadedCurrentClient) {
    if (!currentUser.isNew || currentUser.addedFromModal) {
      console.log(currentUser.tipo_cliente)
      setValue('nombre', currentUser.nombre)
      setValue('apellido', currentUser.apellido!)
      setValue('ruc', currentUser.ruc)
      setValue('telefono', currentUser.telefono)
      setValue('entidad', currentUser.entidad)
      setValue('tipoCliente', currentUser.tipo_cliente.tipo_clienteid)
      setSelectedKeys(new Set([currentUser.tipo_cliente.tipo_clienteid]))
      setIsJuridico(currentUser.tipo_cliente.tipo_cliente === 'TC02')
      dispatch(setAddedFromModal(false))
    }

    if (currentUser.entidad !== null && currentUser.tipo_cliente.tipo_clienteid === 'TC01') {
      setIsJuridico(true)
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
      { !currentUser.isNew && (
        <div className="bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3" role="alert">
          <p className="font-bold">Cliente existente</p>
          <p className="text-sm">El cliente ya existe en la base de datos, solo podras editar los datos de la factura</p>
        </div>
      )}
      { (currentUser.entidad !== '' && currentUser.tipo_cliente.tipo_clienteid === 'TC01') && (
        <div className="bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3" role="alert">
          <p className="font-bold">Tipo cliente inválido</p>
          <p className="text-sm">Si el cliente es Natural no se guardará la entidad en la base de datos</p>
        </div>
      )}
      <div className="flex justify-between items-center">
        <h1 className="font-medium">Cliente:</h1>
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
        <div>
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
                onValueChange={(e) => {
                  dispatch(setNombre(e))
                  setValue('nombre', e)
                }}
                disabled={!currentUser.isNew}
                value={value}
              />
            )}
          />
          {errors.nombre && <span className="text-red-500">{errors.nombre.message}</span>}
        </div>

        <Controller
          name="apellido"
          control={control}
          render={({field: {onChange, value}}) => (
            <Input 
              type="text"
              label="Apellido"
              labelPlacement="outside"
              placeholder="Apellido del cliente"
              variant="flat" 
              onChange={(e) => {
                setValue('apellido', e.target.value)
                dispatch(setApellido(e.target.value))
              }}
              disabled={!currentUser.isNew}
              value={value}
            />
          )}
        />
        
        <Controller
          name="telefono"
          control={control}
          render={({field: {onChange, value}}) => (
            <Input 
              type="text"
              label="Teléfono"
              labelPlacement="outside"
              placeholder="Teléfono del cliente"
              variant="flat" 
              onChange={(e) => {
                setValue('telefono', e.target.value)
                dispatch(setTelefono(e.target.value))
              }}
              disabled={!currentUser.isNew}
              value={value}
            />
          )}
        />

        <Controller
          name="ruc"
          control={control}
          render={({field: {onChange, value}}) => (
            <Input 
              type="text"
              label="RUC"
              labelPlacement="outside"
              placeholder="RUC del cliente"
              variant="flat" 
              onChange={e => {
                setValue('ruc', e.target.value)
                dispatch(setRuc(e.target.value))
              }}
              disabled={!currentUser.isNew}
              value={value}
            />
          )}
        />

        <Select
          items={!isLoading ? data : []}
          labelPlacement="outside"
          variant="flat"
          onSelectionChange={(e) => {
            console.log(data)
            console.log('selection change', e)
            // if (e.currentKey === null) return
            console.log('onSelectionChange')
            setValue('tipoCliente', e.currentKey as string)
            dispatch(setTipoCliente(
              {
                tipo_cliente: data?.find(t => t.tipoclienteid === e.currentKey)?.tipo_cliente as string,
                tipo_clienteid: e.currentKey as string
              }
            ))
            setIsJuridico(e.currentKey === 'TC02')
            setSelectedKeys(new Set([e.currentKey as string]))
          }}
          label="Tipo de cliente"
          placeholder={"Selecciona datos"}
          className="max-w-xs"
          selectedKeys={selectedKeys}
        >
          {(tipo) => <SelectItem key={tipo!.tipoclienteid}>{tipo.tipo_cliente}</SelectItem>}
        </Select>

        <Controller
          name="entidad"
          control={control}
          render={({field: {onChange, value}}) => (
            <Input 
              type="text"
              label="Entidad"
              labelPlacement="outside"
              placeholder="Entidad del cliente"
              variant="flat" 
              onChange={e => {
                setValue('entidad', e.target.value)
                dispatch(setEntidad(e.target.value))
              }}
              disabled={!isJuridico || !currentUser.isNew}
              value={value}
            />
          )}
        />
        
        <Input 
          type="text"
          label="N° de Factura"
          labelPlacement="outside"
          placeholder="Número de factura"
          autoComplete="off"
          {...register('numeroFactura', {
            onChange: (e) => {
              dispatch(setNumeroFactura(e.target.value))
              setValue('numeroFactura', e.target.value)
            }
          })}
          variant="flat" title="" />
        <Input 
          type="text"
          label="Fecha de factura"
          placeholder="Fecha de factura"
          labelPlacement="outside"
          autoComplete="off"
          {...register('fechaFactura', {
            onChange: (e) => {
              dispatch(setFechaFactura(e.target.value))
              setValue('fechaFactura', e.target.value)
            }
          })}
          variant="flat" />
        <Input 
          type="text"
          label="Fecha de registro"
          placeholder="Fecha de registro"
          labelPlacement="outside"
          {...register('fechaRegistro', {
            onChange: (e) => {
              dispatch(setFechaRegistro(e.target.value))
              setValue('fechaRegistro', e.target.value)
            }
          })}
          variant="flat" />
      </div>
    </>
  )
}
