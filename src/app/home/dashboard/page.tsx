import { Inventario } from '@/components/cards/dashboard/Inventario'
import Sidebar from '@/components/drawer-menu/Sidebar'
import ClientTable from '@/components/table/ClientTable'
import prisma from '@/config/prisma'
import { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Dashboard',
}

async function getProducts() {
  const data = await prisma.productos.findMany({
    include: {
      inventario: true,
      categoria_producto: true
    }
  });

  const result: { [key: string]: any[] } = {};

  data.forEach((product) => {
    const category = product.categoria_producto?.descripcion || 'Uncategorized';
    if (!result[category]) {
      result[category] = [];
    }
    result[category].push(product);
  });

  return result;
}

async function getClientes () {
  const data = await prisma.clientes.findMany({
    include: {
      tipo_cliente: true
    }
  });

  return data;
}

async function getTipoCliente () {
  const data = await prisma.tipo_cliente.findMany();

  return data;
}

export default async function Dashboard() {
  const productos = await getProducts()
  const clientes = await getClientes()
  const tipoCliente = await getTipoCliente()

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
              <p>/Home/Dashboard</p>
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
            <h2 className="text-2xl font-bold">Dashboard</h2>
            <section className="flex flex-col md:flex-row gap-x-6 gap-y-4 mt-4">
              <article className="bg-white shadow-card-primary flex-[100%] md:flex-1 p-3 rounded-lg flex flex-col gap-y-2">
                <h2 className="text-gray-primary font-bold">Pérdidas</h2>
                <span className="text-3xl font-bold">C$ 2,000</span>
                <div className="flex items-center gap-x-2">
                  <div className="bg-red-primary/50 flex items-center rounded-md gap-x-1 px-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M13 20H11V8L5.49998 13.5L4.07998 12.08L12 4.16L19.92 12.08L18.5 13.5L13 8V20Z" fill="#DC2626"/>
                    </svg>
                    <span className="text-red-primary text-xs font-bold p-1">12.33%</span>
                  </div>
                  <p className="text-gray-primary text-sm font-medium">Mes anterior</p>
                </div>
              </article>
              <article className="bg-white shadow-card-primary flex-[100%] md:flex-1 p-3 rounded-lg flex flex-col gap-y-2">
                <h2 className="text-gray-primary font-bold">Ganancia del mes</h2>
                <span className="text-3xl font-bold">C$ 2,000</span>
                <div className="flex items-center gap-x-2">
                  <div className="bg-green-primary/50 flex items-center rounded-md gap-x-1 px-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M13 20H11V8L5.49998 13.5L4.07998 12.08L12 4.16L19.92 12.08L18.5 13.5L13 8V20Z" fill="#008676"/>
                    </svg>
                    <span className="text-green-primary text-xs font-bold p-1">12.33%</span>
                  </div>
                  <p className="text-gray-primary text-sm font-medium">Mes anterior</p>
                </div>
              </article>
              <article className="bg-white shadow-card-primary flex-[100%] md:flex-1 p-3 rounded-lg flex flex-col gap-y-2">
                <h2 className="text-gray-primary font-bold">Ingresos del mes</h2>
                <span className="text-3xl font-bold">C$ 2,000</span>
                <div className="flex items-center gap-x-2">
                  <div className="bg-red-primary/50 flex items-center rounded-md gap-x-1 px-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M13 20H11V8L5.49998 13.5L4.07998 12.08L12 4.16L19.92 12.08L18.5 13.5L13 8V20Z" fill="#DC2626"/>
                    </svg>
                    <span className="text-red-primary text-xs font-bold p-1">12.33%</span>
                  </div>
                  <p className="text-gray-primary text-sm font-medium">Mes anterior</p>
                </div>
              </article>
            </section>
            <div className="flex flex-col">
              <section className='bg-white border shadow-card-secondary px-2 py-4 mt-4 rounded-md'>
                <h2 className='text-gray font-bold'>Inventario</h2>
                <h3 className='font-bold text-2xl my-4'>Detalles de inventario</h3>
                <div className="flex flex-col gap-y-4">
                  <div className="flex justify-between border rounded-lg px-2 flex-wrap py-4">
                    <div>
                      <h4 className="font-bold">Egresos de inventario</h4>
                      <p className="font-bold text-2xl my-4">C$ 12,000</p>
                      <p className="font-medium">3 productos sin stock</p>
                    </div>
                    <div className="flex flex-col items-end gap-4">
                      <button className="w-max p-2 bg-[#FBFAFE] shadow-card-secondary rounded-md">
                        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26" fill="none">
                          <path d="M20.5833 20.5834H5.41667V8.66671H20.5833M17.3333 1.08337V3.25004H8.66667V1.08337H6.5V3.25004H5.41667C4.21417 3.25004 3.25 4.21421 3.25 5.41671V20.5834C3.25 21.158 3.47827 21.7091 3.8846 22.1154C4.29093 22.5218 4.84203 22.75 5.41667 22.75H20.5833C21.158 22.75 21.7091 22.5218 22.1154 22.1154C22.5217 21.7091 22.75 21.158 22.75 20.5834V5.41671C22.75 4.84207 22.5217 4.29097 22.1154 3.88464C21.7091 3.47831 21.158 3.25004 20.5833 3.25004H19.5V1.08337M18.4167 13H13V18.4167H18.4167V13Z" fill="black"/>
                        </svg>
                      </button>
                      <button className="flex items-center gap-x-2">
                        Ver detalles
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                          <path d="M21.0459 12.796L14.2959 19.546C14.0846 19.7573 13.7979 19.8761 13.4991 19.8761C13.2002 19.8761 12.9135 19.7573 12.7022 19.546C12.4908 19.3346 12.3721 19.048 12.3721 18.7491C12.3721 18.4502 12.4908 18.1636 12.7022 17.9522L17.5312 13.125H3.75C3.45163 13.125 3.16548 13.0065 2.9545 12.7955C2.74353 12.5846 2.625 12.2984 2.625 12C2.625 11.7017 2.74353 11.4155 2.9545 11.2045C3.16548 10.9936 3.45163 10.875 3.75 10.875H17.5312L12.7041 6.04504C12.4927 5.8337 12.374 5.54705 12.374 5.24817C12.374 4.94928 12.4927 4.66264 12.7041 4.45129C12.9154 4.23995 13.2021 4.12122 13.5009 4.12122C13.7998 4.12122 14.0865 4.23995 14.2978 4.45129L21.0478 11.2013C21.1527 11.3059 21.2359 11.4303 21.2926 11.5672C21.3493 11.7041 21.3784 11.8508 21.3782 11.999C21.3781 12.1472 21.3486 12.2939 21.2916 12.4307C21.2346 12.5674 21.1511 12.6916 21.0459 12.796Z" fill="black"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row gap-2">
                    <Inventario inventario={productos} />
                  </div>
                </div>
              </section>
              <section className="bg-white shadow-card-secondary px-2 py-4 mt-4 rounded-md">
                <h2 className='text-gray font-bold'>Clientes</h2>
                <h3 className='font-bold text-2xl my-4'>Detalles de clientes</h3>
                <div className="flex flex-col gap-y-4">
                  <div className="flex justify-between border rounded-lg px-2 flex-wrap py-4">
                    <div>
                      <h4 className="font-bold">Total de clientes</h4>
                      <p className="font-bold my-4">Todos los clientes ordenados por más recientes</p>
                    </div>
                    <form className="flex items-center gap-x-2">
                      <input type="text" className="border border-gray-primary placeholder:text-gray-primary rounded-md p-2" placeholder='Escribe algo...' />
                      <button>
                        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="27" viewBox="0 0 26 27" fill="none">
                          <path d="M20.5833 21.0834H5.41667V9.16671H20.5833M17.3333 1.58337V3.75004H8.66667V1.58337H6.5V3.75004H5.41667C4.21417 3.75004 3.25 4.71421 3.25 5.91671V21.0834C3.25 21.658 3.47827 22.2091 3.8846 22.6154C4.29093 23.0218 4.84203 23.25 5.41667 23.25H20.5833C21.158 23.25 21.7091 23.0218 22.1154 22.6154C22.5217 22.2091 22.75 21.658 22.75 21.0834V5.91671C22.75 5.34207 22.5217 4.79097 22.1154 4.38464C21.7091 3.97831 21.158 3.75004 20.5833 3.75004H19.5V1.58337M18.4167 13.5H13V18.9167H18.4167V13.5Z" fill="black"/>
                        </svg>
                      </button>
                    </form>
                    <ClientTable clients={clientes}  />
                  </div>
                </div>
              </section>
            </div>
          </section>
        </section>
      </main>
  );
}
