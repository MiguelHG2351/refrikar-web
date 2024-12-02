'use client'
import { AiFillEdit } from "react-icons/ai";
import { useForm } from "react-hook-form";
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup";
import { Empleado } from '@/dtos/Empleado';
import { capitalize } from '@/utils/capitalize';
import {
  Modal, ModalContent, ModalBody, ModalFooter, ModalHeader,useDisclosure,
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

interface Empleados {
  empleadoid: string;
  nombre: string;
  apellido: string;
  telefono: number;
  cedula: string;
  cargoid: string;
}

export default function EmpleadosTable({ empleados }: { empleados: any }) {

  
  const handleCargoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (selectedUser) {
      setSelectedUser({
        ...selectedUser,
        cargoid: e.target.value, // Actualiza el campo 'cargo' en selectedUser
      });
    }
  };

  const [selectedUser, setSelectedUser] = useState<Empleados | null>(null);
  const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure();
  
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
            <button
         onClick={() => {
          onOpen();  // Abre el modal
        }}
        className="p-0 w-auto h-auto flex bg-blue-500 hover:bg-blue-600 text-white rounded"
      >
        <AiFillEdit size={24} />
      </button>
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
            placeholder="Buscar por nombre..."
            startContent={<SearchIcon className="fill-current" width={26} height={26} />}
            value={filterValue}
            // onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button endContent={<ChevronDownIcon className="text-small" width={22} height={22} />}>
                  Columnas
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
            <Button 
             onClick={() => {
              onOpen();  // Abre el modal
            }}
            color="primary" endContent={<PlusIcon className="fill" width={32} height={32} />}>
              Agregar nuevo
            </Button>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">Total {empleados.length} empleados</span>
          <label className="flex items-center text-default-400 text-small">
            Filas por pagina:
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
    <><Table topContentPlacement="outside" topContent={topContent}>
      <TableHeader columns={headerColumns}>
        {(column) => {
          // console.log(column)
          return (
            <TableColumn key={column.uid}>
              {column.name}
            </TableColumn>
          );
        } }
      </TableHeader>
      <TableBody emptyContent={"No users found"} items={sortedItems}>
        {(item) => {
          return (
            <TableRow key={item.empleadoid}>
              {(columnKey) => {
                return (<TableCell>{renderCell(item, columnKey)}</TableCell>);
              } }
            </TableRow>
          );
        } }
      </TableBody>
    </Table><Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">Datos del empleado</ModalHeader>
          <ModalBody>
            <Input
              label="Nombres del empleado"
              placeholder="Nombre/s"
              variant="bordered"
              value={selectedUser?.nombre || ""}
              onChange={(e) => {
                if (selectedUser) { // Verifica que selectedUser no sea null
                  setSelectedUser({ ...selectedUser, nombre: e.target.value });
                }
              } } />
              <Input
              label="Apellidos del empleado"
              placeholder="Apellido/s"
              variant="bordered"
              value={selectedUser?.apellido || ""}
              onChange={(e) => {
                if (selectedUser) { // Verifica que selectedUser no sea null
                  setSelectedUser({ ...selectedUser, apellido: e.target.value });
                }
              } } />
            <Input
              label="Telefono"
              placeholder="Telefono"
              variant="bordered"
              value={selectedUser?.telefono?.toString() || ""} // Asegura que 'telefono' sea una cadena
              onChange={(e) => {
                if (selectedUser) {
                  setSelectedUser({ ...selectedUser, telefono: parseInt(e.target.value) }); // 'telefono' será una cadena
                }
              } } />
            <Input
              label="Cedula"
              placeholder="Cedula del empleado"
              variant="bordered"
              value={selectedUser?.cedula || ""}
              onChange={(e) => {
                if (selectedUser) { // Verifica que selectedUser no sea null
                  setSelectedUser({ ...selectedUser, cedula: e.target.value });
                }
              } } />
              <select
              id="cargo"
            >
              <option value="">Selecciona un cargo</option>
              <option value="Gerente">Gerente</option>
              <option value="Asistente">Asistente</option>
              <option value="Tecnico">Técnico</option>
            </select>
          </ModalBody>
          <ModalFooter>
            <Button color="default" variant="bordered" onPress={onClose}>
              Cancelar
            </Button>
            <Button color="primary" onPress={onClose}>
              Aceptar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal></>

  )
  
}
