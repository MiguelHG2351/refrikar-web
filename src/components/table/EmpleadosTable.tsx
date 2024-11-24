'use client'

import { Empleado } from '@/dtos/Empleado';
import { capitalize } from '@/utils/capitalize';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  SortDescriptor,
  Input,
  Dropdown,
  DropdownTrigger,
  Button,
  DropdownMenu,
  DropdownItem
} from '@nextui-org/react'
import { useState, useMemo, useCallback } from 'react';
import { ChevronDownIcon, PlusIcon, SearchIcon, VerticalDotsIcon } from '../icons/Icons';

function getColumns(data: any) {
  const columns = Object.keys(data[0]).filter(key => key!== 'cargoid'&& key !== 'empleadoid').map(key => ({ uid: key, name: capitalize(key.replace(/_/g, ' '))}));
  columns.push({ uid: 'actions', name: 'Actions' });
  
  return columns
}

function getVisibleColumns(columns: any) {
  return columns.map((column: any) => column.uid);
}

export default function EmpleadosTable({ empleados }: { empleados: any }) {

  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "nombre",
    direction: "ascending",
  });
  const [page, setPage] = useState(1);
  const [filterValue, setFilterValue] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);


  const hasSearchFilter = Boolean(filterValue);
  const filteredItems = useMemo(() => {
    let _proveedorList = empleados || [];
    let filteredUsers = [..._proveedorList];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((user) => {
        return user.nombre.toLowerCase().includes(filterValue.toLowerCase())
      });
    }
    return filteredUsers;
  }, [empleados, filterValue]);

  const onSearchChange = useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);
  const onRowsPerPageChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = useMemo(() => {
    const data = [...items].sort((a: Empleado, b: Empleado) => {
      const first = a[sortDescriptor.column as keyof Empleado] as number;
      const second = b[sortDescriptor.column as keyof Empleado] as number;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });

    return data
  }, [sortDescriptor, items]);

  const headerColumns = useMemo(() => {
    const columns = getColumns(empleados);
    return columns;
    
  }, [empleados]);

  const renderCell = useCallback((user: Empleado, columnKey: React.Key) => {

    switch (columnKey) {
      case "nombre":
        return (
          <div className="flex">
            <p>{ user.nombre }</p>
          </div>
        );
      case "apellido":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{user.apellido}</p>
          </div>
        );
      case "telefono":
        return (
          <div className="flex">
            <p className="text-bold text-small capitalize">{user.telefono}</p>
          </div>
        );
      case "cedula":
        return (
          <div className="flex">
            <p className="text-bold text-small capitalize">{user.cedula}</p>
          </div>
        );
      case "cargo_empleado":
        return (
          <div className="flex">
            <p className="text-bold text-small capitalize">{user.cargo_empleado.nombre}</p>
          </div>
        );
      case "actions":
        return (
          <div className="relative flex justify-end items-center gap-2">
            <Dropdown>
              <DropdownTrigger>
                <Button isIconOnly size="sm" variant="light">
                  <VerticalDotsIcon className="fill-black" width={22} height={22} />
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Lista de opciones">
                <DropdownItem>View</DropdownItem>
                <DropdownItem>Edit</DropdownItem>
                <DropdownItem>Delete</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        );
      default:
        return 'nothing';
    }
  }, []);

  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Search by name..."
            startContent={<SearchIcon className="fill-current" width={26} height={26} />}
            value={filterValue}
            // onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button endContent={<ChevronDownIcon className="text-small" width={22} height={22} />}>
                  Columns
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectionMode="multiple"
              >
                {getColumns(empleados).map((column) => (
                  <DropdownItem key={column.uid} className="capitalize">
                    {capitalize(column.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Button color="primary" endContent={<PlusIcon className="fill" width={32} height={32} />}>
              Add New
            </Button>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">Total {empleados.length} empleados</span>
          <label className="flex items-center text-default-400 text-small">
            Rows per page:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={onRowsPerPageChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [
    filterValue,
    onSearchChange,
    onRowsPerPageChange,
    empleados.length,
    hasSearchFilter,
  ]);

  return (
    <Table topContentPlacement="outside" topContent={topContent}>
      <TableHeader columns={headerColumns}>
        {(column) => {
          // console.log(column)
          return (
            <TableColumn key={column.uid}>
              {column.name}
            </TableColumn>
          )
        }}
      </TableHeader>
      <TableBody emptyContent={"No users found"} items={sortedItems}>
        {(item) => {
          return (
            <TableRow key={item.empleadoid}>
              {(columnKey) => {
                return (<TableCell>{renderCell(item, columnKey)}</TableCell>)
              }}
            </TableRow>
          )
        }}
      </TableBody>
    </Table>
  )
}
