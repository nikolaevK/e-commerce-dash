"use client";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/Heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/DataTable";
import { CategoryColumnType, columns } from "./Columns";
import { Plus } from "lucide-react";
import ApiList from "./ApiList";

interface CategoryClientProps {
  categories: CategoryColumnType[];
}

export default function CategoriesClient({ categories }: CategoryClientProps) {
  const router = useRouter();
  const params = useParams();
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          description="Manage categories"
          title={`Categories (${categories.length})`}
        />
        <Button
          onClick={() => router.push(`/${params.storeId}/categories/new`)}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={categories} />
      <Heading description="API calls for Categories" title="API" />
      <Separator />
      <ApiList routeName="categories" routeNameId="categoryId" />
    </>
  );
}
