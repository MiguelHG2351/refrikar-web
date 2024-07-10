import { Inventario } from '@/components/cards/dashboard/Inventario'
import ClientTable from '@/components/table/ClientTable'
import prisma from '@/config/prisma'
import { Metadata } from 'next'
import {DonutChart, Legend} from "@tremor/react";
import ServicioDonu from "@/components/charts/ServicioDonut";

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


export default async function Dashboard() {
  const productos = await getProducts()
  const clientes = await getClientes()

  return (
    <section className="px-6 py-4">
      <h2 className="text-2xl font-bold">Dashboard</h2>
      <section className="flex flex-col md:flex-row gap-x-6 gap-y-4 mt-4">
        <article className="bg-white shadow-card-primary flex-[100%] md:flex-1 p-3 rounded-lg flex flex-col gap-y-2">
          <h2 className="text-gray-primary font-bold">Pérdidas</h2>
          <span className="text-3xl font-bold">C$ 1,100</span>
          <div className="flex items-center gap-x-2">
            <div className="bg-red-primary/50 flex items-center rounded-md gap-x-1 px-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M13 20H11V8L5.49998 13.5L4.07998 12.08L12 4.16L19.92 12.08L18.5 13.5L13 8V20Z" fill="#DC2626"/>
              </svg>
              <span className="text-red-primary text-xs font-bold p-1">2.33%</span>
            </div>
            <p className="text-gray-primary text-sm font-medium">Últmo día</p>
          </div>
        </article>
        <article className="bg-white shadow-card-primary flex-[100%] md:flex-1 p-3 rounded-lg flex flex-col gap-y-2">
          <h2 className="text-gray-primary font-bold">Ganancia de ayer</h2>
          <span className="text-3xl font-bold">C$ 210</span>
          <div className="flex items-center gap-x-2">
            <div className="bg-green-primary/50 flex items-center rounded-md gap-x-1 px-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M13 20H11V8L5.49998 13.5L4.07998 12.08L12 4.16L19.92 12.08L18.5 13.5L13 8V20Z" fill="#008676"/>
              </svg>
              <span className="text-green-primary text-xs font-bold p-1">8.21%</span>
            </div>
            <p className="text-gray-primary text-sm font-medium">Últmo día</p>
          </div>
        </article>
        <article className="bg-white shadow-card-primary flex-[100%] md:flex-1 p-3 rounded-lg flex flex-col gap-y-2">
          <h2 className="text-gray-primary font-bold">Ingresos del mes</h2>
          <span className="text-3xl font-bold">C$ 126</span>
          <div className="flex items-center gap-x-2">
            <div className="bg-red-primary/50 flex items-center rounded-md gap-x-1 px-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M13 20H11V8L5.49998 13.5L4.07998 12.08L12 4.16L19.92 12.08L18.5 13.5L13 8V20Z" fill="#DC2626"/>
              </svg>
              <span className="text-red-primary text-xs font-bold p-1">1.1%</span>
            </div>
            <p className="text-gray-primary text-sm font-medium">Último día</p>
          </div>
        </article>
      </section>
      <div className="flex flex-col">
        <section className='bg-white border shadow-card-secondary px-2 py-4 mt-4 rounded-md'>
          <h2 className='text-gray font-bold'>Servicios</h2>
          <h3 className='font-bold text-2xl my-4'>Ingresos de servicio</h3>
          <ServicioDonu/>
        </section>
      </div>
      <div className="flex flex-col">
        <section className='bg-white border shadow-card-secondary px-2 py-4 mt-4 rounded-md'>
          <h2 className='text-gray font-bold'>Inventario</h2>
          <h3 className='font-bold text-2xl my-4'>Detalles de inventario</h3>
          <div className="flex flex-col gap-y-4">
            <div className="flex justify-between border rounded-lg px-2 flex-wrap py-4">
              <div>
                <h4 className="font-bold">Egresos de inventario</h4>
                <p className="font-bold text-2xl my-4">C$ 8,010</p>
                <p className="font-medium">3 productos sin stock</p>
              </div>
              <div className="flex flex-col items-end gap-4">
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
              <ClientTable clients={clientes}  />
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}
