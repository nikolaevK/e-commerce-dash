"use client";

import { ColumnDef } from "@tanstack/react-table";
import RowAction from "./RowAction";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type HomeBillboardColumnType = {
  id: string;
  categoryName: string;
  title: string;
  description: string;
  imageUrl: string;
  createdAt: string;
};

export const columns: ColumnDef<HomeBillboardColumnType>[] = [
  {
    accessorKey: "categoryName",
    header: "Category",
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "description",
    header: "Description",
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
