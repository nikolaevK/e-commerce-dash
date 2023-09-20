import prismadb from "@/lib/prismadb";
import ProductForm from "./components/ProductForm";

interface ProductPageProps {
  params: { productId: string; storeId: string };
}

export default async function ProductPage({
  params: { productId, storeId },
}: ProductPageProps) {
  const data = await prismadb.product.findUnique({
    where: {
      id: productId,
    },
    include: {
      images: true,
    },
  });

  const categories = await prismadb.category.findMany({
    where: {
      storeId,
    },
  });

  const colors = await prismadb.color.findMany({
    where: {
      storeId,
    },
  });
  //Only plain objects can be passed to
  //Client Components from Server Components. Decimal objects are not supported.
  const product = JSON.parse(JSON.stringify(data));

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductForm
          product={product}
          colors={colors}
          categories={categories}
        />
      </div>
    </div>
  );
}
