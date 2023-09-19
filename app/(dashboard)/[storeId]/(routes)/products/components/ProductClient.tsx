"use client";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/Heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/DataTable";
import { columns, ProductColumnType } from "./Columns";
import { Plus } from "lucide-react";
import ApiList from "./ApiList";

interface ProductClientProps {
  products: ProductColumnType[];
}

export default function ProductClient({ products }: ProductClientProps) {
  const router = useRouter();
  const params = useParams();
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          description="Manage products"
          title={`Products (${products.length})`}
        />
        <Button onClick={() => router.push(`/${params.storeId}/products/new`)}>
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={products} />
      <Heading description="API calls for Products" title="API" />
      <Separator />
      <ApiList routeName="products" routeNameId="productId" />
    </>
  );
}
