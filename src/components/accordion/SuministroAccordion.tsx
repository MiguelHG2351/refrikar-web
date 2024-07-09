'use client'

import { Accordion, AccordionItem } from "@nextui-org/react";
import {useGetSuministrosQuery} from "@/storage/api/suministro";
import {Suministro} from "@/dtos/Suministro";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from '@tremor/react';

export default function SuministroAccordion() {
  const { data, isLoading}  = useGetSuministrosQuery("")
  console.log(data)

  return (
      <section className="px-6">
        {
          data!?.map((suministro: Suministro) => (
              <Accordion key={suministro.proveedorid} className="border-b border-b-black font-medium">
                <AccordionItem title={`${suministro.nombre} ${suministro?.apellido || ""}`}>
                  <div className="mb-4 pl-4">
                    <p className="text-sm">Telefono: {suministro.telefono}</p>
                    <p className="text-sm">Dirección: {suministro.direccion}</p>
                    <p className="text-sm">RUC: {suministro.ruc}</p>
                  </div>
                  <ul>
                    { suministro.suministro.map(_suministro => (
                      <li key={_suministro.suministroid}>
                        <h4 className="font-bold px-4 text-sm">No. Suministro: {_suministro.suministroid}</h4>
                        <Table>
                          <TableHead>
                            <TableRow>
                              <TableHeaderCell>Producto</TableHeaderCell>
                              <TableHeaderCell>
                                Cantidad
                              </TableHeaderCell>
                              <TableHeaderCell>Subtotal</TableHeaderCell>
                              <TableHeaderCell>Total</TableHeaderCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {
                              _suministro.detalle_suministro.map(detalle => (
                                <TableRow key={detalle.detallesuministroid}>
                                  <TableCell>{detalle.productos.nombre}</TableCell>
                                  <TableCell>Cantidad: {detalle.cantidad}</TableCell>
                                  <TableCell>Costo: {detalle.costo}</TableCell>
                                  <TableCell>Total: {detalle.costo * (detalle.cantidad - 0 as number)}</TableCell>
                                </TableRow>
                              ))
                            }
                          </TableBody>
                        </Table>
                      </li>
                    ))}
                  </ul>
                </AccordionItem>
              </Accordion>
          ))
        }
      </section>
  )
}