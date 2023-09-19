import prismadb from "@/lib/prismadb";
import { formatCurrency } from "@/lib/utils";
import { format } from "date-fns";
import React from "react";
import ProductClient from "./components/ProductClient";
import { ProductColumnType } from "./components/Columns";

interface ProductsInterface {
  params: { storeId: string };
}

export default async function Products({
  params: { storeId },
}: ProductsInterface) {
  const data = await prismadb.product.findMany({
    where: {
      storeId,
    },
    include: {
      category: true,
      color: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const products: ProductColumnType[] = data.map((product) => ({
    id: product.id,
    name: product.name,
    category: product.category.name,
    isFeatured: product.isFeatured,
    isArchived: product.isArchived,
    price: formatCurrency.format(product.price.toNumber()),
    colorValue: product.color.value,
    createdAt: format(product.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductClient products={products} />
      </div>
    </div>
  );
}
