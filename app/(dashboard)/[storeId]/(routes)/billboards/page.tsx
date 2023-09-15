import prismadb from "@/lib/prismadb";
import { format } from "date-fns";
import React from "react";
import BillBoardClient from "./components/BillBoardClient";

interface BillBoardsInterface {
  params: { storeId: string };
}

export default async function Billboards({
  params: { storeId },
}: BillBoardsInterface) {
  const data = await prismadb.billboard.findMany({
    where: {
      storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const billboards = data.map((billboard) => ({
    id: billboard.id,
    label: billboard.label,
    createdAt: format(billboard.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillBoardClient billboards={billboards} />
      </div>
    </div>
  );
}
