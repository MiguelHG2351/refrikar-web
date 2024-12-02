/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import { useForm } from "react-hook-form";
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup";
type formData = {
nombre:string
}

const schema = yup.object().shape({
  nombre: yup.string().required(),
  telefono: yup.string(),
  ruc: yup.string()
})

import {
  Modal, ModalContent, ModalBody, ModalFooter, ModalHeader,useDisclosure,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Pagination,
  Selection,
  SortDescriptor,
} from "@nextui-org/react";
import { PlusIcon, VerticalDotsIcon, ChevronDownIcon, SearchIcon, EditIcon } from "@/components/icons/Icons";
import { useGetProveedoresQuery } from "@/storage/api/proveedores"
import React from "react";
import { Proveedores } from "@/dtos";
import { capitalize } from "@/utils/capitalize";

const INITIAL_VISIBLE_COLUMNS = ["nombre", "apellido", "ruc","direccion", "actions"];

export default function ProveedoresTable() {
  const [selectedUser, setSelectedUser] = useState<Proveedores | null>(null);
  const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure();
  const { data: proveedorList, isLoading, isError } = useGetProveedoresQuery("")
  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(new Set([]));
  const [visibleColumns, setVisibleColumns] = React.useState<Selection>(new Set(INITIAL_VISIBLE_COLUMNS));
  const [statusFilter, setStatusFilter] = React.useState<Selection>("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: "age",
    direction: "ascending",
  });

  const {
    register,handleSubmit,
    formState: {errors},
  } = useForm<formData>();

  const onSubmit = handleSubmit((data)=>{
    console.log(data.nombre);
  })
  
  const columns = [
    {name: "Nombre del proveedor", uid: "nombre", sortable: true},
    {name: "Telefono", uid: "telefono"},
    {name: "Cedula RUC", uid: "ruc"},
    {name: "Direccion", uid: "direccion"},
    {name: "Editar", uid: "actions"},
  ]; 

  const [page, setPage] = React.useState(1);
  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;
    
    return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let _proveedorList = proveedorList || [];
    let filteredUsers = [..._proveedorList];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((user) => {
        return user.nombre.toLowerCase().includes(filterValue.toLowerCase())
      });
    }

    // if (statusFilter !== "all") {
    //   filteredUsers = filteredUsers.filter((user) =>
    //     Array.from(statusFilter).includes(user.),
    //   );
    // }
    return filteredUsers;
  }, [proveedorList, filterValue, statusFilter]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    const data = [...items].sort((a: Proveedores, b: Proveedores) => {
      const first = a[sortDescriptor.column as keyof Proveedores] as number;
      const second = b[sortDescriptor.column as keyof Proveedores] as number;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });

    return data
  }, [sortDescriptor, items]);

  const renderCell = React.useCallback((user: Proveedores, columnKey: React.Key) => {
    const cellValue = user[columnKey as keyof Proveedores];
    
    switch (columnKey) {
      case "nombre":
        return (
          <div className="flex justify-between">
            <p>{ cellValue }</p>
          </div>
        );
      case "telefono":
        return (
          <div className="flex justify-between">
            <p className="text-bold text-small capitalize">{cellValue}</p>
          </div>
        );
      case "ruc":
        return (
          <div className="flex justify-between">
            <p className="text-bold text-small capitalize">{cellValue}</p>
          </div>
        );
      case "actions":
        return (
          <div className="flex justify-end">
      <button
         onClick={() => {
          setSelectedUser(user);  // Establece el proveedor seleccionado
          onOpen();  // Abre el modal
        }}
        className="p-0 w-auto h-auto flex bg-blue-500 hover:bg-blue-600 text-white rounded"
      >
        <AiFillEdit size={24} />
      </button>
    </div>
        );
      default:
        return cellValue;
    }
    
  }, []);

  const onNextPage = React.useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = React.useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const onRowsPerPageChange = React.useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);

  const onSearchChange = React.useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = React.useCallback(()=>{
    setFilterValue("")
    setPage(1)
  },[])

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Buscar por nombre..."
            startContent={<SearchIcon className="fill-current" width={26} height={26} />}
            value={filterValue}
            onClear={() => onClear()}
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
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={setVisibleColumns}
              >
                {columns.map((column) => (
                  <DropdownItem key={column.uid} className="capitalize">
                    {capitalize(column.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">Total {proveedorList?.length} clientes</span>
          <label className="flex items-center text-default-400 text-small">
            Filas por página:
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
    statusFilter,
    visibleColumns,
    onSearchChange,
    onRowsPerPageChange,
    proveedorList?.length || 0,
    hasSearchFilter,
  ]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex flex-col items-center justify-center">
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
        />
        <div className="hidden sm:flex w-[30%] justify-center gap-2 mt-2">
          <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onPreviousPage}>
            Anterior
          </Button>
          <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onNextPage}>
            Siguiente
          </Button>
        </div>
      </div>
    );
  }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

  return (
    <><Table
      aria-label="Example table with custom cells, pagination and sorting"
      isHeaderSticky
      bottomContent={bottomContent}
      bottomContentPlacement="outside"
      classNames={{
        wrapper: "max-h-[382px]",
      }}
      //selectedKeys={selectedKeys}
      //selectionMode="multiple"
      sortDescriptor={sortDescriptor}
      topContent={topContent}
      topContentPlacement="outside"
      onSelectionChange={setSelectedKeys}
      onSortChange={(e) => {
        if (e.column != null && e.direction != null) {
          setSortDescriptor({ column: e.column, direction: e.direction });
        }
      } }
    >
      <TableHeader columns={headerColumns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.name === "Editar" ? "end" : "start"}  // Alinear solo "NombreDelCampo" a la derecha
            allowsSorting={column.sortable}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent={"No se encontraron proveedores"} items={sortedItems}>
        {(item: Proveedores) => {
          return (
            <TableRow key={item.proveedorid}>
              {(columnKey) => {
                return (<TableCell>{renderCell(item, columnKey)}</TableCell>);
              } }
            </TableRow>
          );
        } }
      </TableBody>
    </Table><Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">Editar datos de proveedor</ModalHeader>
          <ModalBody>
                  <Input
                  label="Proveedor"
                  placeholder="Nombre de proveedor"
                  variant="bordered"
                  value={selectedUser?.nombre || ""}
                  onChange={(e) => {
                    if (selectedUser) {  // Verifica que selectedUser no sea null
                      setSelectedUser({ ...selectedUser, nombre: e.target.value });
                    }
                  }}
                  />
                <Input
                  label="Telefono"
                  placeholder="Telefono de proveedor"
                  variant="bordered"
                  value={selectedUser?.telefono?.toString() || ""}  // Asegura que 'telefono' sea una cadena
                  onChange={(e) => {
                    if (selectedUser) {
                      setSelectedUser({ ...selectedUser, telefono: parseInt(e.target.value)});  // 'telefono' será una cadena
                    }
                  }}
                />
                <Input
                  label="RUC"
                  placeholder="Cedula RUC del proveedor"
                  variant="bordered"
                  value={selectedUser?.ruc || ""}
                  onChange={(e) => {
                    if (selectedUser) {  // Verifica que selectedUser no sea null
                      setSelectedUser({ ...selectedUser, ruc: e.target.value });
                    }
                  }}
                />
                <Input
                  label="Direccion"
                  placeholder="Direccion del proveedor"
                  variant="bordered"
                  value={selectedUser?.direccion || ""}
                  onChange={(e) => {
                    if (selectedUser) {  // Verifica que selectedUser no sea null
                      setSelectedUser({ ...selectedUser, direccion: e.target.value });
                    }
                  }}
                />
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
    
    
  );
  
}

