"use client";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/Heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/DataTable";
import { columns, SubcategoriesColumnType } from "./Columns";
import { Plus } from "lucide-react";
import ApiList from "./ApiList";

interface SubcategoriesClientProps {
  subcategories: SubcategoriesColumnType[];
}

export default function SubcategoriesClient({
  subcategories,
}: SubcategoriesClientProps) {
  const router = useRouter();
  const params = useParams();
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          description="Manage subcategories"
          title={`Subcategories (${subcategories.length})`}
        />
        <Button
          onClick={() => router.push(`/${params.storeId}/subcategories/new`)}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable columns={columns} data={subcategories} />
      <Heading description="API calls for Subcategories" title="API" />
      <Separator />
      <ApiList routeName="subcategories" routeNameId="subcategoryId" />
    </>
  );
}
