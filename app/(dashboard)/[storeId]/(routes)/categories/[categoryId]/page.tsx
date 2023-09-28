import prismadb from "@/lib/prismadb";
import CategoryForm from "./components/CategoryForm";

interface CategoryPageProps {
  params: { categoryId: string; storeId: string };
}

export default async function CategoryPage({
  params: { categoryId, storeId },
}: CategoryPageProps) {
  const category = await prismadb.category.findUnique({
    where: {
      id: categoryId,
    },
  });

  const billboards = await prismadb.billboard.findMany({
    where: {
      storeId,
    },
  });

  const homeBillboards = await prismadb.homeBillboard.findMany({
    where: {
      storeId,
    },
  });

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryForm
          category={category}
          billboards={billboards}
          homeBillboards={homeBillboards}
        />
      </div>
    </div>
  );
}
