import {Equipo, TipoServicio} from "@/dtos";
import { useGetEquiposQuery } from "@/storage/api/equipo";
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
import { useEffect } from "react";
import { toast } from "react-toastify";

const schema = yup.object().shape({
  costo: yup.number().typeError('Debes ingresar un monto').required('Este campo es requerido').min(0, 'El monto debe ser mayor a 0'),
  tiposervicioid: yup.string().required('Este campo es requerido'),
  direccion: yup.string().min(10).required('Necesitas ingresar una dirección'),
  fecha: yup.string().required('Es necesario ingresar una fecha'),
  descripcion: yup.string().optional(),
  equipo: yup.string().required('Este campo es requerido')
})

export type FormData = {
  costo: number
  tiposervicioid: string
  direccion: string
  descripcion?: string
  fecha: string
  equipo: string
}

export default function DetallesForm() {
  const { data: equipos, isLoading: isLoadingEquipos } = useGetEquiposQuery('')
  const { data: tipoServicios, isLoading: isLoadingTipoServicios } = useGetTipoServiciosQuery('')
  const dispatch = useAppDispatch()
  const {isOpen, onClose, onOpen, onOpenChange} = useDisclosure();
  const currentUser = useAppSelector(state => state.addService.cliente)
  const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      costo: 0
    },
    resolver: yupResolver(schema)
  })

  const onSubmit = handleSubmit((data: FormData) => {
    onClose()
    if (Object.keys(errors).length === 0) {
      dispatch(setDetalleServicio({
        costo: data.costo,
        direccion: data.direccion,
        descripcion: data.descripcion,
        fecha: data.fecha.toString(),
        tiposervicioid: data.tiposervicioid,
        equipoid: data.equipo,
      }))
      reset()
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
                  
                  <CreateEquipoForm />
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
    </>
  )
}

export type FormDataEquipo = {
  tipo_equipo: string;
  capacidad: number;
  marca: string;
  numero_serie: string;
}

const equipoSchema = yup.object().shape({
  tipo_equipo: yup.string().required('Este campo es requerido'),
  capacidad: yup.number().required('Este campo es requerido').min(0, 'La capacidad debe ser mayor a 0'),
  marca: yup.string().required('Este campo es requerido'),
  numero_serie: yup.string().required('Este campo es requerido')
})

const CreateEquipoForm = () => {
  const { isOpen: isOpenEquipo, onOpenChange: onOpenChangeEquipo, onOpen } = useDisclosure();
  const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm<FormDataEquipo>({
    defaultValues: {
      capacidad: 0,
      tipo_equipo: '',
      marca: '',
      numero_serie: '',
    },
    resolver: yupResolver(equipoSchema)
  })

  return (
    <>
      <div className="flex justify-between items-center w-full">
        <p>Agregar cliente </p>
        <Button onClick={onOpen}>Crear</Button>
      </div>
      <Modal isOpen={isOpenEquipo} onOpenChange={onOpenChangeEquipo} isDismissable={false} backdrop="blur">
        <ModalContent>
          {
            (onClose) => (
              <>
                <ModalHeader>
                  <h2>Crear equipo</h2>
                  <form>
                    <Input 
                      type="text"
                      label="Capacidad"
                      labelPlacement="outside"
                      placeholder="Capacidad del equipo"
                      variant="flat"
                      {...register('capacidad')}
                    />

                    <Input
                      type="text"
                      label="Tipo de equipo"
                      labelPlacement="outside"
                      placeholder="Tipo de equipo"
                      variant="flat"
                      {...register('tipo_equipo')}
                    />

                    <Input
                      type="text"
                      label="Marca"
                      labelPlacement="outside"
                      placeholder="Marca del equipo"
                      variant="flat"
                      {...register('marca')}
                    />

                    <Input
                      type="text"
                      label="Número de serie"
                      labelPlacement="outside"
                      placeholder="Número de serie"
                      variant="flat"
                      {...register('numero_serie')}
                    />

                  </form>
                </ModalHeader>
              </>
            )
          }
        </ModalContent>
      </Modal>
    </>
  )
}
