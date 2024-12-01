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
   Selection,
   DatePicker
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
import { now, getLocalTimeZone } from '@internationalized/date'

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
  nombre: yup.string().required('Ingrese el nombre'),
  apellido: yup.string().optional(),
  ruc: yup.string().required('Ingrese el RUC'),
  telefono: yup.string().matches(/^[8752]\d{7}$/, 'El número debe tener 8 dígitos y comenzar con 8, 7, 5 o 2').required('Ingrese el telefono'),
  tipoCliente: yup.string().required('Seleccione el tipo de cliente'),
  entidad: yup.string().optional(),
  numeroFactura: yup.string().required('Ingrese el número de factura'),
  fechaFactura: yup.string().required('Ingrese la fecha de factura'),
  fechaRegistro: yup.string().required('Ingrese la fecha de registro')
})

export default function CreateAndAddClient() {
  const {isOpen, onClose, onOpen, onOpenChange} = useDisclosure();
  const currentUser = useAppSelector(state => state.addService.cliente)
  const dispatch = useAppDispatch()
  const { data, isLoading } = useGetAllTipoClientsQuery("")
  const [isJuridico, setIsJuridico] = React.useState(false)
  const [ selectedKeys, setSelectedKeys ] = React.useState<Selection>(new Set([]))
  const { setValue, formState: { errors }, control, clearErrors } = useForm<FormData>({
    mode: 'onChange',
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
      setValue('nombre', currentUser.nombre)
      setValue('apellido', currentUser.apellido!)
      setValue('ruc', currentUser.ruc)
      setValue('telefono', currentUser.telefono)
      setValue('entidad', currentUser.entidad)
      setValue('tipoCliente', currentUser.tipo_cliente.tipo_clienteid)
      setSelectedKeys(new Set([currentUser.tipo_cliente.tipo_clienteid]))
      setIsJuridico(currentUser.tipo_cliente.tipo_cliente === 'TC02')
      clearErrors()
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
      <form  className="grid lg:grid-cols-4 md:grid-cols-3 gap-x-4 gap-y-4 w-full">
        <div>
          <Controller
            name="nombre"
            control={control}
            rules={{required: true}}
            render={({field: {onChange, value,}}) => (
              <Input 
                type="text"
                label="Nombre"
                labelPlacement="outside"
                placeholder="Nombre del cliente"
                variant="flat" 
                onValueChange={(e) => {
                  dispatch(setNombre(e))
                  onChange(e)
                }}
                isDisabled={!currentUser.isNew}
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
                onChange(e)
                dispatch(setApellido(e.target.value))
              }}
              isDisabled={!currentUser.isNew}
              value={value}
            />
          )}
        />
        
        <div>
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
                  onChange(e)
                  dispatch(setTelefono(e.target.value))
                }}
                isDisabled={!currentUser.isNew}
                value={value}
              />
            )}
          />
          {errors.telefono && <span className="text-red-500 text-[12px]">{errors.telefono.message}</span>}
        </div>

        <div>
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
                onValueChange={e => {
                  onChange(e)
                  dispatch(setRuc(e))
                }}
                isDisabled={!currentUser.isNew}
                value={value}
              />
            )}
          />
          {errors.ruc && <span className="text-red-500">{errors.ruc.message}</span>}
        </div>

        <div>
          <Controller
            name="tipoCliente"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Select
                items={!isLoading ? data : []}
                labelPlacement="outside"
                variant="flat"
                isDisabled={!currentUser.isNew || isLoading}
                onSelectionChange={(e) => {
                  // setValue('tipoCliente', e.currentKey as string)
                  onChange(e.currentKey as string)
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
                placeholder={isLoading ? "Loading..." : "Selecciona datos"}
                className="max-w-xs"
                selectedKeys={selectedKeys}
              >
                {(tipo) => <SelectItem key={tipo!.tipoclienteid}>{tipo.tipo_cliente}</SelectItem>}
              </Select>
            )}
          />
          {errors.tipoCliente && <span className="text-red-500">{errors.tipoCliente.message}</span>}
        </div>

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
                onChange(e)
                dispatch(setEntidad(e.target.value))
              }}
              isDisabled={(!isJuridico && currentUser.isNew) || !currentUser.isNew}
              value={value}
            />
          )}
        />
        
        <div>
          <Controller
            name="numeroFactura"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input 
                type="text"
                label="N° de Factura"
                labelPlacement="outside"
                placeholder="Número de factura"
                autoComplete="off"
                onValueChange={e => {
                  dispatch(setNumeroFactura(e))
                  // setValue('numeroFactura', e.target.value)
                  onChange(e)
                }}
                value={value}
                variant="flat"
                />
            )}
          />
          {errors.numeroFactura && <span className="text-red-500">{errors.numeroFactura.message}</span>}
        </div>

        <div>
          <Controller
            name="fechaFactura"
            control={control}
            render={({ field: { onChange, value } }) => (
              <DatePicker
                label="Fecha de factura"
                labelPlacement="outside"
                variant="flat"
                hideTimeZone
                defaultValue={now(getLocalTimeZone())}
                showMonthAndYearPickers
                onChange={(date) => {
                  if (date === null) return
                  dispatch(setFechaFactura(date.toDate().toString()))
                  // setValue('fechaFactura', date.toDate().toString())
                  onChange(date.toDate().toString())
                }}
              />
            )}
          />
        </div>

        <div>
          <Controller
            name="fechaRegistro"
            control={control}
            render={({ field: { value, onChange } }) => (
              <DatePicker
                label="Fecha de registro"
                labelPlacement="outside"
                variant="flat"
                hideTimeZone
                defaultValue={now(getLocalTimeZone())}
                showMonthAndYearPickers
                onChange={(date) => {
                  if (date === null) return
                  dispatch(setFechaRegistro(date.toDate().toString()))
                  // setValue('fechaRegistro', date.toDate().toString())
                  onChange(date.toDate().toString())
                }}
              />
            )}
          />
          {errors.fechaRegistro && <span className="text-red-500">{errors.fechaRegistro.message}</span>}
        </div>
      </form>
    </>
  )
}
