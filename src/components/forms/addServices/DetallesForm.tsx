import {Equipo, TipoEquipo, TipoServicio} from "@/dtos";
import { useGetEquiposQuery, useGetTiposEquiposQuery } from "@/storage/api/equipo";
import { useGetTipoServiciosQuery } from "@/storage/api/service"
import { useForm } from 'react-hook-form'
import {
  Button,
  DatePicker,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Select,
  SelectItem,
  Textarea,
  useDisclosure
} from "@nextui-org/react";
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { now, getLocalTimeZone } from '@internationalized/date'
import { setDetalleServicio } from '@/storage/serviceSlice'
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { toast } from "react-toastify";

const schema = yup.object().shape({
  costo: yup.number().typeError('Debes ingresar un monto').required('Este campo es requerido').min(0, 'El monto debe ser mayor a 0'),
  tiposervicioid: yup.string().optional(),
  direccion: yup.string().min(10).required('Necesitas ingresar una dirección'),
  fecha: yup.string().required('Es necesario ingresar una fecha'),
  descripcion: yup.string().optional(),
  equipo: yup.string().optional(),
})

export type FormData = {
  costo: number
  tiposervicioid?: string
  direccion: string
  descripcion?: string
  fecha: string
  equipo?: string
}

export type FormDataEquipo = {
  tipo_servicio: string
  tipo_equipo: string;
  capacidad: number;
  marca: string;
  numero_serie: string;
}

type EquipoWithTipoServicio = Partial<Equipo> & { tipo_servicio: string }


export default function DetallesForm() {
  const { data: equipos, isLoading: isLoadingEquipos } = useGetEquiposQuery('')
  const { data: tipoServicios, isLoading: isLoadingTipoServicios } = useGetTipoServiciosQuery('')
  const dispatch = useAppDispatch()
  const {isOpen, onClose, onOpen, onOpenChange} = useDisclosure();
  const { isOpen: isOpenEquipo, onOpenChange: onOpenChangeEquipo, onOpen: onOpenEquipo } = useDisclosure();
  const currentUser = useAppSelector(state => state.addService.cliente)
  const [equipo, setEquipo] = useState<EquipoWithTipoServicio | null>(null)
  const { register, handleSubmit, setValue, reset, formState: { errors }, clearErrors } = useForm<FormData>({
    defaultValues: {
      costo: 0
    },
    resolver: yupResolver(schema)
  })

  const onSubmit = handleSubmit((data: FormData) => {
    
    if (equipo === null && (data.tiposervicioid === undefined || data.equipo === undefined)) {
      return toast.error('Por favor, selecciona un tipo de servicio y un equipo')
    }
    onClose()

    if (Object.keys(errors).length === 0) {
      console.log(data)
      dispatch(setDetalleServicio({
        costo: data.costo,
        direccion: data.direccion,
        descripcion: data.descripcion,
        fecha: data.fecha.toString(),
        tiposervicioid: data.tiposervicioid,
        equipoid: data.equipo,
        equipo: equipo ? {
          capacidad: equipo!.capacidad,
          marca: equipo!.marca,
          numero_serie: equipo!.numero_serie,
          tipo_equipo: equipo!.tipoequipoid,
          tipo_servicio: equipo!.tipo_servicio
        } : undefined
      }))
      reset()
      clearErrors()
      setEquipo(null)
    }
  })

  const onOpenModal = (isOpen: boolean) => {
    if (isOpen) {
      reset()
    }
    onOpenChange()
  }

  useEffect(() => {
    if (errors.tiposervicioid || errors.equipo) {
      toast.error('Por favor, selecciona un tipo de servicio y un equipo')
    }
  }, [errors])


  return (
    <>
      <Button onPress={() => onOpen()}> Agregar detalles</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenModal} isDismissable={false} backdrop="blur">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>
                <h2>Agregar detalles</h2>
              </ModalHeader>
              <ModalBody>
                <form className="grid grid-cols-1 gap-y-4" onSubmit={onSubmit}>
                  <div>
                    <Input label="Costo" min={0} type="number" labelPlacement="outside" variant="flat" placeholder="1" {...register('costo')} />
                    {errors.costo && <span className="text-red-500">{errors.costo.message}</span>}
                  </div>
                  
                  <div>
                    <Textarea label="Dirección" labelPlacement="outside" variant="flat" placeholder="Residencial Bolonia, Casa #5" {...register('direccion')} />
                    {errors.direccion && <span className="text-red-500">{errors.direccion.message}</span>}
                  </div>
                  <Textarea label="Descripción" labelPlacement="outside" variant="flat" placeholder="Detalles" {...register('descripcion')} />
                  <div>
                    <DatePicker
                      label="Fecha"
                      labelPlacement="outside"
                      variant="flat"
                      hideTimeZone
                      defaultValue={now(getLocalTimeZone())}
                      showMonthAndYearPickers
                      onChange={(date) => {
                        setValue('fecha', date.toDate().toString())
                      }}
                    />
                    {errors.fecha && <span className="text-red-500">{errors.fecha.message}</span>}
                  </div>
                  
                  <div className="flex justify-between items-center w-full">
                    <p>Agregar cliente </p>
                    <Button onClick={onOpenEquipo}>Crear</Button>
                  </div>
                  
                  {!currentUser.isNew && (
                    <div className="bg-accent-2 px-2 py-4 grid grid-cols-1 md:grid-cols-2 w-full gap-2 rounded-lg">
                      <Select
                        labelPlacement="outside"
                        variant="flat"
                        classNames={{
                          label: 'font-medium text-base',
                          mainWrapper: 'pt-2 w-full',
                          selectorIcon: 'w-6 h-6',
                          trigger: 'border-black h-11 border',
                        }}
                        {...register('tiposervicioid')}
                        label="Tipo de servicio"
                        placeholder={!isLoadingTipoServicios ? tipoServicios![0].tipo : "Cargando datos..."}
                      >
                        {tipoServicios!?.map((equipo: TipoServicio) => (
                            <SelectItem key={equipo.tiposervicioid}>{equipo.tipo}</SelectItem>
                        ))}
                      </Select>
                      <Select
                        labelPlacement="outside"
                        variant="flat"
                        classNames={{
                          label: 'font-medium text-base',
                          mainWrapper: 'pt-2 w-full',
                          selectorIcon: 'w-6 h-6',
                          trigger: 'border-black h-11 border',
                        }}
                        {...register('equipo')}
                        label="Equipo"
                        placeholder={!isLoadingEquipos ? `${equipos![0].marca} - ${equipos![0].numero_serie}` : "Cargando datos..."}
                      >
                        {equipos!?.map((equipo: Equipo) => (
                          <SelectItem key={equipo.equipoid}>{`${equipo.marca} - ${equipo.numero_serie}`}</SelectItem>
                        ))}
                      </Select>
                    </div>
                  )}
                  
                  <Button type="submit" color="primary">Agregar detalles</Button>
                </form>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
      <CreateEquipoForm setEquipo={setEquipo} isOpenEquipo={isOpenEquipo} onOpenChangeEquipo={onOpenChangeEquipo} />
    </>
  )
}

const equipoSchema = yup.object().shape({
  tipo_equipo: yup.string().required('Este campo es requerido'),
  capacidad: yup.number().min(6000, 'La capacidad debe ser minimo 6000 BTUs').typeError('Ingrese un número válido').required('Este campo es requerido'),
  marca: yup.string().required('Este campo es requerido'),
  numero_serie: yup.string().required('Este campo es requerido'),
  tipo_servicio: yup.string().required('Este campo es requerido')
})

const CreateEquipoForm = ({
    setEquipo,
    isOpenEquipo,
    onOpenChangeEquipo
  }: {
    setEquipo: Dispatch<SetStateAction<EquipoWithTipoServicio | null>>,
    isOpenEquipo: boolean,
    onOpenChangeEquipo: () => void
  }) => {
  const { data: tipoServicios, isLoading: isLoadingTipoServicios } = useGetTipoServiciosQuery('')
  const { data: tiposEquipos, isLoading: isLoadingTipoEquipos } = useGetTiposEquiposQuery('')
  const dispatch = useAppDispatch()
  const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm<FormDataEquipo>({
    mode: 'onChange',
    defaultValues: {
      capacidad: 0,
      tipo_equipo: '',
      marca: '',
      numero_serie: '',
    },
    resolver: yupResolver(equipoSchema)
  })

  const onSubmit = handleSubmit((data: FormDataEquipo) => {
    onOpenChangeEquipo()
    if (Object.keys(errors).length === 0) {
      console.log(data)
      setEquipo({
        capacidad: data.capacidad,
        marca: data.marca,
        numero_serie: data.numero_serie,
        tipoequipoid: data.tipo_equipo,
        tipo_servicio: data.tipo_servicio,
      })
      reset()
    }
  })

  return (
    <>
      
      <Modal isOpen={isOpenEquipo} onOpenChange={onOpenChangeEquipo} isDismissable={false} backdrop="blur">
        <ModalContent>
          {
            (onClose) => (
              <>
                <ModalHeader>
                  <h2>Crear equipo</h2>
                </ModalHeader>
                <ModalBody>
                  <form className="flex flex-col gap-y-4" onSubmit={onSubmit}>
                    <Input 
                      type="number"
                      label="Capacidad"
                      labelPlacement="outside"
                      placeholder="Capacidad del equipo"
                      variant="flat"
                      {...register('capacidad')}
                      errorMessage={errors.capacidad?.message}
                      isInvalid={!!errors.capacidad}
                    />

                    <Select
                      labelPlacement="outside"
                      variant="flat"
                      isInvalid={!!errors.tipo_equipo}
                      errorMessage={errors.tipo_equipo?.message}
                      classNames={{
                        label: 'font-medium text-base',
                        mainWrapper: 'pt-2 w-full',
                        selectorIcon: 'w-6 h-6',
                      }}
                      {...register('tipo_servicio')}
                      label="Tipo de servicio"
                      placeholder={!isLoadingTipoServicios ? tipoServicios![0].tipo : "Cargando datos..."}
                    >
                      {tipoServicios!?.map((equipo: TipoServicio) => (
                          <SelectItem key={equipo.tiposervicioid}>{equipo.tipo}</SelectItem>
                      ))}
                    </Select>

                    <Select
                      labelPlacement="outside"
                      variant="flat"
                      isInvalid={!!errors.tipo_equipo}
                      errorMessage={errors.tipo_equipo?.message}
                      classNames={{
                        label: 'font-medium text-base',
                        mainWrapper: 'pt-2 w-full',
                        selectorIcon: 'w-6 h-6',
                      }}
                      {...register('tipo_equipo')}
                      label="Tipo de equipo"
                      placeholder={!isLoadingTipoEquipos ? tiposEquipos![0].tipo : "Cargando datos..."}
                    >
                      {tiposEquipos!?.map((equipo: TipoEquipo) => (
                          <SelectItem key={equipo.tipoequipoid}>{equipo.tipo}</SelectItem>
                      ))}
                    </Select>

                    <Input
                      type="text"
                      label="Marca"
                      labelPlacement="outside"
                      placeholder="Marca del equipo"
                      variant="flat"
                      {...register('marca')}
                      errorMessage={errors.marca?.message}
                      isInvalid={!!errors.marca}
                    />

                    <Input
                      type="text"
                      label="Número de serie"
                      labelPlacement="outside"
                      placeholder="Número de serie"
                      variant="flat"
                      {...register('numero_serie')}
                      errorMessage={errors.numero_serie?.message}
                      isInvalid={!!errors.numero_serie}
                    />
                    <Button type="submit" color="primary" className="mt-4 w-full">Crear equipo</Button>
                  </form>
                </ModalBody>
              </>
            )
          }
        </ModalContent>
      </Modal>
    </>
  )
}
