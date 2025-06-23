import DataTable from "@/components/table/DataTable";
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {getLastProcess, getNextProcess} from "@/services/bolsas.api";
import type {ITraceability} from "@/utils/interfaces";
import type {ColumnDef} from "@tanstack/react-table";
import {Search} from "lucide-react";
import {useState} from "react";
import {format} from "date-fns";
import TableSkeleton from "@/components/skeletons/SkeTable";

const typeSearch = [
  {id: 1, name: "Siguiente"},
  {id: 2, name: "Anterior"},
];

const TraceabilityBagsPage = () => {
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState(1);
  const [data, setData] = useState<ITraceability[] | null>(null);

  const [lote, setLote] = useState("");

  const updateView = async (loteSearch: string) => {
    console.log("updateView", search);
    setLoading(true);
    const apiData: ITraceability[] = await (search === 1
      ? getNextProcess({
          lote: loteSearch,
        })
      : getLastProcess({
          lote: loteSearch,
        }));
    setData(apiData);
    setLoading(false);
  };

  // Generar columnas dinámicamente
  const columns: ColumnDef<ITraceability>[] = [
    {
      accessorFn: (row) => format(new Date(row.date as Date), "dd/MM/yyyy").trim(),

      header: "Fecha",
      cell: (info) => {
        return (
          <Badge variant={"outline"} className="text-muted-foreground">
            {info.getValue() as string}
          </Badge>
        );
      },
    },

    {
      accessorFn: (row) => row.sector,
      header: "Sector",
      cell: (info) =>
        info.getValue() ? (
          <Badge variant={"secondary"}>{info.getValue() as string}</Badge>
        ) : (
          <Badge variant={"outline"} className="text-muted-foreground">
            -
          </Badge>
        ),
    },
    {
      accessorFn: (row) => row.turn,
      header: "Turno",
      cell: (info) =>
        info.getValue() ? (
          <Badge variant={"secondary"}>{info.getValue() as string}</Badge>
        ) : (
          <Badge variant={"outline"} className="text-muted-foreground">
            -
          </Badge>
        ),
    },
    {
      accessorFn: (row) => row.operador,
      header: "Operator",
      cell: (info) =>
        info.getValue() ? (
          <Badge variant={"secondary"}>{info.getValue() as string}</Badge>
        ) : (
          <Badge variant={"outline"} className="text-muted-foreground">
            -
          </Badge>
        ),
    },
    {
      accessorFn: (row) => row.group,
      header: "Grupo",
      cell: (info) =>
        info.getValue() ? (
          <Badge variant={"secondary"}>{info.getValue() as string}</Badge>
        ) : (
          <Badge variant={"outline"} className="text-muted-foreground">
            -
          </Badge>
        ),
    },
    {
      accessorFn: (row) => row.product,
      header: "Producto",
      cell: (info) =>
        info.getValue() ? (
          <Badge variant={"secondary"}>{info.getValue() as string}</Badge>
        ) : (
          <Badge variant={"outline"} className="text-muted-foreground">
            -
          </Badge>
        ),
    },
    {
      accessorFn: (row) => `${parseInt(row.primary_quantity.toString(), 10)} ${row.primary_unit}`,
      header: "Unidad",
      cell: (info) => info.getValue(),
    },
    {
      accessorFn: (row) =>
        `${parseInt(row.secondary_quantity.toString(), 10)} ${row.secondary_unit}`,
      header: "Peso",
      cell: (info) => info.getValue(),
    },
    {
      accessorFn: (row) => row.lote,
      header: "Lote",
      cell: (info) => {
        return (
          <Button
            className="h-5 m-0 p-0"
            variant={"link"}
            onClick={() => {
              setLote(info.getValue() as string);
              updateView(info.getValue() as string);
            }}
          >
            {info.getValue() as string}
          </Button>
        );
      },
    },
  ];

  return (
    <div className="flex flex-col gap-2 ">
      <div className="flex gap-1 w-full  ">
        <Input
          placeholder="Escribe el lote"
          value={lote}
          onChange={(e) => setLote(e.target.value)}
        />
        {/*<div className="w-full">
              <Combobox data={lotes} value={lote} setValue={setLote} />
            </div>*/}
        <Select onValueChange={(value) => setSearch(Number(value))} value={search.toString()}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Proceso" />
          </SelectTrigger>
          <SelectContent>
            {typeSearch?.map((item, index) => (
              <SelectItem value={item.id?.toString() ?? ""} key={index}>
                {item.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button size={"icon_sm"} onClick={() => updateView(lote)} disabled={loading}>
          <Search />
        </Button>
      </div>
      {loading ? (
        <TableSkeleton colums={9} rows={5} />
      ) : (
        <DataTable data={data ?? []} columns={columns} actions={<></>} />
      )}
    </div>
  );
};

export default TraceabilityBagsPage;
