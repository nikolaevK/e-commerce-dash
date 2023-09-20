"use client";

import { ColumnDef } from "@tanstack/react-table";
import RowAction from "./RowAction";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ProductColumnType = {
  id: string;
  name: string;
  price: string;
  colorValue: string;
  category: string;
  isFeatured: boolean;
  isArchived: boolean;
  createdAt: string;
};

export const columns: ColumnDef<ProductColumnType>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "isArchived",
    header: "Archived",
  },
  {
    accessorKey: "isFeatured",
    header: "Featured",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "color",
    header: "Color",
    cell: ({ row }) => (
      <div className="flex gap-2">
        {row.original.colorValue}
        <div
          className="h-6 w-6 rounded-full border"
          style={{ backgroundColor: `${row.original.colorValue}` }}
        />
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
    cell: ({ row }) => <RowAction productRow={row.original} />,
  },
];
