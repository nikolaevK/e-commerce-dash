import prismadb from "@/lib/prismadb";
import { format } from "date-fns";
import React from "react";
import CategoriesClient from "./components/CategoriesClient";
import { CategoryColumnType } from "./components/Columns";

interface CategoriesInterface {
  params: { storeId: string };
}

export default async function Categories({
  params: { storeId },
}: CategoriesInterface) {
  const data = await prismadb.category.findMany({
    where: {
      storeId,
    },
    // Populates from relationship between category and billboard
    include: {
      billboard: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const categories: CategoryColumnType[] = data.map((category) => ({
    id: category.id,
    name: category.name,
    billboardLabel: category.billboard.label,
    createdAt: format(category.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoriesClient categories={categories} />
      </div>
    </div>
  );
}
