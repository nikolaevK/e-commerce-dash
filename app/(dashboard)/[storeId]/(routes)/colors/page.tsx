import prismadb from "@/lib/prismadb";
import { format } from "date-fns";
import React from "react";
import ColorClient from "./components/ColorClient";

import { ColorColumnType } from "./components/Columns";

interface CategoriesInterface {
  params: { storeId: string };
}

export default async function Categories({
  params: { storeId },
}: CategoriesInterface) {
  const data = await prismadb.color.findMany({
    where: {
      storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const colors: ColorColumnType[] = data.map((item) => ({
    id: item.id,
    name: item.name,
    value: item.value,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ColorClient colors={colors} />
      </div>
    </div>
  );
}
