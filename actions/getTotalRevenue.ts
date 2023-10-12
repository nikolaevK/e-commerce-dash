import prismadb from "@/lib/prismadb";

export async function getTotalRevenue(storeId: string) {
  const paidOrders = await prismadb.order.findMany({
    where: {
      storeId,
      isPaid: true,
    },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
  });

  const totalRevenue = paidOrders.reduce((total: number, order) => {
    const orderTotal = order.orderItems.reduce(
      (orderSum: number, orderItem) => {
        return (
          orderSum + orderItem.product.price.toNumber() * orderItem.quantity
        );
      },
      0
    );
    return total + orderTotal;
  }, 0);

  return totalRevenue;
}
