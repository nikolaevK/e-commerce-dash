"use client";

import { ColumnDef } from "@tanstack/react-table";
import RowAction from "./RowAction";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type SubcategoriesColumnType = {
  id: string;
  subcategory1: string;
  subcategory2: string;
  subcategory3: string;
  createdAt: string;
};

export const columns: ColumnDef<SubcategoriesColumnType>[] = [
  {
    accessorKey: "subcategory1",
    header: "Subcategory 1",
  },
  {
    accessorKey: "subcategory2",
    header: "Subcategory 2",
  },
  {
    accessorKey: "subcategory3",
    header: "Subcategory 3",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id: "actions",
    // extract original object with which Shadcn works when renders the row => BillBoardColumnType
    cell: ({ row }) => <RowAction subcategoryRow={row.original} />,
  },
];
