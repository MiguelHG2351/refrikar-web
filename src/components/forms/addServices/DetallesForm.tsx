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
import { useAppDispatch } from '@/hooks/redux'
import { now, getLocalTimeZone } from '@internationalized/date'
import { setDetalleServicio } from '@/storage/serviceSlice'
import { DateInputFormat } from "@/utils/date";

const schema = yup.object().shape({
  costo: yup.number().required('Este campo es requerido'),
  tiposervicioid: yup.string().required('Este campo es requerido'),
  direccion: yup.string().required('Este campo es requerido'),
  fecha: yup.string().required('Este campo es requerido'),
  descripcion: yup.string().required('Este campo es requerido'),
  equipo: yup.string().required('Este campo es requerido')
})

export type FormData = {
  costo: number
  tiposervicioid: string
  direccion: string
  descripcion: string
  fecha: string
  equipo: string
}

export default function DetallesForm() {
  const { data: equipos, isLoading: isLoadingEquipos } = useGetEquiposQuery('')
  const { data: tipoServicios, isLoading: isLoadingTipoServicios } = useGetTipoServiciosQuery('')
  const dispatch = useAppDispatch()
  const {isOpen, onClose, onOpen, onOpenChange} = useDisclosure();
  const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(schema)
  })

  const onSubmit = handleSubmit((data: FormData) => {
    if (Object.keys(errors).length === 0) {
      dispatch(setDetalleServicio({
        costo: data.costo,
        direccion: data.direccion,
        descripcion: data.descripcion,
        fecha: data.fecha.toString(),
        tiposervicioid: data.tiposervicioid,
        equipoid: data.equipo
      }))
      reset()
    }
  })


  return (
    <>
      <Button onPress={() => onOpen()}> Agregar detalles</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} backdrop="blur">
        <ModalContent>
          {(onClose) => (
            <>
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
                    onChange={(date) => {
                      setValue('fecha', date.toDate().toString())
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
                  <Button type="submit" onPress={onClose} color="primary">Agregar detalles</Button>
                </form>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
