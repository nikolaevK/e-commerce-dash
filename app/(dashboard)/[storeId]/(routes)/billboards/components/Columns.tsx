"use client";

import { ColumnDef } from "@tanstack/react-table";
import RowAction from "./RowAction";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type BillBoardColumnType = {
  id: string;
  label: string;
  createdAt: string;
};

export const columns: ColumnDef<BillBoardColumnType>[] = [
  {
    accessorKey: "label",
    header: "Label",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id: "actions",
    // extract original object with which Shadcn works when renders the row => BillBoardColumnType
    cell: ({ row }) => <RowAction billboardRow={row.original} />,
  },
];
