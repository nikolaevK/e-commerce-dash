import prismadb from "@/lib/prismadb";
import { formatCurrency } from "@/lib/utils";
import { format } from "date-fns";
import React from "react";
import SubcategoriesClient from "./components/SubcategoriesClient";
import { SubcategoriesColumnType } from "./components/Columns";

interface SubcategoriesInterface {
  params: { storeId: string };
}

export default async function Subcategories({
  params: { storeId },
}: SubcategoriesInterface) {
  const data = await prismadb.subcategories.findMany({
    where: {
      storeId,
    },
  });

  const subcategories: SubcategoriesColumnType[] = data.map((subcategory) => ({
    id: subcategory.id,
    subcategory1: subcategory.subcategory1,
    subcategory2: subcategory.subcategory2,
    subcategory3: subcategory.subcategory3,
    createdAt: format(subcategory.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SubcategoriesClient subcategories={subcategories} />
      </div>
    </div>
  );
}
