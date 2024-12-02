'use client'

import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, getKeyValue } from "@nextui-org/react"
import { Key } from "react"

export default function DetallesServicio({ detalles }: {detalles: any[]}) {
let indice=1;
  function CellValue({ columnKey, item }: {columnKey: Key, item: any}) {
    console.log('columnkey>>>',item.tipo_servicio);
    switch (columnKey) {    
      case 'cantidad':
        indice++;
        return indice-1;
      case 'servicio':
          return item.tiposervicioid
      case 'equipo':
          return item.equipoid
      case 'descripcion':
        return item.descripcion
      case 'precio_unit':
        return item.costo
      case 'precio':
        return item.costo
      default:
        return <TableCell>nothing</TableCell>
    }
  }
  
  return (
    <Table>
      <TableHeader>
        <TableColumn key="cantidad">#</TableColumn>
        <TableColumn key="servicio">Tipo de servicio</TableColumn>
        <TableColumn key="equipo">Equipo</TableColumn>
        <TableColumn key="descripcion">Descripcion</TableColumn>
        <TableColumn key="precio_unit">Precio unitario</TableColumn>
        <TableColumn key="precio">Total</TableColumn>
      </TableHeader>
      <TableBody items={detalles}>
        {
          (item) => (
            <TableRow key={item.detalleservicioid}>
              {(columnKey) => <TableCell>{CellValue({ columnKey, item })}</TableCell>}
            </TableRow>
          )
        }
      </TableBody>
    </Table>
  )
}
