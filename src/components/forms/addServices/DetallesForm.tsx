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
import { DateInputFormat } from "@/utils/date";


type DetallesFormProps = {
  isOpen: boolean
  onOpen: () => void
  onOpenChange: () => void
}

const schema = yup.object().shape({
  costo: yup.number().required(),
  tiposervicioid: yup.string().required(),
  direccion: yup.string().required(),
  fecha: yup.date().required(),
  descripcion: yup.string().required(),
  equipo: yup.string().required()
})

export type FormData = {
  costo: number
  tiposervicioid: string
  direccion: string
  descripcion: string
  fecha: Date
  equipo: string
}

export default function DetallesForm({ isOpen, onOpen, onOpenChange }: DetallesFormProps) {
  const { data: equipos, isLoading: isLoadingEquipos } = useGetEquiposQuery('')
  const { data: tipoServicios, isLoading: isLoadingTipoServicios } = useGetTipoServiciosQuery('')
  const dispatch = useAppDispatch()
  const selector = useAppSelector(state => state.addService)
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(schema)
  })
  console.log(tipoServicios, errors, selector)

  const onSubmit = handleSubmit((data: FormData) => {
    console.log(data)
    dispatch(setDetalleServicio({
      costo: data.costo,
      direccion: data.direccion,
      descripcion: data.descripcion,
      fecha: DateInputFormat(data.fecha),
      tiposervicioid: data.tiposervicioid,
      equipoid: data.equipo
    }))
  })


  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} backdrop="blur">
        <ModalContent>
          <ModalHeader>
            <h2>Agregar detalles</h2>
          </ModalHeader>
          <ModalBody>
            <form className="grid grid-cols-1 gap-y-4" onSubmit={onSubmit}>
              <Input label="Costo" type="number" labelPlacement="outside" variant="flat" placeholder="1" {...register('costo')} />
              <Textarea label="Dirección" labelPlacement="outside" variant="flat" placeholder="Residencial Bolonia, Casa #5" {...register('direccion')} />
              <Textarea label="Descripción" labelPlacement="outside" variant="flat" placeholder="Detalles" {...register('descripcion')} />
              <DatePicker
                label="Fecha"
                labelPlacement="outside"
                variant="flat"
                hideTimeZone
                defaultValue={now(getLocalTimeZone())}
                showMonthAndYearPickers
                name={register('fecha').name}
                onChange={(date) => {
                  setValue('fecha', date.toDate())
                }}
              />
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
              <Button type="submit" color="primary">Agregar detalles</Button>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
