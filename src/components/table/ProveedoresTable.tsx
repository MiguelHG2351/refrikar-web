/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import {
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
  SortDescriptor
} from "@nextui-org/react";
import { PlusIcon, VerticalDotsIcon, ChevronDownIcon, SearchIcon, EditIcon } from "@/components/icons/Icons";
import { useGetProveedoresQuery } from "@/storage/api/proveedores"
import React from "react";
import { Proveedores } from "@/dtos";
import { capitalize } from "@/utils/capitalize";

const INITIAL_VISIBLE_COLUMNS = ["nombre", "apellido", "ruc", "actions"];

export default function ProveedoresTable() {
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
  
  const columns = [
    {name: "Nombre del proveedor", uid: "nombre", sortable: true},
    {name: "Telefono", uid: "telefono"},
    {name: "Cedula RUC", uid: "ruc"},
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
          <div className="flex">
            <p>{ cellValue }</p>
          </div>
        );
      case "telefono":
        return (
          <div className="flex">
            <p className="text-bold text-small capitalize">{cellValue}</p>
          </div>
        );
      case "ruc":
        return (
          <div className="flex">
            <p className="text-bold text-small capitalize">{cellValue}</p>
          </div>
        );
      case "actions":
        return (
          <div className="relative flex justify-end items-center gap-2">
           <button>
           <svg xmlns="http://www.w3.org/2000/svg" version="1.0" width="15" height="15" viewBox="0 0 1280.000000 1280.000000" preserveAspectRatio="xMidYMid meet">
<metadata>
Created by potrace 1.15, written by Peter Selinger 2001-2017
</metadata>
<g transform="translate(0.000000,1280.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none">
<path d="M8325 12790 c-27 -4 -70 -9 -95 -9 -25 -1 -66 -11 -93 -24 -50 -24 -25 1 -1457 -1422 -410 -408 -1422 -1413 -2250 -2235 -2242 -2225 -2759 -2742 -2781 -2777 -11 -18 -38 -97 -59 -175 -21 -79 -93 -345 -160 -593 -67 -247 -175 -648 -240 -890 -119 -442 -337 -1244 -370 -1365 -17 -63 -128 -473 -155 -575 -12 -43 -67 -248 -135 -500 -34 -126 -121 -448 -141 -525 -11 -41 -38 -140 -60 -220 -21 -80 -48 -179 -59 -220 -11 -41 -42 -156 -69 -255 -27 -99 -72 -268 -101 -375 -28 -107 -60 -225 -71 -263 -45 -152 -35 -224 40 -298 74 -75 145 -84 298 -41 38 11 106 30 153 42 47 12 117 31 155 41 39 11 257 69 485 129 427 113 528 140 640 170 108 29 874 233 1183 314 137 37 281 75 357 96 118 32 2611 697 2795 745 99 26 194 54 210 62 45 22 153 129 2305 2268 404 402 1410 1401 2235 2220 2090 2074 1879 1860 1900 1924 12 37 15 67 11 100 -4 25 -8 84 -10 131 -3 66 -17 134 -65 305 -34 121 -98 351 -142 510 -44 160 -91 309 -105 332 -25 44 -89 83 -135 83 -70 -1 -105 -32 -674 -599 -308 -306 -1572 -1562 -2810 -2791 -2911 -2889 -2694 -2670 -2733 -2752 -18 -37 -42 -104 -54 -150 -35 -138 -26 -191 100 -643 l110 -390 -72 -73 -72 -73 -900 -240 c-494 -132 -1112 -296 -1373 -365 l-474 -126 -421 419 c-1271 1263 -1656 1649 -1656 1662 0 8 40 163 89 345 49 182 128 473 175 646 46 173 155 576 241 895 86 319 172 636 190 704 l34 124 73 74 c44 44 78 71 87 68 7 -3 193 -53 413 -111 448 -118 491 -124 639 -85 158 41 172 52 544 420 489 484 3206 3182 4095 4066 415 412 975 968 1243 1235 269 267 497 502 508 522 43 84 13 173 -72 216 -25 12 -272 83 -550 157 -518 139 -590 153 -694 135z"/>
<path d="M10089 11986 c-32 -12 -70 -33 -85 -45 -16 -12 -234 -226 -484 -475 -250 -249 -1485 -1475 -2745 -2725 -3090 -3068 -2946 -2923 -2980 -2996 -34 -72 -40 -179 -13 -231 27 -50 1734 -1742 1776 -1760 57 -24 164 -15 235 22 68 35 -68 -98 1792 1748 4192 4163 4441 4412 4473 4476 37 75 43 180 14 237 -24 47 -1715 1728 -1765 1755 -48 26 -149 23 -218 -6z"/>
</g>
</svg>
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
    <Table
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
          setSortDescriptor({ column: e.column, direction: e.direction })
        }
      }}
    >
      <TableHeader columns={headerColumns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={"center"}
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
                return (<TableCell>{renderCell(item, columnKey)}</TableCell>)
              }}
            </TableRow>
          )
        }}
      </TableBody>
    </Table>
  );
}
