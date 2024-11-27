'use client'
import { useLazyGetServiciosByClienteQuery } from "@/storage/api/service";
import { timeAgo } from "@/utils/date";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, CardHeader, Card, CardBody } from "@nextui-org/react";
import { useEffect } from "react";


export const ServicioModal = ({ isOpen, onClose, serviceId }: { isOpen: boolean, onClose: () => void, serviceId: string }) => {
  const [ trigger, result, lastPromiseInfo ] = useLazyGetServiciosByClienteQuery()
  // console.log('xddd ', serviceId, result, lastPromiseInfo)

  useEffect(() => {
    if (serviceId && lastPromiseInfo?.lastArg !== serviceId) {
      console.log('loading')
      trigger(serviceId)
    }
  }, [serviceId])
  console.log(result)
  
  return (
    <>
    <Modal
        size="3xl" 
        isOpen={isOpen} 
        onClose={onClose} 
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Detalles de este servicio</ModalHeader>
              <ModalBody>
                <div>
                  <h2 className="text-lg font-bold">Cliente:</h2>
                  <section className="flex justify-between mt-2">
                    <div>
                      <h3 className="font-bold">Nombre</h3>
                      <p>Miguel Angel Hernández Gaitan</p>
                    </div>
                    <div>
                      <h3 className="font-bold">RUC</h3>
                      <p>001-230504-1049T</p>
                    </div>
                    <div>
                      <h3 className="font-bold">Tipo</h3>
                      <p>Natural</p>
                    </div>
                  </section>
                  <h2>Otros servicios del cliente</h2>
                  <section className="grid grid-cols-4">
                    {
                      result.currentData?.map((servicio, index) => {
                        return (
                          <Card key={index}>
                            <CardHeader className="flex flex-col gap-2 items-start">
                              <div className="flex items-center justify-between w-full">
                                <div className="flex justify-between items-center gap-2">
                                  <div className="p-2 bg-slate-500/40 rounded-lg">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 64 64" fill="none">
                                      <g clipPath="url(#clip0_574_337)">
                                      <path d="M4 9.25278e-05L0 4.00009L8.8 16.3241C9.17047 16.8431 9.65963 17.266 10.2267 17.5575C10.7938 17.849 11.4224 18.0008 12.06 18.0001H12.34C12.8659 17.9997 13.3868 18.103 13.8727 18.3041C14.3587 18.5052 14.8002 18.8002 15.172 19.1721L25.872 29.8721L15.404 40.4881C13.6136 39.9611 11.725 39.8585 9.88799 40.1885C8.05101 40.5185 6.31621 41.2721 4.8212 42.3893C3.32618 43.5066 2.11208 44.9569 1.27521 46.6252C0.438345 48.2934 0.0017288 50.1337 0 52.0001C0.00239785 53.7198 0.374415 55.419 1.09085 56.9824C1.80728 58.5458 2.85138 59.937 4.15242 61.0617C5.45347 62.1863 6.98104 63.0182 8.63166 63.5009C10.2823 63.9837 12.0174 64.106 13.7194 63.8595C15.4214 63.6131 17.0506 63.0038 18.4965 62.0727C19.9424 61.1417 21.1714 59.9107 22.1 58.4633C23.0287 57.0158 23.6354 55.3856 23.879 53.6832C24.1226 51.9808 23.9974 50.2459 23.512 48.5961L34.128 38.1281L38 42.0001L36.78 45.6561C36.5456 46.3608 36.512 47.1168 36.6829 47.8396C36.8539 48.5623 37.2227 49.2231 37.748 49.7481L50.828 62.8281C51.1986 63.2008 51.6393 63.4966 52.1246 63.6985C52.6099 63.9003 53.1304 64.0042 53.656 64.0042C54.1816 64.0042 54.7021 63.9003 55.1874 63.6985C55.6727 63.4966 56.1134 63.2008 56.484 62.8281L62.828 56.4841C63.2007 56.1135 63.4965 55.6728 63.6984 55.1875C63.9002 54.7022 64.0041 54.1817 64.0041 53.6561C64.0041 53.1305 63.9002 52.61 63.6984 52.1247C63.4965 51.6393 63.2007 51.1987 62.828 50.8281L49.748 37.7481C49.223 37.2228 48.5622 36.854 47.8395 36.683C47.1167 36.512 46.3607 36.5457 45.656 36.7801L42 38.0001L38.16 34.1601L48.88 23.5881C50.6584 24.0628 52.522 24.1228 54.3272 23.7633C56.1323 23.4039 57.8309 22.6347 59.2918 21.5151C60.7527 20.3954 61.937 18.9553 62.7533 17.3055C63.5696 15.6558 63.9961 13.8407 64 12.0001C64 10.9201 63.864 9.88409 63.592 8.89209L55.032 17.4561L48 16.0001L46.544 8.97209L55.108 0.408093C53.0708 -0.139662 50.9252 -0.140685 48.8874 0.405128C46.8497 0.950941 44.9918 2.0243 43.5011 3.51701C42.0105 5.00972 40.9396 6.86903 40.3966 8.90751C39.8535 10.946 39.8575 13.0916 40.408 15.1281L29.848 25.8401L19.172 15.1721C18.4218 14.4221 18.0002 13.4049 18 12.3441V12.0601C18.0001 11.4231 17.848 10.7954 17.5565 10.229C17.265 9.6627 16.8424 9.17417 16.324 8.80409L4 9.25278e-05ZM42.584 42.5841C42.7698 42.3978 42.9905 42.2501 43.2335 42.1492C43.4764 42.0484 43.7369 41.9965 44 41.9965C44.2631 41.9965 44.5236 42.0484 44.7665 42.1492C45.0095 42.2501 45.2302 42.3978 45.416 42.5841L57.072 54.2441C57.4363 54.6213 57.6379 55.1265 57.6333 55.6509C57.6288 56.1753 57.4185 56.6769 57.0476 57.0477C56.6768 57.4185 56.1752 57.6289 55.6508 57.6334C55.1264 57.638 54.6212 57.4364 54.244 57.0721L42.584 45.4161C42.3977 45.2303 42.25 45.0096 42.1492 44.7666C42.0483 44.5236 41.9964 44.2632 41.9964 44.0001C41.9964 43.737 42.0483 43.4765 42.1492 43.2336C42.25 42.9906 42.3977 42.7699 42.584 42.5841ZM12 44.0001L13.884 44.9681L16 45.0721L17.148 46.8521L18.928 48.0001L19.032 50.1161L20 52.0001L19.032 53.8841L18.928 56.0001L17.148 57.1481L16 58.9281L13.884 59.0321L12 60.0001L10.116 59.0321L8 58.9281L6.852 57.1481L5.072 56.0001L4.968 53.8841L4 52.0001L4.968 50.1161L5.072 48.0001L6.852 46.8521L8 45.0721L10.116 44.9681L12 44.0001Z" fill="black"/>
                                      </g>
                                      <defs>
                                      <clipPath id="clip0_574_337">
                                      <rect width="64" height="64" fill="white"/>
                                      </clipPath>
                                      </defs>
                                    </svg>
                                  </div>
                                  <p className="font-bold text-lg">{`${servicio.clientes.nombre} ${servicio.clientes.apellido}`}</p>
                                  <p>{timeAgo(servicio.fecha)}</p>
                                </div>
                                {/* <Link href={`/home/servicios/view/${data.servicioid}`}>
                                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 32 32" fill="none">
                                    <path d="M13.333 5.33337H7.99967C7.29243 5.33337 6.61415 5.61433 6.11406 6.11442C5.61396 6.61452 5.33301 7.2928 5.33301 8.00004V24C5.33301 24.7073 5.61396 25.3856 6.11406 25.8857C6.61415 26.3858 7.29243 26.6667 7.99967 26.6667H23.9997C24.7069 26.6667 25.3852 26.3858 25.8853 25.8857C26.3854 25.3856 26.6663 24.7073 26.6663 24V18.6667M15.9997 16L26.6663 5.33337M26.6663 5.33337V12M26.6663 5.33337H19.9997" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                  </svg>
                                </Link> */}
                              </div>
                              {/* <p className="select-none"><b>RUC</b>: {data.clientes.ruc}</p>
                              <p className="select-none"><b>Servicios</b>: {data.detalle_servicio.length}</p> */}
                            </CardHeader>
                            <CardBody>
                              <p>xd</p>
                            </CardBody>
                          </Card>
                        )
                      })
                    }
                  </section>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}