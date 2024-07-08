'use client'

import {
  Button,
  Checkbox,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure
} from "@nextui-org/react";
import Link from "next/link";
import {useForm} from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import {EyeFilledIcon, EyeSlashFilledIcon} from "@/components/icons/Icons";
import {useState} from "react";
import {useCreateUserMutation} from "@/storage/api/users";
import {toast} from "react-toastify";

const schema = yup.object().shape({
  firstName: yup.string().required("Ingrese el nombre, porfavor"),
  lastName: yup.string().required("Ingrese el apellido, porfavor"),
  email: yup.string().email().required("Ingrese el email, porfavor"),
  password: yup.string().min(8).required("La contraseña debe tener al menos 8 caracteres"),
  role: yup.bool()
})

export default function AddUserModal() {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      role: false
    }
  })
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const [ onUser ] = useCreateUserMutation()
  const onSubmit = handleSubmit((data) => {
    onUser({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
      role: data.role ? 'admin' : 'user'
    }).unwrap()
      .then((data) => {
        toast('Usuario creado!', {
          type: 'success'
        })
        reset()
        onOpenChange()
      })
      .catch((error) => {
        toast(error.data.message, {
          type: 'error'
        })
      })
  })

  return (
      <>
        <Button onPress={onOpen} className="rounded-md bg-primary text-white flex-shrink-0">Agregar usuario</Button>
        <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            placement="top-center"
        >
          <ModalContent>
            {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">Registrar usuario</ModalHeader>
                  <ModalBody>
                    <form onSubmit={onSubmit} className="flex flex-col gap-y-4">
                      <div>
                        <Input
                            autoFocus
                            label="Nombre"
                            autoComplete="off"
                            placeholder="Escribe tus nombres"
                            {...register('firstName')}
                            variant="bordered"
                        />
                        {errors.firstName && <span className="text-red-500">{errors.firstName.message}</span>}
                      </div>
                      <div>
                        <Input
                            autoFocus
                            label="Apellido"
                            autoComplete="off"
                            placeholder="Escribe tus apellidos"
                            {...register('lastName')}
                            variant="bordered"
                        />
                        {errors.lastName && <span className="text-red-500">{errors.lastName.message}</span>}
                      </div>
                      <div>

                        <Input
                            autoFocus
                            label="Email"
                            autoComplete="off"
                            placeholder="Enter your email"
                            {...register('email')}
                            variant="bordered"
                        />
                        {errors.email && <span className="text-red-500">{errors.email.message}</span>}
                      </div>
                      <div>
                        <Checkbox
                          {...register('role')}
                        >
                          Es admin?
                        </Checkbox>
                      </div>
                      <div>
                        <Input
                            label="Password"
                            placeholder="Enter your password"
                            type={ isVisible ? 'text' : 'password' }
                            autoComplete="off"
                            variant="bordered"
                            {...register('password')}
                            endContent={
                              <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                                {isVisible ? (
                                    <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none"/>
                                ) : (
                                    <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none"/>
                                )}
                              </button>
                            }
                        />
                        {errors.password && <span className="text-red-500">La contraseña debería tener al menos 8 carácteres</span>}
                      </div>
                      <div className="flex flex-row gap-2 px-6 py-4 justify-end">
                        <Button className="rounded-md" type="button" color="danger" variant="flat" onPress={onClose}>
                          Close
                        </Button>
                        <Button color="primary" type="submit" className="rounded-md">
                          Registrar
                        </Button>
                      </div>
                    </form>
                  </ModalBody>
                </>
            )}
          </ModalContent>
        </Modal>
      </>
  )
}