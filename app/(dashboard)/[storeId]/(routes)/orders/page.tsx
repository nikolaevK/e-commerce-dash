import prismadb from "@/lib/prismadb";
import { formatCurrency } from "@/lib/utils";
import { format } from "date-fns";
import React from "react";
import BillBoardClient from "./components/OrderClient";
import { OrderColumnType } from "./components/Columns";

interface OrdersInterface {
  params: { storeId: string };
}

export default async function Orders({ params: { storeId } }: OrdersInterface) {
  const data = await prismadb.order.findMany({
    where: {
      storeId,
    },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const orders: OrderColumnType[] = data.map((order) => ({
    id: order.id,
    phone: order.phone,
    address: order.address,
    isPaid: order.isPaid,
    products: order.orderItems
      .map((orderItem) => orderItem.product.name)
      .join(", "),
    totalPrice: formatCurrency.format(
      order.orderItems.reduce((total, orderItem) => {
        return total + Number(orderItem.product.price) * orderItem.quantity;
      }, 0)
    ),
    createdAt: format(order.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillBoardClient orders={orders} />
      </div>
    </div>
  );
}
