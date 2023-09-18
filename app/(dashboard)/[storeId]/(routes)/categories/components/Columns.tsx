"use client";

import { ColumnDef } from "@tanstack/react-table";
import RowAction from "./RowAction";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type CategoryColumnType = {
  id: string;
  name: string;
  billboardLabel: string;
  createdAt: string;
};

export const columns: ColumnDef<CategoryColumnType>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "billboard",
    header: "Billboard",
    cell: ({ row }) => row.original.billboardLabel,
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
