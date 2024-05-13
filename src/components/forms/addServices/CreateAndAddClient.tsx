import { useAddClientMutation, useGetAllTipoClientsQuery } from "@/storage/api/clientes";
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem, useDisclosure } from "@nextui-org/react";

const tipoClient = [
  { value: '1', label: 'Persona' },
  { value: '2', label: 'Empresa' },
]

export default function CreateAndAddClient() {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const { data } = useGetAllTipoClientsQuery("")
  const [ postNewProject ] = useAddClientMutation()
  console.log(data)

  function onHandlerClick() {
    onOpen()
  }

  async function onHandlerSubmit(e: React.FormEvent) {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)

    await postNewProject({
      ruc: formData.get('ruc') as string,
      nombre: formData.get('nombre') as string,
      apellido: formData.get('apellido') as string,
      telefono: parseInt(formData.get('telefono') as string),
      entidad: formData.get('entidad') as string,
      tipoclienteid: formData.get('tipo_cliente') as string,
    }).unwrap()
    .then(res => {
      console.log(res)
    })
  }
  
  return (
    <>
      <span>No existe? <button type="button" className="underline" onClick={onHandlerClick}>Crea cliente</button></span>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} backdrop="blur">
        <ModalContent>
          {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  <h2>Agregar servicio</h2>
                  <p className="text-sm font-normal">Nota: Esto creará un usuario y se agregar automaticamente al servicio</p>
                </ModalHeader>
                <ModalBody>
                  <form onSubmit={onHandlerSubmit} className="flex flex-wrap gap-4">
                    <div className="flex flex-col w-full gap-y-2">
                      <label htmlFor="service_id" className="font-medium">RUC</label>
                      <input className="border border-[#667085] py-2 px-2 bg-white rounded-md" placeholder="#0099FFDADSSARF" type="text" name="ruc" />
                    </div>
                    <div className="flex flex-col w-full gap-y-2">
                      <label htmlFor="service_id" className="font-medium">Nombre</label>
                      <input className="border border-[#667085] py-2 px-2 bg-white rounded-md" placeholder="John Juan" type="text" name="nombre" />
                    </div>
                    <div className="flex flex-col w-full gap-y-2">
                      <label htmlFor="service_id" className="font-medium">Apellido</label>
                      <input className="border border-[#667085] py-2 px-2 bg-white rounded-md" placeholder="Doe Perez" type="text" name="apellido" />
                    </div>
                    <div className="flex flex-col w-full gap-y-2">
                      <label htmlFor="service_id" className="font-medium">Telefono</label>
                      <input className="border border-[#667085] py-2 px-2 bg-white rounded-md" placeholder="78703875" type="text" name="apellido" />
                    </div>
                    <div className="bg-accent-2 px-2 py-4 w-full grid grid-cols-1 md:grid-cols-2 gap-2 rounded-lg">
                      <div className="gap-y-2">
                        <Select
                          items={data}
                          labelPlacement="outside"
                          classNames={{
                            label: 'font-medium text-base',
                            mainWrapper: 'pt-2',
                            selectorIcon: 'w-6 h-6',
                            trigger: 'border-black h-11 border',
                          }}
                          label="Tipo de cliente"
                          placeholder={data![0].tipo_cliente}
                          className="max-w-xs"
                          name="tipo_cliente"
                        >
                          {(animal) => <SelectItem key={animal.tipoclienteid}>{animal.tipo_cliente}</SelectItem>}
                        </Select>
                      </div>
                      <div className="flex flex-col gap-y-2">
                        <label htmlFor="service_id" className="font-medium">Entidad</label>
                        <input className="border border-[#667085] py-2 px-2 bg-white rounded-md" placeholder="Empresa A" type="text" name="entidad" />
                      </div>
                    </div>
                    <Button type="submit" fullWidth={true} color="primary">
                      Crear
                    </Button>
                  </form>
                </ModalBody>
              </>
            )}
        </ModalContent>

      </Modal>
    </>
  )
}
