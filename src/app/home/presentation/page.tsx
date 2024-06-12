'use client';
import {Card, CardBody, CardFooter, CardHeader} from "@nextui-org/card";
import {Divider} from "@nextui-org/react";
import { Link } from "@nextui-org/react";

export default function PresentationPage() {
  return (
      <section className="px-4 py-6">
        <div className="py-2">
          <h1 className="text-3xl font-bold">Refrikar:</h1>
          <h2 className="text-xl">Sistema de control financiero y gestion de inventario de bodega</h2>
        </div>
        <Divider/>
        <h3 className="text-lg font-bold mt-6">Qué es refrikar?</h3>
        <p>Refrikar es una empresa que ofrese servicios de aireas acondicionados y refrigeración, con el fin de mejorar
          la calidad de vida de las personas.</p>

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