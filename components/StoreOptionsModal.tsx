"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useStoreModal } from "@/hooks/UseStoreModal";
import { Store } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Check,
  ChevronsUpDown,
  PlusCircle,
  Store as StoreIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";

type PopoverTriggerProps = React.ComponentPropsWithoutRef<
  typeof PopoverTrigger
>;

interface StoreOptionsModalProps extends PopoverTriggerProps {
  items: Store[] | [];
}

export default function StoreOptionsModal({
  items,
  className,
}: StoreOptionsModalProps) {
  const [storeOptionsOpen, setStoreOptionsOpen] = useState(false);
  const { onOpen } = useStoreModal();

  const params = useParams();
  const router = useRouter();

  const formattedStores = items.map((store) => ({
    label: store.name,
    storeId: store.id,
  }));

  const currentStore = formattedStores.find(
    (store) => store.storeId === params.storeId
  );

  function onStoreSelect(storeId: string) {
    setStoreOptionsOpen(false);
    router.push(`/${storeId}`);
  }

  return (
    <Popover open={storeOptionsOpen} onOpenChange={setStoreOptionsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          role="combobox"
          aria-expanded={storeOptionsOpen}
          aria-label="Select Store"
          className={cn("w-[200px] justify-between", className)}
        >
          <StoreIcon className="mr-2 h-4 w-4" />
          {currentStore?.label}
          <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search store..." />
          <CommandList>
            <CommandEmpty>No store found</CommandEmpty>
            <CommandGroup heading="Stores">
              {formattedStores.map((store) => (
                <CommandItem
                  key={store.storeId}
                  onSelect={() => onStoreSelect(store.storeId)}
                  className="text-sm"
                >
                  <StoreIcon className="mr-2 h-4 w-4" />
                  {store.label}
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4",
                      currentStore?.storeId === store.storeId
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
          <CommandSeparator />
          <CommandList>
            <CommandGroup>
              <CommandItem
                onSelect={() => {
                  setStoreOptionsOpen(false);
                  // function from UseStore Hook
                  onOpen();
                }}
                className="hover:cursor-pointer"
              >
                <PlusCircle className="mr-2 h-5 w-5" />
                Create Store
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
