import Sidebar from "@/components/drawer-menu/Sidebar";
import Image from "next/image";

import { Button, Input } from '@nextui-org/react'
import prisma from "@/config/prisma";
import { DateInputFormat } from "@/utils/date";

async function getServicios() {
  const data = await prisma.servicios.findMany({
    include: {
      clientes: true,
      detalle_servicio: true
    }
  })

  return data
}

function Servicio({ data }: {data: any}) {
  
  return (
    <div className="flex flex-col shadow-card-secondary pt-4 overflow-hidden rounded-md">
      <span className="flex justify-center px-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="65" height="78" viewBox="0 0 65 78" fill="none">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M3.36967 2.82817C0.708252 5.48958 0.708252 9.76783 0.708252 18.3334V59.2084C0.708252 67.774 0.708252 72.0523 3.36967 74.7137C6.03109 77.3751 10.3093 77.3751 18.8749 77.3751H46.1249C54.6905 77.3751 58.9687 77.3751 61.6302 74.7137C64.2916 72.0523 64.2916 67.774 64.2916 59.2084V18.3334C64.2916 9.76783 64.2916 5.48958 61.6302 2.82817C58.9687 0.166748 54.6905 0.166748 46.1249 0.166748H18.8749C10.3093 0.166748 6.03109 0.166748 3.36967 2.82817ZM18.8749 18.3334C17.6704 18.3334 16.5152 18.8119 15.6635 19.6636C14.8117 20.5154 14.3333 21.6706 14.3333 22.8751C14.3333 24.0796 14.8117 25.2348 15.6635 26.0865C16.5152 26.9383 17.6704 27.4168 18.8749 27.4168H46.1249C47.3294 27.4168 48.4846 26.9383 49.3364 26.0865C50.1881 25.2348 50.6666 24.0796 50.6666 22.8751C50.6666 21.6706 50.1881 20.5154 49.3364 19.6636C48.4846 18.8119 47.3294 18.3334 46.1249 18.3334H18.8749ZM18.8749 36.5001C17.6704 36.5001 16.5152 36.9786 15.6635 37.8303C14.8117 38.682 14.3333 39.8372 14.3333 41.0418C14.3333 42.2463 14.8117 43.4015 15.6635 44.2532C16.5152 45.1049 17.6704 45.5834 18.8749 45.5834H46.1249C47.3294 45.5834 48.4846 45.1049 49.3364 44.2532C50.1881 43.4015 50.6666 42.2463 50.6666 41.0418C50.6666 39.8372 50.1881 38.682 49.3364 37.8303C48.4846 36.9786 47.3294 36.5001 46.1249 36.5001H18.8749ZM18.8749 54.6668C17.6704 54.6668 16.5152 55.1452 15.6635 55.997C14.8117 56.8487 14.3333 58.0039 14.3333 59.2084C14.3333 60.4129 14.8117 61.5681 15.6635 62.4199C16.5152 63.2716 17.6704 63.7501 18.8749 63.7501H37.0416C38.2461 63.7501 39.4013 63.2716 40.253 62.4199C41.1048 61.5681 41.5833 60.4129 41.5833 59.2084C41.5833 58.0039 41.1048 56.8487 40.253 55.997C39.4013 55.1452 38.2461 54.6668 37.0416 54.6668H18.8749Z" fill="black"/>
        </svg>
      </span>
      <div className="py-2 px-2">
        <h1 className="text-xl font-bold">{ `${data.clientes.nombre} ${data.clientes.apellido}` }</h1>
        <p>{data.clientes.telefono}</p>
        <p>RUC: {data.clientes.ruc}</p>
        <p>Fecha: { DateInputFormat(data.detalle_servicio[0].fecha) }</p>
        <p className="text-xl font-bold">Total: C$ {data.detalle_servicio.reduce((acc: number, curr: any) => acc + (curr.costo - 0), 0)}</p>
      </div>

      <button className="border font-medium py-4 px-2 flex items-center justify-between">
        Ver detalles
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M17.92 11.6199C17.8724 11.4972 17.801 11.385 17.71 11.2899L12.71 6.28994C12.6168 6.1967 12.5061 6.12274 12.3842 6.07228C12.2624 6.02182 12.1319 5.99585 12 5.99585C11.7337 5.99585 11.4783 6.10164 11.29 6.28994C11.1968 6.38318 11.1228 6.49387 11.0723 6.61569C11.0219 6.73751 10.9959 6.86808 10.9959 6.99994C10.9959 7.26624 11.1017 7.52164 11.29 7.70994L14.59 10.9999H7C6.73478 10.9999 6.48043 11.1053 6.29289 11.2928C6.10536 11.4804 6 11.7347 6 11.9999C6 12.2652 6.10536 12.5195 6.29289 12.707C6.48043 12.8946 6.73478 12.9999 7 12.9999H14.59L11.29 16.2899C11.1963 16.3829 11.1219 16.4935 11.0711 16.6154C11.0203 16.7372 10.9942 16.8679 10.9942 16.9999C10.9942 17.132 11.0203 17.2627 11.0711 17.3845C11.1219 17.5064 11.1963 17.617 11.29 17.7099C11.383 17.8037 11.4936 17.8781 11.6154 17.9288C11.7373 17.9796 11.868 18.0057 12 18.0057C12.132 18.0057 12.2627 17.9796 12.3846 17.9288C12.5064 17.8781 12.617 17.8037 12.71 17.7099L17.71 12.7099C17.801 12.6148 17.8724 12.5027 17.92 12.3799C18.02 12.1365 18.02 11.8634 17.92 11.6199Z" fill="black"/>
        </svg>
      </button>
    </div>
  )
}

export default async function Servicios() {
  const servicios = await getServicios();
  
  return (
    <main className="md:h-screen md:overflow-hidden md:grid md:grid-cols-[auto_1fr]">
        <Sidebar />
      <section className="bg-accent-1 overflow-y-auto">
        <header className="sticky top-0 bg-white flex justify-between items-center py-2 px-4 border-b">
          <div className="flex items-center gap-x-2">
            <button className="md:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 36 36" fill="none">
                <g clipPath="url(#clip0_310_79)">
                  <path
                      d="M30 26.25C30.5778 26.2503 31.1334 26.4729 31.5516 26.8716C31.9698 27.2704 32.2185 27.8147 32.2463 28.3919C32.2741 28.969 32.0787 29.5347 31.7007 29.9718C31.3228 30.4089 30.7911 30.6837 30.216 30.7395L30 30.75H6C5.42217 30.7497 4.86661 30.5271 4.44842 30.1284C4.03023 29.7296 3.78148 29.1853 3.75371 28.6081C3.72595 28.031 3.92129 27.4653 4.29926 27.0282C4.67724 26.5911 5.20887 26.3163 5.784 26.2605L6 26.25H30ZM30 15.75C30.5967 15.75 31.169 15.9871 31.591 16.409C32.0129 16.831 32.25 17.4033 32.25 18C32.25 18.5967 32.0129 19.169 31.591 19.591C31.169 20.0129 30.5967 20.25 30 20.25H6C5.40326 20.25 4.83097 20.0129 4.40901 19.591C3.98705 19.169 3.75 18.5967 3.75 18C3.75 17.4033 3.98705 16.831 4.40901 16.409C4.83097 15.9871 5.40326 15.75 6 15.75H30ZM30 5.25C30.5967 5.25 31.169 5.48705 31.591 5.90901C32.0129 6.33097 32.25 6.90326 32.25 7.5C32.25 8.09674 32.0129 8.66903 31.591 9.09099C31.169 9.51295 30.5967 9.75 30 9.75H6C5.40326 9.75 4.83097 9.51295 4.40901 9.09099C3.98705 8.66903 3.75 8.09674 3.75 7.5C3.75 6.90326 3.98705 6.33097 4.40901 5.90901C4.83097 5.48705 5.40326 5.25 6 5.25H30Z"
                      fill="black"/>
                </g>
                <defs>
                  <clipPath id="clip0_310_79">
                    <rect width="36" height="36" fill="white"/>
                  </clipPath>
                </defs>
              </svg>
            </button>
            <p>/Home/Servicios</p>
          </div>
          <div className="inline-flex items-center cursor-pointer">
            <div className="inline-block rounded-full bg-primary overflow-hidden">
              <Image src="/images/user-profile.png" alt="Foto de perfil del usuario" width={42} height={42}/>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="37" viewBox="0 0 36 37" fill="none">
              <g clipPath="url(#clip0_70_4708)">
                <path fillRule="evenodd" clipRule="evenodd"
                      d="M19.59 24.59C19.1681 25.0114 18.5962 25.248 18 25.248C17.4037 25.248 16.8318 25.0114 16.41 24.59L7.92297 16.106C7.50108 15.6839 7.26414 15.1115 7.26428 14.5147C7.26442 13.9179 7.50163 13.3457 7.92372 12.9238C8.34581 12.5019 8.91822 12.2649 9.515 12.2651C10.1118 12.2652 10.6841 12.5024 11.106 12.9245L18 19.8185L24.894 12.9245C25.3181 12.5145 25.8864 12.2874 26.4763 12.2922C27.0663 12.2971 27.6307 12.5335 28.0481 12.9504C28.4655 13.3674 28.7024 13.9316 28.7078 14.5216C28.7132 15.1115 28.4866 15.68 28.077 16.1045L19.5915 24.5915L19.59 24.59Z"
                      fill="black"/>
              </g>
              <defs>
                <clipPath id="clip0_70_4708">
                  <rect width="36" height="36" fill="white" transform="translate(0 0.5)"/>
                </clipPath>
              </defs>
            </svg>
          </div>
        </header>
        <section className="px-6 py-4">
          <h1 className="text-2xl font-bold">Servicios</h1>
          <form action="#" className="py-4">
            <Input type="text" label="Busca" placeholder="Buscar algo..." />
            <Button>Agregar servicio</Button>
          </form>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {servicios.map((servicio: any) => (
              <Servicio key={servicio.id} data={servicio} />
            ))}
          </div>
        </section>
      </section>
    </main>
  )
}
