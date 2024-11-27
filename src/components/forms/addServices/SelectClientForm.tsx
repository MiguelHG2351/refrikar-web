import {Autocomplete, AutocompleteItem, Button, Select, SelectItem} from "@nextui-org/react";
import { useForm } from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {useGetAllClientsQuery} from "@/storage/api/clientes";
import * as yup from "yup";
import {setCliente} from "@/storage/serviceSlice";
import { Cliente } from "@/dtos"
import { useAppDispatch } from "@/hooks/redux";
import {toast} from "react-toastify";
import {useEffect} from "react";

type SelectClientFormProps = {
    onClose: () => void
}

type FormData = {
    client_id: string
}

const schema = yup.object().shape({
    client_id: yup.string().required()
})
export default function SelectClientForm({ onClose }: SelectClientFormProps) {
    const { data: listOfClients } = useGetAllClientsQuery({})
    const dispatch = useAppDispatch()

    const { register, setValue, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: yupResolver(schema)
    })

    useEffect(() => {
        if (Object.keys(errors).length > 0) {
            toast('Por favor, seleccione un cliente', {
                type: 'error'
            })
        }
    }, [errors])

    const onSubmit = handleSubmit((data: FormData) => {

        let findClient = listOfClients?.find((client: Cliente) => client.clienteid === data.client_id)
        if (!findClient) return

        dispatch(setCliente({
            clienteid: findClient.clienteid,
            telefono: findClient.telefono,
            apellido: findClient.apellido,
            entidad: findClient.entidad,
            isNew: false,
            nombre: findClient.nombre,
            ruc: findClient.ruc,
            tipo_cliente: {
                tipo_clienteid: findClient.tipo_cliente.tipoclienteid,
                tipo_cliente: findClient.tipo_cliente.tipo_cliente
            }
        }))
        onClose()
    })

    return (
        <form onSubmit={onSubmit} className="flex flex-col gap-y-4">
            <Autocomplete
                label="Cliente"
                labelPlacement="outside"
                variant="flat"
                onSelectionChange={(key) => setValue('client_id', key?.toString() || '')}
                placeholder="Seleccione un cliente"
            >
                {listOfClients!?.map((client: any) => (
                    <AutocompleteItem key={client.clienteid} value={client.clienteid}>
                        {`${client.nombre} ${client.apellido}`}
                    </AutocompleteItem>
                ))}
            </Autocomplete>
            <Button type="submit" fullWidth={true} color="primary">
                Agregar
            </Button>
        </form>
    )
}