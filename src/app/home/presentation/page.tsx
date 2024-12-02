'use client';
import {Card, CardBody, CardFooter, CardHeader} from "@nextui-org/card";
import {Divider} from "@nextui-org/react";
import { Link } from "@nextui-org/react";
import Image from "next/image"

export default function PresentationPage() {
  return (
      <section className="px-4 py-6">
        <div className="flex max-w-[1920px] m-auto flex-col items-start">
        <section className="relative w-full" style={{ height: 'auto' }} >
          <Image
            src="/images/bannerreducido.jpg" // Ruta de tu imagen
            alt="Banner principal"
            layout="responsive" // Usar layout responsive para ajustar proporciones
            width={1920} // Ancho en píxeles
            height={600} // Altura en píxeles (ajústalo según las proporciones de tu imagen)
            objectFit="cover" // Asegura que llene el contenedor
            quality={100} // Calidad óptima
          />
        </section>
        </div>

        <div className="py-2">
          <h2 className="text-3xl font-bold">Plataforma Web de Registro de Servicios, Inventario y Finanzas</h2>
          <h2 className="text-2xl font-bold">Taller de Aire Acondicionado Refrikar</h2>
        </div>
        <Divider/>
        <h3 className="text-lg font-bold mt-6">Qué es refrikar?</h3>
        <p>Refrikar es un taller especializado en la reparación, mantenimiento e instalación de equipos de aire acondicionado domiciliarios e 
          industriales. Fundada en Managua en 2022, la empresa se ha dedicado a brindar soluciones confiables y personalizadas en el ámbito de la 
          refrigeración, destacándose por su compromiso con la calidad y la satisfacción del cliente.</p>
        <p>Aunque actualmente opera con un equipo pequeño de tres empleados, Refrikar se posiciona como un ejemplo de resiliencia y ambición en el 
          sector. Su enfoque combina métodos tradicionales con una visión innovadora, marcando un paso significativo hacia la modernización y 
          expansión de sus servicios a través de la implementación de nuevas herramientas tecnológicas.</p>
        <p>En su evolución, Refrikar no solo se dedica a resolver problemas técnicos, sino también a garantizar un impacto positivo en la 
          productividad y la eficiencia de sus operaciones, reafirmando su misión de ser un aliado confiable para hogares y empresas en la 
          gestión de sistemas de refrigeración y aire acondicionado.</p>
        

        <section>
          <h2 className="text-2xl font-bold mt-6">Servicios</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 py-4 py-4">
            <Card className="max-w-[400px]">
              <CardHeader className="flex gap-3">
                <div className="flex flex-col">
                  <p className="text-md">Servicios realizados</p>
                  <p className="text-small text-default-500">Lista de todos los servicios realizados a clientes</p>
                </div>
              </CardHeader>
              <Divider/>
              <CardBody>
                <p>En esta página encontrará todos los servicios los cuáles podrá filtrar por fecha, cliente y más</p>
              </CardBody>
              <Divider/>
              <CardFooter>
                <Link
                    showAnchorIcon
                    href="/home/servicios"
                >
                  Ver sección.
                </Link>
              </CardFooter>
            </Card>
            <Card className="max-w-[400px]">
              <CardHeader className="flex gap-3">
                <div className="flex flex-col">
                  <p className="text-md">Agregar servicio</p>
                  <p className="text-small text-default-500">Agregar servicios y asociarlos a un cliente</p>
                </div>
              </CardHeader>
              <Divider/>
              <CardBody>
                <p>En esta página encontrará todos los servicios los cuáles podrá filtrar por fecha, cliente y más</p>
              </CardBody>
              <Divider/>
              <CardFooter>
                <Link
                    showAnchorIcon
                    href="/home/servicios/add"
                >
                  Ver sección.
                </Link>
              </CardFooter>
            </Card>
          </div>
        </section>
        <section>
          <h2 className="text-2xl font-bold mt-6">Clientes</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 py-4 py-4">
            <Card className="max-w-[400px]">
              <CardHeader className="flex gap-3">
                <div className="flex flex-col">
                  <p className="text-md">Clientes agregados</p>
                  <p className="text-small text-default-500">Lista de todos los clientes</p>
                </div>
              </CardHeader>
              <Divider/>
              <CardBody>
                <p>Lista de todos los clientes (solo se puede agregar un cliente desde el formulario de agregar servicio)</p>
              </CardBody>
              <Divider/>
              <CardFooter>
                <Link
                    showAnchorIcon
                    href="/home/clientes"
                >
                  Ver sección.
                </Link>
              </CardFooter>
            </Card>
          </div>
        </section>
        <section>
          <h2 className="text-2xl font-bold mt-6">Proveedores</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 py-4 py-4">
            <Card className="max-w-[400px]">
              <CardHeader className="flex gap-3">
                <div className="flex flex-col">
                  <p className="text-md">Servicios realizados</p>
                  <p className="text-small text-default-500">Lista de todos los servicios realizados a clientes</p>
                </div>
              </CardHeader>
              <Divider/>
              <CardBody>
                <p>En esta página encontrará todos los servicios los cuáles podrá filtrar por fecha, cliente y más</p>
              </CardBody>
              <Divider/>
              <CardFooter>
                <Link
                    showAnchorIcon
                    href="/home/servicios"
                >
                  Ver sección.
                </Link>
              </CardFooter>
            </Card>
            <Card className="max-w-[400px]">
              <CardHeader className="flex gap-3">
                <div className="flex flex-col">
                  <p className="text-md">Agregar servicio</p>
                  <p className="text-small text-default-500">Agregar servicios y asociarlos a un cliente</p>
                </div>
              </CardHeader>
              <Divider/>
              <CardBody>
                <p>En esta página encontrará todos los servicios los cuáles podrá filtrar por fecha, cliente y más</p>
              </CardBody>
              <Divider/>
              <CardFooter>
                <Link
                    showAnchorIcon
                    href="/home/servicios/add"
                >
                  Ver sección.
                </Link>
              </CardFooter>
            </Card>
          </div>
        </section>
      </section>
  );
}