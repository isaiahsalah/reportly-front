import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {type ColumnDef, flexRender} from "@tanstack/react-table";
import {
  type ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable,
  type VisibilityState,
} from "@tanstack/react-table";
import {useEffect, useState} from "react";
import {Button} from "../ui/button";
import {ChevronLeftIcon, ChevronRightIcon, ChevronsLeftIcon, ChevronsRightIcon} from "lucide-react";
import {Label} from "../ui/label";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "../ui/select";
import TableSkeleton from "../skeletons/SkeTable";
import type {IGeneral} from "@/utils/interfaces";

interface Props<T extends IGeneral> {
  data: T[] | null;
  actions: React.ReactNode;
  columns: ColumnDef<T>[];
  hasOptions?: boolean;
  hasPaginated?: boolean;
  hasAutoPaginated?: boolean;
  rowsAmount?: number;
}

const DataTable = <T extends IGeneral>({
  data,
  columns,
  hasOptions = true,
  hasPaginated = true,
  hasAutoPaginated = false,
  rowsAmount,
}: Props<T>) => {
  const [rowSelection, setRowSelection] = useState({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
    createdAt: false,
    updatedAt: false,
    deletedAt: false,
  });
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: rowsAmount ? rowsAmount : hasPaginated || hasAutoPaginated ? 20 : 100,
  });

  const table = useReactTable({
    data: data ?? [],
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      pagination,
    },
    filterFns: {}, // Define funciones personalizadas si es necesario
    getRowId: (_row, i) => i.toString(),
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  // const headers = data.length > 0 ? Object.keys(data[0]) : [];
  useEffect(() => {
    if (hasAutoPaginated) {
      const interval = setInterval(() => {
        console.log("Auto paginando...");
        setPagination((prev) => ({
          ...prev,
          pageIndex: prev.pageIndex + 1 >= table.getPageCount() ? 0 : prev.pageIndex + 1,
        }));
      }, 10 * 1000);
      return () => clearInterval(interval);
    }
  }, [table]);

  if (!data) {
    return (
      <TableSkeleton
        colums={5}
        rows={rowsAmount ? rowsAmount : 5}
        hasOptions={hasOptions}
        hasPaginated={hasPaginated}
      />
    );
  }
  return (
    <div className="flex flex-col gap-2 overflow-auto">
      <div className="overflow-hidden rounded-lg border">
        <Table>
          <TableHeader className="bg-muted">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className="text-left capitalize text-sm font-medium text-muted-foreground h-6"
                    >
                      {!header.column.columnDef.header
                        ? null
                        : header.column.columnDef.header.toString().replace(/_/g, " ")}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row, i) => (
                <TableRow key={i} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell, j) => {
                    return (
                      <TableCell key={j} className=" py-1 ">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="text-center">
                  No hay datos.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {/* Controles de paginación */}
      {!hasPaginated ? null : (
        <div className="flex items-center justify-between px-4">
          {/*<div className="hidden flex-1 text-sm text-muted-foreground lg:flex">
            {table.getFilteredSelectedRowModel().rows.length} de{" "}
            {table.getFilteredRowModel().rows.length} filas selecionadas.
          </div>*/}
          <div className="flex w-full items-center gap-8 lg:w-fit ml-auto">
            <div className="hidden items-center gap-2 lg:flex">
              <Label htmlFor="rows-per-page" className="text-sm font-normal text-muted-foreground">
                Mostrar
              </Label>
              <Select
                value={`${table.getState().pagination.pageSize}`}
                onValueChange={(value) => {
                  table.setPageSize(Number(value));
                }}
              >
                <SelectTrigger className="w-20" id="rows-per-page">
                  <SelectValue placeholder={table.getState().pagination.pageSize} />
                </SelectTrigger>
                <SelectContent side="top">
                  {[5, 10, 20, 30, 40, 50].map((pageSize) => (
                    <SelectItem key={pageSize} value={`${pageSize}`}>
                      {pageSize}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex w-fit items-center justify-center text-sm   text-muted-foreground ">
              Página {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
            </div>
            <div className="ml-auto flex items-center gap-1 lg:ml-0">
              <Button
                variant="outline"
                className="hidden h-8 w-8 p-0 lg:flex"
                onClick={() => table.setPageIndex(0)}
                disabled={!table.getCanPreviousPage()}
              >
                <span className="sr-only">Go to first page</span>
                <ChevronsLeftIcon />
              </Button>
              <Button
                variant="outline"
                className="size-8"
                size="icon"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                <span className="sr-only">Go to previous page</span>
                <ChevronLeftIcon />
              </Button>
              <Button
                variant="outline"
                className="size-8"
                size="icon"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                <span className="sr-only">Go to next page</span>
                <ChevronRightIcon />
              </Button>
              <Button
                variant="outline"
                className="hidden size-8 lg:flex"
                size="icon"
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                disabled={!table.getCanNextPage()}
              >
                <span className="sr-only">Go to last page</span>
                <ChevronsRightIcon />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataTable;
