import prismadb from "@/lib/prismadb";
import CategoryForm from "./components/ColorForm";

interface CategoryPageProps {
  params: { colorId: string };
}

export default async function CategoryPage({
  params: { colorId },
}: CategoryPageProps) {
  const color = await prismadb.color.findUnique({
    where: {
      id: colorId,
    },
  });

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryForm color={color} />
      </div>
    </div>
  );
}
