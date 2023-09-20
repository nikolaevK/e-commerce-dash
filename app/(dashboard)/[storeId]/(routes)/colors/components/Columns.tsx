"use client";

import { ColumnDef } from "@tanstack/react-table";
import RowAction from "./RowAction";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ColorColumnType = {
  id: string;
  name: string;
  value: string;
  createdAt: string;
};

export const columns: ColumnDef<ColorColumnType>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "value",
    header: "Value",
    cell: ({ row }) => (
      <div className="flex items-center gap-x-2">
        {row.original.value}
        <div
          className={"h-6 w-6 rounded-full border "}
          style={{
            backgroundColor: `${row.original.value}`,
          }}
        ></div>
      </div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id: "actions",
    // extract original object with which Shadcn works when renders the row => BillBoardColumnType
    cell: ({ row }) => <RowAction categoryRow={row.original} />,
  },
];
