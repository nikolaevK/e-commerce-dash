import prismadb from "@/lib/prismadb";
import { Category, HomeBillboard } from "@prisma/client";
import BillboardForm from "./components/BillboardForm";

interface BillboardPageProps {
  params: { billboardId: string; storeId: string };
}

export default async function ProductPage({
  params: { billboardId, storeId },
}: BillboardPageProps) {
  const dataBillboard = await prismadb.homeBillboard.findUnique({
    where: {
      id: billboardId,
    },
  });

  const dataCategories = await prismadb.category.findMany({
    where: {
      storeId,
    },
  });

  //Only plain objects can be passed to
  //Client Components from Server Components. Decimal objects are not supported.
  const billboard: HomeBillboard = JSON.parse(JSON.stringify(dataBillboard));
  const categories: Category[] = JSON.parse(JSON.stringify(dataCategories));

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardForm billboard={billboard} categories={categories} />
      </div>
    </div>
  );
}
