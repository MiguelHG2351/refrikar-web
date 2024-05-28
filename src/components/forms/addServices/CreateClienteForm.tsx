import {Button, Select, SelectItem} from "@nextui-org/react";
import * as yup from "yup";
import {useGetAllTipoClientsQuery} from "@/storage/api/clientes";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {setCliente} from "@/storage/serviceSlice";
import {useAppDispatch} from "@/hooks/redux";

type CreateClientFormProps = {
    onClose: () => void
}

export type FormData = {
    ruc: string,
    nombre: string,
    apellido?: string,
    telefono: number,
    tipo_cliente: string
    entidad: string
}

const schema = yup.object().shape({
    ruc: yup.string().required('Ingrese el RUC, porfavor'),
    nombre: yup.string().required('Ingrese el nombre, porfavor'),
    apellido: yup.string(),
    telefono: yup.number().required('Ingrese el telefono, porfavor'),
    tipo_cliente: yup.string().required('Seleccione el tipo de cliente'),
    entidad: yup.string().required('Ingrese la entidad, porfavor')
})

export default function CreateClientForm({ onClose }: CreateClientFormProps) {
    const { data, isLoading } = useGetAllTipoClientsQuery("")
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: yupResolver(schema)
    })
    const dispatch = useAppDispatch()

    console.log(errors)
    const onSubmit = handleSubmit((data: FormData) => {
        console.log(data)
        let cliente = {
            ruc: data.ruc,
            nombre: data.nombre,
            apellido: data.apellido,
            telefono: data.telefono,
            entidad: data.entidad,
            isNew: true,
            tipo_cliente: {
                tipo_clienteid: data.tipo_cliente,
                tipo_cliente: data.tipo_cliente
            }
        }

        dispatch(setCliente({
            clienteid: '',
            telefono: cliente.telefono,
            apellido: cliente.apellido,
            entidad: cliente.entidad,
            isNew: cliente.isNew,
            nombre: cliente.nombre,
            ruc: cliente.ruc,
            tipo_cliente: {
                tipo_clienteid: cliente.tipo_cliente.tipo_clienteid,
                tipo_cliente: cliente.tipo_cliente.tipo_cliente
            }
        }))
        onClose()
    })

    return (
        <form className="flex flex-wrap gap-4" onSubmit={onSubmit}>
            <div className="flex flex-col w-full gap-y-2">
                <label htmlFor="service_id" className="font-medium">RUC</label>
                <input className="border border-[#667085] py-2 px-2 bg-white rounded-md"
                       placeholder="#0099FFDADSSARF" type="text" {...register('ruc')} />
                {errors.ruc && <span className="text-red-500">{errors.ruc.message}</span>}
            </div>
            <div className="flex flex-col w-full gap-y-2">
                <label htmlFor="service_id" className="font-medium">Nombre</label>
                <input className="border border-[#667085] py-2 px-2 bg-white rounded-md"
                       placeholder="John Juan" type="text" {...register('nombre')} />
                {errors.nombre && <span className="text-red-500">{errors.nombre.message}</span>}
            </div>
            <div className="flex flex-col w-full gap-y-2">
                <label htmlFor="service_id" className="font-medium">Apellido</label>
                <input className="border border-[#667085] py-2 px-2 bg-white rounded-md"
                       placeholder="Doe Perez" type="text" {...register('apellido')} />
                {errors.apellido && <span className="text-red-500">{errors.apellido.message}</span>}
            </div>
            <div className="flex flex-col w-full gap-y-2">
                <label htmlFor="service_id" className="font-medium">Telefono</label>
                <input autoComplete="off" className="border border-[#667085] py-2 px-2 bg-white rounded-md"
                       placeholder="78703875" type="text" {...register('telefono')} />
                {errors.telefono && <span className="text-red-500">Ingrese el telefono, porfavor</span>}
            </div>
            <div className="bg-accent-2 px-2 py-4 w-full grid grid-cols-1 md:grid-cols-2 gap-2 rounded-lg">
                <div className="gap-y-2">
                    <Select
                        items={!isLoading ? data : []}
                        labelPlacement="outside"
                        variant="flat"
                        classNames={{
                            label: 'font-medium text-base',
                            mainWrapper: 'pt-2',
                            selectorIcon: 'w-6 h-6',
                            trigger: 'border-black h-11 border',
                        }}
                        label="Tipo de cliente"
                        placeholder={!isLoading ? data![0].tipo_cliente : "Cargando datos..."}
                        className="max-w-xs"
                        {...register('tipo_cliente')}
                    >
                        {(tipo) => <SelectItem key={tipo!.tipoclienteid}>{tipo.tipo_cliente}</SelectItem>}
                    </Select>
                    {errors.tipo_cliente && <span className="text-red-500">{errors.tipo_cliente.message}</span>}
                </div>
                <div className="flex flex-col gap-y-2">
                    <label htmlFor="service_id" className="font-medium">Entidad</label>
                    <input className="border border-[#667085] py-2 px-2 bg-white rounded-md"
                           placeholder="Empresa A" type="text" {...register('entidad')} />
                    {errors.entidad && <span className="text-red-500">{errors.entidad.message}</span>}
                </div>
            </div>
            <Button type="submit" fullWidth={true} color="primary">
                Agregar
            </Button>
        </form>
    )
}