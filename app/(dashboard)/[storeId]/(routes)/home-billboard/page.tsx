import prismadb from "@/lib/prismadb";
import { formatCurrency } from "@/lib/utils";
import { format } from "date-fns";
import React from "react";
import HomeBillboardClient from "./components/HomeBillboardClient";
import { HomeBillboardColumnType } from "./components/Columns";

interface HomeBillboardInterface {
  params: { storeId: string };
}

export default async function HomeBillboard({
  params: { storeId },
}: HomeBillboardInterface) {
  const data = await prismadb.homeBillboard.findMany({
    where: {
      storeId,
    },
  });

  const homeBillboard: HomeBillboardColumnType[] = data.map((billboard) => ({
    id: billboard.id,
    categoryName: billboard.categoryName,
    title: billboard.title,
    description: billboard.description,
    imageUrl: billboard.imageUrl,
    createdAt: format(billboard.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <HomeBillboardClient homeBillboard={homeBillboard} />
      </div>
    </div>
  );
}
