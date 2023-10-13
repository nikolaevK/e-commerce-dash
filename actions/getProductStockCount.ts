import prismadb from "@/lib/prismadb";

export async function getProductInStockCount(storeId: string) {
  const salesCount = await prismadb.product.count({
    where: {
      storeId,
      // isArchived: false,
    },
  });

  return salesCount;
}
