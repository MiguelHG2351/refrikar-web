'use client'

import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, getKeyValue } from "@nextui-org/react"
import { Key } from "react"

export default function DetallesServicio({ detalles }: {detalles: any[]}) {

  function CellValue({ columnKey, item }: {columnKey: Key, item: any}) {
    console.log('columnkey>>>',item);
    switch (columnKey) {    
      case 'cantidad':
        return 1
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
        <TableColumn key="cantidad">Cantidad</TableColumn>
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
