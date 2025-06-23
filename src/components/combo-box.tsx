import * as React from "react";
import {CheckIcon, ChevronsUpDownIcon} from "lucide-react";

import {cn} from "@/lib/utils";
import {Button} from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";

interface Props {
  data: {id: string; value: string}[] | null;
  value: string;
  setValue: (value: string) => void;
}

export const Combobox = ({data, value, setValue}: Props) => {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [dataFilter, setDataFilter] = React.useState<{id: string; value: string}[]>();

  React.useEffect(() => {
    setDataFilter(
      data?.filter((item) => item.value.toLowerCase().includes(query.toLowerCase())).slice(0, 50)
    );
    console.log("dataFilter", dataFilter);
  }, [query]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
          disabled={data ? false : true}
        >
          {value ? data?.find((item) => item.id === value)?.value : "Selecciona el Lote..."}
          <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className=" p-0  ">
        <Command shouldFilter={false}>
          <CommandInput
            placeholder="Buscar Lote..."
            value={query}
            onValueChange={(e) => setQuery(e)} // Actualiza el estado al escribir
          />
          <CommandList>
            <CommandEmpty>No existe ese lote.</CommandEmpty>
            <CommandGroup>
              {dataFilter?.map((item) => (
                <CommandItem
                  className=" w-full "
                  key={item.id}
                  value={item.id}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  <CheckIcon
                    className={cn("mr-2 h-4 w-4", value === item.id ? "opacity-100" : "opacity-0")}
                  />
                  {item.value}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
