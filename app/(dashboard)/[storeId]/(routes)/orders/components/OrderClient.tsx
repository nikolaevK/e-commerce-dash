"use client";

import Heading from "@/components/ui/Heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/DataTable";
import { OrderColumnType, columns } from "./Columns";

interface OrderClientProps {
  orders: OrderColumnType[];
}

export default function OrderClient({ orders }: OrderClientProps) {
  return (
    <>
      <Heading
        description="Manage orders"
        title={`Orders (${orders.length})`}
      />
      <Separator />
      <DataTable columns={columns} data={orders} />
    </>
  );
}
