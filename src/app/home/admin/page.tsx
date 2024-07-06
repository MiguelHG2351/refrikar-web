import {Metadata} from "next";
import {Button} from "@nextui-org/react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from '@tremor/react';
import { OrganizationSwitcher } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: 'Panel de administración de usuarios',
}

export default function Admin() {
  return (
      <section className="px-6 py-4">
        <div className="flex justify-between">
          <h2 className="font-bold text-2xl">Panel de administración de usuarios</h2>
          <Button className="rounded-md bg-primary text-white">Agregar usuario</Button>
          <OrganizationSwitcher />
        </div>
        <div className="">
          <Table>
            <TableHead>
              <TableRow>
                <TableHeaderCell>Name</TableHeaderCell>
                <TableHeaderCell className="text-right">
                  Monsters Slayed
                </TableHeaderCell>
                <TableHeaderCell>Region</TableHeaderCell>
                <TableHeaderCell>Status</TableHeaderCell>
              </TableRow>
            </TableHead>

            <TableBody>
              <TableRow>
                <TableCell>Wilhelm Tell</TableCell>
                <TableCell className="text-right">1</TableCell>
                <TableCell>Uri, Schwyz, Unterwalden</TableCell>
                <TableCell>National Hero</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>The Witcher</TableCell>
                <TableCell className="text-right">129</TableCell>
                <TableCell>Kaedwen</TableCell>
                <TableCell>Legend</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Mizutsune</TableCell>
                <TableCell className="text-right">82</TableCell>
                <TableCell>Japan</TableCell>
                <TableCell>N/A</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </section>
  )
}