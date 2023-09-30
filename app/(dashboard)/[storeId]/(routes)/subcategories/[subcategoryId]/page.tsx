import prismadb from "@/lib/prismadb";
import { HomeBillboard, Subcategories } from "@prisma/client";
import BillboardForm from "./components/SubcategoryForm";

interface SubcategoryPageProps {
  params: { subcategoryId: string; storeId: string };
}

export default async function SubcategoryPage({
  params: { subcategoryId, storeId },
}: SubcategoryPageProps) {
  const dataSubcategory = await prismadb.subcategories.findUnique({
    where: {
      id: subcategoryId,
    },
  });

  const dataHomeBillboards = await prismadb.homeBillboard.findMany({
    where: {
      storeId,
    },
  });

  //Only plain objects can be passed to
  //Client Components from Server Components. Decimal objects are not supported.
  const subcategory: Subcategories = JSON.parse(
    JSON.stringify(dataSubcategory)
  );
  const homeBillboards: HomeBillboard[] = JSON.parse(
    JSON.stringify(dataHomeBillboards)
  );

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardForm
          subcategory={subcategory}
          homeBillboards={homeBillboards}
        />
      </div>
    </div>
  );
}
